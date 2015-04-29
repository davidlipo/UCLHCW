import System.Text.RegularExpressions;

public class UserInput extends MonoBehaviour {
	private var stringToEdit : String = "";
	private var width : int = 400;
	private var height : int = 40;
	private var buttonClicked : boolean = false;
	
	public function OnGUI() {

		if (Event.current.Equals(Event.KeyboardEvent("Return")) && stringToEdit != "") {
			startGame();
		}
		
		else if(Event.current.Equals(Event.KeyboardEvent("Return")) && stringToEdit == ""){
			buttonClicked = !buttonClicked;
		}
		
		warningMessage();

		var fontStyle = new GUIStyle();
		var labelFont = new GUIStyle();
		var button = GUI.Button(Rect((Screen.width - width)/2 + width/4, (Screen.height - height)/2 + height*1.5, width/2, height), "Submit");
		labelFont.fontSize = 30;
		fontStyle = GUI.skin.textField;
	    fontStyle.fontSize = labelFont.fontSize;
	    GUI.SetNextControlName ("patientID");
		stringToEdit = GUI.TextField (Rect ((Screen.width - width)/2, (Screen.height - height)/2, width, height), stringToEdit, 25, fontStyle);
		stringToEdit = Regex.Replace(stringToEdit, "[^0-9]", "");
		GUI.Label(Rect((Screen.width - width)/2 + width/4, (Screen.height - height)/2 - height, width, height),"Enter Patient ID", labelFont);
		GUI.FocusControl ("patientID");

		if(button && stringToEdit != "") {
			startGame();
		}
		
		else if(button && stringToEdit == ""){
			buttonClicked = !buttonClicked;
		}
		warningMessage();
		
	}

	private function warningMessage(){
		if(buttonClicked){
			GUI.Box(Rect((Screen.width - width)/2 + width/4, (Screen.height - height)/2 + height*3, width/2, height/1.5),"Please enter a patient ID number");
		}		
	}
	
	private function startGame() {
		StaticScript.setPatientID(stringToEdit);
		Application.LoadLevel("infoScreen");
	}
}