window.addEventListener("load", main);

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
                    <p id="unitario${index}"> Valor unitário: R$${(item.preco).toFixed(2).replace('.', ',')}</p>
               
                    <p id="totalItem${index}">  R$${(item.preco * item.quantidade).toFixed(2).replace('.', ',')}</p>
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

function alterarQuantidade(index, quantidade) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    const subtotalElem = document.getElementById("subtotal");
    const totalElem = document.getElementById("total");

    if (carrinho[index]) {
        carrinho[index].quantidade += quantidade;

        if (carrinho[index].quantidade <= 0) {
            carrinho.splice(index, 1);
        } else {
            document.getElementById(`quantidade${index}`).textContent = carrinho[index].quantidade;
            document.getElementById(`totalItem${index}`).textContent = `R$${(carrinho[index].preco * carrinho[index].quantidade).toFixed(2).replace('.', ',')}`;
        }

        let total = carrinho.reduce((sum, item) => sum + item.preco * item.quantidade, 0);
        subtotalElem.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
        totalElem.textContent = `R$ ${(total + 5).toFixed(2).replace('.', ',')}`;

        localStorage.setItem("carrinho", JSON.stringify(carrinho));
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
                        <button class="btn-diminuir" onclick="alterarQuantidade(${index}, -1)">−</button>
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

