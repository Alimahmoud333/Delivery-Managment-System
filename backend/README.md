# Delivery Management System - Backend

## Overview

This project is the backend API for the Delivery Management System. It is built using Laravel and provides secure RESTful APIs for authentication, user management, delivery management, payments, notifications, messaging, and role-based authorization.

The backend serves five different user roles:

- Admin
- Customer
- Driver
- Manager
- Finance

---

# Technologies

- Laravel
- PHP
- MySQL
- Laravel Sanctum
- Eloquent ORM
- Laravel Notifications
- Laravel Middleware
- Twilio Verify API
- Stripe API
- RESTful API

---

# Main Features

## Authentication

- User Registration
- Login
- Logout
- OTP Verification
- Phone Number Verification
- Laravel Sanctum Authentication

---

## Authorization

Role-based middleware protects every API endpoint.

Supported roles:

- Admin
- Customer
- Driver
- Manager
- Finance

---

# Customer APIs

Customers can:

- Manage Addresses
- Create Orders
- Update Orders
- Delete Orders
- Add Pickup Address
- Add Drop-off Address
- Add Order Items
- View Orders
- Track Order Status
- Pay Orders
- Rate Drivers
- Rate Orders

---

# Driver APIs

Drivers can:

- View Assigned Orders
- Update Availability
- Update Delivery Status
- View Customer Locations
- Receive Notifications
- Chat with Customers

Delivery statuses include:

- Assigned
- Picked Up
- In Transit
- Delivered

---

# Manager APIs

Managers can:

- View Orders
- Assign Drivers
- Update Order Status
- View Statistics

---

# Finance APIs

Finance users can:

- View Payments
- View Orders
- Update Payment Status
- Generate PDF Reports

---

# Admin APIs

Administrators can:

- Manage Users
- Create Users
- Update Users
- Delete Users
- View Drivers
- View Orders
- View Statistics

---

# Authentication

Authentication is implemented using Laravel Sanctum.

Features:

- Personal Access Tokens
- Protected Routes
- Auth Middleware

---

# OTP Verification

Phone verification uses Twilio Verify API.

Features:

- OTP Generation
- SMS Verification
- Phone Validation

---

# Stripe Payment

Stripe is integrated using Payment Intents.

Features include:

- Secure Card Payments
- Payment Status
- Transaction Records
- Payment History

---

# Notifications

The backend uses Laravel Database Notifications.

Notifications are sent for:

- Driver Assignment
- Order Status Updates
- Delivery Updates

---

# Messaging

The API provides messaging endpoints allowing communication between users.

---

# API Structure

Main API modules include:

- Authentication
- Users
- Addresses
- Orders
- Drivers
- Payments
- Ratings
- Notifications
- Messages
- Statistics

---

# Validation

Laravel Form Request Validation is used to validate incoming requests before processing.

---

# Security

- Laravel Sanctum
- Role Middleware
- Password Hashing
- Authorization
- Validation
- Protected APIs

---

# Database

Database: MySQL

Main Tables:

- users
- addresses
- orders
- order_items
- deliveries
- payments
- ratings
- messages
- notifications

---

# API Testing

All backend endpoints were tested using Apidog.

Testing includes:

- Authentication
- Authorization
- CRUD Operations
- OTP Verification
- Stripe Payments
- Notifications
- Messaging

---

# Installation

```bash
git clone <repository>

cd backend

composer install

cp .env.example .env

php artisan key:generate

php artisan migrate --seed

php artisan serve
```

---

# Environment Variables

Configure the following services inside the .env file:

- Database
- Sanctum
- Twilio
- Stripe
- Mail

---

# Author

Ali Mahmoud
