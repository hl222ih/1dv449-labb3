<?php
session_start();
/**
 * Eftersom applikationen saknar inloggning så är detta bara ett sätt att något försvåra direktåtkomst till resurser
 */

function getToken() {
    if (!isset($_SESSION['token'])) {
        $_SESSION['token'] = base64_encode( openssl_random_pseudo_bytes(32));
    }
    return $_SESSION['token'];
}

function checkToken() {
    $isAuthenticated = false;
    if (isset($_SERVER['HTTP_X_AUTH_TOKEN'])) {
        $isAuthenticated = ($_SERVER['HTTP_X_AUTH_TOKEN'] == getToken());
    }
    return $isAuthenticated;
}

function getGoogleMapsApiKey() {
    try {
        $key = file_get_contents('data/google-maps-api-key.txt');
    } catch (\Exception $ex) {
        $key = "";
    }
    return $key;
}