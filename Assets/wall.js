public class Wall extends MovingObject {

	private var countdownTimer : float = 1.0;
	private var pauseTimer : int = 0;

	private var avoid : boolean;

	public override function Generate() {
		avoid = true;
		distanceToAddObject = 500;
		super.Generate();
	}

	public function Update() {
		 if (pauseTimer>0) {
			if (countdown()) {
				Debug.Log('countdown' + pauseTimer);			
				pauseTimer--;
				if (pauseTimer == 0) {
					controllerScript.playing = true;
				}
			}
		}

		if(transform.position.z < 30 && transform.position.z > 0 && cameraScript.currentLane == lane){
			controllerScript.coinCounter-=1;
			Debug.Log(controllerScript.coinCounter);
	        transform.position.z = -5;
	        controllerScript.playing = false;
	        avoid = false;
	        pauseTimer = 3;
		}
	
		super.UpdateAndSave("wall", avoid);
	}

	private function countdown() {
		if (countdownTimer > 0){
			countdownTimer -= Time.deltaTime;
			return false;
		}
		else {
			countdownTimer = 1.0;
			return true;
		}
	}
}