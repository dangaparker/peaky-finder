<?php

$grouplocationquery = "INSERT INTO `locations` (`name`) SELECT `location_mountain` FROM `routes` WHERE `hasdescription`=0 GROUP BY `location_mountain`";
$grouplocationresult = mysqli_query($conn, $grouplocationquery);

$addlocationidquery = "UPDATE `routes` JOIN `locations` ON `routes`.`location_mountain` = `locations`.`name` SET `routes`.`locationID` = `locations`.`ID`";
$addlocationidresult = mysqli_query($conn, $addlocationidquery);

$locminmaxquery = "SELECT MIN(ID), MAX(ID) FROM `locations`";
$locminmaxresult = mysqli_query($conn, $locminmaxquery);

$row = mysqli_fetch_assoc($locminmaxresult);
$min = $row['MIN(ID)'];
$max = $row['MAX(ID)'];

for ($locCount = $min; $locCount <= $max; ++$locCount) {
    $loccountbuildquery = "SELECT COUNT(*) FROM `routes` WHERE locationID = $locCount";
    $loccountbuildresult = mysqli_query($conn, $loccountbuildquery);
    
    $row = mysqli_fetch_assoc($loccountbuildresult);
    $numCount = $row['COUNT(*)'];

    $query = "UPDATE `locations` SET `numRoutes` = $numCount, `hasRoute`=1 WHERE `ID` = $locCount";
    $result = mysqli_query($conn, $query);

    if (empty($result)) {
        $output['errors'][] = 'database error - createlocations';
    } else {
        if (mysqli_affected_rows($conn) > 0 ) {
            $output['success'] = true;
            if (intval($locCount) === intval($max)) {
                include_once "avgLatLong.php";
            } else {
                print_r("In progress");
            };
        } else {
            $output['errors'][] = 'no data  - createlocations';
        };
    };
};

?>