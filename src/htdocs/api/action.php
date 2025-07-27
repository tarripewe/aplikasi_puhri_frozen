<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Tangani preflight request
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
    exit();
}

// === Aksi TAMBAH Produk ===
if ($aksi == "tambah") {
    try {
        $stmt = $pdo->prepare("INSERT INTO produk (nama_produk, harga, qty, uom, stok_reminder, sku) 
                               VALUES (:nama_produk, :harga, :qty, :uom, :stok_reminder, :sku)");

        $stmt->bindParam(':nama_produk', $data->nama_produk, PDO::PARAM_STR);
        $stmt->bindParam(':harga', $data->harga);
        $stmt->bindParam(':qty', $data->qty);
        $stmt->bindParam(':uom', $data->uom, PDO::PARAM_STR);
        $stmt->bindParam(':stok_reminder', $data->stok_reminder, PDO::PARAM_INT);
        $stmt->bindParam(':sku', $data->sku, PDO::PARAM_STR);

        $stmt->execute();

        echo json_encode(["success" => true, "msg" => "Produk berhasil ditambahkan"]);
    } catch (Exception $e) {
        echo json_encode(["success" => false, "msg" => $e->getMessage()]);
    }
    exit();
}

// Default jika aksi tidak dikenal
echo json_encode(["success" => false, "msg" => "Aksi tidak valid"]);
