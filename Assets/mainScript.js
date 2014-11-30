var coin : GameObject;
var character : GameObject;
var delay: int;

function Start () {
}

function Update () {
	delay++;
	if(delay > 100) {
		delay = 0;
		var position : Vector3 = new Vector3 (character.transform.position.x + Random.Range(-100,100),30, character.transform.position.z + Random.Range(200,400));
		var rotation : Quaternion = Quaternion.identity;
		coin.transform.localScale = Vector3(1000,1000,1000);
		Instantiate (coin, position, rotation);
	}
}