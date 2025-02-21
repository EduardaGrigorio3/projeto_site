import { Router } from "express";
import bcrypt from 'bcryptjs';
import { db } from "../database/db.js";

export const loginRouter = Router()

//Faz o login do usuário
loginRouter.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await db.get("SELECT * FROM usuarios WHERE username = ? AND password = ?", [username, password]);
        if (user) {
            res.status(200).send("Login bem-sucedido");
        } else {
            res.status(401).send("Credenciais Inválidas.");
        }
    } catch (error) {
        console.error("Erro ao verificar credenciais:", error);
        res.status(500).send("Erro ao verificar credenciais.");
    }
});

// Rota para registrar usuário
loginRouter.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;
    console.log(`Recebido: username=${username}, email=${email}, password=${password}`); // Log dos dados recebidos

    try {
        // Verificar se o usuário já existe
        
        const existeUserEmail = await db.get("SELECT * FROM usuarios WHERE email = ?", [email]);
        
        if (existeUserEmail) {
            console.log("Usuário já existe"); // Log quando o usuário ou email já existem
            return res.status(409).send("Já existe um usuário com esse email.");
        }

        // Verificar se todos os campos foram preenchidos
        if (username && email && password) {
            // Certificar-se de que os valores são strings
            const user = username.toString();
            const mail = email.toString();
            const pass = password.toString();
        
            const salt = await bcrypt.genSalt(10);
            const hashedSenha = await bcrypt.hash(pass, salt);
            console.log(hashedSenha);

            await db.run("INSERT INTO usuarios (username, email, password) VALUES (?, ?, ?)", [user, mail, hashedSenha]);
            console.log("Usuário registrado com sucesso"); // Log quando o usuário é registrado com sucesso
            res.status(201).send("Usuário registrado com sucesso!");
        } else {
            console.log("Campos faltando"); // Log quando campos estão faltando
            res.status(400).send("Por favor, preencha todos os campos.");
        }
    } catch (error) {
        console.error("Erro ao registrar usuário:", error); // Log do erro no console
        console.error(error.stack); // Log da stack trace do erro
        res.status(500).send("Erro ao registrar usuário.");
    }
});

