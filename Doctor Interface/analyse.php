<!DOCTYPE html>
<html>

    <script>
        function addOptions(x){
            var select = document.getElementById('dropdown');
            select.options[select.options.length] = new Option(x, x);   
        }
    
    </script>
    
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
		
		<img src="bargraph.php">
        
        <div id="formContainer" class="formContainer clearfix">
            <form id= "form">
                Patient ID:<br>
                <input type="text" name="patientID">
                <input id="smallButton" type="Submit" value="Find">
            </form>
            <?php
                if(isset($_POST['submit'])){ 
                    $PatientID=$_POST['patientID']; 
                    $sql_connect = new mysqli("localhost", "root", "") or die ("no DB Connection");
                    mysqli_select_db($sql_connect, "uclvr") or die ("DB not found"); 
                    $sql="SELECT level WHERE patientID=$PatientID FROM attempts";
                    $result=mysql_query($sql);
                    while($row=mysql_fetch_array($result)){ 
                        runlist($row['level'];
                    }
            ?>
        </div>
        
        <div id="formContainer" class="formContainer clearfix">
            <select name="levels" id="dropdown"> 
            </select>    
        </div>
        
        <a href="home.html">
            <input id="input" type="button" value="Main menu"></input>
        </a>
    </div>
    </body>
</html>