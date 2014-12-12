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
	if(transform.position.z < 0) {
		hasShownEffect = false;
		var controllerScript = controller.GetComponent('controller');
		lane = controllerScript.randomLane();
		transform.position.z = controllerScript.distanceToAddCoins;
		transform.position.x = controllerScript.laneX(lane);
	}
	else if(transform.position.z < 100 && GameObject.FindWithTag('MainCamera').GetComponent('camera').currentLane == lane && !hasShownEffect){
		hasShownEffect = true;
		var effect = Instantiate (removeEffect, transform.position, Quaternion.identity);
		effect.transform.localScale = Vector3(2,2,2);
		effect.transform.parent = transform;
		//effect.transform.position = Vector3(0,0,0);
		effect.Play();
		//renderer.material.color = Color.red;
	}
}