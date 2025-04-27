-- Create Database
CREATE DATABASE IF NOT EXISTS financial_signup;
USE financial_signup;

-- Create Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    password VARCHAR(255) NOT NULL,
    investment_goal VARCHAR(100),
    risk_tolerance VARCHAR(50),
    employment_status VARCHAR(50),
    annual_income DECIMAL(15,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Optional: Create index for faster queries
CREATE INDEX idx_email ON users(email);
CREATE INDEX idx_phone ON users(phone_number);