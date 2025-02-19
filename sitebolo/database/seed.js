import { db } from "./db.js"

const produtos = [
    { id: 0, tipo: "bolo", img: "./images/NackedCake.jpg", nome: "Naked Cake", preco: 50.00, sabor: null, unidade: "Kg" },
    { id: 1, tipo: "bolo", img: "./images/BoloTradicional.jpg", nome: "Tradicional 500g", preco: 16.00, sabor: null, unidade: "Quantidade" },
    { id: 2, tipo: "bolo", img: "./images/Bolos.jpg", nome: "Tradicional 1Kg", preco: 27.00, sabor: null, unidade: "Quantidade" },
    { id: 3, tipo: "bolo", img: "./images/boloChocolate.jpg", nome: "Especial 500g", preco: 25.00, sabor: "Chocolate,Doce de leite", unidade: "Quantidade" },
    { id: 4, tipo: "bolo", img: "./images/boloChocolate.jpg", nome: "Especial 1Kg", preco: 45.00, sabor: "Chocolate,Doce de leite", unidade: "Quantidade" },
    
    { id: 5, tipo: "caixinha", img: "./images/broa.jpg", nome: "Caixa de Mini Bolos 250g (5 unidades)", preco: 10.00, sabor: null, unidade: "Quantidade" },
    { id: 6, tipo: "caixinha", img: "./images/broa.jpg", nome: "Caixa de Mini Bolos 1kg (10 Unidades)", preco: 36.00, sabor: null, unidade: "Quantidade" },
    
    { id: 7, tipo: "biscoito", img: "./images/biscoito.jpg", nome: "Biscoito de Bolo de Rolo 170g", preco: 10.00, sabor: null, unidade: "Quantidade" },
    { id: 8, tipo: "biscoito", img: "./images/Broa1.jpg", nome: "Broa de Bolo de Rolo 140g", preco: 6.00, sabor: null, unidade: "Quantidade" },

]
async function adicionarProdutos() {
    for (let x = 0; x < produtos.length; x++){
        await db.run(
            "INSERT INTO produtos (id,tipo,img,nome,preco,sabor,unidade) VALUES (?,?,?,?,?,?,?)",
            [

                produtos[x].id,
                produtos[x].tipo,
                produtos[x].img,
                produtos[x].nome,
                produtos[x].preco,
                produtos[x].sabor,
                produtos[x].unidade,
    
            ]
        )
    }
}

adicionarProdutos().then(() => console.log("Produto adicionado!"))