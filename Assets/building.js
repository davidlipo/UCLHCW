public class Building extends MonoBehaviour {

	private var controllerScript;

	public function Start() {
		controllerScript = GameObject.FindWithTag('GameController').gameObject.GetComponent('Controller');
	}

	public function Update() {
		if(transform.position.z < controllerScript.initialBuildingPosition - controllerScript.lengthOfBuilding) {
			transform.position.z = controllerScript.initialBuildingPosition + controllerScript.lengthOfBuilding;
		}
	}
}