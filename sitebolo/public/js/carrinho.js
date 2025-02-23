window.addEventListener("load", main);

window.addEventListener("load", function () {
    atualizarContadorCarrinho();
});

function atualizarContadorCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || []; 
    const contador = document.querySelector(".circulo-contador");

    let quantidadeTotal = 0;
   
    carrinho.forEach(item => {
        quantidadeTotal += item.quantidade; 
    });

    contador.textContent = quantidadeTotal;
    
    if (quantidadeTotal === 0) {
        contador.style.display = "none"; 
    } else {
        contador.style.display = "inline-block"; 
    }
}

function main() {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    const carrinhoContainer = document.getElementById("carrinho-produtos");
    const subtotalElem = document.getElementById("subtotal");
    const totalElem = document.getElementById("total");

    if (!carrinhoContainer) {
        console.error("Contêiner do carrinho não encontrado.");
        return;
    }

    if (carrinho.length === 0) {
        carrinhoContainer.innerHTML = "<p>Seu carrinho está vazio.</p>";
    } else {
        let total = 0;

        carrinho.forEach((item, index) => {
            const produtoDiv = document.createElement("div");
            produtoDiv.classList.add("produto");

            produtoDiv.innerHTML = `
                <div class="coluna">
                    <img src="${item.img}" alt="${item.nome}">
                    <p>${item.nome}</p>
                </div>
                <div class="coluna">
                    <p>${item.sabor}</p>
                </div>
                <div class="coluna">    
                    <div class="botao-quantidade-produto">
                        <button class="btn-diminuir" onclick="alterarQuantidade(${index}, -1)">−</button>
                        <span id="quantidade${index}">${item.quantidade}</span>
                        <button class="btn-aumentar" onclick="alterarQuantidade(${index}, 1)">+</button>
                    </div>
                </div>
                <div class="coluna">
                          
                    <p id="totalItem${index}"> R$${(item.preco * item.quantidade).toFixed(2).replace('.', ',')}</p>
                </div>
                <div class="coluna">
                    <button class="remover-produto" onclick="removerDoCarrinho(${index})">Excluir produto</button>
                </div>
            `;

            carrinhoContainer.appendChild(produtoDiv);

            total += item.preco * item.quantidade;
        });

        subtotalElem.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
        totalElem.textContent = `R$ ${(total + 5).toFixed(2).replace('.', ',')}`;
    }

    atualizarContadorCarrinho()
}

function alterarQuantidade(index, quantidade) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    const subtotalElem = document.getElementById("subtotal");
    const totalElem = document.getElementById("total");

    if (carrinho[index]) {
        carrinho[index].quantidade += quantidade;

        if (carrinho[index].quantidade < 1) {
            carrinho[index].quantidade = 1
        } else {
            document.getElementById(`quantidade${index}`).textContent = carrinho[index].quantidade;
            document.getElementById(`totalItem${index}`).textContent = `R$${(carrinho[index].preco * carrinho[index].quantidade).toFixed(2).replace('.', ',')}`;
        }

        let total = carrinho.reduce((sum, item) => sum + item.preco * item.quantidade, 0);
        subtotalElem.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
        totalElem.textContent = `R$ ${(total + 5).toFixed(2).replace('.', ',')}`;

        // Atualiza o localStorage
        localStorage.setItem("carrinho", JSON.stringify(carrinho));

        // Atualiza a interface do carrinho
        renderizarCarrinho();
    }
}

function removerDoCarrinho(index) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    const subtotalElem = document.getElementById("subtotal");
    const totalElem = document.getElementById("total");

    if (carrinho.length > 0) {
        carrinho.splice(index, 1); // Remove apenas o item no índice especificado

        let total = carrinho.reduce((sum, item) => sum + item.preco * item.quantidade, 0);
        subtotalElem.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
        totalElem.textContent = `R$ ${(total + 5).toFixed(2).replace('.', ',')}`;

        localStorage.setItem("carrinho", JSON.stringify(carrinho));

        // Re-renderiza os produtos no carrinho sem recarregar a página
        renderizarCarrinho();
    }

    atualizarContadorCarrinho()
}

function renderizarCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    const carrinhoContainer = document.getElementById("carrinho-produtos");
    const subtotalElem = document.getElementById("subtotal");
    const totalElem = document.getElementById("total");

    carrinhoContainer.innerHTML = "";
    if (carrinho.length === 0) {
        carrinhoContainer.innerHTML = "<p>Seu carrinho está vazio.</p>";
        subtotalElem.textContent = "R$ 0,00";
        totalElem.textContent = "R$ 5,00";
    } else {
        let total = 0;

        carrinho.forEach((item, index) => {
            const produtoDiv = document.createElement("div");
            produtoDiv.classList.add("produto");

            produtoDiv.innerHTML = `
                <div class="coluna">
                    <img src="${item.img}" alt="${item.nome}">
                    <p>${item.nome}</p>
                </div>
                <div class="coluna">
                    <p>${item.sabor}</p>
                </div>
                <div class="coluna">
                    <div class="botao-quantidade-produto">
                        <button class="btn-diminuir" onclick="alterarQuantidade(${index}, -1)"${item.quantidade === 1 ? "disabled" : ""}>−</button>
                        <span id="quantidade${index}">${item.quantidade}</span>
                        <button class="btn-aumentar" onclick="alterarQuantidade(${index}, 1)">+</button>
                    </div>
                </div>
                <div class="coluna">
                    <p id="totalItem${index}">R$${(item.preco * item.quantidade).toFixed(2).replace('.', ',')}</p>
                </div>
                <div class="coluna">
                    <button class="remover-produto" onclick="removerDoCarrinho(${index})">Excluir produto</button>
                </div>
            `;

            carrinhoContainer.appendChild(produtoDiv);

            total += item.preco * item.quantidade;
        });

        subtotalElem.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
        totalElem.textContent = `R$ ${(total + 5).toFixed(2).replace('.', ',')}`;
    }

}

