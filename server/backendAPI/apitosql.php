<?php
$lat = 36.2352;//Insert latitude here - If south, have number negative;
$long = -121.4688;//Insert longitude here - If west, have number negative;

$conn = mysqli_connect("localhost", "root", "root", "peaky");
$handler = curl_init();

curl_setopt($handler, CURLOPT_URL, "https://www.mountainproject.com/data/get-routes-for-lat-lon?lat={$lat}&lon={$long}&maxResults=500&maxDistance=50&key=200289763-98ec05129d51c9ebcc2366ea2558c334");
curl_setopt($handler, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($handler, CURLOPT_RETURNTRANSFER, 1);

$jsonresult = curl_exec($handler);
$result = json_decode($jsonresult);
$routes = $result->routes;

for ($routeCount=0; $routeCount < count($routes); ++$routeCount) {
    $routeID = $routes[$routeCount]->id;
    $routeName = $routes[$routeCount]->name;
    $routeType = $routes[$routeCount]->type;
    $routeDifficulty = $routes[$routeCount]->rating;
    $routeStars = $routes[$routeCount]->stars;
    $routeStarVotes = $routes[$routeCount]->starVotes;
    $routePitch = $routes[$routeCount]->pitches;
    $routeState = $routes[$routeCount]->location[0];
    $routeRegion = $routes[$routeCount]->location[1];
    $routePark = $routes[$routeCount]->location[2];
    $routeMountain = $routes[$routeCount]->location[3];
    $routeImage = $routes[$routeCount]->imgMedium;
    $routeLongitude = $routes[$routeCount]->longitude;
    $routeLatitude = $routes[$routeCount]->latitude;
    $routeURL = $routes[$routeCount]->url;

    if (!isset($routeMountain)) {
        continue;
    };

    $query = "INSERT INTO `peaky`.`routes` (`id`, `locationID`, `name`, `type`, `difficulty`, `stars`, `star_votes`, `pitches`, `location_state`, `location_region`, `location_park`, `location_mountain`, `image`, `longitude`, `latitude`, `routeURL`, `hasdescription`) VALUES ('$routeID', '0', '$routeName', '$routeType', '$routeDifficulty', '$routeStars', '$routeStarVotes', '$routePitch', '$routeState', '$routeRegion', '$routePark', '$routeMountain', '$routeImage', '$routeLongitude', '$routeLatitude', '$routeURL', 0)";
    $result = mysqli_query($conn, $query);

    if (empty($result)) {
        $output['errors'][] = 'database error - apitosql';
    } else {
        if (mysqli_affected_rows($conn) > 0 ) {
            if ($routeCount === count($routes)-1) {
                include_once "createlocations.php";
            };
        } else {
            $output['errors'][] = 'no data - apitosql';
        };
    }; 
}; 
curl_close($handler);

?>