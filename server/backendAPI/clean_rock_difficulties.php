<?php

$query = "SELECT `id`, `difficulty` FROM `routes` WHERE LOWER(`type`) REGEXP 'sport?|trad|tr' AND `hasdescription`=0 AND NOT (LOWER(`type`) REGEXP 'ice|snow')";
$result = mysqli_query($conn,$query);

if ( mysqli_num_rows($result) > 0 ) {
    while ( $row = mysqli_fetch_assoc($result) ) {
        $ids_and_diffs[] = $row;
    }
}

//Callback function that converts boulder ratings to rock ratings 
function boulder_rock_convert($boul_diff){
    switch($boul_diff){
        case 'V0':
            return '5.10';
            break;
    }
    switch($boul_diff){
        case 'V1':
            return '5.10+';
            break;
    }
    switch($boul_diff){
        case 'V2':
            return '5.11';
            break;
    }
    switch($boul_diff){
        case 'V3':
            return '5.11+';
            break;
    }
    switch($boul_diff){
        case 'V4':
            return '5.12-';
            break;
    }
    switch($boul_diff){
        case 'V5':
            return '5.12a/b';
            break;
    }
    switch($boul_diff){
        case 'V6':
            return '5.12b/c';
            break;
    }
    switch($boul_diff){
        case 'V7':
            return '5.12c/d';
            break;
    }
    switch($boul_diff){
        case 'V8':
            return '5.13';
            break;
    }
    switch($boul_diff){
        case 'V9':
            return '5.13a/b';
            break;
    }
    switch($boul_diff){
        case 'V10':
            return '5.13b/c';
            break;
    }
    switch($boul_diff){
        case 'V11':
            return '5.13c/d';
            break;
    }
    switch($boul_diff){
        case 'V12':
            return '5.14a/b';
            break;
    }
    switch($boul_diff){
        case 'V13':
            return '5.14b/c';
            break;
    }
    switch($boul_diff){
        case 'V14':
            return '5.14c/d';
            break;
    }
    switch($boul_diff){
        case 'V15':
            return '5.15';
            break;
    default:
            return 'V?';
    }    
}

//This converts boulder ratings to rock ratings if the database only has a boulder rating 
for( $i=0; $i<count($ids_and_diffs); $i++ ){
    $ids_and_diffs[$i]['difficulty'] = preg_replace_callback(
        '/\bV[1-9][0-9]?/', 
        function($match){
            //Calls the boulder_rock_convert callback function
            return boulder_rock_convert($match[0]);
        }, 
        $ids_and_diffs[$i]['difficulty']
    );
}

//Removes '5.' from the beginning of the difficulties so that they order correctly
for( $i=0; $i<count($ids_and_diffs); $i++ ){
    $pattern = '/5\./';
    $replacement = '';
    $ids_and_diffs[$i]['difficulty'] = preg_replace($pattern, $replacement, $ids_and_diffs[$i]['difficulty']);
}

//Replaces the a,b,c or d with .2, .4, .6, or .8 so they can be converted to floats and ordered properly
for ( $i=0; $i<count($ids_and_diffs); $i++){
    //Checks if there is an 'a' after the rating and replaces it with '.2'
    if (preg_match('/[0-9]{1,2}a/', $ids_and_diffs[$i]['difficulty'])){
        $pattern = '/a/';
        $replacement = '.2';
        $ids_and_diffs[$i]['difficulty'] = preg_replace($pattern, $replacement, $ids_and_diffs[$i]['difficulty']);
    }
    else if (preg_match('/[0-9]{1,2}b/', $ids_and_diffs[$i]['difficulty'])){
        $pattern = '/b/';
        $replacement = '.4';
        $ids_and_diffs[$i]['difficulty'] = preg_replace($pattern, $replacement, $ids_and_diffs[$i]['difficulty']);
    }
    else if (preg_match('/[0-9]{1,2}c/', $ids_and_diffs[$i]['difficulty'])){
        $pattern = '/c/';
        $replacement = '.6';
        $ids_and_diffs[$i]['difficulty'] = preg_replace($pattern, $replacement, $ids_and_diffs[$i]['difficulty']);
    }
    else if (preg_match('/[0-9]{1,2}d/', $ids_and_diffs[$i]['difficulty'])){
        $pattern = '/d/';
        $replacement = '.8';
        $ids_and_diffs[$i]['difficulty'] = preg_replace($pattern, $replacement, $ids_and_diffs[$i]['difficulty']);
    }
}

//Converts difficulties to floats 
for ( $i=0; $i<count($ids_and_diffs); $i++){
    $ids_and_diffs[$i]['difficulty'] = floatval($ids_and_diffs[$i]['difficulty']);
}

//Inserts the cleaned difficuly strings into the database 
for ( $i=0; $i<count($ids_and_diffs); $i++){
    $id = $ids_and_diffs[$i]['id'];
    $diff = $ids_and_diffs[$i]['difficulty'];
    $query = "UPDATE `routes` SET `rock_difficulty`='{$diff}' WHERE `id`=$id";
    $result = mysqli_query($conn,$query);
}