const searchBar = document.querySelector(".search input"),
searchIcon = document.querySelector(".search button"),
usersList = document.querySelector(".users-list");

// Quando o ícone de busca for clicado
searchIcon.onclick = ()=>{
  // Alterna a classe 'show' no campo de busca para exibir ou ocultá-lo
  searchBar.classList.toggle("show");

  // Alterna a classe 'active' no ícone de busca para mudar seu estado (geralmente visual)
  searchIcon.classList.toggle("active");

  // Coloca o foco automaticamente no campo de busca após o clique
  searchBar.focus();

  // Se o campo de busca tiver a classe 'active', limpa o conteúdo do campo
  if(searchBar.classList.contains("active")){
    searchBar.value = "";  // Limpa o valor do campo de busca
    searchBar.classList.remove("active");  // Remove a classe 'active'
  }
}

// Evento ativado ao digitar algo no campo de busca
searchBar.onkeyup = ()=>{
  let searchTerm = searchBar.value;  // Captura o valor digitado

  // Se houver texto no campo de busca, adiciona a classe 'active'
  if(searchTerm != ""){
    searchBar.classList.add("active");
  }else{
    searchBar.classList.remove("active");  // Remove a classe 'active' se o campo estiver vazio
  }

  // Realiza uma requisição AJAX para o servidor
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "php/search.php", true);  // Abre uma conexão POST com o servidor
  xhr.onload = ()=>{
    if(xhr.readyState === XMLHttpRequest.DONE){
        if(xhr.status === 200){
          let data = xhr.response;  // Pega a resposta do servidor
          usersList.innerHTML = data;  // Atualiza a lista de usuários com os resultados da busca
        }
    }
  }
  // Define o cabeçalho da requisição como 'application/x-www-form-urlencoded' para enviar dados de formulário
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  // Envia o termo de busca para o servidor como dado da requisição
  xhr.send("searchTerm=" + searchTerm);
}

// Intervalo que executa a cada 500ms para atualizar a lista de usuários
setInterval(() =>{
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "php/users.php", true);  // Faz uma requisição GET para obter os usuários atualizados
  xhr.onload = ()=>{
    if(xhr.readyState === XMLHttpRequest.DONE){
        if(xhr.status === 200){
          let data = xhr.response;  // Recebe os dados dos usuários
          // Se o campo de busca não estiver ativo, atualiza a lista de usuários
          if(!searchBar.classList.contains("active")){
            usersList.innerHTML = data;
          }
        }
    }
  }
  xhr.send();  // Envia a requisição
}, 500);
