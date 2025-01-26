<?php
try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'root', '');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
    exit;
}

$query = "
    SELECT inek_adi, SUM(sut_miktari) AS toplam_sut 
    FROM sil_kategori1 
    GROUP BY inek_adi
";
$stmt = $pdo->prepare($query);
$stmt->execute();
$veriler = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($veriler);
?>
