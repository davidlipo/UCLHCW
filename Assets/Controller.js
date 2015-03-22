public class Controller extends MonoBehaviour {

	public var canStartGame : boolean = false;

	public var coin : GameObject;
	public var building : GameObject;
	public var movingPlane : GameObject;
	public var road : GameObject;
	public var wall : GameObject;
	public var wagon : GameObject;
	public var chest : GameObject;
	public var goldCoins : GameObject;
	public var alarmClock : GameObject;
	public var levelText : GameObject;
	public var coinCounterText : GameObject;
	public var timerText : GameObject;
	public var countdown : GameObject;
	
	public var coinStack;
	public var counterText : GameObject;
	public var timeText : GameObject;
	public var countdownDisplay : GameObject;
	
	public var timer : float = 60.0;
	
	public var coinRemoveEffect : ParticleSystem;
	private var currentTime : float = 0.0;
	private var endTime : float = 0.0;
	
	private var score : int = 0;
	private var playing : boolean = true;

	public var laneWidth = 87;

	public var lengthOfBuilding : int = 3406;
	public var initialBuildingPosition : int = 1000;

	public var initialRoadPosition : int = 800;

	private var coinScript;
	private var wallScript;
<<<<<<< HEAD
	private var cameraScript : Player;
=======
	
	public var coinCreate : boolean;
	public var laneBias : float;
	
	private var leftLevel : int;
	private var rightLevel : int;
>>>>>>> origin/master

	public function Start() {
	
		currentTime = 0.0;
		endTime = 60;
		
		yield StartCoroutine(UnityToPHP.loadLevel());
		yield StartCoroutine(UnityToPHP.setAttemptID());

		var rotation : Quaternion = Quaternion.identity;
		var lane : int;
			
		var position : Vector3 = new Vector3 (30,2,14);
		wagon.transform.localScale = Vector3(24,20,15);
		Instantiate (wagon, position, rotation);
		
		Instantiate (chest);
		
		goldCoins.transform.localScale = Vector3(0.01,0.01,0.01);
		coinStack = Instantiate (goldCoins);
		
		Instantiate (alarmClock);
		
		counterText = Instantiate (coinCounterText);
		
		timeText = Instantiate (timerText); 
		
		leftLevel = UnityToPHP.getLeftLevel();
		rightLevel = UnityToPHP.getRightLevel();
		var displayLevel = (leftLevel + rightLevel) - 1;
		levelText.GetComponent.<TextMesh>().text = displayLevel.ToString();
		Instantiate(levelText);
		
		laneBias = (leftLevel/(leftLevel + rightLevel+0.0)) * 100;
  					
		position = new Vector3 (0,20, -20);
		coin.transform.localScale = Vector3(750,750,750);
		var newCoin = Instantiate (coin, position, rotation);
		newCoin.transform.parent = movingPlane.transform;
		coinScript = newCoin.AddComponent.<Coin>();
		coinScript.removeEffect = coinRemoveEffect;
		
		position = new Vector3 (29, 0 , -20);
		wall.transform.localScale = Vector3(29,35,10);
	    var newWall = Instantiate (wall, position, rotation);
	    newWall.transform.parent = movingPlane.transform;
	    wallScript = newWall.AddComponent.<Wall>();
	    
	    regenerateObject();
	    
		var positionY = -223;
		for(var i = 0; i < 2; i++){
			var positionZ = initialBuildingPosition + i*lengthOfBuilding;
			//Left
			position = new Vector3 (-555,positionY, positionZ);
			var newBuilding = Instantiate (building, position, rotation);
			newBuilding.transform.parent = movingPlane.transform;
			newBuilding.AddComponent.<Building>();
			//Right
			position = new Vector3 (615,positionY, positionZ);
			newBuilding = Instantiate (building, position, rotation * Quaternion.Euler(0,180f,0));
			newBuilding.transform.parent = movingPlane.transform;
			newBuilding.AddComponent.<Building>();
			//Road
			position = new Vector3 (30,1, initialRoadPosition + i*road.GetComponent.<Renderer>().bounds.size.z);
			var newRoad = Instantiate (road, position, rotation);
			newRoad.transform.parent = movingPlane.transform;
			newRoad.AddComponent.<Road>();
		}
		
		canStartGame = true;
	}

	public function Update() {
		if(canStartGame){
			currentTime += Time.deltaTime;

			if(currentTime >= endTime){
				pause();
			}
			
			timer -= Time.deltaTime; 
			timeText.GetComponent.<TextMesh>().text = Mathf.RoundToInt(timer).ToString();
		}
	}
	
	public function attachCountdown(){
	
		cameraScript = GameObject.FindWithTag('Camera').gameObject.GetComponent('Player');
		countdownDisplay = Instantiate(countdown); 
	 	countdownDisplay.transform.parent = cameraScript.transform;
	 	countdownDisplay.GetComponent.<TextMesh>().text = "";
	 	countdownDisplay.GetComponent.<TextMesh>().fontSize = 1024;
	 	countdownDisplay.transform.localScale = Vector3(0.2,0.2,0.2);
	 	countdownDisplay.transform.localPosition = Vector3(-5,20,50);
	}
	
	public function displayCountdown(){
 
 		var timerCorrection : int = wallScript.pauseTimer - 1;
 		
 		if(timerCorrection == 0){
 			countdownDisplay.GetComponent.<TextMesh>().text = "";
 			Destroy(countdownDisplay);
 		}
 		
 		else{
 			countdownDisplay.GetComponent.<TextMesh>().text = timerCorrection.ToString();
 		}
 		
	 	  
 }
 
	public function regenerateObject() {
		switch(randomObject()) {
			case 0:
				coinScript.Generate();
			break;
			case 1:
				wallScript.Generate();
			break;
		}
	}

	private function randomObject() {
		return UnityEngine.Random.Range(0,2);
	}
	
	public function isPlaying() : boolean {
		return playing;
	}
	
	public function pause() {
		playing = false;
		GameObject.FindWithTag('BackgroundNoise').GetComponent.<AudioSource>().Stop();
	}
	
	public function play() {
		playing = true;
		GameObject.FindWithTag('BackgroundNoise').GetComponent.<AudioSource>().Play();
	}
	
	public function addToScore(points : int) : int {
		score += points;
		scoreDisplay("add", score);
		return score;
	}
	
	public function removeFromScore(points : int) : int {
		score -= points;
		scoreDisplay("remove", score);
		return score;
	}
	
	public function scoreDisplay(type, score){
		
		if(type == "remove"){
			coinStack.transform.localScale -= Vector3(0.001F, 0.001F, 0.01F);
		}
		
		else{
			coinStack.transform.localScale += Vector3(0.001F, 0.001F, 0.01F); //change depending on what fits
		}
		
		counterText.GetComponent.<TextMesh>().text = "x " + score.ToString();
	}
	
	
}