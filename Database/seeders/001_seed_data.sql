-- Seeder: Insert default data for Smilly Dental App
-- Run AFTER migrations
-- Test passwords: admin123, patient123

USE smilly_db;

-- Clear existing data (optional - comment out if you want to keep existing records)
-- TRUNCATE TABLE users;

-- Default admin user
-- Password: admin123 (hashed with bcryptjs)
INSERT INTO users (name, email, password, role) VALUES (
  'Dr. Sarah Admin',
  'admin@smilly.com',
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.',
  'admin'
);

-- Sample staff/dentist users
INSERT INTO users (name, email, password, role) VALUES (
  'Dr. John Dentist',
  'john.dentist@smilly.com',
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.',
  'admin'
);

-- Sample patient users
INSERT INTO users (name, email, password, role) VALUES (
  'Alice Johnson',
  'alice@example.com',
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.',
  'user'
),
(
  'Bob Smith',
  'bob@example.com',
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.',
  'user'
),
(
  'Carol White',
  'carol@example.com',
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.',
  'user'
);