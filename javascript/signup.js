// Seleciona o formulário na página com a classe 'signup'
const form = document.querySelector(".signup form"), 
continueBtn = form.querySelector(".button input"), // Seleciona o botão de continuar dentro do formulário
errorText = form.querySelector(".error-text"); // Seleciona o campo que exibirá mensagens de erro

// Impede o comportamento padrão do envio do formulário (recarregar a página ao submeter)
form.onsubmit = (e) => {
    e.preventDefault();
}

// Adiciona um evento ao clique do botão de continuar
continueBtn.onclick = () => {
    let xhr = new XMLHttpRequest(); // Cria um novo objeto XMLHttpRequest para requisição assíncrona
    xhr.open("POST", "php/signup.php", true); // Configura a requisição para o arquivo PHP com o método POST
    xhr.onload = () => {
        // Verifica se a requisição está completa
        if(xhr.readyState === XMLHttpRequest.DONE){
            // Verifica se o status da requisição é 200 (sucesso)
            if(xhr.status === 200){
                let data = xhr.response; // Recebe a resposta do servidor
                // Se a resposta for "success", redireciona para a página 'users.php'
                if(data === "success"){
                    location.href = "users.php"; 
                } else {
                    // Caso contrário, exibe a mensagem de erro na tela
                    errorText.style.display = "block"; 
                    errorText.textContent = data; // Define o texto do erro com a mensagem retornada
                }
            }
        }
    }
    // Cria um objeto FormData com os dados do formulário
    let formData = new FormData(form); 
    xhr.send(formData); // Envia os dados do formulário para o servidor
}
