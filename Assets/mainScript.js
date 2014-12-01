var coin : GameObject;
var movingPlane : GameObject;
var delay: int;

function Start () {
}

function Update () {
	delay++;
	if(delay > 60) {
		delay = 0;
		var position : Vector3 = new Vector3 (87*Random.Range(0,3) - 57,20, 1000);
		var rotation : Quaternion = Quaternion.identity;
		coin.transform.localScale = Vector3(1000,1000,1000);
		var newCoin = Instantiate (coin, position, rotation);
		newCoin.transform.parent = movingPlane.transform;
	}
}