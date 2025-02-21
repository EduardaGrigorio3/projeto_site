import { Router } from "express";
import { db } from "../database/db.js";

export const produtosRouter = Router()

produtosRouter.get('/api/produtos', async (req, res) => {
    try {
        const produtos = await db.all("SELECT * FROM produtos");
        res.json(produtos);
    } catch (error) {
        console.error("Erro ao obter produtos:", error);
        res.status(500).send("Erro ao obter produtos.");
    }
});