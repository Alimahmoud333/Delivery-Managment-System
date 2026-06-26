# Delivery Management System - Frontend

## Overview

This project is the React.js frontend for the Delivery Management System.

The frontend communicates with the Laravel REST API and provides dedicated dashboards for customers, drivers, managers, finance users, and administrators.

The application is fully responsive and built using Material UI.

---

# Technologies

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

# Features

## Authentication

- Login
- Registration
- OTP Verification
- Protected Routes

---

# Customer Dashboard

Customers can:

- Manage Addresses
- View Google Maps
- Create Orders
- Add Order Items
- Track Orders
- Make Stripe Payments
- Rate Orders
- Rate Drivers
- View Notifications
- Chat with Drivers

---

# Driver Dashboard

Drivers can:

- View Deliveries
- Update Availability
- Update Delivery Status
- View Customer Locations
- Receive Notifications
- Chat with Customers

---

# Manager Dashboard

Managers can:

- View Orders
- Assign Drivers
- Update Order Status
- View Statistics

---

# Finance Dashboard

Finance users can:

- View Payments
- Manage Payment Status
- Print PDF Reports

---

# Admin Dashboard

Administrators can:

- Manage Users
- Create Users
- Edit Users
- Delete Users
- Manage Drivers
- View Orders
- View Statistics

---

# Google Maps

Google Maps is integrated to display customer locations.

Features include:

- Google Maps API
- API Key Integration
- Marker Placement
- Pickup Location
- Drop-off Location

---

# Stripe Integration

The frontend integrates Stripe Elements for secure payment processing.

Features:

- Card Input
- Payment Confirmation
- Payment Status

---

# Notifications

The application displays Laravel Database Notifications.

Users can:

- View Notifications
- Read Notifications
- Notification Counter

---

# Messaging

Built-in messaging allows communication between users.

---

# State Management

Global application state is managed using:

- Context API
- Reducers

---

# API Communication

Axios is used to communicate with the Laravel backend.

Features:

- Authentication Headers
- Token Management
- Error Handling
- Protected Requests

---

# Routing

React Router DOM provides:

- Public Routes
- Protected Routes
- Role-Based Navigation

---

# User Interface

Material UI is used throughout the application.

Components include:

- Cards
- Tables
- Forms
- Dialogs
- Navigation Drawers
- Snackbars
- Icons

Bootstrap is also used for additional responsive layout utilities.

---

# Project Structure

```text
src
│
├── api
├── components
├── context
├── layouts
├── pages
├── reducers
├── routes
├── utils
└── assets
```

---

# Installation

```bash
git clone Delivery-Managment-System

cd frontend

npm install

npm run dev
```

---

# Environment Variables

Configure the following variables:

```env
VITE_API_URL=

VITE_STRIPE_PUBLIC_KEY=

VITE_GOOGLE_MAPS_API_KEY=
```

---

# Dependencies

Main libraries include:

- React
- Axios
- React Router DOM
- Material UI
- Material UI Icons
- Bootstrap
- React PDF
- Google Maps API
- Stripe React SDK

---

# Author

Ali Mahmoud
