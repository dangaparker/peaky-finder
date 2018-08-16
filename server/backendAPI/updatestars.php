<?php
$conn = mysqli_connect("localhost", "root", "root", "peaky");

$query = "SELECT `id` FROM `routes`";
$result = mysqli_query($conn, $query);

if ( mysqli_num_rows($result) > 0 ) {
    while ( $row = mysqli_fetch_assoc($result) ) {
        $routeArray[] = $row;
    }
};

for ($i=0; $i < count($routeArray); ++$i) {
    $routeIDURL = $routeArray[$i]['id'];
    $handler = curl_init();

    curl_setopt($handler, CURLOPT_URL, "https://www.mountainproject.com/data/get-routes?routeIds={$routeIDURL}&key=200289763-98ec05129d51c9ebcc2366ea2558c334");
    curl_setopt($handler, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($handler, CURLOPT_RETURNTRANSFER, 1);

    $jsonresult = curl_exec($handler);
    $result = json_decode($jsonresult, true);
    $routes = $result['routes'][0];

    $routeID = $routes['id'];
    $routeStar = $routes['stars'];
    $routeStarvotes = $routes['starVotes'];

    $updatestarsquery = "UPDATE `routes` SET `stars` = '$routeStar', `star_votes` = '$routeStarvotes' WHERE `ID` = '$routeID'";
    $descripresult = mysqli_query($conn, $updatestarsquery);

    curl_close($handler);
};
?>