// Quando a página carregar, execute a função main
window.addEventListener("load", () => {
    // Obter o formulário de cadastro pelo ID
    const formCadastro = document.getElementById('formCadastro');

    // Adicionar um ouvinte de evento para o evento 'submit' do formulário
    formCadastro.addEventListener('submit', async function(event) {
        // Prevenir a ação padrão do formulário (envio)
        event.preventDefault();

        // Obter os valores dos campos de entrada
        const username = document.getElementById('username').value;
        const email=document.getElementById('email').value;
        const password = document.getElementById('password').value;
        

        try {
            // Fazer uma requisição POST para o endpoint '/api/register'
            const response = await fetch('/api/register', {
                method: 'POST', // Método HTTP
                headers: {
                    'Content-Type': 'application/json' // Tipo de conteúdo da requisição
                },
                body: JSON.stringify({ username,email, password }) // Corpo da requisição em formato JSON
            });

            // Obter o elemento para exibir a mensagem
            const mensagem = document.getElementById('mensagem');

            // Verificar se a resposta da requisição foi bem-sucedida
            if (response.ok) {
                mensagem.textContent = 'Usuário registrado com sucesso!';
                mensagem.style.color = 'green';
            } else {
                // Obter a mensagem de erro da resposta e exibi-la
                const erro = await response.text();
                mensagem.textContent = `Erro: ${erro}`;
                mensagem.style.color = 'red';
            }
        } catch (error) {
            // Exibir uma mensagem de erro em caso de falha na requisição
            const mensagem = document.getElementById('mensagem');
            mensagem.textContent = 'Erro ao registrar usuário.';
            mensagem.style.color = 'red';
        }
    });
});
