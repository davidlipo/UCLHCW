<?php
    $sql_connect = new mysqli("localhost", "root", "") or die ("no DB Connection");
    mysqli_select_db($sql_connect, "uclvr") or die ("DB not found"); 

    $patientID = $_POST['patientID'];
    $level = $_POST['level'];
    $time = $date = date('Y-m-d H:i:s', time());
    
    mysqli_query($sql_connect, "INSERT INTO attempts (patientID, level, time) VALUES ('$patientID', '$level', '$time');");

    echo mysqli_insert_id($sql_connect);

    mysqli_close($sql_connect);
?>



