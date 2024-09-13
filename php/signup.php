<?php

session_start(); // Inicia uma sessão para armazenar dados entre as requisições (como login de usuário)

include_once "config.php"; // Inclui o arquivo de configuração do banco de dados
    // Sanitiza as entradas do formulário para prevenir SQL Injection
    $fname = mysqli_real_escape_string($conn, $_POST['fname']);
    $lname = mysqli_real_escape_string($conn, $_POST['lname']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);

    if(!empty($fname) && !empty($lname) && !empty($email) && !empty($password)){
        // Checa se o email fornecido é válido
        if(filter_var($email, FILTER_VALIDATE_EMAIL)){
            // Verifica se o email já está registrado no banco de dados
            $sql = mysqli_query($conn, "SELECT email FROM users WHERE email='$email'");
            if(mysqli_num_rows($sql) > 0){
                echo $email . " Já existe";
            }else{
                // Verifica se o usuário fez upload de uma imagem
                if(isset($_FILES['image'])){
                    $img_name = $_FILES['image']['name']; // Nome da imagem enviada
                    $img_type = $_FILES['image']['type']; // Tipo da imagem (mime type)
                    $tmp_name = $_FILES['image']['tmp_name']; // Caminho temporário onde a imagem é armazenada

                    // Divide o nome do arquivo para obter a extensão (ex: jpg, png)
                    $img_explode = explode('.', $img_name);
                    $img_ext = end($img_explode); // Obtém a extensão do arquivo

                    // Extensões permitidas
                    $extensions = ['png','jpeg','jpg'];

                    // Verifica se a extensão do arquivo está entre as permitidas
                    if(in_array($img_ext, $extensions) === true){
                        $time = time(); // Gera o timestamp atual para garantir um nome único para a imagem
                        $new_img_name = $time . $img_name; // Concatena o timestamp com o nome original da imagem

                        // Move o arquivo da pasta temporária para a pasta "images/"
                        if(move_uploaded_file($tmp_name, "images/". $new_img_name)){
                            $status = "Ativo agora"; // Status padrão de usuário ao criar a conta
                            $random_id = rand(time(), 10000000); // Gera um ID único aleatório usando o timestamp

                            // Insere os dados do novo usuário no banco de dados
                            $sql2 = mysqli_query($conn, "INSERT INTO users 
                            (unique_id, fname, lname, email, password, img, status)
                            VALUES ('$random_id', '$fname', '$lname', '$email', '$password', 
                                    '$new_img_name', '$status')");
                        
                            if($sql2){
                                // Consulta para obter os dados do usuário recém-criado
                                $sql3 = mysqli_query($conn, "SELECT * FROM users WHERE email='$email'");
                                if(mysqli_num_rows($sql3) > 0){
                                    $row = mysqli_fetch_assoc($sql3); // Obtém os dados do usuário em um array associativo
                                    // Armazena o ID único do usuário na sessão
                                    $_SESSION['unique_id'] = $row['unique_id']; 
                                    echo "success";
                                }
                            }else{
                                echo "Algo deu errado!";
                            }
                        } 
                    
                    }else{
                        // Caso o arquivo não tenha uma extensão permitida
                        echo "Apenas - png, jpeg ou jpg!";
                    }
                }else{
                    echo "Por favor adicione uma Foto!";
                }
            }
        }else{
            echo $email . " Não é um email valido!";
        }
    }else{
        echo "Preencha todos os campos!";
    }
?>
