public class Player extends MonoBehaviour {
	private var speed : int;
	private var movingPlane : GameObject;
	private var controllerScript : Component;
	private var aimLane : int;
	private var currentLane : int;
	
	private var numberOfLanes : int = 3;

	private var leftLanePosition : int = 117;

	public function Awake() {
		speed = 300;
		currentLane = 1;
		aimLane = currentLane;
	}

	public function Start() {
		controllerScript = GameObject.FindWithTag('GameController').gameObject.GetComponent('Controller');
		transform.position = Vector3(30,40,20);
		movingPlane = GameObject.FindWithTag('MovingPlane').gameObject;
	}

	public function Update() {
		//Moving forward
		if (controllerScript.isPlaying()) {
			movingPlane.transform.Translate (Vector3(0,0,-1) * Time.deltaTime*speed);
			
			if(aimLane == currentLane) {
				if (Input.GetKey (KeyCode.LeftArrow) && currentLane > 0) aimLane = currentLane - 1;
				if (Input.GetKey (KeyCode.RightArrow) && currentLane < numberOfLanes - 1) aimLane = currentLane + 1;
			}
			else if(movingPlane.transform.position.x == leftLanePosition - controllerScript.laneWidth*aimLane) {
				currentLane = aimLane;
			}
			else {
				movingPlane.transform.position = Vector3.MoveTowards(movingPlane.transform.position, Vector3(leftLanePosition - aimLane*controllerScript.laneWidth,movingPlane.transform.position.y,movingPlane.transform.position.z),   speed*Time.deltaTime);
			}
		}
	}
	
	public function getCurrentLane() : int {
		return currentLane;
	}
}