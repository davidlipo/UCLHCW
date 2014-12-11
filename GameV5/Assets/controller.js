var coin : GameObject;
var building : GameObject;
var movingPlane : GameObject;
var road : GameObject;

var coinRemoveEffect : ParticleSystem;

var numberOfLanes : int = 3;

var leftLanePosition : int = -57;
var laneWidth = 87;

var distanceToAddCoins : int = 1000;
var distanceBetweenCoins : int = 200;

var lengthOfBuilding : int = 3406;
var initialBuildingPosition : int = 1000;

var initialRoadPosition : int = 800;

function Start () {
	var i : int;
	var rotation : Quaternion = Quaternion.identity;
	var lane : int;
	for(i = 0; i < distanceToAddCoins/distanceBetweenCoins; i++){
		lane = randomLane();
		var position : Vector3 = new Vector3 (laneX(lane),20, distanceToAddCoins + i*distanceBetweenCoins);
		coin.transform.localScale = Vector3(750,750,750);
		var newCoin = Instantiate (coin, position, rotation);
		newCoin.transform.parent = movingPlane.transform;
		var coinScript = newCoin.AddComponent('coin');
		coinScript.controller = gameObject;
		coinScript.lane = lane;
		coinScript.removeEffect = coinRemoveEffect;
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