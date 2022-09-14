<?php

  $servername = "localhost";
  $username = "emiliajj_user1";
  $password = "0#L,su?ni5hI";
  $dbname="emiliajj_db1";


  $conn = new mysqli($servername, $username, $password, $dbname); // Create connection
  if ($conn->connect_error) {     // Check connection
      die("Connection failed: " . $conn->connect_error);
  } 
  
  $word = mysqli_real_escape_string($conn, $_POST['word']);
  
  $sql = "INSERT INTO collector (word)
  VALUES ('$word')";
  
  if ($conn->query($sql) === TRUE) {
      echo "Data saved!";
  } else {
      echo "Error: " . $sql . "<br>" . $conn->error;
  }
  $conn->close();


?>