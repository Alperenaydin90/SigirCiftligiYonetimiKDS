<?php
try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'root', ''); // Veritabanı bilgilerinizi güncelleyin
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}

$inekAdi = isset($_GET['inek_adi']) ? $_GET['inek_adi'] : '';

if (!empty($inekAdi)) {
    $stmt = $pdo->prepare("SELECT * FROM sil_kategori1 WHERE inek_adi = :inek_adi");
    $stmt->bindParam(':inek_adi', $inekAdi);
    $stmt->execute();
    
    $veriler = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($veriler) {
        echo json_encode($veriler);
    } else {
        echo json_encode(["message" => "Bu inek için veri bulunamadı!"]);
    }
} else {
    echo json_encode(["message" => "İnek adı belirtilmedi."]);
}
?>
