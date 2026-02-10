-- SQL para criar a base e tabela (MySQL) - apenas referência
CREATE DATABASE IF NOT EXISTS web_03mb;
USE web_03mb;

CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
