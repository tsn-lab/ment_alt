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

$stmt = $conn->prepare("SELECT index_tg FROM tgtrialtrustee WHERE worker_ID='$mturkworkerID' ORDER BY index_tg DESC LIMIT 1");
$stmt->execute();
$results = $stmt->get_result();
if ($results->num_rows > 0) {
    // output data of each row
    while($row = $results->fetch_assoc()) {
        $total[] = $row['index_tg'];}
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
