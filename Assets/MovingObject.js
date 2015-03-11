class MovingObject extends MonoBehaviour {

	protected var controllerScript;
	protected var cameraScript : camera;
	
	protected var distanceToAddObject;
	
	var lane : int;

	var laneDiff : int;
	var currentTime : float = 0;
	var laneTime : float;
	var saved : boolean;
	var written : boolean;

	protected function Start() {
	    controllerScript = GameObject.FindWithTag('GameController').gameObject.GetComponent('Controller');
	    cameraScript = GameObject.FindWithTag('Camera').gameObject.GetComponent('camera');
	}

	protected function Generate() {
		lane = controllerScript.randomLane();
		transform.position.z = distanceToAddObject;
		transform.position.x = controllerScript.laneX(lane);
		laneDiff = lane - cameraScript.currentLane;
	    currentTime = 0;
	    saved = false;
	   	written = false;
	   	controllerScript.objectCount += 1;
	}

	protected function UpdateAndSave(type, hasBeenCompleted) {
	    currentTime += Time.deltaTime;
		if (cameraScript.currentLane == lane && !saved) {
			laneTime = currentTime;
			saved = true;
		}
		if (transform.position.z < 5 && transform.position.z > -10 && !written) {
		    UnityToPHP.sendInteractionStat([type, laneDiff, hasBeenCompleted, laneTime.ToString()]);
			written = true;
			controllerScript.objectCount -= 1;
		} 
	}
}