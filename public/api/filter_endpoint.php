<?php
header("Access-Control-Allow-Origin: *");
require 'mysql_connect.php';

$regex = [];

$output = [
    'success' => false,
    'error' => []
];


//$rock = $_POST['rock'];
$radius = json_decode( $_POST['radius'] );
$traditional = json_decode( $_POST['traditional'] );
$topRope = json_decode( $_POST['topRope'] );
$sport = json_decode( $_POST['sport'] );
// $aid = $_POST['aid'];
$boulder = json_decode( $_POST['boulder'] );
// $ice = $_POST['ice'];
// $snow = $_POST['snow'];
$rockDiffMin = $_POST['rockDiffStart'];
$rockDiffMax = $_POST['rockDiffEnd'];
$boulderDiffMin = $_POST['boulderDiffStart'];
$boulderDiffMax = $_POST['boulderDiffEnd'];
$mapCenterLat = $_POST['mapCenterLat'];
$mapCenterLong = $_POST['mapCenterLong'];


if($sport) {
    $regex[] = 'sport?';
}

if($traditional) {
    $regex[] = 'trad';
}

if($topRope) {
    $regex[] = 'tr';
}

// if($rock) {
//     $regex[] = 'rock';
// }

// if($aid) {
//     $regex[] = 'aid';
// }

if($boulder) {
    $regex[] = 'bou';
}

// if($ice) {
//     $regex[] = 'ice';
// }

// if($snow) {
//     $regex[] = 'snow';
// }


$regexString = join("|", $regex);

//Takes '5.' off of the front of the string
$pattern = '/5\./';
$replacement = '';
$rockDiffMin = preg_replace($pattern, $replacement, $rockDiffMin);

//Takes '5.' off of the front of the string
$pattern = '/5\./';
$replacement = '';
$rockDiffMax = preg_replace($pattern, $replacement, $rockDiffMax);

//Replaces the a,b,c or d with .2, .4, .6, or .8 so they can be converted to floats and ordered properly
    //Checks if there is an 'a' after the rating and replaces it with '.2'
if (preg_match('/[0-9]{1,2}a/', $rockDiffMin)){
    $pattern = '/a/';
    $replacement = '.2';
    $rockDiffMin = preg_replace($pattern, $replacement, $rockDiffMin);
}
else if (preg_match('/[0-9]{1,2}b/', $rockDiffMin)){
    $pattern = '/b/';
    $replacement = '.4';
    $rockDiffMin = preg_replace($pattern, $replacement, $rockDiffMin);
}
else if (preg_match('/[0-9]{1,2}c/', $rockDiffMin)){
    $pattern = '/c/';
    $replacement = '.6';
    $rockDiffMin = preg_replace($pattern, $replacement, $rockDiffMin);
}
else if (preg_match('/[0-9]{1,2}d/', $rockDiffMin)){
    $pattern = '/d/';
    $replacement = '.8';
    $rockDiffMin = preg_replace($pattern, $replacement, $rockDiffMin);
}

//Replaces the a,b,c or d with .2, .4, .6, or .8 so they can be converted to floats and ordered properly
    //Checks if there is an 'a' after the rating and replaces it with '.2'
if (preg_match('/[0-9]{1,2}a/', $rockDiffMax)){
    $pattern = '/a/';
    $replacement = '.2';
    $rockDiffMax = preg_replace($pattern, $replacement, $rockDiffMax);
}
else if (preg_match('/[0-9]{1,2}b/', $rockDiffMax)){
    $pattern = '/b/';
    $replacement = '.4';
    $rockDiffMax = preg_replace($pattern, $replacement, $rockDiffMax);
}
else if (preg_match('/[0-9]{1,2}c/', $rockDiffMax)){
    $pattern = '/c/';
    $replacement = '.6';
    $rockDiffMax = preg_replace($pattern, $replacement, $rockDiffMax);
}
else if (preg_match('/[0-9]{1,2}d/', $rockDiffMax)){
    $pattern = '/d/';
    $replacement = '.8';
    $rockDiffMax = preg_replace($pattern, $replacement, $rockDiffMax);
}
$difficultyString = '';
if($traditional|$topRope|$sport){
    $difficultyString = $difficultyString . "`routes`.`rock_difficulty` BETWEEN {$rockDiffMin} AND {$rockDiffMax} ";
}
if($boulder){
    $difficultyString = $difficultyString . "OR `routes`.`boulder_difficulty` BETWEEN '{$boulderDiffMin}' AND '{$boulderDiffMax}'";
}
if($boulder && !$traditional && !$topRope && !$sport){
    $difficultyString = "`routes`.`boulder_difficulty` BETWEEN '{$boulderDiffMin}' AND '{$boulderDiffMax}'";
}
//AND `routes`.`rock_difficulty` BETWEEN {$rockDiffMin} AND {$rockDiffMax}
//AND `routes`.`boulder_difficulty` BETWEEN '{$boulderDiffMin}' AND '{$boulderDiffMax}'

$query = "SELECT `locations`.`ID` AS 'Location ID', 
`locations`.`name`, 
`locations`.`avgLat`, 
`locations`.`avgLong`, 
`routes`.`id` AS 'Route IDs',
`avgLat`, `avgLong`, SQRT( POW(69.1 * (`avgLat` - {$mapCenterLat}), 2) + POW(69.1 * ({$mapCenterLong} - `avgLong`) * COS(`avgLat` / 57.3), 2)) AS distance
    FROM `locations`
    JOIN `routes` ON `locations`.`ID` = `routes`.`locationID`
    WHERE LOWER(`type`) REGEXP '{$regexString}'
    AND ({$difficultyString})
HAVING distance < {$radius}";

// print($query);
// exit();

$result = mysqli_query($conn, $query);

if(empty($result)) {
    $output['error'] = mysqli_error($conn);
} else {
    if(mysqli_num_rows($result) > 0) {
        while($row = mysqli_fetch_assoc($result)) {
            $areaID = $row['Location ID'];
            if(isset($output['data'][$areaID])) {
                $output['data'][$areaID]['Route IDs'] .= ',' . $row['Route IDs'];
                $output['data'][$areaID]['numRoutes'] += 1;
            } else {
                $output['data'][$areaID] = [
                    'name' => $row['name'],
                    'avgLat' => $row['avgLat'],
                    'avgLong' => $row['avgLong'],
                    'numRoutes' => 1,
                    'Route IDs' => $row['Route IDs'],
                    'ID' => $areaID
                ];
            }
        }
        $output['success'] = true;
    } else {
        $output['error'] = 'No Data';
    }
}

$output = json_encode($output);
print_r($output);

?>