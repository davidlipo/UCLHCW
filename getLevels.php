<?php

$link = mysqli_connect("localhost", "root", "", "uclvr");

$attemptID = $_GET['attemptID'];

$arrow = ">";

$queryAttempt = mysqli_query($link, "SELECT * FROM attempts WHERE attemptID = '$attemptID'");
$resAttempt = mysqli_fetch_assoc($queryAttempt);
$levelLeft = $resAttempt['levelLeft'];
$levelRight = $resAttempt['levelRight'];

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
			$total += 1 - min(($res['timeTaken']*$level)/8, 1);
		}
		$size++;
	}

	$progress = $total / $size;

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