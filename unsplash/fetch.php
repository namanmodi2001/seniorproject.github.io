<?php 
    if(isset($_POST['input'])){
        $input = $_POST['input'];

        //DATABASE CONNECTION
        // $conn = new mysqli('localhost', 'root','','test');

        // if($conn->connect_error){
        //     die('Connection Failed : '.$conn->connection_error);
        // }else{
        //     $stmt = $conn -> prepare("insert into user_input(input,results) values (?,?)");
        //     $stmt->bind_param("ss",$input,$results);
        //     $stmt -> execute();
        //     echo "data inserted...";
        //     $stmt -> close();
        //     $conn->close();
        // }

        $conn = new mysqli('localhost', 'root', '', 'test');
        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $sql = "SELECT results FROM user_input WHERE input='$input'";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) { 
            echo $row['results'];
        }
        } else {
            echo "false";
        }
    }else{
        header("Location: index.html");
        die();
    }
?>