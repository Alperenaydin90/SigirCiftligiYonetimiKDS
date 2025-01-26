<?php
try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'root', '');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
    exit;
}

$query = "
    SELECT inek_adi, SUM(sut_miktari) AS toplam_sut, SUM(yem_miktari) AS toplam_yem, SUM(kilo) AS toplam_kilo 
    FROM sil_kategori1 
    GROUP BY inek_adi
";
$stmt = $pdo->prepare($query);
$stmt->execute();
$veriler = $stmt->fetchAll(PDO::FETCH_ASSOC);

foreach ($veriler as &$veri) {
    $sutGetirisi = $veri['toplam_sut'] * 20;  
    $yemGideri = $veri['toplam_yem'] * 2;    
    $kiloGetirisi = $veri['toplam_kilo'] * 200;  
    $veri['brut_getiri'] = $sutGetirisi - $yemGideri + $kiloGetirisi; 
}

echo json_encode($veriler);
?>
