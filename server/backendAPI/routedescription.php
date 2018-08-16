<?php
$conn = mysqli_connect("localhost", "root", "root", "peaky");
ini_set('max_execution_time', 15000);
$output = [
	'success'=> false,
];

$routedescriptionquery = "SELECT `id`, `routeURL`, `name` FROM `routes` WHERE `hasdescription`=0";
$routedescriptionresult = mysqli_query($conn, $routedescriptionquery);

if (empty($routedescriptionresult)) {
	$output['errors'][] = 'database error - routedescription';
} else {
	if ($routedescriptionresult) {
		$output['success'] = true;
        $output['data']=[];
        while( $row = mysqli_fetch_assoc($routedescriptionresult)){
            $id = $row['id'];
            $descriptionURL = $row['routeURL'];
            
            $handler = curl_init();
            curl_setopt($handler, CURLOPT_URL, "$descriptionURL");
            curl_setopt($handler, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($handler, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($handler, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.6) Gecko/20070725 Firefox/2.0.0.6");
            curl_setopt($handler, CURLOPT_FOLLOWLOCATION, true);

            $page = curl_exec($handler);
            $start = strpos($page, 'fr-view');
            $testArea = substr($page, $start, 2500);
            $start = strpos($testArea, 'fr-view');
            $end = strpos($testArea, '</div>', $start);
            $description = substr($testArea, $start+9, $end-$start-9);
            $startKey = "a_$id";
            $data = [];
            
            $descriptionhtmldecode = html_entity_decode($description);
            $cleandescrip = strip_tags($descriptionhtmldecode);
            $descripwithslash = addslashes($cleandescrip);

            if(empty($descripwithslash)) {
                $descripwithslash = "No description available.";
            }
            
            $descripquery = "UPDATE `routes` SET `description` = '$descripwithslash', `hasdescription`=1 WHERE `ID` = '$id'";
            $descripresult = mysqli_query($conn, $descripquery);

            };
	} else {
		$output['errors'] = 'no data  - routedescription';
	};
};
$outputJSON = json_encode($output);
print_r($output['data']);

?>