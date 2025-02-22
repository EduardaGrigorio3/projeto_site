window.addEventListener("load", () => {
    const mensagem = document.getElementById('mensagem');
    formLogin.addEventListener("submit", async function (event) {
        event.preventDefault();
  // Login de usuário
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

                const result = await response.json();

                if (response.ok) {
                    mensagem.textContent = 'Login efetuado com sucesso!';
                    mensagem.style.color = 'green';
                } else {
                    mensagem.textContent = result.error || "Erro ao efetuar login.";
                    mensagem.style.color = 'red';
                }
            } catch (error) {
                mensagem.textContent = 'Erro ao efetuar login.';
                mensagem.style.color = 'red';
            }
        });
    }});});