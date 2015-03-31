<?php // content="text/plain; charset=utf-8"
require_once ('jpgraph/src/jpgraph.php');
require_once ('jpgraph/src/jpgraph_bar.php');

$type = $_POST["type"];
$attemptTime = $_POST["attemptTime"];

$link = mysqli_connect("localhost", "root", "", "uclvr");
    
$query = mysqli_query($link, "SELECT * FROM patientStats, attempts WHERE attempts.attemptID = patientStats.attemptID AND time = '$attemptTime' AND type = '$type' GROUP BY ID");

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
    $graph = new Graph(1000,600,'auto');
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

    if($type == "coin"){
        $graph->title->Set("Percentage of coins collected in relative lanes");
    }
    else
        $graph->title->Set("Percentage of walls avoided in relative lanes");

// Display the graph
$graph->Stroke();
//end
?>