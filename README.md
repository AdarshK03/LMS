====================================================
LMS (Learning Management System) - Documentation
====================================================

Project: LMS
Repository: https://github.com/AdarshK03/LMS
Frontend Demo: https://vu-library.netlify.app/

----------------------------------------------------
1. PROJECT OVERVIEW
----------------------------------------------------

LMS (Learning Management System) is a full-stack web application built using
React (Vite) for the frontend and Node.js with Express for the backend.
PostgreSQL is used as the database.

The system allows users to:
- Register and log in
- Browse courses / books
- Enroll in courses
- Manage resources (admin)
- Search and filter learning content

----------------------------------------------------
2. TECHNOLOGY STACK
----------------------------------------------------

Frontend:
- React
- Vite
- Tailwind CSS
- Axios

Backend:
- Node.js
- Express.js
- JWT Authentication

Database:
- PostgreSQL

Deployment:
- Frontend: Netlify
- Backend: Any Node-compatible server (Render, Railway, VPS)

----------------------------------------------------
3. PROJECT STRUCTURE
----------------------------------------------------

Root Directory
|
|-- backend/
|   |-- src/
|   |   |-- controllers/
|   |   |-- routes/
|   |   |-- models/
|   |   |-- middlewares/
|   |   |-- index.js
|   |
|   |-- package.json
|   |-- .env
|
|-- frontend/
|   |-- src/
|   |   |-- pages/
|   |   |-- components/
|   |   |-- services/
|   |   |-- main.jsx
|   |
|   |-- package.json
|   |-- vite.config.js
|
|-- README.md / README.txt

----------------------------------------------------
4. INSTALLATION STEPS
----------------------------------------------------

PREREQUISITES:
- Node.js v16 or higher
- npm or yarn
- PostgreSQL

STEP 1: Clone Repository
------------------------
git clone https://github.com/AdarshK03/LMS.git
cd LMS

STEP 2: Backend Setup
--------------------
cd backend
npm install

Create a .env file with the following content:

PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/lms_db
JWT_SECRET=your_secret_key
NODE_ENV=development

Create database:
createdb lms_db

Run backend server:
npm run dev
OR
node src/index.js

Backend will run on:
http://localhost:5000

STEP 3: Frontend Setup
---------------------
cd ../frontend
npm install

Create .env file:
VITE_API_URL=http://localhost:5000/api

Start frontend:
npm run dev

Frontend usually runs on:
http://localhost:5173

----------------------------------------------------
5. API DOCUMENTATION
----------------------------------------------------

Base URL:
http://localhost:5000/api

AUTHENTICATION
--------------

POST /auth/register
-------------------
Request JSON:
{
  "name": "Kratos",
  "email": "kratos@example.com",
  "password": "password123"
}

Response:
{
  "id": 1,
  "name": "Kratos",
  "email": "kratos@example.com",
  "token": "JWT_TOKEN"
}

POST /auth/login
----------------
Request JSON:
{
  "email": "kratos@example.com",
  "password": "password123"
}

Response:
{
  "token": "JWT_TOKEN",
  "user": {
    "id": 1,
    "name": "Kratos",
    "email": "kratos@example.com"
  }
}

USERS
-----

GET /users/me
-------------
Headers:
Authorization: Bearer JWT_TOKEN

Response:
{
  "id": 1,
  "name": "Kratos",
  "email": "kratos@example.com",
  "role": "student"
}

COURSES
-------

GET /courses
------------
Response:
{
  "data": [
    {
      "id": 1,
      "title": "Data Structures",
      "description": "DS Course"
    }
  ]
}

GET /courses/:id
----------------
Returns details of a specific course.

POST /courses (Admin Only)
--------------------------
Headers:
Authorization: Bearer ADMIN_TOKEN

Request JSON:
{
  "title": "C++ Programming",
  "description": "Beginner to Advanced"
}

PUT /courses/:id
DELETE /courses/:id

BOOKS / LIBRARY
---------------

GET /books
----------
Returns list of books/resources.

POST /books (Admin)
-------------------
Uploads or registers a book.

ENROLLMENTS
-----------

POST /enrollments
-----------------
Request JSON:
{
  "userId": 1,
  "courseId": 2
}

GET /users/:id/enrollments
--------------------------
Returns enrolled courses for a user.

FILE UPLOAD
-----------

POST /uploads
-------------
Form-data:
file = any PDF/image

----------------------------------------------------
6. EXAMPLE USAGE (CURL)
----------------------------------------------------

REGISTER:
curl -X POST http://localhost:5000/api/auth/register \
-H "Content-Type: application/json" \
-d '{"name":"Kratos","email":"kratos@example.com","password":"password123"}'

LOGIN:
curl -X POST http://localhost:5000/api/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"kratos@example.com","password":"password123"}'

GET PROFILE:
curl -H "Authorization: Bearer TOKEN" \
http://localhost:5000/api/users/me

CREATE COURSE:
curl -X POST http://localhost:5000/api/courses \
-H "Authorization: Bearer ADMIN_TOKEN" \
-H "Content-Type: application/json" \
-d '{"title":"DBMS","description":"Database course"}'

----------------------------------------------------
7. PROJECT ARCHITECTURE
----------------------------------------------------

Frontend Architecture:
- Pages handle routing and views
- Components are reusable UI elements
- Axios service handles API calls
- JWT stored in localStorage
- Axios interceptor adds token automatically

Backend Architecture:
- index.js initializes Express server
- Routes define endpoints
- Controllers contain business logic
- Models handle database queries
- Middleware handles authentication
- JWT verifies protected routes




END OF DOCUMENTATION
====================================================
