import express from "express";
import { db } from "./database/db.js";

const app = express();

app.use(express.static('public'));
app.use(express.json()); // Middleware para parsear JSON

const porta = 55555;

app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
});

// Verificar se a conexão com o banco de dados foi estabelecida
db.on('open', () => {
    console.log("Conexão com o banco de dados estabelecida com sucesso!");
});

// Rota para obter produtos
app.get('/api/produtos', async (req, res) => {
    try {
        const produtos = await db.all("SELECT * FROM produtos");
        res.json(produtos);
    } catch (error) {
        console.error("Erro ao obter produtos:", error);
        res.status(500).send("Erro ao obter produtos.");
    }
});

// Rota para login
app.post('/api/login', async (req, res) => {
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
app.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;
    console.log(`Recebido: username=${username}, email=${email}, password=${password}`); // Log dos dados recebidos

    try {
        // Verificar se o usuário já existe
        const existeUser = await db.get("SELECT * FROM usuarios WHERE username = ?", [username]);
        const existeUserEmail = await db.get("SELECT * FROM usuarios WHERE email = ?", [email]);
        if (existeUser) {
            console.log("Usuário já existe"); // Log quando o usuário ou email já existem
            return res.status(409).send("Já existe um usuário com esse nome.");
        }
        else if (existeUserEmail) {
            console.log("Usuário já existe"); // Log quando o usuário ou email já existem
            return res.status(409).send("Já existe um usuário com esse email.");
        }

        // Verificar se todos os campos foram preenchidos
        if (username && email && password) {
            // Certificar-se de que os valores são strings
            const user = username.toString();
            const mail = email.toString();
            const pass = password.toString();

            await db.run("INSERT INTO usuarios (username, email, password) VALUES (?, ?, ?)", [user, mail, pass]);
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

