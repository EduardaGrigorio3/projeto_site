import { Router } from "express";
import bcrypt from "bcryptjs";
import { db } from "../database/db.js";

export const loginRouter = Router();

// 🟢 ROTA DE LOGIN
loginRouter.post("/api/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await db.get("SELECT * FROM usuarios WHERE email = ?", [email]);

        if (!user) {
            return res.status(401).json({ error: "Credenciais Inválidas." });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: "Credenciais Inválidas." });
        }

        res.status(200).json({ message: "Login bem-sucedido" });
    } catch (error) {
        console.error("Erro ao verificar credenciais:", error);
        res.status(500).json({ error: "Erro interno do servidor." });
    }
});

// 🔴 ROTA DE CADASTRO
loginRouter.post("/api/register", async (req, res) => {
    const { username, email, password } = req.body;
    console.log(`Recebido: username=${username}, email=${email}, password=${password}`);

    try {
        // 🔍 Verificar se o usuário já existe antes de inserir
        const existeUserEmail = await db.get("SELECT * FROM usuarios WHERE email = ?", [email]);
        console.log("Antes da inserção, usuário encontrado:", existeUserEmail);

        if (existeUserEmail) {
            console.log("Usuário já existe!");
            return res.status(409).json({ error: "Já existe um usuário com esse email." });
        }
        

        // 🔐 Hash da senha
        const salt = await bcrypt.genSalt(10);
        const hashedSenha = await bcrypt.hash(password, salt);
        console.log("Senha criptografada:", hashedSenha);

        // 🔄 Inserção do usuário no banco
        await db.run("INSERT INTO usuarios (username, email, password) VALUES (?, ?, ?)", [username, email, hashedSenha]);
        console.log("Usuário registrado com sucesso!");

        // 🔍 Verificar se o usuário foi salvo corretamente
        const usuarioAposInsercao = await db.get("SELECT * FROM usuarios WHERE email = ?", [email]);
        console.log("Depois da inserção, usuário encontrado:", usuarioAposInsercao);

        res.status(201).json({ message: "Usuário registrado com sucesso!" });
    } catch (error) {
        console.error("Erro ao registrar usuário:", error);
        res.status(500).json({ error: "Erro ao registrar usuário." });
    }
});
