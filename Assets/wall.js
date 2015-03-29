public class Wall extends MovingObject {
	private var countdownTimer : float = 1.0;
	private var pauseTimer : int = 0;
	private var avoid : boolean;

	public override function Generate() {
		avoid = true;
		distanceToAddObject = 1000;
		controllerScript.coinCreate = false;
		super.Generate();
	}

	public function Update() {
		 if (pauseTimer > 0) {
			if (countdown()) {
				//Debug.Log('countdown' + pauseTimer);
				controllerScript.displayCountdown();			
				pauseTimer--;
				if (pauseTimer == 0) {
					controllerScript.play();
				}
			}
		}

		if(transform.position.z < 30 && transform.position.z > 0 && cameraScript.getCurrentLane() == lane){
			
			GetComponent.<AudioSource>().Play();
			controllerScript.removeFromScore(1);
	        transform.position.z = -5;
	        controllerScript.pause();
	        avoid = false;
	        pauseTimer = 4;
	        controllerScript.canStartGame = false;
	       	controllerScript.attachCountdown();
		}
	
		super.UpdateAndSave("wall", avoid);
		if (cameraScript.getCurrentLane() != lane && !saved) {
			laneTime = currentTime;
			saved = true;
		}
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