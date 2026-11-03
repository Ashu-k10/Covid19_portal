CREATE DATABASE IF NOT EXISTS covid_portal CHARACTER SET utf8mb4;
USE covid_portal;

CREATE TABLE users (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  full_name     VARCHAR(30)  NOT NULL,
  email         VARCHAR(100) NOT NULL UNIQUE,
  username      VARCHAR(16)  NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE registrations (          -- vaccination registration form
  id         INT AUTO_INCREMENT PRIMARY KEY,
  full_name  VARCHAR(30) NOT NULL,
  age        TINYINT UNSIGNED NOT NULL,
  phone      CHAR(10)    NOT NULL,
  email      VARCHAR(100) NOT NULL,
  city       VARCHAR(50) NOT NULL,
  dose       ENUM('First','Second','Booster') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE comments (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  user_id    INT NOT NULL,
  comment    VARCHAR(300) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
