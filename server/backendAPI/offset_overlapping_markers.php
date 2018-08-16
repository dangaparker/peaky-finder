<?php
//Finds locations that have the same latitude and longitude and offsets them 
//so that they do not overlap on the map. 

//Queries database to get locations where latitudes repeat for multiple locations
$query = "SELECT `ID`, `avgLat`, COUNT(`avgLat`) AS 'match_lat' FROM `locations` GROUP BY `avgLat` ORDER BY COUNT(`avgLat`) DESC";
$result = mysqli_query($conn,$query);

//Sorts through the query result to save latitudes that are repeated
if ( mysqli_num_rows($result) > 0 ) {
    while ( $row = mysqli_fetch_assoc($result) ) {
        if($row['match_lat'] > 1 && $row['avgLat']!=0){
        $overlap_lat[] = $row;
        }
    }
}

//Makes an array of rows that have the same latitude 
//Saves the latitude and longitude of the first row
//Checks if the next row on the table has the same latitude and longitude 
//If it has the same latitude and longitude, the latitude gets decremented by .0001
//It loops to do this for each group of rows that have the same latitude 

for ( $lat_i = 0; $lat_i < count($overlap_lat); $lat_i++ ){
    //Makes an array of rows that have the same latitude 
    $lat = $overlap_lat[$lat_i]['avgLat'];
    $query = "SELECT `ID`, `avgLat`, `avgLong` FROM `locations` WHERE ROUND(`avgLat`, 4) = $lat";
    $result = mysqli_query($conn,$query);

    if ( mysqli_num_rows($result) > 0 ) {
        while ( $row = mysqli_fetch_assoc($result) ) {
            $locs_with_same_lats[] = $row;
        }
    }

    //Here is saves the latitude and longitude of the first row 
    $lat_this_arr = $locs_with_same_lats[0]['avgLat'];
    $lon_this_arr = $locs_with_same_lats[0]['avgLong'];

    //Here it checks if other rows in the array have the same lat and lon as the first row
    //If so it decrimants the latitude by .0001
    for ( $loc_i = 1; $loc_i < count($locs_with_same_lats); $loc_i++ ){
        if($locs_with_same_lats[$loc_i]['avgLat'] === $lat_this_arr 
        && $locs_with_same_lats[$loc_i]['avgLong'] === $lon_this_arr){
            $locs_with_same_lats[$loc_i]['avgLat'] -= ($loc_i/10000*4);
        }
    }

    //Inserts the modified latitudes into the database 
    for ( $i=0; $i<count($locs_with_same_lats); $i++){
    $id = $locs_with_same_lats[$i]['ID'];
    $avgLat = $locs_with_same_lats[$i]['avgLat'];
    $query = "UPDATE `locations` SET `avgLat`=$avgLat WHERE `id`=$id";
    $result = mysqli_query($conn,$query);
    }

    $locs_with_same_lats = null;
}