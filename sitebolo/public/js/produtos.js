window.addEventListener("load", main)

async function main() {
    // 1- Requisitar o backend para obter os dados que serão apresentados em tela

    const requisicao = await fetch("http://localhost:55555/api/produtos")
    const dados = await requisicao.json()
    console.log(dados)
    //2- obter o elemento html id produtos e construir os demais elementos

    const produtosBolo = document.getElementById("produtos-bolo")
    const produtosCaixinha = document.getElementById("produtos-caixinha")
    const produtosBiscoito = document.getElementById("produtos-biscoito")

    for (let x = 0; x < dados.length; x++) {

        if (dados[x].tipo === "bolo") {
            produtosBolo.innerHTML += `
        <div class="produto">
        <div class="imagem-container"> <input type="checkbox" id="coracao${x}" class="coracao-checkbox">
            <label for="coracao${x}" class="btn-coracao">&#9829;</label> <img
                src="${dados[x].img}" alt="Bolo trad 1kg"> </div>
        <h4>${dados[x].nome}</h4>
        <h3>1Kg | R$${dados[x].preco.toFixed(2).replace('.', ',')}</h3>
        <div class="quantidade-e-opcoes-container"
            style="display: flex; align-items: center; gap: 10px;">
            <div class="quantidade-container"
                style="display: flex; flex-direction: column; align-items: center;"> <label
                    for="quantidade${x}"">${dados[x].unidade}</label> <input type="number"
                    id="quantidade${x}" min="1" step="1" value="1" class="quantidade-pequena"> </div>
            <div class="opcoes-container"
                style="display: flex; flex-direction: column; align-items: center;"> <label
                    for="opcao${x}">Sabores:</label> <select id="opcao${x}" class="opcoes-pequena">
                    <option value="">----</option>
                    <option value="">${dados[x].sabor}</option>
                </select>
            </div>
        </div>
        <div class="botao-container">
            <button class="btn-comprar">Comprar</button>
            <button class="btn-carrinho"><i class="fa fa-shopping-cart"></i></button>
        </div>`
        } else if (dados[x].tipo === "caixinha") {
            produtosCaixinha.innerHTML += `
        <div class="produto">
        <div class="imagem-container"> <input type="checkbox" id="coracao${x}" class="coracao-checkbox">
            <label for="coracao${x}" class="btn-coracao">&#9829;</label> <img
                src="${dados[x].img}" alt="Bolo trad 1kg"> </div>
        <h4>${dados[x].nome}</h4>
        <h3>1Kg | R$${dados[x].preco.toFixed(2).replace('.', ',')}</h3>
        <div class="quantidade-e-opcoes-container"
            style="display: flex; align-items: center; gap: 10px;">
            <div class="quantidade-container"
                style="display: flex; flex-direction: column; align-items: center;"> <label
                    for="quantidade${x}"">${dados[x].unidade}</label> <input type="number"
                    id="quantidade${x}" min="1" step="1" value="1" class="quantidade-pequena"> </div>
            <div class="opcoes-container"
                style="display: flex; flex-direction: column; align-items: center;"> <label
                    for="opcao${x}">Sabores:</label> <select id="opcao${x}" class="opcoes-pequena">
                    <option value="">----</option>
                    <option value="">${dados[x].sabor}</option>
                </select>
            </div>
        </div>
        <div class="botao-container">
            <button class="btn-comprar">Comprar</button>
            <button class="btn-carrinho"><i class="fa fa-shopping-cart"></i></button>
        </div>`

        }
        else {
            produtosBiscoito.innerHTML += `
        <div class="produto">
        <div class="imagem-container"> <input type="checkbox" id="coracao${x}" class="coracao-checkbox">
            <label for="coracao${x}" class="btn-coracao">&#9829;</label> <img
                src="${dados[x].img}" alt="Bolo trad 1kg"> </div>
        <h4>${dados[x].nome}</h4>
        <h3>1Kg | R$${dados[x].preco.toFixed(2).replace('.', ',')}</h3>
        <div class="quantidade-e-opcoes-container"
            style="display: flex; align-items: center; gap: 10px;">
            <div class="quantidade-container"
                style="display: flex; flex-direction: column; align-items: center;"> <label
                    for="quantidade${x}"">${dados[x].unidade}</label> <input type="number"
                    id="quantidade${x}" min="1" step="1" value="1" class="quantidade-pequena"> </div>
            <div class="opcoes-container"
                style="display: flex; flex-direction: column; align-items: center;"> <label
                    for="opcao${x}">Sabores:</label> <select id="opcao${x}" class="opcoes-pequena">
                    <option value="">----</option>
                    <option value="">${dados[x].sabor}</option>
                </select>
            </div>
        </div>
        <div class="botao-container">
            <button class="btn-comprar">Comprar</button>
            <button class="btn-carrinho"><i class="fa fa-shopping-cart"></i></button>
        </div>`




            // 3- adicionar os demais elementos dentro de section
        }
    }
}