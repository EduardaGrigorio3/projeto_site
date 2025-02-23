window.addEventListener("load", () => {
const mensagem = document.getElementById('mensagem');

// Verifica se o formulário de cadastro está na página antes de adicionar o evento
const formCadastro = document.getElementById('formCadastro');
if (formCadastro) {
    formCadastro.addEventListener('submit', async function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('password2').value;
        // Verifica se as senhas coincidem
        if (password !== confirmPassword) {
            mensagem.textContent = 'As senhas não coincidem!';
            mensagem.style.color = 'red';
            return;
        }

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password })
            });

            if (response.ok) {
                mensagem.textContent = 'Usuário registrado com sucesso!';
                mensagem.style.color = 'green';
            } else {
                const erro = await response.json();
                mensagem.textContent = `${erro.error}`;
                mensagem.style.color = 'red';
            }
        } catch (error) {
            mensagem.textContent = 'Erro ao registrar usuário.';
            mensagem.style.color = 'red';
        }
    });
}

// Verifica se o formulário de login está na página antes de adicionar o evento
const formLogin = document.getElementById('formLogin');
if (formLogin) {
    formLogin.addEventListener('submit', async function(event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                mensagem.textContent = 'Login efetuado com sucesso!';
                mensagem.style.color = 'green';
            } else {
                const erro = await response.json();
                mensagem.textContent = `${erro.error}`;
                mensagem.style.color = 'red';
            }
        } catch (error) {
            mensagem.textContent = 'Erro ao efetuar login.';
            mensagem.style.color = 'red';
        }
    });
}
});