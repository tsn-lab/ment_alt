<?php

//include('db_config_check.php');

//$data_array = json_decode(file_get_contents('php://input'), true);
//$i = (count($data_array))-1;
//$mturkworkerID = $data_array[$i]['worker_ID'];

$path = "db_config_check.php";
require_once $path;

$config = new DatabaseConfiguration();
$conn = $config->createConnection();

if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}


$stmt = $conn->prepare("SELECT * FROM list WHERE controller='0'");
$stmt->execute();
$results = $stmt->get_result();
if ($results->num_rows > 0) {
    // output data of each row
    while($row = $results->fetch_assoc()) {
        $array1[] = $row['worker_ID'];}
  }
if (!isset($array1)) {$array1 = 0;}

$stmt2 = $conn->prepare("SELECT * FROM pairs");
$stmt2->execute();
$results2 = $stmt2->get_result();
if ($results2->num_rows > 0) {
    // output data of each row
    while($row2 = $results2->fetch_assoc()) {
        $array2[] = $row2['controlled_id'];}
  }
if (!isset($array2)) {$array2 = 0;}

if ($array1!=0){
  if ($array2!=0){
for ($i=0; $i<count($array1); $i++){
  if (!in_array($array1[$i],$array2)){
    $output1[] = $array1[$i];
  }
}} else {$output1[] = $array1[0];}}

if (isset($output1)){
$stmt3 = $conn->prepare("SELECT * FROM dropouts");
  $stmt3->execute();
  $results3 = $stmt3->get_result();
  if ($results3->num_rows > 0) {
      // output data of each row
      while($row3 = $results3->fetch_assoc()) {
          $array3[] = $row3['worker_ID'];}
    }
    $stmt3->close();
    
  if (isset($array3)){
    for ($i=0; $i<count($output1); $i++){
      if (!in_array($output1[$i],$array3)){
        $output[] = $output1[$i];
      }
    }
    if (!isset($output)) {$output = 0;}
  } else {$output = $output1[0];}
  } else {$output = 0;}

$stmt->close();
$stmt2->close();
$conn->close();

$output = json_encode($output);
echo $output;
?>
