<?php
    $sql_connect = new mysqli("localhost", "root", "") or die ("no DB Connection");
    mysqli_select_db($sql_connect, "uclvr") or die ("DB not found"); 

    $attemptId = 1;
    
    $objectType = $_POST['typeOfObject'];
    $lane = $_POST['lane'];
    $collection = $_POST['checkCollection'];
    $time = $_POST['time'];
    
   
    if (isset($_POST['typeOfObject']) and isset($_POST['lane']) and isset($_POST['checkCollection']) and isset($_POST['time'])){
        mysqli_query($sql_connect, "INSERT INTO patientstats (attemptID, type, laneNo, collected, timetaken) VALUES ('$attemptId', '$objectType', '$lane', '$collection', '$time');");
    }

    mysqli_close($sql_connect);
?>



