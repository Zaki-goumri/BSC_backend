# BSC Smart City Backend

> A backend API designed for the Hackathon App, built with Express.js and Mongoose, to manage accommodations, reservations, tourist information, transport, and emergency contacts in Boumerdes Smart City.

---

## 🚀 Overview

The **BSC Smart City Backend** provides the foundation for the Hackathon App, offering functionalities for managing user authentication, accommodations, reservations, monuments, transport details, and emergency contacts. The backend is built using **Express.js** and **Mongoose** and follows RESTful principles for easy integration and scalability.

---

## 🧱 Tech Stack

- **Backend Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Authentication**: JWT (for protected routes)
- **Password Hashing**: [bcrypt](https://www.npmjs.com/package/bcrypt)
- **API Documentation**: [Swagger](https://swagger.io/)
- **Testing**: [Jest](https://jestjs.io/)

---

## 🛠️ Getting Started

### Prerequisites

- Node.js
- MongoDB running locally or on a cloud service

### Setup

```bash
# Clone the repository
git clone https://github.com/Zaki-goumri/BSC_backend.git
cd BSC_backend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start the server
npm start
```
## 📦 Features

1. **Authentication**

   - Secure user registration and login.  
   - Password hashing with bcrypt.  
   - JWT-based authentication for protected routes (not fully implemented due to time constraints).  

2. **Places to Sleep**

   - CRUD operations for accommodations.  
   - Query and filter options by type, location, and availability.  

3. **Reservations**

   - Book and manage reservations for accommodations.  

4. **Monuments**

   - Retrieve information about local monuments and tourist spots.  
   - Detailed endpoint for each monument.  
