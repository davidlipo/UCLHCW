public static class UnityToPHP {

	private var attemptID : String;
	private var path : String = "http://localhost/UCLHCW/";

	public function setAttemptID(patientID : String) {
		var form : WWWForm = new WWWForm();
		form.AddField("patientID", patientID);
		form.AddField("levelLeft", 1);
		form.AddField("levelRight", 1);
		
		var url : String = path + "newAttempt.php";
		var w : WWW = WWW(url, form);
		
		yield w;
		
		attemptID = w.text;
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
}