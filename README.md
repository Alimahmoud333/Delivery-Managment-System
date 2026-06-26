# Delivery Management System

## Overview

The Delivery Management System is a full-stack web application developed using Laravel and React.js to simplify and automate the complete delivery workflow between customers, drivers, managers, finance staff, and administrators.

The application follows a RESTful API architecture where Laravel serves as the backend and React.js provides the frontend interface. It includes secure authentication, role-based authorization, order management, payment processing, notifications, messaging, ratings, and Google Maps integration.

## Features

### Authentication

* User Registration
* Secure Login and Logout
* OTP Verification using Twilio Verify
* Laravel Sanctum Authentication
* Role-Based Authorization
* Protected API Routes
* Password Hashing
* Request Validation

### User Roles

The system supports five different roles:

* Administrator
* Customer
* Driver
* Manager
* Finance

Each role has its own dashboard, permissions, and accessible modules based on middleware authorization.

## Customer Module

Customers can:

* Register and verify their phone number using OTP
* Login securely
* Manage personal profile
* Create, update, and delete addresses
* Save pickup and drop-off locations
* Select addresses from Google Maps
* Store latitude and longitude coordinates
* Create delivery orders
* Add multiple order items
* Calculate total order price
* View order history
* Track order status
* Pay online using Stripe
* Rate completed deliveries
* Rate drivers
* Receive system notifications
* Send and receive messages

## Driver Module

Drivers can:

* View assigned deliveries
* View pickup and drop-off locations
* Open customer locations using Google Maps
* Update availability status
* Accept assigned deliveries
* Update delivery progress
* Change delivery status through different stages:

  * Assigned
  * Pickup Started
  * In Transit
  * Delivered
* Receive assignment notifications
* Communicate with customers through the messaging system

## Manager Module

Managers can:

* View all delivery orders
* Assign drivers to orders
* Monitor delivery progress
* Update order status
* View delivery statistics
* Manage the overall delivery workflow

## Finance Module

Finance users can:

* View all completed orders
* View payment records
* Update payment status
* Generate printable PDF payment reports
* Monitor payment history

## Administrator Module

Administrators have complete system access and can:

* Manage all users
* Create new users
* Update user information
* Delete users
* View all orders
* View all drivers
* Manage delivery operations
* Access platform statistics
* Control the overall system

## Address Management

The system allows customers to:

* Create multiple addresses
* Edit addresses
* Delete addresses
* Store geographic coordinates
* Select locations using Google Maps
* Use saved addresses during order creation

## Order Management

The application supports:

* Creating delivery orders
* Multiple order items
* Pickup address selection
* Drop-off address selection
* Order price calculation
* Delivery status tracking
* Driver assignment
* Delivery completion
* Customer ratings

## Payment System

Stripe is integrated to provide secure online payment processing.

Features include:

* Stripe Payment Intents
* Secure card payments
* Payment validation
* Payment history
* Payment status tracking
* Finance management

## OTP Verification

Phone number verification is implemented using Twilio Verify.

Features include:

* SMS OTP generation
* OTP verification
* Phone number validation
* Secure account activation

## Notification System

The application uses Laravel Database Notifications.

Notifications are automatically generated for different events, including:

* Driver assignment
* Order status updates
* Delivery progress updates

Customers and drivers can view notifications directly inside the application.

## Messaging System

The application includes an internal messaging system that enables communication between different users.

Supported conversations include:

* Customer ↔ Driver
* Customer ↔ Administrator
* Driver ↔ Manager

## Rating System

Customers can submit ratings after delivery completion.

Supported ratings include:

* Driver rating
* Order rating

## Google Maps Integration

Google Maps is integrated into the frontend.

Features include:

* Interactive map selection
* Pickup location display
* Drop-off location display
* Latitude and longitude storage
* Google Maps API integration
* Google Maps API Key authentication

## API Testing

All backend REST API endpoints were tested using Apidog.

The testing covered:

* Authentication
* OTP Verification
* Authorization
* User Management
* Address Management
* Orders
* Payments
* Notifications
* Messaging
* Ratings
* Driver Assignment

## Technologies

### Backend

* Laravel
* PHP
* MySQL
* Laravel Sanctum
* Eloquent ORM
* RESTful API
* Middleware
* Role-Based Authorization
* Laravel Database Notifications
* Stripe API
* Twilio Verify API

### Frontend

* React.js
* React Router DOM
* Axios
* Context API
* Reducers
* Material UI
* Material UI Icons
* Bootstrap
* React PDF
* Google Maps API

## System Architecture

```text
React.js Frontend
        │
        ▼
Laravel REST API
        │
        ▼
MySQL Database
        │
        ├── Stripe Payment Gateway
        ├── Twilio Verify API
        ├── Google Maps API
        └── Laravel Database Notifications
```

## Security

Security features implemented in the project include:

* Laravel Sanctum Authentication
* Role-Based Middleware
* Protected API Endpoints
* Password Hashing
* OTP Verification
* Authorization
* Request Validation

## Main Modules

* Authentication
* OTP Verification
* User Management
* Address Management
* Google Maps
* Order Management
* Driver Assignment
* Delivery Tracking
* Payments
* Ratings
* Notifications
* Messaging
* Reports
* Statistics

## Project Structure

```text
Delivery-Management-System
│
├── backend
│   ├── Laravel REST API
│   ├── Controllers
│   ├── Models
│   ├── Middleware
│   ├── Notifications
│   ├── Migrations
│   └── Routes
│
├── frontend
│   ├── React.js
│   ├── Components
│   ├── Context API
│   ├── Reducers
│   ├── Pages
│   ├── Services
│   ├── Material UI
│   └── Routing
│
└── Documentation
    ├── README.md
    ├── Backend README.md
    └── Frontend README.md
```

## Future Improvements

Potential future enhancements include:

* Firebase Cloud Messaging (Push Notifications)
* Real-Time Messaging using Laravel Reverb
* Live Driver Tracking
* Progressive Web Application (PWA)
* Mobile Application
* Email Notifications
* Analytics Dashboard
* Multi-language Support
* Route Optimization
* Dark Mode

## Author

Ali Mahmoud
