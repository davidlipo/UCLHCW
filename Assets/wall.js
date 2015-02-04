var controller : GameObject;

var lane : int;

function Start () {
}

function Update () {
	if(transform.position.z < 0) {
		var controllerScript = controller.GetComponent('controller');
		lane = controllerScript.randomLane();
		transform.position.z = controllerScript.distanceToAddWalls;
		transform.position.x = controllerScript.laneX(lane);
	}
}