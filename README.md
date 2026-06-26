# Delivery Management System

A full-stack Delivery Management System developed using **Laravel** and **React.js** to manage the complete delivery process between customers, drivers, managers, finance staff, and administrators.

The application provides secure authentication, role-based authorization, order management, driver assignment, payment processing, notifications, messaging, ratings, and location management through an intuitive web interface.

---

# Project Overview

The system digitizes the delivery workflow by allowing customers to create delivery requests while managers assign drivers, drivers complete deliveries, finance staff manage payments, and administrators oversee the entire platform.

The project follows a RESTful API architecture where Laravel serves as the backend API and React.js provides the frontend user interface.

---

# Main Features

## Authentication

- User Registration
- Login / Logout
- Phone Number OTP Verification
- Laravel Sanctum Authentication
- Role-Based Authorization
- Protected API Routes
- Password Encryption

---

# User Roles

The system supports five different user roles:

- Admin
- Customer
- Driver
- Manager
- Finance

Each role has its own dashboard, permissions, and accessible modules.

---

# Customer Module

Customers can:

- Register and verify their phone number using OTP
- Login securely
- Create, edit and delete addresses
- Select pickup and drop-off addresses
- View saved addresses on Google Maps
- Create delivery orders
- Add multiple items to each order
- Calculate total delivery price
- Track order status
- Pay online using Stripe
- Rate completed orders
- Rate drivers
- Receive delivery notifications
- Chat with drivers and system users

---

# Driver Module

Drivers can:

- View assigned deliveries
- Update availability status
- Accept delivery assignments
- Update delivery progress
- Change delivery status:
  - Assigned
  - Picked Up
  - In Transit
  - Delivered

- View customer pickup and drop-off locations
- Receive assignment notifications
- Chat with customers

---

# Manager Module

Managers can:

- View all orders
- Assign drivers
- Update order status
- Monitor delivery progress
- View delivery statistics
- Manage delivery workflow

---

# Finance Module

Finance users can:

- View payments
- View completed orders
- Update payment status
- Print payment reports as PDF
- Monitor payment history

---

# Admin Module

Administrators can:

- Manage all users
- Create new users
- Edit user information
- Delete users
- View all orders
- Manage drivers
- Monitor platform statistics
- Control overall system operations

---

# Payment System

The project integrates **Stripe** to provide secure online payment processing.

Features include:

- Stripe Payment Intent
- Secure Card Payments
- Payment Validation
- Payment History
- Payment Status Tracking

---

# OTP Verification

Phone number verification is implemented using **Twilio Verify API**.

Features include:

- OTP Generation
- SMS Verification
- Phone Number Validation
- Secure User Verification

---

# Google Maps Integration

Google Maps is integrated into the frontend to manage customer locations.

Features include:

- Google Maps API
- Google Maps API Key
- Display Pickup Location
- Display Drop-off Location
- Save Latitude and Longitude
- Interactive Map Selection

---

# Notification System

The application uses **Laravel Database Notifications**.

Notifications are automatically generated when:

- A driver is assigned to an order
- Order status changes
- Delivery updates occur

Customers and drivers can view notifications directly inside the application.

---

# Messaging System

An internal messaging system allows communication between users.

Supported conversations include:

- Customer ↔ Driver
- Customer ↔ Admin
- Driver ↔ Manager

---

# API Testing

All REST API endpoints were tested using **Apidog**.

The testing covered:

- Authentication
- OTP Verification
- User Management
- Address Management
- Orders
- Payments
- Notifications
- Messaging
- Ratings
- Role Authorization

---

# Technologies Used

## Backend

- Laravel
- Laravel Sanctum
- RESTful API
- MySQL
- Eloquent ORM
- Middleware
- Role-Based Authorization
- Laravel Notifications
- Stripe API
- Twilio Verify API

---

## Frontend

- React.js
- React Router DOM
- Axios
- Context API
- Reducers
- Material UI
- Material UI Icons
- Bootstrap
- React PDF
- Google Maps API

---

# System Architecture

```text
React.js Frontend
        │
        ▼
RESTful API (Laravel)
        │
        ▼
MySQL Database
        │
        ├── Stripe
        ├── Twilio Verify
        └── Google Maps API
```

---

# Security

The application includes:

- Laravel Sanctum Authentication
- Role-Based Middleware
- Protected API Endpoints
- Request Validation
- Password Hashing
- OTP Verification
- Authorization Policies

---

# Project Structure

```text
Delivery-Management-System
│
├── backend
│   ├── Laravel
│   ├── REST API
│   └── MySQL
│
├── frontend
│   ├── React.js
│   ├── Material UI
│   ├── Context API
│   └── Axios
│
└── Documentation
    ├── README.md
    ├── Backend README
    └── Frontend README
```

---

# Main Modules

- Authentication
- OTP Verification
- User Management
- Address Management
- Google Maps
- Order Management
- Driver Assignment
- Delivery Tracking
- Payment Processing
- Ratings
- Notifications
- Messaging
- Reports
- Statistics

---

# Future Improvements

- Firebase Cloud Messaging (Push Notifications)
- Real-Time Messaging using Laravel Reverb
- Live Driver Tracking
- Mobile Application
- Email Notifications
- Analytics Dashboard
- Multi-language Support

---

# Author

**Ali Mahmoud**

---
