<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Tangani preflight request (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

header('Content-Type: application/json; charset=UTF-8');

include 'db_config.php';

$data = json_decode(file_get_contents("php://input"));
$aksi = $data->aksi ?? '';

if ($aksi == "tampil") {
    $stmt = $pdo->prepare("SELECT * FROM produk ORDER BY id_produk DESC");
    $stmt->execute();
    $data = $stmt->fetchAll();
    echo json_encode($data);
}
