<?php

$place = $_GET['data'];
$place = str_replace(' ','', $place);
$curl = curl_init();

curl_setopt_array($curl, array(
    CURLOPT_URL => "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=$place&inputtype=textquery&fields=photos,formatted_address,name,rating,geometry&key=AIzaSyB5ttVsVVQIAV9P0pjryi7rTT9ZXn64jEs",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "GET",
    CURLOPT_SSL_VERIFYPEER => false

));

$response = curl_exec($curl);
$err = curl_error($curl);
curl_close($curl);

if ($err) {
    echo "cURL Error #:" . $err;
} else {
    $response = json_decode($response);
    $status = $response -> status;
    if($status === 'ZERO_RESULTS') {
        $output['error']="zero_results";
        $jsonoutput = json_encode($output);
        print_r($jsonoutput);
        exit;
    } else if ($status === 'INVALID_REQUEST') {
        $output['error']="invalid_request";
        $jsonoutput = json_encode($output);
        print_r($jsonoutput);
        exit;
    };
    
    $lat = $response->candidates[0]->geometry->location->lat;
    $lon = $response->candidates[0]->geometry->location->lng;
};

?>