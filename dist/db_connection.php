<?php
//teszteléshez localhost, szerver a weblapon
//localhost
/*
$host = "localhost";
$db   = "pizza";
$user = "root";
$pass = "";
*/
//szerver
$host = "localhost";
$db   = "nzlzyt_ea_db";
$user = "nzlzyt_ea_db";
$pass = "ea&13%aOv";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=UTF8",$user,$pass,
    [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]);
} catch (PDOException $e) {
    die("Database connection failed");
}
