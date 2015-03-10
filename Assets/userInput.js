#pragma strict

function Start () {

}

var stringToEdit : String = "";
function OnGUI () {

	if (Event.current.Equals(Event.KeyboardEvent("Return"))) {
		startGame();
	}

	var width : int = 300;
	var height : int = 40;
	var fontStyle = new GUIStyle();
	var labelFont = new GUIStyle();
	labelFont.fontSize = 30;
	fontStyle = GUI.skin.textField;
    fontStyle.fontSize = labelFont.fontSize;
    GUI.SetNextControlName ("patientID");
	stringToEdit = GUI.TextField (Rect ((Screen.width - width)/2, (Screen.height - height)/2, width, height), stringToEdit, 25, fontStyle);
	GUI.Label(Rect((Screen.width - width)/2, (Screen.height - height)/2 - height, width, height),"Enter Patient ID:", labelFont);
	GUI.FocusControl ("patientID");

	if(GUI.Button(Rect((Screen.width - width)/2, (Screen.height - height)/2 + height, width, height),"Submit")) {
		startGame();
	}
}

function startGame () {
	var statScr : staticScript = GameObject.FindWithTag("Static").gameObject.GetComponent("staticScript");
	statScr.patientID = stringToEdit;
	Application.LoadLevel("game");
}