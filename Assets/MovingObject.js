﻿public class MovingObject extends MonoBehaviour {

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

	protected function Awake() {
	    controllerScript = GameObject.FindWithTag('GameController').gameObject.GetComponent('Controller');
	    cameraScript = GameObject.FindWithTag('Camera').gameObject.GetComponent('Player');
	    laneWidth = controllerScript.laneWidth;
	}

	public function Generate() {
		lane = RandomLane();
		transform.position.z = distanceToAddObject;
		transform.localPosition.x = PositionLane(lane);
		laneDiff = lane - cameraScript.currentLane;
	    currentTime = 0;
	    saved = false;
	   	written = false;
	   	controllerScript.objectCount += 1;
	}

	protected function UpdateAndSave(type : String, hasBeenCompleted : boolean) {
	    currentTime += Time.deltaTime;
		if (cameraScript.currentLane == lane && !saved) {
			laneTime = currentTime;
			saved = true;
		}
		if (transform.position.z < 5 && transform.position.z > -10 && !written) {
		    StartCoroutine(UnityToPHP.sendInteractionStat([type, laneDiff, hasBeenCompleted, laneTime.ToString()]));
			written = true;
			controllerScript.objectCount -= 1;
		} 
	}
	
	private function PositionLane(lane : int) {
		return -laneWidth + laneWidth*lane;
	}
	
	function RandomLane(){
		return UnityEngine.Random.Range(0,3);
	}
}