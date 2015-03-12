public class Road extends MonoBehaviour {

	private var controllerScript;

	public function Start() {
		controllerScript = GameObject.FindWithTag('GameController').gameObject.GetComponent('Controller');
	}

	public function Update() {
		if(transform.position.z < controllerScript.initialRoadPosition - GetComponent.<Renderer>().bounds.size.z) {
			transform.position.z = controllerScript.initialRoadPosition + GetComponent.<Renderer>().bounds.size.z;
		}
	}
}