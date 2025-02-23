import { db } from './db.js';

async function criaTabela() {
    try {
        await db.open(); // Certifique-se de que o banco de dados está aberto antes de executar comandos

        console.log("Banco de dados conectado: ", db.config.filename);

        // Verifique e crie a tabela 'produtos'
        await db.run(`CREATE TABLE IF NOT EXISTS produtos (
            id INTEGER PRIMARY KEY,
            tipo TEXT,
            img TEXT,
            nome TEXT,
            preco REAL,
            sabor TEXT,
            unidade TEXT
        )`);
        console.log("Tabela 'produtos' criada com sucesso!");

        // Verifique e crie a tabela 'usuarios'
        await db.run(`CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY,
            username TEXT NOT NULL,
            email TEXT NOT NULL,
            password TEXT NOT NULL
        )`);
        console.log("Tabela 'usuarios' criada com sucesso!");
        
        // Verificar se a tabela 'usuarios' foi realmente criada
        const result = await db.all(`SELECT name FROM sqlite_master WHERE type='table' AND name='usuarios';`);
        if (result.length > 0) {
            console.log("Tabela 'usuarios' confirmada como criada.");
        } else {
            console.log("Tabela 'usuarios' não encontrada.");
        }

    } catch (error) {
        console.error("Erro ao criar tabelas:", error.message);
    }
    
}

criaTabela().then(() => console.log("Execução concluída."));
