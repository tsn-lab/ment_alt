<?php

//include('db_config_check.php');

$data_array = json_decode(file_get_contents('php://input'), true);
$i = (count($data_array))-1;
$mturkworkerID = $data_array[$i]['worker_ID'];

$path = "db_config_check.php";
require_once $path;

$config = new DatabaseConfiguration();
$conn = $config->createConnection();

if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}

// get subject's status of the experiment
$query = "SELECT COUNT(task) AS total FROM summary WHERE worker_ID=? AND task='quiz_mistakes'";
if ($stmt = mysqli_prepare($conn, $query)) {
    mysqli_stmt_bind_param($stmt, 's', $mturkworkerID);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_bind_result($stmt, $total);
    mysqli_stmt_fetch($stmt);
    mysqli_stmt_close($stmt);
}

mysqli_close($conn);
echo $total;
//echo json_encode($total);
?>
