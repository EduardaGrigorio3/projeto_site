window.addEventListener("load", main);

async function main() {
    // 1- Requisitar o backend para obter os dados que serão apresentados em tela
    const requisicao = await fetch("http://localhost:55555/api/produtos");
    const dados = await requisicao.json();
    
    const produtosBolo = document.getElementById("produtos-bolo");
    const produtosCaixinha = document.getElementById("produtos-caixinha");
    const produtosBiscoito = document.getElementById("produtos-biscoito");

    for (let x = 0; x < dados.length; x++) {
        let sabores = dados[x].sabor ? dados[x].sabor.split(",") : [];

        let produtoHTML = `
        <div class="produto">
            <div class="imagem-container"> 
                <input type="checkbox" id="coracao${x}" class="coracao-checkbox">
                <label for="coracao${x}" class="btn-coracao">&#9829;</label> 
                <img src="${dados[x].img}" alt="${dados[x].nome}"> 
            </div>
            <div class="nome-e-preco-container">
                <h3>${dados[x].nome}</h3>
                <h3>R$${dados[x].preco.toFixed(2).replace('.', ',')}</h3>
            </div>
            <div class="quantidade-e-opcoes-container">
                <div class="quantidade-container">
                    <label for="quantidade${x}">${dados[x].unidade}</label> 
                    <input type="number" id="quantidade${x}" min="1" step="1" value="1" class="quantidade">
                </div>
                <div class="opcoesSabores-container">
                    <label for="opcao${x}">Sabores:</label>
                    <select id="opcao${x}" class="opcoesSabores">
                        
                        ${sabores.map(sabor => `<option value="${sabor}">${sabor}</option>`).join('')}
                    </select>
                </div>
            </div>
            <div class="botao-container">
                <button class="btn-comprar">Comprar</button>
                <button class="btn-carrinho" data-id="${x}" data-nome="${dados[x].nome}" data-preco="${dados[x].preco}" data-img="${dados[x].img}" data-quantidade="quantidade${x}" data-sabor="opcao${x}">
                    <i class="fa fa-shopping-cart"></i>
                </button>
            </div>
        </div>`;

        if (dados[x].tipo === "bolo") {
            produtosBolo.innerHTML += produtoHTML;
        } else if (dados[x].tipo === "caixinha") {
            produtosCaixinha.innerHTML += produtoHTML;
        } else {
            produtosBiscoito.innerHTML += produtoHTML;
        }
    }
    
    // Adicionar evento de clique para os botões de carrinho
    const carrinhoBotoes = document.querySelectorAll(".btn-carrinho");
    carrinhoBotoes.forEach(botao => {
        botao.addEventListener("click", function() {
            const produtoId = this.getAttribute("data-id");
            const nome = this.getAttribute("data-nome");
            const preco = parseFloat(this.getAttribute("data-preco"));
            const img = this.getAttribute("data-img");
            const quantidadeInputId = this.getAttribute("data-quantidade");
            const saborSelectId = this.getAttribute("data-sabor");
            const quantidade = parseInt(document.getElementById(quantidadeInputId).value);
            const sabor = document.getElementById(saborSelectId).value;

            if (sabor === "") {
                alert("Por favor, selecione um sabor antes de adicionar ao carrinho.");
                return;
            }

            adicionarAoCarrinho(produtoId, nome, preco, img, sabor, quantidade);
        });
    });
}

function adicionarAoCarrinho(produtoId, nome, preco, img, sabor, quantidade) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    // Verifica se já existe um item com o mesmo ID e sabor
    let itemExistente = carrinho.find(item => item.id === produtoId && item.sabor === sabor);

    if (itemExistente) {
        // Se já existir com o mesmo sabor, apenas aumentar a quantidade
        itemExistente.quantidade += quantidade;
    } else {
        // Se for um sabor diferente, adicionar como novo item no carrinho
        carrinho.push({
            id: produtoId,
            nome: nome,
            preco: preco,
            img: img,
            quantidade: quantidade,
            sabor: sabor
        });
    }

    console.log(carrinho); // Debug para ver se está separando os sabores corretamente
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    atualizarCarrinho();
}

function atualizarCarrinho() {
    // Lógica para atualizar a exibição do carrinho
    console.log("Carrinho atualizado.");
}
