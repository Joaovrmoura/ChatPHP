<?php

    session_start();
    include_once "config.php";
    
    $outgoing_id = $_SESSION['unique_id'];
    $sql = mysqli_query($conn, "SELECT * FROM users"); // Consulta para obter todos os usuários
    $output = "";

    // Verifica se a consulta retornou algum resultado
    if(mysqli_num_rows($sql) == 0){ // Checa se o número de linhas retornadas é 0
        $output = "Nenhum Usuário disponível";
    }else{
        include "data.php";
    }

    echo $output; // Exibe o conteúdo gerado

?>
