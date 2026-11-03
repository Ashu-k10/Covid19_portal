<?php
// login.php - authenticate a user and start a session
require 'config.php';
$stmt = $pdo->prepare('SELECT id, password_hash FROM users WHERE username = ?');
$stmt->execute([$_POST['username'] ?? '']);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user && password_verify($_POST['password'] ?? '', $user['password_hash'])) {
  session_regenerate_id(true);
  $_SESSION['uid'] = $user['id'];
  reply(['ok' => true, 'message' => 'Logged in']);
}
reply(['ok' => false, 'error' => 'Invalid username or password'], 401);
