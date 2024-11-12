<?php

//include('db_config_check.php');

$data_array = json_decode(file_get_contents('php://input'), true);
$i = 0;//(count($data_array))-1;
$mturkworkerID = $data_array[$i]['mover2_id'];

$path = "db_config_check.php";
require_once $path;

$config = new DatabaseConfiguration();
$conn = $config->createConnection();

if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}


$stmt = $conn->prepare("SELECT mover2 FROM mover2 WHERE worker_ID='$mturkworkerID'");
$stmt->execute();
$results = $stmt->get_result();
if ($results->num_rows > 0) {
    // output data of each row
    while($row = $results->fetch_assoc()) {
        $total[] = $row['mover2'];}
  } else {
    $total = 'null';
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
