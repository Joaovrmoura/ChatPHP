// Seleciona o formulário da área de digitação, o ID do usuário que está recebendo a mensagem, o campo de entrada, o botão de enviar e a caixa de chat
const form = document.querySelector(".typing-area"),
incoming_id = form.querySelector(".incoming_id").value, // Obtém o valor do ID do usuário que receberá a mensagem
inputField = form.querySelector(".input-field"), // Campo de entrada de texto (onde o usuário digita a mensagem)
sendBtn = form.querySelector("button"), // Botão de enviar mensagem
chatBox = document.querySelector(".chat-box"); // Caixa de chat onde as mensagens serão exibidas

// Impede o comportamento padrão do formulário (evita o recarregamento da página)
form.onsubmit = (e) => {
    e.preventDefault(); // Cancela o comportamento padrão de envio do formulário
}

// Coloca o foco automaticamente no campo de entrada de texto ao carregar a página
inputField.focus(); 

// Adiciona um evento de verificação ao soltar uma tecla (keyup) no campo de entrada
inputField.onkeyup = () => {
    // Se o campo de entrada não estiver vazio, ativa o botão de enviar
    if(inputField.value != ""){
        sendBtn.classList.add("active");
    } else {
        // Se o campo estiver vazio, desativa o botão de enviar
        sendBtn.classList.remove("active");
    }
}

// Quando o botão de enviar é clicado
sendBtn.onclick = () => {
    let xhr = new XMLHttpRequest(); // Cria um novo objeto XMLHttpRequest para enviar dados via AJAX
    xhr.open("POST", "php/insert-chat.php", true); // Configura a requisição POST para o arquivo 'insert-chat.php'
    
    // Define o que acontece quando a requisição estiver carregada
    xhr.onload = () => {
        // Verifica se a requisição foi completamente processada
        if(xhr.readyState === XMLHttpRequest.DONE){
            // Se o status for 200 (sucesso)
            if(xhr.status === 200){
                inputField.value = ""; // Limpa o campo de entrada após o envio da mensagem
                scrollToBottom(); // Faz a rolagem para a parte inferior da caixa de chat
            }
        }
    }

    // Cria um objeto FormData com os dados do formulário para enviar ao servidor
    let formData = new FormData(form);
    xhr.send(formData); // Envia os dados via AJAX
}

// Evento disparado quando o mouse entra na área da caixa de chat
chatBox.onmouseenter = () => {
    chatBox.classList.add("active"); // Adiciona a classe 'active' quando o mouse está sobre a caixa de chat
}

// Evento disparado quando o mouse sai da área da caixa de chat
chatBox.onmouseleave = () => {
    chatBox.classList.remove("active"); // Remove a classe 'active' quando o mouse sai da caixa de chat
}

// Atualiza o conteúdo da caixa de chat a cada 500 milissegundos (meio segundo)
setInterval(() => {
    let xhr = new XMLHttpRequest(); // Cria uma nova requisição AJAX
    xhr.open("POST", "php/get-chat.php", true); // Configura a requisição POST para o arquivo 'get-chat.php'
    
    // Define o que acontece quando a requisição estiver carregada
    xhr.onload = () => {
        // Verifica se a requisição foi completamente processada
        if(xhr.readyState === XMLHttpRequest.DONE){
            // Se o status for 200 (sucesso)
            if(xhr.status === 200){
                let data = xhr.response; // Recebe a resposta do servidor
                chatBox.innerHTML = data; // Atualiza a caixa de chat com as mensagens recebidas
                // Se a caixa de chat não estiver ativa (com o mouse sobre ela), rola para o final automaticamente
                if(!chatBox.classList.contains("active")){
                    scrollToBottom();
                }
            }
        }
    }

    // Define o tipo de conteúdo da requisição e envia o ID do usuário que recebe a mensagem
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("incoming_id=" + incoming_id); // Envia o ID do destinatário via AJAX
}, 500); // Intervalo de meio segundo para atualização do chat

// Função que rola a caixa de chat para o final (última mensagem)
function scrollToBottom(){
    chatBox.scrollTop = chatBox.scrollHeight; // Define a rolagem no ponto mais baixo da caixa de chat
}
