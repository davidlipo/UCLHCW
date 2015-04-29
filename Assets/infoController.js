#pragma strict

public var wiiArrow : GameObject;
public var wiiNunchuck : GameObject;

function Start () {

	yield WaitForSeconds(5);
	var wN = Instantiate(wiiNunchuck);
	var wA = Instantiate(wiiArrow);
	wA.transform.parent = wN.transform;

}

function Update () {

}