var controller : GameObject;

function Start () {
}

function Update () {
	var controllerScript = controller.GetComponent('Controller');
	if(transform.position.z < controllerScript.initialRoadPosition - GetComponent.<Renderer>().bounds.size.z) {
		transform.position.z = controllerScript.initialRoadPosition + GetComponent.<Renderer>().bounds.size.z;
	}
}