<?php
header('Content-Type: application/json');
require "db_connection.php";

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'GET': 
        try {
            $stmt = $pdo->query("SELECT * FROM pizza");
            $readData=$stmt->fetchAll();
            echo json_encode(['status' => 'Read success!', "readData"=>$readData]);
        }
        catch(PDOException $e) {
            echo json_encode(['status' => 'Read error!']);
        }
        break;
    case 'POST':
        try {
            $data = json_decode(file_get_contents("php://input"), true);
            $stmt = $pdo->prepare("INSERT INTO pizza (nev, kategorianev, vegetarianus) VALUES (?, ?, ?)");
            $stmt->execute([$data['nev'], $data['kategorianev'], $data['vegetarianus']]);
            echo json_encode(['status' => 'Create success!']);
        }
            catch(PDOException $e) {
            echo json_encode(['status' => 'Create error!']);
        }
        break;
    case 'PUT':
        try {
            $data = json_decode(file_get_contents("php://input"), true);
            $stmt = $pdo->prepare("UPDATE pizza SET nev=?, kategorianev=?, vegetarianus=? WHERE nev=?");
            $stmt->execute([$data['newnev'], $data['kategorianev'], $data['vegetarianus'], $data['oldnev']]);
            echo json_encode(['status' => 'Update success!']);
        }
        catch(PDOException $e) {
            echo json_encode(['status' => 'Update error!']);
        }
        break;
    case 'DELETE':
        try {
            $data = json_decode(file_get_contents("php://input"), true);
            $stmt = $pdo->prepare("DELETE FROM pizza WHERE nev=?");
            $stmt->execute([$data['nev']]);
            echo json_encode(['status' => 'Delete success!']);
        }
        catch(PDOException $e) {
            echo json_encode(['status' => 'Delete error!']);
        }
        break;
    }
?>