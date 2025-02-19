window.addEventListener("load", main)

async function main() {
    // 1- Requisitar o backend para obter os dados que serão apresentados em tela

    const requisicao = await fetch("http://localhost:55555/api/produtos")
    const dados = await requisicao.json()
    console.log(dados[3])
    //2- obter o elemento html id produtos e construir os demais elementos

    const produtosBolo = document.getElementById("produtos-bolo")
    const produtosCaixinha = document.getElementById("produtos-caixinha")
    const produtosBiscoito = document.getElementById("produtos-biscoito")

    for (let x = 0; x < dados.length; x++) {
        let sabores = []
        if (dados[x].sabor != null) {
            sabores = dados[x].sabor.split(",")
        }
        if (dados[x].tipo === "bolo") {

            produtosBolo.innerHTML += `
        <div class="produto">
        <div class="imagem-container"> <input type="checkbox" id="coracao${x}" class="coracao-checkbox">
            <label for="coracao${x}" class="btn-coracao">&#9829;</label> <img
                src="${dados[x].img}" alt="Bolo trad 1kg"> </div>
        <div class="nome-e-preco-container">
            <h3>${dados[x].nome}</h3>
            <h3>R$${dados[x].preco.toFixed(2).replace('.', ',')}</h3></div>
        <div class="quantidade-e-opcoes-container">
            <div class="quantidade-container"
                <label
                    for="quantidade${x}">${dados[x].unidade}</label> 
                    <input type="number"
                    id="quantidade${x}" min="1" step="1" value="1" class="quantidade">
            </div>
            <div class="opcoesSabores-container"
                <label
                    for="opcao${x}">Sabores:
                </label>
                <select id="opcao${x}" class="opcoesSabores">
                    <option value="">----</option>
                    ${sabores.map(sabor => `<option value="${sabor}">${sabor}</option>`).join('')}
                </select>
            </div>
        </div>
        <div class="botao-container">
            <button class="btn-comprar">Comprar</button>
            <button class="btn-carrinho"><i class="fa fa-shopping-cart"></i></button>
        </div>
        </div>`
        } else if (dados[x].tipo === "caixinha") {
            produtosCaixinha.innerHTML += `
        <div class="produto">
        <div class="imagem-container"> <input type="checkbox" id="coracao${x}" class="coracao-checkbox">
            <label for="coracao${x}" class="btn-coracao">&#9829;</label> <img
                src="${dados[x].img}" alt="Bolo trad 1kg"> </div>
        <div class="nome-e-preco-container"><h3>${dados[x].nome}</h3>
        <h3>R$${dados[x].preco.toFixed(2).replace('.', ',')}</h3></div>
        <div class="quantidade-e-opcoes-container">
            <div class="quantidade-container"
                <label
                    for="quantidade${x}">${dados[x].unidade}</label> 
                    <input type="number"
                    id="quantidade${x}" min="1" step="1" value="1" class="quantidade">
            </div>
            <div class="opcoesSabores-container"
                <label
                    for="opcao${x}">Sabores:
                </label>
                <select id="opcao${x}" class="opcoesSabores">
                    <option value="">----</option>
                    ${sabores.map(sabor => `<option value="${sabor}">${sabor}</option>`).join('')}
                </select>
            </div>
        </div>
        <div class="botao-container">
            <button class="btn-comprar">Comprar</button>
            <button class="btn-carrinho"><i class="fa fa-shopping-cart"></i></button>
        </div>
        </div>`
        } else {
            produtosBiscoito.innerHTML += `
        <div class="produto">
        <div class="imagem-container"> <input type="checkbox" id="coracao${x}" class="coracao-checkbox">
            <label for="coracao${x}" class="btn-coracao">&#9829;</label> <img
                src="${dados[x].img}" alt="Bolo trad 1kg"> </div>
        <div class="nome-e-preco-container"><h3>${dados[x].nome}</h3>
        <h3>R$${dados[x].preco.toFixed(2).replace('.', ',')}</h3></div>
        <div class="quantidade-e-opcoes-container">
            <div class="quantidade-container"
                <label
                    for="quantidade${x}">${dados[x].unidade}</label> 
                    <input type="number"
                    id="quantidade${x}" min="1" step="1" value="1" class="quantidade">
            </div>
            <div class="opcoesSabores-container"
                <label
                    for="opcao${x}">Sabores:
                </label>
                <select id="opcao${x}" class="opcoesSabores">
                    <option value="">----</option>
                    ${sabores.map(sabor => `<option value="${sabor}">${sabor}</option>`).join('')}
                </select>
            </div>
        </div>
        <div class="botao-container">
            <button class="btn-comprar">Comprar</button>
            <button class="btn-carrinho"><i class="fa fa-shopping-cart"></i></button>
        </div>
        </div>`
        }
    }
}
