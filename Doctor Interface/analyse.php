<!DOCTYPE html>
<html>

    <script>
//        function addOptions(x){
//          var select = document.getElementById('dropdown');
//          select.options[select.options.length] = new Option(x, x);
//            
//            var y = document.getElementById("dropdown");
//            var option = document.createElement("option");
//            option.text = x;
//            y.add(option);
//        }
    
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

        <img STYLE="position:absolute; TOP:20%; LEFT:25%; WIDTH:30%; HEIGHT:30%" src="bargraph.php" >
        <img STYLE="position:absolute; TOP:20%; LEFT:60%; WIDTH:30%; HEIGHT:30%" src="bargraph.php" >
        
        <div id="formContainer" class="formContainer clearfix"->
            <form id= "form">
                Patient ID:<br>
                <input type="text" name="patientID">
                <input id="smallButton" type="button" value="Find">
                <br>
                <label for="left level">Left Level</label>
                <select name="levels" id="dropdown">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select> 
                <br>
                <label for="right level">Right Level</label>
                <select name="levels" id="dropdown"> 
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>   
            </form>
           <?php
//                if(isset($_POST['submit'])){ 
//                    if(isset($_GET['go'])){
//                    $PatientID=$_POST['patientID']; 
//                    $sql_connect = new mysqli("localhost", "root", "") or die ("no DB Connection");
//                    mysqli_select_db($sql_connect, "uclvr") or die ("DB not found"); 
//                    $sql="SELECT level WHERE patientID=$PatientID FROM attempts";
//                    $result=mysql_query($sql);
//                    while($row=mysql_fetch_array($result)){ 
//                        $level=$row['level'];
//                        addOptions($level);
//                    }
//                    }
//                }
            ?>
        </div>

        <a href="home.html">
            <input id="input" type="button" value="Main menu"></input>
        </a>
    </div>
    </body>
</html>