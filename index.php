<?php
    session_start();
	require_once("security.php");
/*    header("Content-Security-Policy: script-src 'self' http://ajax.googleapis.com http://maxcdn.bootstrapcdn.com https://maps.googleapis.com https://maps.gstatic.com");*/
?>
<!DOCTYPE html>
<html lang="sv">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="token" content="<?php echo getToken() ?>"/>
    <title>1dv449 labb3 (hl222ih)</title>
    <link rel="stylesheet" type="text/css" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css" />
    <link rel="stylesheet" type="text/css" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap-theme.min.css" />
    <link rel="stylesheet" type="text/css" href="css/styles.css?random=<?php echo rand(1,10000); ?>" />
    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=<?php getGoogleMapsApiKey() ?>&v=3.18&language=sv&region=SE"></script>

</head>

<body>
<div id="container">
    <h1>Trafikhändelser</h1>
    <div id="category" class="btn-group" role="group">
        <button type="radio" class="btn btn-default choice" data-choice="">Alla</button>
        <button type="radio" class="btn btn-default choice" data-choice="0">Vägtrafik</button>
        <button type="radio" class="btn btn-default choice" data-choice="1">Kollektivtrafik</button>
        <button type="radio" class="btn btn-default choice" data-choice="2">Planerad störning</button>
        <button type="radio" class="btn btn-default choice" data-choice="3">Övrigt</button>
    </div>
    <ul id="content">
    </ul>
    <div id="map"></div>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>
    <script src="js/app.js?random=<?php echo rand(1,10000); ?>"></script>
</body>
</html>