<?php

$query = "SELECT `locationID`, AVG(`latitude`) AS 'avgLat' FROM	`routes` GROUP BY `locationID`";
$result = mysqli_query($conn,$query);
$latitudes = [];

if ( mysqli_num_rows($result) > 0 ) {
    while ( $row = mysqli_fetch_assoc($result) ) {
        $latitudes[] = $row;
    };
};

for( $i = 0; $i < count($latitudes); $i++ ){
    $query = "UPDATE `locations` SET `avgLat`={$latitudes[$i]['avgLat']} WHERE `ID`={$latitudes[$i]['locationID']}";
    $result = mysqli_query($conn,$query);
};

$query = "SELECT locationID, AVG(longitude) AS avgLon FROM routes GROUP BY locationID";
$result = mysqli_query($conn, $query);
$longitude = [];

if(mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
        $longitude[] = $row;
    };
};

for($i = 0; $i < count($longitude); $i++) {
    $insertQuery = "UPDATE locations SET avgLong = {$longitude[$i]['avgLon']} WHERE ID = {$longitude[$i]['locationID']}";
    $result2 = mysqli_query($conn, $insertQuery);
};

include_once "offset_overlapping_markers.php";
include_once "clean_boulder_difficulties.php";
include_once "clean_rock_difficulties.php";
include_once "type_abbrev.php";
include_once "routedescription.php";
?>