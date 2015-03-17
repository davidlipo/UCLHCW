public static class UnityToPHP {

	private var attemptID : String;
	private var path : String = "http://localhost/unity/UCLHCW/";
	private var levelLeft : int = 0;
	private var levelRight : int = 0;
	
	public function setAttemptID() {
		Debug.Log(levelLeft);
		var form : WWWForm = new WWWForm();
		form.AddField("patientID", StaticScript.getPatientID());
		form.AddField("levelLeft", getLeftLevel());
		form.AddField("levelRight", getRightLevel());
		
		var url : String = path + "newAttempt.php";
		var w : WWW = WWW(url, form);
		
		yield w;
		
		attemptID = w.text;
		Debug.Log(attemptID);
	}

	public function sendInteractionStat(data){
		var form : WWWForm = new WWWForm();

		form.AddField("typeOfObject", data[0]);
		form.AddField("lane", data[1]);
		form.AddField("checkCollection", data[2]);
		form.AddField("time", data[3]);
		form.AddField("attemptID", attemptID);

		var url : String = path + "storeData.php";
		var w : WWW = WWW(url, form);

		yield w;

		if(w.error) {
			Debug.Log(w.error);
		}
		else {
			Debug.Log(w.text);
			Debug.Log("Data has been sent to mysql");
		}
	}
	
	public function loadLevel(){
		var form : WWWForm = new WWWForm();
		form.AddField("patientID", StaticScript.getPatientID());
		
		var url : String = path + "getLevels.php";
		var w : WWW = WWW(url, form);
		
		yield w;
		
		var result : String = w.text;
		var res = result.Split("+"[0]);
		levelLeft = parseInt(res[0]);
		levelRight = parseInt(res[1]);
		
		Debug.Log("Current level: Right - " + levelRight + "Left - " + levelLeft);
	}
	
	public function getLeftLevel() : int {
		return levelLeft;
	}
	
	public function getRightLevel() : int {
		return levelRight;
	}
}