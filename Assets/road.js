public class Road extends MonoBehaviour {

	private var controllerScript;

	private function Start() {
		controllerScript = GameObject.FindWithTag('GameController').gameObject.GetComponent('Controller');
	}

	private function Update() {
		if(transform.position.z < controllerScript.initialRoadPosition - GetComponent.<Renderer>().bounds.size.z) {
			transform.position.z = controllerScript.initialRoadPosition + GetComponent.<Renderer>().bounds.size.z;
		}
	}
}