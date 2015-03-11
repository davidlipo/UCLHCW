public static class UnityToPHP {

	private var attemptID : String;

	public function setAttemptID(patientID) {
		attemptID = getNewAttemptID(patientID).text;
	}

	public function sendInteractionStat(data){
		var form = new WWWForm();

		form.AddField("typeOfObject", data[0]);
		form.AddField("lane", data[1]);
		form.AddField("checkCollection", data[2]);
		form.AddField("time", data[3]);
		form.AddField("attemptID", attemptID);

		var url = "http://localhost/unity/UCLHCW/storeData.php";
		var w = WWW(url, form);

		yield w;

		if(w.error) {
			Debug.Log(w.error);
		}
		else {
			Debug.Log(w.text);
			Debug.Log("Data has been sent to mysql");
		}
	}
	
	public function getNewAttemptID(patientID) : IEnumerator {
		var form = new WWWForm();
		form.AddField("patientID", patientID);
		form.AddField("level", 1);
		
		var url = "http://localhost/unity/UCLHCW/newAttempt.php";
		var w = WWW(url, form);
		
		yield w;
	}
}