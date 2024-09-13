<?php

    session_start(); // Inicia uma sessão para armazenar dados entre as requisições (como login de usuário)

    include_once "config.php"; // Inclui o arquivo de configuração do banco de dados

    // Sanitiza as entradas do formulário para prevenir SQL Injection
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);

    if(!empty($email) && !empty($password)){
        $sql =  mysqli_query($conn, "SELECT * FROM users WHERE email='$email' AND password= '$password'");   
        if(mysqli_num_rows($sql) > 0){
            $row = mysqli_fetch_assoc($sql);
            $_SESSION['unique_id'] = $row['unique_id']; 
            echo "success";

        }else{
            echo "Email ou Senha Incorretos!";
        }
    }else{
        echo "Preencha todos os campos!";
    }

?>