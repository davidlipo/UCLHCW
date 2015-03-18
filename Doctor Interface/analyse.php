<!DOCTYPE html>
<html>

    <script>       
        function checkTextField(field) {
            if (field.value == '') {
                alert("One of the fields is empty");
            }
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
        
        <div id="formContainer" class="formContainer clearfix">
            <form id= "form" method="post" action="bargraph.php">
                <center>Patient ID:</center>
                <input type="text" id="editBox" name="patientID" autofocus="autofocus" onblur="checkTextField(this);">
                <br>
                <center>Attempt ID:</center>
                <input type="text" id="editBox" name="attemptID" onblur="checkTextField(this);">
                <br>
                <center>Left Level:</center>
                <select name="leftLevel" id="dropdown">
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
                <center>Right Level:</center>
                <select name="rightLevel" id="dropdown"> 
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
                <center>Object Type:</center>
                <select name="type" id="dropdown"> 
                    <option value="coin">Coin</option>
                    <option value="wall">Wall</option>
                </select>
                <br>
                <center>Graph Type:</center>
                <select name="graph" id="dropdown"> 
                    <option value="indAtt">Individual Attempt graph</option>
                </select> 
                <input id="smallButton" type="submit" value="Submit">
            </form>

        </div>

            <input id="input" type="button" value="Main menu" onclick="location='home.html'"></input>
    </div>
    </body>
</html>