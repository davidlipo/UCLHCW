public class Controller extends MonoBehaviour {

	public var coin : GameObject;
	public var building : GameObject;
	public var movingPlane : GameObject;
	public var road : GameObject;
	public var wall : GameObject;
	public var wagon : GameObject;
	public var chest : GameObject;
	private var currentTime : float = 0.0;
	private var endTime : float = 0.0;

	public var coinRemoveEffect : ParticleSystem;

	public var coinCounter : int = 0;

	public var numberOfLanes : int = 3;

	public var playing : boolean = true;

	public var laneWidth = 87;

	public var lengthOfBuilding : int = 3406;
	public var initialBuildingPosition : int = 1000;

	public var initialRoadPosition : int = 800;

	private var coinScript;
	private var wallScript;

	private var coinWall : int = 0;
	public var objectCount : int = 0;

	private var backgroundSound : boolean = true;

	public function Start () {

		currentTime = 0.0;
		endTime = 60;
		
		UnityToPHP.setAttemptID(StaticScript.getPatientID());

		var i : int;
		var rotation : Quaternion = Quaternion.identity;
		var lane : int;
		var walllane : int;
			
		var position : Vector3 = new Vector3 (30,2,0);
		Instantiate (wagon, position, rotation);
		
		position = new Vector3 (30,20,32);
		Instantiate (chest, position, rotation);
			
		position = new Vector3 (0,20, -20);
		coin.transform.localScale = Vector3(750,750,750);
		var newCoin = Instantiate (coin, position, rotation);
		newCoin.transform.parent = movingPlane.transform;
		coinScript = newCoin.AddComponent.<Coin>();
		coinScript.removeEffect = coinRemoveEffect;
		coinScript.Generate();
		
		position = new Vector3 (29, 0 , -20);
		wall.transform.localScale = Vector3(29,35,10);
	    var newWall = Instantiate (wall, position, rotation);
	    newWall.transform.parent = movingPlane.transform;
	    wallScript = newWall.AddComponent.<Wall>();
	    wallScript.lane = walllane;
	    
		//Left
		for(i = 0; i < 2; i++){
			position = new Vector3 (-555,-223, initialBuildingPosition + i*lengthOfBuilding);
			var newBuilding = Instantiate (building, position, rotation);
			newBuilding.transform.parent = movingPlane.transform;
			newBuilding.AddComponent.<Building>();
		}
		
		//Right
		for(i = 0; i < 2; i++){
			position = new Vector3 (615,-223, initialBuildingPosition + i*lengthOfBuilding);
			newBuilding = Instantiate (building, position, rotation * Quaternion.Euler(0,180f,0));
			newBuilding.transform.parent = movingPlane.transform;
			newBuilding.AddComponent.<Building>();
		}
		
		for(i = 0; i < 2; i++){
			position = new Vector3 (30,1, initialRoadPosition + i*road.GetComponent.<Renderer>().bounds.size.z);
			var newRoad = Instantiate (road, position, rotation);
			newRoad.transform.parent = movingPlane.transform;
			newRoad.AddComponent.<Road>();
		}
	}

	public function Update () {

		if (!backgroundSound){
			GameObject.FindWithTag('BackgroundNoise').GetComponent.<AudioSource>().Play();
			backgroundSound = true;
		}

		currentTime += Time.deltaTime;
		
		if (objectCount == 0) {
			coinWall = randomObject();
			if(coinWall == 0){
				coinScript.Generate();
			}
			else {
				wallScript.Generate();
			}
		}

		if(currentTime >= endTime){
			playing = false;
		}

		if(!playing){
			GameObject.FindWithTag('BackgroundNoise').GetComponent.<AudioSource>().Stop();
			backgroundSound = false;
		}
	}

	public function randomObject(){
		return UnityEngine.Random.Range(0,2);
	}
}