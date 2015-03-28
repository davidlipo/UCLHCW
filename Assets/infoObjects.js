#pragma strict

function Start () {}

function Update () {

	transform.RotateAround (Vector3(0, 0, -2), Vector3.up, 40 * Time.deltaTime);
	transform.Rotate(40 * Vector3.up * Time.deltaTime);
	
	if (Input.GetKeyDown (KeyCode.JoystickButton0) || Input.GetKeyDown (KeyCode.JoystickButton1)){
	
		Application.LoadLevel("game");
	
	}
				

}