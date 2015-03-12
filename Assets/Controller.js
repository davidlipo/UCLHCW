import System;
import System.IO;
var  coinFileName = "coins.txt";
var  wallFileName = "walls.txt";

var coin : GameObject;
var building : GameObject;
var movingPlane : GameObject;
var road : GameObject;
var wall : GameObject;
var wagon : GameObject;
var chest : GameObject;
var currentTime : float = 0.0;
var endTime : float = 0.0;

var coinRemoveEffect : ParticleSystem;

var coinCounter : int = 0;

var numberOfLanes : int = 3;

var playing : boolean = true;

var leftLanePosition : int = -57;
var laneWidth = 87;

var wallCounter : int = 0;

var lengthOfBuilding : int = 3406;
var initialBuildingPosition : int = 1000;

var initialRoadPosition : int = 800;

var coinFinalArray = new Array(10);
var coinArrayIndex : int = 0;

var wallFinalArray = new Array(10);
var wallArrayIndex : int = 0;

var coinScript;
var wallScript;

var coinWall : int = 0;
var objectCount : int = 0;

var backgroundSound : boolean = true;

function Start () {

	currentTime = 0.0;
	endTime = 60;
	
	Debug.Log("A");
	UnityToPHP.setAttemptID(StaticScript.getPatientID());
	Debug.Log("B");

	var i : int;
	var rotation : Quaternion = Quaternion.identity;
	var lane : int;
	var walllane : int;
		
	var position : Vector3 = new Vector3 (30,2,0);
	var wagon = Instantiate (wagon, position, rotation);
	
	position = new Vector3 (30,20,32);
	var chest = Instantiate (chest, position, rotation);
		
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
    wallCounter++;
    
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

function Update () {

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
        
        var coinFile = File.CreateText(coinFileName);
		var i : int;
		var j : int;
		for (i=0; i<coinArrayIndex; i++) {
			for (j=0; j<3; j++) {
				if (j==0) {
					if (coinFinalArray[i][j]){
						coinFile.Write("Yes ");
					}
					else {
						coinFile.Write("No ");
					}
				}
				else {
					coinFile.Write(coinFinalArray[i][j].ToString());
				}
				coinFile.WriteLine(" ");
			}
			coinFile.WriteLine(" ");
			coinFile.WriteLine(" ");
		}
		coinFile.Close();
		
		var wallFile = File.CreateText(wallFileName);
		for (i=0; i<wallArrayIndex; i++) {
			for (j=0; j<3; j++) {
				if (j==0) {
					if (wallFinalArray[i][j]){
						wallFile.Write("Yes ");
					}
					else {
						wallFile.Write("No ");
					}
				}
				else {
					wallFile.Write(wallFinalArray[i][j].ToString());
				}
				wallFile.WriteLine(" ");
			}
			wallFile.WriteLine(" ");
			wallFile.WriteLine(" ");
		}
		wallFile.Close();
		
	}

	if(!playing){
		GameObject.FindWithTag('BackgroundNoise').GetComponent.<AudioSource>().Stop();
		backgroundSound = false;
	}
}

function randomObject(){
	return UnityEngine.Random.Range(0,2);
}