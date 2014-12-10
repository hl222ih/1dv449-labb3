<?php


$context = stream_context_create(array(
    'http' => array(
        'method' => 'GET',
        'header' => 'User-Agent: hl222ih@student.lnu.se for an assignment in a course at LNU',
        'timeout' => 5,
    )
));

$trafficJson = file_get_contents('http://api.sr.se/api/v2/traffic/messages/?format=json', false, $context);
if ($trafficJson) {
    echo $trafficJson;
} else {
    //header("HTTP/1.0 408 Request Timeout");
    echo json_encode(array('error' => 'Misslyckades att hämta data.'), JSON_UNESCAPED_UNICODE);
}
