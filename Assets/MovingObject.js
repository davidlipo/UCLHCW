public class MovingObject extends MonoBehaviour {

	protected var controllerScript;
	protected var cameraScript : Player;
	
	protected var distanceToAddObject;
	
	protected var lane : int;

	private var laneDiff : int;
	private var currentTime : float = 0;
	private var laneTime : float;
	private var saved : boolean;
	private var written : boolean;
	
	private var laneWidth : int;
	
	private var randomNo : float;

	protected function Awake() {
	    controllerScript = GameObject.FindWithTag('GameController').gameObject.GetComponent('Controller');
	    cameraScript = GameObject.FindWithTag('Camera').gameObject.GetComponent('Player');
	    laneWidth = controllerScript.laneWidth;
	}

	public function Generate() {
	
	//lane = RandomLane();
	Debug.Log("Current lane is: " + cameraScript.getCurrentLane() + " Object lane is:  " + lane);
	
		if (controllerScript.coinCreate == true){
		    if (controllerScript.laneBias == 50){
		   		while (lane == cameraScript.getCurrentLane()){
		   			//Debug.Log("While 1");
					lane = RandomLane();
				}
			}				
			else{
			
			if(cameraScript.getCurrentLane() == 0 || cameraScript.getCurrentLane() == 2){
				while (lane == cameraScript.getCurrentLane()){
		   			//Debug.Log("While 1");
					lane = RandomLane();
				}
			
			}
			
			else{
				randomNo = RandomFrom100();
				if (randomNo < controllerScript.laneBias){
					while (lane <= cameraScript.getCurrentLane()){
						//Debug.Log("While 2");
						lane = RandomLane();
					}
				}
				else{
					while (lane >= cameraScript.getCurrentLane()){
						//Debug.Log("While 3");
						lane = RandomLane();
					}
				}
			}
		}		
		}				
		else {
			lane = cameraScript.getCurrentLane();
		}
		transform.position.z = distanceToAddObject;
		transform.localPosition.x = PositionLane(lane);
		laneDiff = lane - cameraScript.getCurrentLane();
	    currentTime = 0;
	    saved = false;
	   	written = false;
	}

	protected function UpdateAndSave(type : String, hasBeenCompleted : boolean) {
	    currentTime += Time.deltaTime;
		if (cameraScript.getCurrentLane() == lane && !saved) {
			laneTime = currentTime;
			saved = true;
		}
		if (transform.position.z < 5 && transform.position.z > -10 && !written) {
		    StartCoroutine(UnityToPHP.sendInteractionStat([type, laneDiff, hasBeenCompleted, laneTime.ToString()]));
			written = true;
			controllerScript.regenerateObject();
		} 
	}
	
	private function PositionLane(lane : int) {
		return -laneWidth + laneWidth*lane;
	}
	
	function RandomLane(){
		return UnityEngine.Random.Range(0,3);
	}
	
	function RandomFrom100(){
		return UnityEngine.Random.Range(1,100);
	}
}