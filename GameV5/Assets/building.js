var controller : GameObject;

function Start () {
}

function Update () {
	var controllerScript = controller.GetComponent('controller');
	if(transform.position.z < controllerScript.initialBuildingPosition - controllerScript.lengthOfBuilding) {
		transform.position.z = controllerScript.initialBuildingPosition + controllerScript.lengthOfBuilding;
	}
}