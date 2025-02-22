window.addEventListener("load", () => {
    const mensagem = document.getElementById('mensagem');

    // Cadastro de usuário
    formCadastro.addEventListener("submit", async function (event) {
        event.preventDefault();

    
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value.toLowerCase(); // Normaliza email
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("password2").value;
    
        if (password !== confirmPassword) {
            mensagem.textContent = "As senhas não coincidem!";
            mensagem.style.color = "red";
            return;
        }
    
        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password }),
            });
    
            console.log("🟢 Requisição enviada para /api/register");
    
            if (response.ok) {
                mensagem.textContent = "Usuário registrado com sucesso!";
                mensagem.style.color = "green";
            } else {
                const erro = await response.json();
                mensagem.textContent = erro.error;
                mensagem.style.color = "red";
            }
        } catch (error) {
            mensagem.textContent = "Erro ao registrar usuário.";
            mensagem.style.color = "red";
        }
    });
    

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
    }
});
