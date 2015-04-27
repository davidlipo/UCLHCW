<!DOCTYPE html>

<?php
    $patientID = $_POST["patientID"];
    $link = mysqli_connect("localhost", "root", "", "uclvr");
    $query = mysqli_query($link, "SELECT levelRight FROM attempts WHERE patientID = '$patientID' GROUP BY levelRight ORDER BY levelRight DESC");
    
    $levels = array();
    $i = 0;
    while($res = mysqli_fetch_assoc($query)){
        $levels[$i] = $res['levelRight'];
        $i = $i+1;
    }

?>

<html>
    
    <head>
	<link rel="stylesheet" href="boilerplate.css">
	<link rel="stylesheet" href="analyse.css">
	<meta charset="utf-8">
	<meta name="viewport" content="initial-scale = 1.0,maximum-scale = 1.0">
    </head>
    
    <body>
    <div id="primaryContainer" class="primaryContainer clearfix">
        <img id="image" src="img/uclh.png" class="image" />
        <img id="image1" src="img/uclh%20(1).png" class="image" />
        
        <div id="formContainer" class="formContainer clearfix">
            <form id= "form" name="mainForm" method="post" action="indProgRGraph.php">
                <center>Patient ID:</center>
                <input type="text" id="editBox" name="patientID" readonly="readonly" style="background-color: #E0E0E0">
                <script>
                    var patientID = <?php echo json_encode($patientID); ?>;
                    document.getElementById("form").patientID.value = patientID;
                </script>
                <br>
                <center>Right Level:</center>
                <select name="rightLevel" id="dropdown1">
                </select> 
                <script>
                    var select = document.getElementById("dropdown1");
                    var x = <?php echo json_encode($i); ?>;
                    var i = 0;
                    var levels = <?php echo json_encode($levels); ?>;
                    while(i<x){
                        select.options[select.options.length] = new Option(levels[i], levels[i]);
                        i = i + 1;
                    }
                </script>
                <br>
                <center>Object Type:</center>
                <select name="type" id="dropdown"> 
                    <option value="coin">Coin</option>
                </select>
                <input id="smallButton" type="submit" value="Submit">
            </form>

        </div>

            <input id="input" type="button" value="Back" onclick="location='home.html'"></input>
    </div>
    </body>
</html>