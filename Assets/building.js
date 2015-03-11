public class Building extends MonoBehaviour {

	private var controllerScript;

	private function Start() {
		controllerScript = GameObject.FindWithTag('GameController').gameObject.GetComponent('Controller');
	}

	private function Update() {
		if(transform.position.z < controllerScript.initialBuildingPosition - controllerScript.lengthOfBuilding) {
			transform.position.z = controllerScript.initialBuildingPosition + controllerScript.lengthOfBuilding;
		}
	}
}