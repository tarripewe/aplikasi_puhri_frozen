<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

header('Content-Type: application/json; charset=UTF-8');

include 'db_config.php';

$data = json_decode(file_get_contents("php://input"));
$aksi = $data->aksi ?? '';

try {
    switch ($aksi) {
        case 'tampil':
            $stmt = $pdo->prepare("SELECT * FROM produk ORDER BY id_produk DESC");
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($result);
            break;

        case 'tambah':
            $stmt = $pdo->prepare("INSERT INTO produk (nama_produk, harga, qty, uom, stok_reminder, sku) 
                                   VALUES (:nama_produk, :harga, :qty, :uom, :stok_reminder, :sku)");
            $stmt->bindParam(':nama_produk', $data->nama_produk);
            $stmt->bindParam(':harga', $data->harga);
            $stmt->bindParam(':qty', $data->qty);
            $stmt->bindParam(':uom', $data->uom);
            $stmt->bindParam(':stok_reminder', $data->stok_reminder);
            $stmt->bindParam(':sku', $data->sku);
            $stmt->execute();
            echo json_encode(["success" => true, "msg" => "Produk berhasil ditambahkan"]);
            break;

        case 'edit':
            if (!isset($data->id_produk)) {
                echo json_encode(["success" => false, "msg" => "ID produk tidak ditemukan"]);
                break;
            }

            $stmt = $pdo->prepare("UPDATE produk SET 
                nama_produk = :nama_produk,
                harga = :harga,
                qty = :qty,
                uom = :uom,
                stok_reminder = :stok_reminder,
                sku = :sku
                WHERE id_produk = :id_produk");

            $stmt->bindParam(':nama_produk', $data->nama_produk);
            $stmt->bindParam(':harga', $data->harga);
            $stmt->bindParam(':qty', $data->qty);
            $stmt->bindParam(':uom', $data->uom);
            $stmt->bindParam(':stok_reminder', $data->stok_reminder);
            $stmt->bindParam(':sku', $data->sku);
            $stmt->bindParam(':id_produk', $data->id_produk);
            $stmt->execute();
            echo json_encode(['success' => true, 'msg' => 'Produk berhasil diperbarui']);
            break;

        default:
            echo json_encode(["success" => false, "msg" => "Aksi tidak valid"]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'msg' => $e->getMessage()]);
}
