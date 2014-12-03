var coin : GameObject;
var building : GameObject;
var movingPlane : GameObject;

var numberOfLanes : int = 3;

var leftLanePosition : int = -57;
var laneWidth = 87;

var distanceToAddCoins : int = 1000;
var distanceBetweenCoins : int = 200;

var lengthOfBuilding : int = 3406;
var initialBuildingPosition : int = 1000;

function Start () {
	var i : int;
	var rotation : Quaternion = Quaternion.identity;
	for(i = 0; i < distanceToAddCoins/distanceBetweenCoins; i++){
		var position : Vector3 = new Vector3 (randomLane(),20, distanceToAddCoins + i*distanceBetweenCoins);
		coin.transform.localScale = Vector3(1000,1000,1000);
		var newCoin = Instantiate (coin, position, rotation);
		newCoin.transform.parent = movingPlane.transform;
		var coinScript = newCoin.AddComponent('coin');
		coinScript.controller = gameObject;
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
}

function Update () {
}

function randomLane(){
	return laneWidth*Random.Range(0,3) + leftLanePosition;
}