
# **Hackathon App Backend**

This repository contains the backend API for the Hackathon App, built with **Express.js** and **Mongoose**. The backend provides RESTful APIs for managing authentication, accommodations, reservations, monuments, transport information, and emergency contacts.

---

## **Features**

### 1. **Authentication**
- Secure user registration and login.
- Password hashing with **bcrypt**.
- JWT-based authentication for protected routes(not implemented now due to short time).

### 2. **Places to Sleep**
- CRUD operations for accommodations.
- Query and filter options by type, location, and availability.

### 3. **Reservations**
- Book and manage reservations for accommodations.

### 4. **Monuments**
- Retrieve information about monuments and tourist spots.
- Detailed endpoint for each monument.

### 5. **Chatbot Integration**
- REST API endpoint to interact with a chatbot (external service).
- 
### 7. **Emergency Contacts**
- List of emergency services and contact information.

---

## **Tech Stack**

### **Backend Framework**
- **Express.js**: Fast and minimalist web framework for Node.js.

### **Database**
- **MongoDB** with **Mongoose**: Schema-based data modeling.

### **Security**
- **JWT**: For user authentication.
- **bcrypt**: For secure password hashing.

---

