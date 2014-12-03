var controller : GameObject;

function Start () {
}

function Update () {
	if(transform.position.z < 0) {
		var controllerScript = controller.GetComponent('controller');
		transform.position.z = controllerScript.distanceToAddCoins;
		transform.position.x = controllerScript.randomLane();
	}
}