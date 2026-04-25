<?php
require "db_connection.php";
$action = $_POST['action'];

switch ($action) {
    case 'read':  
        try {
            $stmt = $pdo->query("SELECT * FROM rendeles");
            $readData=$stmt->fetchAll();
            echo json_encode(['status' => 'Sikeres betöltés!', "readData"=>$readData]);
        }
        catch(PDOException $e) {
          echo json_encode(['status' => 'Olvasási hiba!']);
        }
        break;
    case 'create':
        try {
            $stmt = $pdo->prepare("INSERT INTO rendeles (pizzanev, darab, felvetel, kiszallitas) VALUES (?, ?, ?, ?)");
            $stmt->execute([$_POST["pizzanev"], $_POST["darab"], $_POST["felvetel"], $_POST["kiszallitas"]]);
            echo json_encode(['status' => 'Sikeres hozzáadás!']);
        }
        catch(PDOException $e) {
          echo json_encode(['status' => 'Hozzáadási hiba!']);
        }
        break;
    case 'update':
        try {
            $stmt = $pdo->prepare("UPDATE rendeles SET pizzanev=?, darab=?, felvetel=?, kiszallitas=? WHERE az=?");
            $stmt->execute([$_POST["pizzanev"], $_POST["darab"], $_POST["felvetel"], $_POST["kiszallitas"], $_POST["az"]]);
            echo json_encode(['status' => 'Sikeres frissítés!']);
        }
        catch(PDOException $e) {
          echo json_encode(['status' => 'Frissítési hiba!']);
        }
        break;
    case 'delete':
        try {
            $stmt = $pdo->prepare("DELETE FROM rendeles WHERE az=?");
            $stmt->execute([$_POST["az"]]);
            echo json_encode(['status' => 'Sikeres törlés!']);
        }
        catch(PDOException $e) {
          echo json_encode(['status' => 'Törlési hiba!']);
        }
        break;
}
