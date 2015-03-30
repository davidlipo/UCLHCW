public class Coin extends MovingObject {
	private var removeEffect : ParticleSystem;
	private var hasShownEffect : boolean = false;
	private var coinExists : boolean = false;

	private var rotationSpeed : int;
	private var coinSpeed : int = 0;
	private var score : int = 0;
	
	private var coinCollect : AudioSource;
	private var coinSpawn : AudioSource;
	private var coinAudio = GetComponents(AudioSource);

	protected override function Awake() {
		rotationSpeed = 80 + UnityEngine.Random.Range(0,40);
		super.Awake();
	}

	public override function Generate() {
		hasShownEffect = false;
		coinExists = true;
		coinSpawn = coinAudio[1]; 
		coinSpawn.Play();
		distanceToAddObject = 1000;
		controllerScript.coinCreate = true;
		super.Generate();
	}
	
	public function Update() {
		
		if (controllerScript.isPlaying()){
			levelNumbers(UnityToPHP.getLeftLevel(), UnityToPHP.getRightLevel()); 
		
			transform.Rotate(rotationSpeed * Vector3.up * Time.deltaTime);
			
			if(transform.position.z < 100 && transform.position.z > 0){
				if(cameraScript.getCurrentLane() == lane && !hasShownEffect){
					hasShownEffect = true;
					score = controllerScript.addToScore(1);
					var effect = Instantiate (removeEffect, transform.position, Quaternion.identity);
					effect.transform.localScale = Vector3(2,2,2);
					effect.transform.parent = transform;
					effect.Play();
					coinCollect = coinAudio[0];
					coinCollect.Play();
					coinSpawn.Stop();
				}
				
				else{
					coinSpawn.Stop();
				}
			}
			super.UpdateAndSave("coin", hasShownEffect);
		}
	}


	private function levelNumbers(leftLevel, rightLevel){

		var leftModifier = leftLevel * 10;
		var rightModifier = rightLevel * 10; //Change modifiers depending on what works
		
		speedLeft = leftModifier;
		speedRight = rightModifier;
		
		changeDifficulty(speedLeft, speedRight);

	}

	private function changeDifficulty(left, right){

		var currentPosition = cameraScript.transform.position.x;
		var coinPosition = transform.position.x;
		
		//on the left
		if(coinPosition < currentPosition){ 
			if(coinExists){
				coinSpawn.volume = 1.0;
				coinSpawn.panStereo = -1.0;
			}
			coinSpeed = left;
			transform.Translate (Vector3(0,0,-1) * Time.deltaTime*coinSpeed, Space.World);
		}
		
		//on the right
		else if(coinPosition > currentPosition){
			if(coinExists){
				coinSpawn.volume = 1.0;
				coinSpawn.panStereo = 1.0;
			}
			coinSpeed = right;
			transform.Translate (Vector3(0,0,-1) * Time.deltaTime*coinSpeed, Space.World);
		}
		
		else{
			if(coinExists){
				coinSpawn.volume = 0.0;
			}
		}


	}
	
	public function getCoinSound(){
	
		return coinSpawn;
	}
}