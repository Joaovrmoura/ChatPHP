<?php
    session_start();  // Certifique-se de iniciar a sessão
    
    // Verifica se o usuário está logado
    if(isset($_SESSION['unique_id'])){
        include_once "config.php";
        
        // Escapa os dados vindos do formulário para prevenir injeção de SQL
        $outgoing_id = mysqli_real_escape_string($conn, $_POST['outgoing_id']);
        $incoming_id = mysqli_real_escape_string($conn, $_POST['incoming_id']);
        $message = mysqli_real_escape_string($conn, $_POST['message']);

        // Se a mensagem não estiver vazia
        if(!empty($message)){
            // Insere a mensagem no banco de dados
            $sql = mysqli_query($conn, "INSERT INTO messages (incoming_msg_id, outgoing_msg_id, msg) 
                                        VALUES ('$incoming_id', '$outgoing_id', '$message')")
                                        or die(mysqli_error($conn)); // Mostra um erro em caso de falha
        }
    } else {
        // Redireciona o usuário para a página de login se ele não estiver logado
        header("Location: ../login.php");
    }
?>
