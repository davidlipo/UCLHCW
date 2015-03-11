var controller : GameObject;
static var speed : int;
var controllerScript : Component;

var currentLane : int;
var aimLane : int;
var wobble : float = -0.03;

function Start () {
	speed = 100;
	controllerScript = controller.GetComponent('Controller');
	currentLane = 1;
	aimLane = currentLane;
//	audio.loop = true;
//	audio.Clip = controllerScript.wagonSound;
//	audio.Play();
}

function Update () {
	//Moving forward
	if (controllerScript.playing) {
	    wobble = -wobble;
		transform.Translate (Vector3(0,wobble,1) * Time.deltaTime*speed);
		
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
 
