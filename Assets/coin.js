var controller : GameObject;

var removeEffect : ParticleSystem;
var hasShownEffect : boolean = false;

var speed : int;

var lane : int;

var laneDiff : int;
var currentTime : float = 0;
var laneTime : float;
var controllerScript : Component;
var cameraScript : camera;
var saved : boolean;
var written : boolean;

function Start () {
	speed = 80 + UnityEngine.Random.Range(0,40);
    controllerScript = controller.GetComponent('controller');
	cameraScript = GameObject.Find('Main Camera').gameObject.GetComponent('camera');
}

function Generate() {
	controllerScript = controller.GetComponent('controller');
	hasShownEffect = false;
	lane = controllerScript.randomLane();
	transform.position.z = controllerScript.distanceToAddCoins;
	transform.position.x = controllerScript.laneX(lane);
    laneDiff = lane - cameraScript.currentLane;
    currentTime = 0;
    saved = false;
   	written = false;
   	controllerScript.objectCount += 1;
}

function Update () {
	transform.Rotate(speed * Vector3.up * Time.deltaTime);
	var controllerScript = controller.GetComponent('controller');

	if(transform.position.z < 100 && transform.position.z > 0 && GameObject.FindWithTag('MainCamera').GetComponent('camera').currentLane == lane && !hasShownEffect){
		hasShownEffect = true;
		controllerScript.coinCounter+=1;
		Debug.Log(controllerScript.coinCounter);
		var effect = Instantiate (removeEffect, transform.position, Quaternion.identity);
		effect.transform.localScale = Vector3(2,2,2);
		effect.transform.parent = transform;
		effect.Play();
		audio.Play();
	}
    
    currentTime += Time.deltaTime;
	if (cameraScript.currentLane==lane && !saved) {
		laneTime = currentTime;
		saved = true;
	}
	if (transform.position.z < 5 && !written) {
	    cameraScript.send(["Coin", laneDiff, hasShownEffect, laneTime]);
		controllerScript.coinFinalArray[controllerScript.coinArrayIndex] = new Array(3);
		controllerScript.coinFinalArray[controllerScript.coinArrayIndex][0] = hasShownEffect; 
		controllerScript.coinFinalArray[controllerScript.coinArrayIndex][1] = laneDiff; 
		controllerScript.coinFinalArray[controllerScript.coinArrayIndex][2] = laneTime; 
		controllerScript.coinArrayIndex += 1;	
		written = true;
		controllerScript.objectCount -= 1;
	} 
}