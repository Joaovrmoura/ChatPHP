// Seleciona o campo de senha (input do tipo 'password') e o ícone de alternância (i) dentro do formulário
const pswrdField = document.querySelector(".form input[type='password']"), // Campo de entrada de senha
toggleIcon = document.querySelector(".form .field i"); // Ícone de alternar visibilidade da senha

// Adiciona um evento de clique no ícone de alternância
toggleIcon.onclick = () => {
  // Se o campo de senha estiver no modo 'password' (oculto)
  if(pswrdField.type === "password"){
    pswrdField.type = "text"; // Muda o tipo do campo para 'text' (mostra a senha)
    toggleIcon.classList.add("active"); // Adiciona uma classe 'active' ao ícone para indicar que a senha está visível
  } else {
    // Se o campo estiver no modo 'text' (visível)
    pswrdField.type = "password"; // Muda o tipo do campo para 'password' (esconde a senha)
    toggleIcon.classList.remove("active"); // Remove a classe 'active' do ícone para indicar que a senha está oculta
  }
}
