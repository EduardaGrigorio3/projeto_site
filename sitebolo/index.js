import express from "express"
import { db } from "./database/db.js";

const app = express()

app.use(express.static('public'))

const porta = 55555;

app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
});

app.get('/api/produtos', async (req, res) => {
    const produtos = await db.all("SELECT * FROM produtos")

    return res.json(produtos);
});
