<?php
// comment.php - list comments (GET) or add a comment (POST, logged-in users only)
require 'config.php';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  if (empty($_SESSION['uid'])) reply(['ok' => false, 'error' => 'Please log in first'], 401);
  if (validate(['comment' => $_POST['comment'] ?? ''])) reply(['ok' => false, 'error' => 'Invalid comment'], 422);
  $pdo->prepare('INSERT INTO comments (user_id, comment) VALUES (?, ?)')
      ->execute([$_SESSION['uid'], trim($_POST['comment'])]);
  reply(['ok' => true]);
}
$rows = $pdo->query('SELECT u.username, c.comment, c.created_at FROM comments c
                     JOIN users u ON u.id = c.user_id ORDER BY c.id DESC LIMIT 20')
            ->fetchAll(PDO::FETCH_ASSOC);
reply($rows);
