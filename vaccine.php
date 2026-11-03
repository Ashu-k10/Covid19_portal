<?php
// vaccine.php - store vaccination registration form details
require 'config.php';
$in = ['full_name' => $_POST['full_name'] ?? '', 'age'   => $_POST['age']   ?? '',
       'phone'     => $_POST['phone']     ?? '', 'email' => $_POST['email'] ?? '',
       'city'      => $_POST['city']      ?? ''];
$dose = $_POST['dose'] ?? '';
if ($bad = validate($in) or !in_array($dose, ['First','Second','Booster']))
  reply(['ok' => false, 'invalid' => $bad ?: ['dose']], 422);

$pdo->prepare('INSERT INTO registrations (full_name,age,phone,email,city,dose) VALUES (?,?,?,?,?,?)')
    ->execute([trim($in['full_name']), $in['age'], $in['phone'], $in['email'], trim($in['city']), $dose]);
reply(['ok' => true, 'message' => 'Registration saved']);
