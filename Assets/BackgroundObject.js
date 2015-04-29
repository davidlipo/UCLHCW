public class BackgroundObject extends MonoBehaviour {

	protected var controllerScript;
	
	protected var initPos : int;
	protected var length : int;

	protected function Start() {
		controllerScript = GameObject.FindWithTag('GameController').gameObject.GetComponent('Controller');
	}

	protected function Update() {
		if(transform.position.z < initPos - length) {
			transform.position.z = initPos + length;
		}
	}
}