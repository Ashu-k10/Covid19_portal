<?php
// config.php - database connection (PDO) + shared helpers
session_start();
$pdo = new PDO('mysql:host=localhost;dbname=covid_portal;charset=utf8mb4',
               'root', '', [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);

// Same regular expressions as validators.js (server-side re-check)
$RULES = [
  'full_name' => '/^[A-Za-z][A-Za-z ]{2,29}$/',
  'email'     => '/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/',
  'phone'     => '/^[6-9]\d{9}$/',
  'username'  => '/^[A-Za-z][A-Za-z0-9_]{3,15}$/',
  'password'  => '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,20}$/',
  'age'       => '/^(?:1[89]|[2-9]\d|1[01]\d)$/',
  'city'      => '/^[A-Za-z][A-Za-z .-]{1,49}$/',
  'comment'   => '/^(?!.*<\s*\/?\s*script)[\s\S]{3,300}$/i',
];

function validate(array $fields): array {
  global $RULES; $errors = [];
  foreach ($fields as $name => $value)
    if (!preg_match($RULES[$name], trim($value))) $errors[] = $name;
  return $errors;
}
function reply(array $data, int $code = 200) {
  http_response_code($code);
  header('Content-Type: application/json');
  echo json_encode($data); exit;
}
