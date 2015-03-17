<?php

$link = mysqli_connect("localhost", "root", "", "uclvr");

$patientID = $_POST['patientID'];


$queryPatient = mysqli_query($link, "SELECT * FROM attempts WHERE patientID = '$patientID' ORDER BY attemptID DESC LIMIT 1");
$resPatient = mysqli_fetch_assoc($queryPatient);
$attemptID = $resPatient['attemptID'];
$levelLeft = $resPatient['levelLeft'];
$levelRight = $resPatient['levelRight'];

$leftLevel = $levelLeft + levelsToProgress($levelLeft, "<");
$rightLevel = $levelRight + levelsToProgress($levelRight, ">");

echo $leftLevel . "+" . $rightLevel;

function levelsToProgress($level, $arrow) {
	global $link, $attemptID;
	$query = mysqli_query($link, "SELECT * FROM patientStats WHERE attemptID = '$attemptID' AND type = 'coin' AND laneNo $arrow '0'");

	$total = 0;
	$size = 0;

	while($res = mysqli_fetch_assoc($query)) {
		if($res['collected'] == 1) {
			$total += 1 - min(($res['timeTaken']*$level)/16, 1);
		}
		$size++;
	}

	$progress = $total / ($size == 0 ? 1 : $size);

	if ($progress > 0.6) {
		return 3;
	}
	else if ($progress > 0.4) {
		return 2;
	}
	else if ($progress > 0.2) {
		return 1;
	}
	return 0;		
}

?>