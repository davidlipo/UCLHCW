<?php // content="text/plain; charset=utf-8"
require_once ('jpgraph/src/jpgraph.php');
require_once ('jpgraph/src/jpgraph_bar.php');

$attemptID = $_POST["attemptID"];
$patientID = $_POST["patientID"];
$leftLevel = $_POST["leftLevel"];
$rightLevel = $_POST["rightLevel"];
$type = $_POST["type"];
$graph = $_POST["graph"];

$link = mysqli_connect("localhost", "root", "", "uclvr");

if ($graph == "indAtt" && $type == "coin") {
    $query = mysqli_query($link, "SELECT * FROM patientStats WHERE attemptID = '$attemptID' AND type = '$type'");

    $dataSucc = array();
    $dataFail = array();

    while($res = mysqli_fetch_assoc($query)) {
        if($res['collected'] == 1) {
            if(isset($dataSucc[$res['laneNo']])) {
                $dataSucc[$res['laneNo']] += 1;
            }
            else {
                $dataSucc[$res['laneNo']] = 1;
            }
        }
        else {
            if(isset($dataFail[$res['laneNo']])) {
                $dataFail[$res['laneNo']] += 1;
            }
            else {
                $dataFail[$res['laneNo']] = 1;
            }
        }
    }

    foreach ($dataSucc as $i => $value) {
        if(isset($dataFail[$i])) {
            $data[$i] = $value / ($value + $dataFail[$i]);
        }
        else {
            $data[$i] = 1;
        }
    }

    foreach ($dataFail as $i => $value) {
        if(!isset($data[$i])) {
            $data[$i] = 0;
        }
    }

    ksort($data);

    $keyArray = array();
    $dataArray = array();

    foreach ($data as $i => $value) {
        $dataArray[] = $value;
        $keyArray[] = $i;
    }

    // Create the graph. These two calls are always required
    $graph = new Graph(350,200,'auto');
    $graph->SetScale("textlin");

    $graph->SetBox(false);

    $graph->ygrid->SetFill(false);
    $graph->xaxis->SetTickLabels($keyArray);
    $graph->yaxis->HideLine(false);
    $graph->yaxis->HideTicks(false,false);

    // Create the bar plots
    $b1plot = new BarPlot($dataArray);

    // Create the grouped bar plot
    $gbplot = new GroupBarPlot(array($b1plot));
    // ...and add it to the graPH
    $graph->Add($gbplot);


    $b1plot->SetColor("white");
    $b1plot->SetFillColor("#cc1111");

    $graph->title->Set("Percentage of coins collected in relative lanes");
}

if ($graph == "indAtt" && $type == "wall") {
    $query = mysqli_query($link, "SELECT * FROM patientStats WHERE attemptID = '$attemptID' AND type = '$type'");

    $dataSucc = array();
    $dataFail = array();

    while($res = mysqli_fetch_assoc($query)) {
        if($res['collected'] == 1) {
            if(isset($dataSucc[$res['laneNo']])) {
                $dataSucc[$res['laneNo']] += 1;
            }
            else {
                $dataSucc[$res['laneNo']] = 1;
            }
        }
        else {
            if(isset($dataFail[$res['laneNo']])) {
                $dataFail[$res['laneNo']] += 1;
            }
            else {
                $dataFail[$res['laneNo']] = 1;
            }
        }
    }

    foreach ($dataSucc as $i => $value) {
        if(isset($dataFail[$i])) {
            $data[$i] = $value / ($value + $dataFail[$i]);
        }
        else {
            $data[$i] = 1;
        }
    }

    foreach ($dataFail as $i => $value) {
        if(!isset($data[$i])) {
            $data[$i] = 0;
        }
    }

    ksort($data);

    $keyArray = array();
    $dataArray = array();

    foreach ($data as $i => $value) {
        $dataArray[] = $value;
        $keyArray[] = $i;
    }

    // Create the graph. These two calls are always required
    $graph = new Graph(350,200,'auto');
    $graph->SetScale("textlin");

    $graph->SetBox(false);

    $graph->ygrid->SetFill(false);
    $graph->xaxis->SetTickLabels($keyArray);
    $graph->yaxis->HideLine(false);
    $graph->yaxis->HideTicks(false,false);

    // Create the bar plots
    $b1plot = new BarPlot($dataArray);

    // Create the grouped bar plot
    $gbplot = new GroupBarPlot(array($b1plot));
    // ...and add it to the graPH
    $graph->Add($gbplot);


    $b1plot->SetColor("white");
    $b1plot->SetFillColor("#cc1111");

    $graph->title->Set("Percentage of walls avoided in relative lanes");
}


// Display the graph
$graph->Stroke();
?>