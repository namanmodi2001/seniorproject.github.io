<?php 
    if(isset($_POST['input'])&&isset($_POST['results'])){
        $input = $_POST['input'];
        $results = $_POST['results'];

        //DATABASE CONNECTION
     $conn = new mysqli('localhost', 'root','','test');
     //$conn = new mysqli('sql9.freemysqlhosting.net','sql9536274','C8JnzdAdJi','sql9536274');

     
        if($conn->connect_error){
            die('Connection Failed : '.$conn->connection_error);
        }else{
            $stmt = $conn -> prepare("insert into user_input(input,results) values (?,?)");
            $stmt->bind_param("ss",$input,$results);
            $stmt -> execute();
            echo "Results stored in the Database!";
            $stmt -> close();
            $conn->close();
        }
    }else{
        header("Location: index.html");
        die();
    }
?>