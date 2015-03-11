class Coin extends MovingObject {
	private var removeEffect : ParticleSystem;
	private var hasShownEffect : boolean = false;

	private var rotationSpeed : int;
	private var coinSpeed : int = 0;

	protected override function Start() {
		rotationSpeed = 80 + UnityEngine.Random.Range(0,40);
		super.Start();
	}

	protected override function Generate() {
		hasShownEffect = false;
		distanceToAddObject = controllerScript.distanceToAddCoins;
		super.Generate();
	}
	
	public function Update() {
		levelNumbers(3,4); //Testing 
		
		transform.Rotate(rotationSpeed * Vector3.up * Time.deltaTime);

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
	
		super.UpdateAndSave("coin", hasShownEffect);
	}

	private function levelNumbers(leftLevel, rightLevel){

		var leftModifier = leftLevel * 10;
		var rightModifier = rightLevel * 10; //Change modifiers depending on what works
		
		speedLeft = leftModifier;
		speedRight = rightModifier;
		
		changeDifficulty(speedLeft, speedRight);

	}

	//TODO Coin lanes != current lane && Wall lanes == current lane
	private function changeDifficulty(left, right){

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
}