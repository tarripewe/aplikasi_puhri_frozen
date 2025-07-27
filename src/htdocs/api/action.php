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

// === Aksi CREATE ===
elseif ($aksi === "create") {
    try {
        $stmt = $pdo->prepare("INSERT INTO produk (nama_produk, harga, qty, uom, stok_reminder, sku) 
                               VALUES (:nama_produk, :harga, :qty, :uom, :stok_reminder, :sku)");
        $stmt->execute([
            ':nama_produk'   => $input->nama_produk ?? '',
            ':harga'         => $input->harga ?? 0,
            ':qty'           => $input->qty ?? 0,
            ':uom'           => $input->uom ?? '',
            ':stok_reminder' => $input->stok_reminder ?? 0,
            ':sku'           => $input->sku ?? ''
        ]);

        echo json_encode(["status" => "success", "message" => "Produk berhasil ditambahkan"]);
    } catch (PDOException $e) {
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
}

// === Aksi TIDAK VALID ===
else {
    echo json_encode(["status" => "error", "message" => "Aksi tidak valid"]);
}
