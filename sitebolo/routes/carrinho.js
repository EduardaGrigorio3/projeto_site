import { Router } from "express";

export const carrinhoRouter = Router();

// Carrinho temporário armazenado no servidor
let carrinho = [];

// Adicionar produto ao carrinho
carrinhoRouter.post('/api/carrinho', (req, res) => {
    const { id, nome, preco, quantidade } = req.body;

    if (!id || !nome || !preco || !quantidade) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
    }

    // Verificar se o produto já está no carrinho
    const produtoExistente = carrinho.find(produto => produto.id === id);

    if (produtoExistente) {
        produtoExistente.quantidade += quantidade; // Atualiza a quantidade
    } else {
        carrinho.push({ id, nome, preco, quantidade });
    }

    res.json({ message: "Produto adicionado ao carrinho!", carrinho });
});

// Obter os produtos do carrinho
carrinhoRouter.get('/api/carrinho', (req, res) => {
    res.json(carrinho);
});

// Remover um produto específico do carrinho
carrinhoRouter.delete('/api/carrinho/:id', (req, res) => {
    const { id } = req.params;
    carrinho = carrinho.filter(produto => produto.id !== parseInt(id));
    res.json({ message: "Produto removido do carrinho!", carrinho });
});

// Esvaziar o carrinho
carrinhoRouter.delete('/api/carrinho', (req, res) => {
    carrinho = [];
    res.json({ message: "Carrinho esvaziado!" });
});
