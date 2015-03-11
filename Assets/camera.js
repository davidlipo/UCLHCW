var controller : GameObject;
var speed : int;
var movingPlane : GameObject;
var controllerScript : Component;
var currentLane : int;
var aimLane : int;

var leftLanePosition : int = 117;

function Awake() {
	speed = 100;
	currentLane = 1;
	aimLane = currentLane;
}

function Start() {
	controllerScript = controller.GetComponent('Controller');
	transform.position = Vector3(30,40,20);
}

function Update() {
	//Moving forward
	if (controllerScript.playing) {
		movingPlane.transform.Translate (Vector3(0,0,-1) * Time.deltaTime*speed);
		
		if(aimLane == currentLane) {
			if (Input.GetKey (KeyCode.LeftArrow) && currentLane > 0) aimLane = currentLane - 1;
			if (Input.GetKey (KeyCode.RightArrow) && currentLane < controllerScript.numberOfLanes - 1) aimLane = currentLane + 1;
		}
		else if(movingPlane.transform.position.x == leftLanePosition - controllerScript.laneWidth*aimLane) {
			currentLane = aimLane;
		}
		else {
			movingPlane.transform.position = Vector3.MoveTowards(movingPlane.transform.position, Vector3(leftLanePosition - aimLane*controllerScript.laneWidth,movingPlane.transform.position.y,movingPlane.transform.position.z),   speed*Time.deltaTime);
		}
	}

}