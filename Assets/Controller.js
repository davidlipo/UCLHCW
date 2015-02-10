var coin : GameObject;
var building : GameObject;
var movingPlane : GameObject;
var road : GameObject;
var wall : GameObject;
var wagon : GameObject;
var chest : GameObject;
var coinCollect : AudioClip;
//var wagonSound : AudioClip;

var coinRemoveEffect : ParticleSystem;

var coinCounter : int = 0;

var numberOfLanes : int = 3;

var playing : boolean = true;

var leftLanePosition : int = -57;
var laneWidth = 87;

var distanceToAddCoins : int = 1000;
var distanceBetweenCoins : int = 1000;

var distanceToAddWalls : int = 2000;
var distanceBetweenWalls : int = 1000;
var wallCounter : int = 0;

var lengthOfBuilding : int = 3406;
var initialBuildingPosition : int = 1000;

var initialRoadPosition : int = 800;

function Start () {
	var i : int;
	var rotation : Quaternion = Quaternion.identity;
	var lane : int;
	var walllane : int;
	
	var position : Vector3 = new Vector3 (laneX(1),2,0);
	var newwagon = Instantiate (wagon, position, rotation);
	newwagon.transform.parent = movingPlane.transform;
	var wagonScript = newwagon.AddComponent('wagon');
	wagonScript.controller = gameObject;
	wagon.transform.localScale = Vector3(25,25,25);
	
	position = new Vector3 (laneX(1),20,32);
	var newChest = Instantiate (chest, position, rotation);
	newChest.transform.parent = movingPlane.transform;
	var chestScript = newChest.AddComponent('chest');
	chestScript.controller = gameObject;
	chest.transform.localScale = Vector3(15,15,15);
	
	for(i = 0; i < distanceToAddCoins/distanceBetweenCoins; i++){
		lane = randomLane();
		position = new Vector3 (laneX(lane),20, distanceToAddCoins + i*distanceBetweenCoins);
		coin.transform.localScale = Vector3(750,750,750);
		var newCoin = Instantiate (coin, position, rotation);
		newCoin.transform.parent = movingPlane.transform;
		var coinScript = newCoin.AddComponent('coin');
		coinScript.controller = gameObject;
		coinScript.lane = lane;
		coinScript.removeEffect = coinRemoveEffect;		
	}
	
	for(i = 0; i < distanceToAddWalls/distanceBetweenWalls; i++){
	    if(transform.position.z < 0){
	      wallCounter--;
	    }
	    if (wallCounter<1){
	        walllane = lane;
	    	while (walllane == lane) {
	    		walllane = randomLane();
			}
	    	position = new Vector3 (29, 0 , distanceToAddWalls + i*distanceBetweenWalls);
	    	wall.transform.localScale = Vector3(29,35,10);
			var newWall = Instantiate (wall, position, rotation);
			newWall.transform.parent = movingPlane.transform;
			var wallScript = newWall.AddComponent('wall');
			wallScript.controller = gameObject;
			wallScript.lane = walllane;
			wallCounter++;
		}
	}
	//Left
	for(i = 0; i < 2; i++){
		position = new Vector3 (-555,-223, initialBuildingPosition + i*lengthOfBuilding);
		var newBuilding = Instantiate (building, position, rotation);
		newBuilding.transform.parent = movingPlane.transform;
		var buildingScript = newBuilding.AddComponent('building');
		buildingScript.controller = gameObject;
	}
	
	//Right
	for(i = 0; i < 2; i++){
		position = new Vector3 (615,-223, initialBuildingPosition + i*lengthOfBuilding);
		newBuilding = Instantiate (building, position, rotation * Quaternion.Euler(0,180f,0));
		newBuilding.transform.parent = movingPlane.transform;
		buildingScript = newBuilding.AddComponent('building');
		buildingScript.controller = gameObject;
	}
	
	for(i = 0; i < 2; i++){
		position = new Vector3 (30,1, initialRoadPosition + i*road.renderer.bounds.size.z);
		var newRoad = Instantiate (road, position, rotation);
		newRoad.transform.parent = movingPlane.transform;
		var roadScript = newRoad.AddComponent('road');
		roadScript.controller = gameObject;
	}
}

function Update () {
}

function randomLane(){
	return Random.Range(0,3);
}

function laneX(laneNumber : int){
	return laneWidth*laneNumber + leftLanePosition;
}