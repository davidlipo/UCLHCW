var controller : GameObject;

var lane : int;
var countdownTimer : float = 1.0;
var controllerScript;
var pauseTimer : int = 0;
var cameraScript : camera;

var written : boolean;
var saved : boolean;
var avoid : boolean;
var laneDiff : int;
var currentTime : float = 0;
var laneTime : float;

function Start () {
	controllerScript = controller.GetComponent('controller');
    cameraScript = GameObject.Find('Main Camera').gameObject.GetComponent('camera');
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
        laneDiff = lane - cameraScript.currentLane;
		written = false;
		avoid = true;
		currentTime = 0;
        saved = false;
	}
	else if(transform.position.z < 30 && GameObject.FindWithTag('MainCamera').GetComponent('camera').currentLane == lane){
		controllerScript.coinCounter-=1;
		Debug.Log(controllerScript.coinCounter);
        transform.position.z = -5;
        controllerScript.playing = false;
        avoid = false;
        pauseTimer = 3;
	}
    
    currentTime += Time.deltaTime;
	if (cameraScript.currentLane!=lane && !saved) {
		laneTime = currentTime;
		saved = true;
	}
	
	if (transform.position.z < 5 && !written) {
	    cameraScript.send(["Wall", laneDiff, avoid, laneTime]);
		controllerScript.wallFinalArray[controllerScript.wallArrayIndex] = new Array(3);
		controllerScript.wallFinalArray[controllerScript.wallArrayIndex][0] = avoid; 
		controllerScript.wallFinalArray[controllerScript.wallArrayIndex][1] = laneDiff; 
		controllerScript.wallFinalArray[controllerScript.wallArrayIndex][2] = laneTime; 
		controllerScript.wallArrayIndex += 1;	
		written = true;
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
