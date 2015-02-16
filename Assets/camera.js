var controller : GameObject;
static var speed : int;
var movingPlane : GameObject;
var controllerScript : Component;

var currentLane : int;
var aimLane : int;

function Start () {
	speed = 140;
	currentLane = 1;
	aimLane = currentLane;
	controllerScript = controller.GetComponent('controller');
	transform.position = Vector3(30,40,20);

	send(["coin", 0, false, 28.40]); //Test
}

function Update () {
	//Moving forward
	if (controllerScript.playing) {
		movingPlane.transform.Translate (Vector3(0,0,-1) * Time.deltaTime*speed);
		
		if(aimLane == currentLane) {
			if (Input.GetKey (KeyCode.LeftArrow) && currentLane > 0) aimLane = currentLane - 1;
			if (Input.GetKey (KeyCode.RightArrow) && currentLane < controllerScript.numberOfLanes - 1) aimLane = currentLane + 1;
		}
		else if(transform.position.x == controllerScript.leftLanePosition + controllerScript.laneWidth*aimLane) {
			currentLane = aimLane;
		}
		else {
			transform.position = Vector3.MoveTowards(transform.position, Vector3(controllerScript.leftLanePosition + aimLane*controllerScript.laneWidth,transform.position.y,transform.position.z),   speed*Time.deltaTime);
		}
	}

}

function send(data){  //Put this here for now

	var form = new WWWForm();

	form.AddField("typeOfObject", data[0]);
	form.AddField("lane", data[1]);
	form.AddField("checkCollection", data[2]);
	form.AddField("time", data[3]);
	
	var url = "http://localhost/unity/storeData.php";
	var w = WWW(url, form);

    yield w;

    if(w.error)
    {
        Debug.Log(w.error);
    }
    else
    {
        Debug.Log(w.text);
        Debug.Log("Data has been sent to mysql");
    }

}





 
