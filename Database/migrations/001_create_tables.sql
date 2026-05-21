-- Migration: Create initial tables
-- Run this to set up your database structure

CREATE DATABASE IF NOT EXISTS yourdbname;
USE yourdbname;

CREATE TABLE IF NOT EXISTS example_table (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(255) NOT NULL,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
