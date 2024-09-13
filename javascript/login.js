// Seleciona o formulário da página de login, o botão de continuar e o campo de texto para exibir erros
const form = document.querySelector(".login form"),
continueBtn = form.querySelector(".button input"), // Botão de envio (input dentro da classe .button)
errorText = form.querySelector(".error-text"); // Campo de texto que mostrará erros ao usuário

// Previne o comportamento padrão de envio do formulário (recarregar a página ao submeter)
form.onsubmit = (e) => {
    e.preventDefault(); // Cancela o comportamento de envio padrão do formulário
}

// Adiciona um evento de clique ao botão de continuar
continueBtn.onclick = () => {
    let xhr = new XMLHttpRequest(); // Cria um novo objeto para fazer requisição assíncrona (AJAX)
    xhr.open("POST", "php/login.php", true); // Abre a requisição POST para o arquivo 'login.php'
    
    // Função que será executada quando a requisição estiver carregada
    xhr.onload = () => {
        // Verifica se a requisição foi completamente finalizada
        if(xhr.readyState === XMLHttpRequest.DONE){
            // Verifica se o status da requisição é 200 (sucesso)
            if(xhr.status === 200){
                let data = xhr.response; // Obtém a resposta do servidor
                
                // Se a resposta for "success", redireciona o usuário para a página 'users.php'
                if(data === "success"){
                    location.href = "users.php";
                }else{
                    // Se a resposta não for "success", exibe a mensagem de erro
                    errorText.style.display = "block"; // Exibe o elemento de erro
                    errorText.textContent = data; // Exibe a mensagem de erro recebida do servidor
                }
            }
        }
    }
    
    // Cria um objeto FormData contendo todos os dados do formulário
    let formData = new FormData(form);
    xhr.send(formData); // Envia os dados do formulário via AJAX para o servidor
}
