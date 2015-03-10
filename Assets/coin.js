var controller : GameObject;

var removeEffect : ParticleSystem;
var hasShownEffect : boolean = false;

var rotationSpeed : int;
var coinSpeed : int = 0;

var lane : int;

var laneDiff : int;
var currentTime : float = 0;
var laneTime : float;
var controllerScript : Component;
var cameraScript : camera;
var saved : boolean;
var written : boolean;

function Start () {
	rotationSpeed = 80 + UnityEngine.Random.Range(0,40);
    controllerScript = controller.GetComponent('controller');
	cameraScript = GameObject.FindWithTag('Camera').gameObject.GetComponent('camera');
	
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

	levelNumbers(3,4); //Testing 
	
	transform.Rotate(rotationSpeed * Vector3.up * Time.deltaTime);
	var controllerScript = controller.GetComponent('controller');

	if(transform.position.z < 100 && transform.position.z > 0 && cameraScript.currentLane == lane && !hasShownEffect){
		hasShownEffect = true;
		controllerScript.coinCounter+=1;
		Debug.Log(controllerScript.coinCounter);
		var effect = Instantiate (removeEffect, transform.position, Quaternion.identity);
		effect.transform.localScale = Vector3(2,2,2);
		effect.transform.parent = transform;
		effect.Play();
		GetComponent.<AudioSource>().Play();
	}
    
    currentTime += Time.deltaTime;
	if (cameraScript.currentLane==lane && !saved) {
		laneTime = currentTime;
		saved = true;
	}
	if (transform.position.z < 5 && transform.position.z > -10 && !written) {
	    cameraScript.send(["Coin", laneDiff, hasShownEffect, laneTime.ToString()]);
		controllerScript.coinFinalArray[controllerScript.coinArrayIndex] = new Array(3);
		controllerScript.coinFinalArray[controllerScript.coinArrayIndex][0] = hasShownEffect; 
		controllerScript.coinFinalArray[controllerScript.coinArrayIndex][1] = laneDiff; 
		controllerScript.coinFinalArray[controllerScript.coinArrayIndex][2] = laneTime; 
		controllerScript.coinArrayIndex += 1;	
		written = true;
		controllerScript.objectCount -= 1;
	} 
}

function levelNumbers(leftLevel, rightLevel){

	var leftModifier = leftLevel * 10;
	var rightModifier = rightLevel * 10; //Change modifiers depending on what works
	
	speedLeft = leftModifier;
	speedRight = rightModifier;
	
	changeDifficulty(speedLeft, speedRight);

}

//TODO Coin lanes != current lane && Wall lanes == current lane
function changeDifficulty(left, right){

	var currentPosition = cameraScript.transform.position.x;
	var coinPosition = transform.position.x;
	
	//on the left
	if(coinPosition < currentPosition){ 
	
		coinSpeed = left;
		transform.Translate (Vector3(0,0,-1) * Time.deltaTime*coinSpeed, Space.World);
	}
	
	//on the right
	if(coinPosition > currentPosition){
	
		coinSpeed = right;
		transform.Translate (Vector3(0,0,-1) * Time.deltaTime*coinSpeed, Space.World);
	}


}