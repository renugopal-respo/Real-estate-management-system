# 🏠 Property Listing Web Application

A full-stack web application for managing and browsing property listings.  
The platform allows users to explore properties, filter results based on preferences, and manage favorite listings, while administrators can oversee and manage property data.

---

## 🚀 Features

 **Dynamic Property Filtering**
  - Filter properties based on location, price, and property type.

  **User Profiles**
  - Users can create and manage their personal profiles.

  **Favorites Management**
  - Users can save and manage their favorite properties.

  **Admin Panel**
  - Admins can add, update, and manage property listings.

  **Authentication & Authorization**
  - Secure login system implemented using **JWT (JSON Web Tokens)**.

---

##  Tech Stack

### Frontend
- React
- CSS
- Redux

### Backend
- Node.js
- Express.js

### Database
- MySQL

### Security
- JWT Authentication

---

##  Architecture

The backend follows the **MVC (Model-View-Controller)** architecture:

- **Model** – Handles database interactions  
- **Controller** – Processes business logic  
- **Routes** – Manages API endpoints  

This structure ensures **clean, maintainable, and scalable code**.

---

## 🗄 Database Design

- Designed a **normalized relational database** structure.
- Implemented **indexes** to improve query performance and retrieval speed.
- Ensures **data integrity and efficient data management**.

---

## 🔑 Authentication

- Implemented **JWT-based authentication**.
- Provides secure access control for:
  - **Users**
  - **Administrators**

---

## 📂 Project Structure
project-root
│
├── client # React frontend
│
├── server # Express backend
│
├── controllers # Business logic
│
├── models # Database models
│
├── routes # API routes
│
└── database # SQL schema
