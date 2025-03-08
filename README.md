# System.out.Println("Olá, Dev!");

## 🍰 Site de Bolo de Rolo

O projeto foi desenvolvido para a disciplina de **Desenvolvimento Web**. Criamos um site para apresentar os produtos, dicas e informações sobre um negócio de venda de bolo de rolo.

---

## 🚀 Tecnologias Utilizadas
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js com Express
- **Banco de Dados:** SQLite

---

## 📌 Funcionalidades
✔️ Página Inicial  
✔️ Quem Somos  
✔️ Produtos  
✔️ Dicas  
✔️ Contato  
✔️ Clientes  
✔️ Carrinho de Compras  
✔️ Tela de Login e Cadastro  

---

## 💾 Banco de Dados
- Os **produtos** são salvos no banco de dados SQLite localmente e permanecem mesmo se o código for apagado e baixado novamente.
- Os **usuários** podem ser apagados caso a pasta do banco de dados seja deletada.

---

## ⚡ Como Rodar o Projeto

### 1️⃣ Clonar o repositório:
```sh
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

### 2️⃣ Instalar dependências:
```sh
npm i // vai baixar a pasta node_modules
npm run db:table // vai criar as tabelas
npm run db:seed // adiciona as informações das tabelas
```

### 3️⃣ Rodar a porta do servidor:
```sh
node index.js // vai rodar na porta 55555
```

### 4️⃣ No navegador:
```sh
http://localhost:55555/paginaInicial.html
```

---
OBS: Precisa ter baixado no PC ou notbook as dependências de desenvolvimento:
- npm i express
- npm i sqlite3 sqlite
- Baixar a extensão sqlite no vsCode
---
