import express from "express";
import { db } from "./database/db.js";
import { produtosRouter } from "./routes/produtos.js";
import { loginRouter } from "./routes/login.js";
import{carrinhoRouter}from"./routes/carrinho.js"

const app = express();

app.use(express.static('public'));
app.use(express.json()); // Middleware para parsear JSON
app.use(produtosRouter);
app.use(loginRouter);
app.use(carrinhoRouter);

const porta = 55555;

app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
});

// Verificar se a conexão com o banco de dados foi estabelecida
db.on('open', () => {
    console.log("Conexão com o banco de dados estabelecida com sucesso!");
});


