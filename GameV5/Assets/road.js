var controller : GameObject;

function Start () {
}

function Update () {
	var controllerScript = controller.GetComponent('controller');
	if(transform.position.z < controllerScript.initialRoadPosition - renderer.bounds.size.z) {
		transform.position.z = controllerScript.initialRoadPosition + renderer.bounds.size.z;
	}
}