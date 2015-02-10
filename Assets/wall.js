var controller : GameObject;

var lane : int;
var countdownTimer : float = 1.0;
var controllerScript;
var pauseTimer : int = 0;

function Start () {
	controllerScript = controller.GetComponent('controller');
}

function Update () {
    if (pauseTimer>0) {
		if (countdown()) {
			Debug.Log('countdown' + pauseTimer);			
			pauseTimer--;
			if (pauseTimer == 0) {
				controllerScript.playing = true;
			}
		}
	}
	if(transform.position.z < 0) {
		lane = controllerScript.randomLane();
		transform.position.z = controllerScript.distanceToAddWalls;
		transform.position.x = controllerScript.laneX(lane);
	}
	else if(transform.position.z < 30 && GameObject.FindWithTag('MainCamera').GetComponent('camera').currentLane == lane){
		controllerScript.coinCounter-=1;
		Debug.Log(controllerScript.coinCounter);
        transform.position.z = -5;
        controllerScript.playing = false;
        pauseTimer = 3;
	}

}

function countdown() {
	if (countdownTimer>0){
		countdownTimer-= Time.deltaTime;
		return false;
	}
	else {
		countdownTimer = 1.0;
		return true;
	}
}
