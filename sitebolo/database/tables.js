import { db } from './db.js'


async function criaTabela() {
    await db.run(`CREATE TABLE IF NOT EXISTS produtos (
        id NUMBER PRIMARY KEY,
        tipo TEXT,
        img TEXT,
        nome TEXT,
        preco REAL,
        sabor TEXT,
        unidade TEXT
        )`)    
}

criaTabela().then(() => console.log("Tabela criada!"))