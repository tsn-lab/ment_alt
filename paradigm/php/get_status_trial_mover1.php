<?php

//include('db_config_check.php');

$data_array = json_decode(file_get_contents('php://input'), true);
$i = 0;//(count($data_array))-1;
$mturkworkerID = $data_array[$i]['mover1_id'];

$path = "db_config_check.php";
require_once $path;

$config = new DatabaseConfiguration();
$conn = $config->createConnection();

if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}

// get subject's status of the experiment
// $query = "SELECT COUNT(event) AS total FROM tgtrial WHERE task='trustee_decision'";
// $query = "SELECT reciprocity AS total FROM tgtrial WHERE task='trustee_decision'";
/*if ($stmt = mysqli_prepare($conn, $query)) {
    //mysqli_stmt_bind_param($stmt, 's', $mturkworkerID);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_bind_result($stmt, $total);
    mysqli_stmt_fetch($stmt);
    mysqli_stmt_close($stmt);
}*/

//$stmt = $conn->prepare("SELECT reciprocity AS total FROM tgtrial WHERE trial='trustee_decision'");
//$stmt = $conn->prepare("SELECT index_tg FROM tgtrialtrustor WHERE worker_ID='$mturkworkerID'");
$stmt = $conn->prepare("SELECT index_cpd FROM mover1 WHERE worker_ID='$mturkworkerID' ORDER BY index_cpd DESC LIMIT 1");
$stmt->execute();
$results = $stmt->get_result();
if ($results->num_rows > 0) {
    // output data of each row
    while($row = $results->fetch_assoc()) {
        $total[] = $row['index_cpd'];}
  } else {
    $total = 0;
  }
  //if ($results->num_rows < 1){$total = 0;}
  //else {$total = $results;}
//mysqli_close($conn);

$stmt->close();
$results = null;
$row = null;
$conn->close();
//echo $total;
//echo json_encode($total);
$total = json_encode($total);
//$total = str_replace("[]","", $total);
echo $total;
?>
