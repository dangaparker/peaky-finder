<?php
header("Access-Control-Allow-Origin: *");
$routeIDs = $_GET['routeIDs'];
$locationID = json_decode($_GET['locationID']);

if($routeIDs == 'null'){
    $routeIDs = null;
}

require 'mysql_connect.php';


$output = [
    "success" => false,
    "error" => []
];

if (isset($routeIDs)){
    $query = "SELECT `id`, `name`, `type_abbrev` AS 'type', `difficulty` FROM `routes` WHERE `id` IN ({$routeIDs})";
} elseif (isset($locationID)){
    $query = "SELECT `id`, `name`, `type_abbrev` AS 'type', `difficulty` FROM `routes` WHERE `locationID` = $locationID";
} else {
    $output['error'][] = 'No data passed in.';
}

$result = mysqli_query($conn, $query);

if(empty($result)) {
    $output['data'][] = 'Database Error';
} else {
    if(mysqli_num_rows($result) > 0) {
        while($row = mysqli_fetch_assoc($result)) {
            $output['data']['routes'][] = $row;
        }
        $output['success'] = true;
    } else {
        $output['success'] = 'No Data';
    }
}


$outputJSON = json_encode($output);
print_r($outputJSON);

?>