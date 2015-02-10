var controller : GameObject;

var removeEffect : ParticleSystem;
var hasShownEffect : boolean = false;

var speed : int;

var lane : int;

function Start () {
	speed = 80 + Random.Range(0,40);
}

function Update () {
	transform.Rotate(speed * Vector3.up * Time.deltaTime);
	var controllerScript = controller.GetComponent('controller');
	if(transform.position.z < 0) {
		hasShownEffect = false;
		lane = controllerScript.randomLane();
		transform.position.z = controllerScript.distanceToAddCoins;
		transform.position.x = controllerScript.laneX(lane);
	}
	else if(transform.position.z < 100 && GameObject.FindWithTag('MainCamera').GetComponent('camera').currentLane == lane && !hasShownEffect){
		hasShownEffect = true;
		controllerScript.coinCounter+=1;
		Debug.Log(controllerScript.coinCounter);
		var effect = Instantiate (removeEffect, transform.position, Quaternion.identity);
		effect.transform.localScale = Vector3(2,2,2);
		effect.transform.parent = transform;
		effect.Play();
		AudioSource.PlayClipAtPoint(controllerScript.coinCollect, transform.position);
	}
}