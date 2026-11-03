<?php
// register.php - create a user account
require 'config.php';
if ($_SERVER['REQUEST_METHOD'] !== 'POST') reply(['error' => 'POST only'], 405);

$in = ['full_name' => $_POST['full_name'] ?? '', 'email' => $_POST['email'] ?? '',
       'username'  => $_POST['username']  ?? '', 'password' => $_POST['password'] ?? ''];
if ($bad = validate($in)) reply(['ok' => false, 'invalid' => $bad], 422);

$stmt = $pdo->prepare('SELECT id FROM users WHERE email = ? OR username = ?');
$stmt->execute([$in['email'], $in['username']]);
if ($stmt->fetch()) reply(['ok' => false, 'error' => 'Email or username already exists'], 409);

$pdo->prepare('INSERT INTO users (full_name,email,username,password_hash) VALUES (?,?,?,?)')
    ->execute([trim($in['full_name']), $in['email'], $in['username'],
               password_hash($in['password'], PASSWORD_DEFAULT)]);
reply(['ok' => true, 'message' => 'Account created. Please log in.']);
