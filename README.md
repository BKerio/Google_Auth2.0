🔐 Google OAuth 2.0 Authentication

React (TSX) + Express + MongoDB

This project implements Google Sign-In using OAuth 2.0 with a React frontend and an Express + MongoDB backend. Authentication is handled using JWT for a stateless SPA-friendly architecture.

🚀 Features

Google Sign-In with OAuth 2.0

JWT-based authentication

Protected backend routes

Role-based access support

Environment-based configuration

🏗 Tech Stack

Frontend: React + TypeScript

Backend: Express.js

Database: MongoDB

Auth Strategy: Passport Google OAuth 2.0

Token Strategy: JWT

⚙️ Setup
1️⃣ Google Cloud Console

Create a project

Enable Google OAuth 2.0

Add authorized redirect URI:

http://localhost:5000/auth/google/callback

Copy your:

GOOGLE_CLIENT_ID

GOOGLE_CLIENT_SECRET

2️⃣ Environment Variables (.env)
PORT=5000
MONGO_URI=your_mongo_uri
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
3️⃣ Install Dependencies

Backend:

npm install

Frontend:

npm install
🔄 Authentication Flow

User clicks "Continue with Google"

Frontend redirects to /auth/google

Google authenticates the user

Backend verifies user and generates JWT

JWT is sent to frontend

Frontend stores token and uses it for protected API requests

🔐 Protecting Routes

Send the token in requests:

Authorization: Bearer <token>

Backend verifies the token before granting access.

🌍 CORS Configuration

Make sure backend allows frontend origin:

origin: process.env.CLIENT_URL,
credentials: true

Frontend origin must match exactly.

🔒 Production Notes

Store secrets in .env

Use HTTPS

Use strong JWT secret

Validate tokens on protected routes

▶️ Run the Project

Backend:

npm run dev

Frontend:

npm run dev
