# GigFlow – Freelance Marketplace (Full-Stack)

GigFlow is a full-stack freelance marketplace web application where clients can post gigs, freelancers can bid on them, and clients can hire freelancers through a secure, atomic hiring flow.

The project focuses on **clean architecture, role-based flows, and backend-driven validation**, rather than UI-heavy features.

---

## Features Overview

### Authentication

- User registration & login
- JWT-based authentication using **HttpOnly cookies**
- Auth state managed on frontend using **Context API**
- Persistent login using `sessionStorage`
- Secure logout

---

### Gigs

- Clients can create gigs
- Each gig has:
  - Title
  - Description
  - Budget
  - Status (`open | assigned`)
- All users can view open gigs
- Assigned gigs are hidden from public listing

---

### Bidding System

- Freelancers can submit bids on gigs
- Each bid contains:
  - Proposal message
  - Status (`pending | hired | rejected`)
- Backend prevents:
  - Owners bidding on their own gigs
  - Duplicate bids
  - Bidding on assigned gigs

---

### Hiring Logic (Atomic)

- Client can hire **only one** bid
- On hiring:
  - Selected bid → `hired`
  - All other bids → `rejected`
  - Gig → `assigned`
- Implemented as a secure, atomic backend operation

---

### Dashboard (Role-Aware)

The dashboard is split into two tabs:

#### My Gigs (Client View)

- Shows gigs posted by the logged-in user
- Each gig allows managing bids

#### My Bids (Freelancer View)

- Shows all bids placed by the user
- Displays current bid status
- Allows navigating back to gig details

---

## Tech Stack

### Frontend

- React (Vite)
- React Router v6.4+
- Context API
- Custom hooks for API access
- Axios (with credentials)
- Tailwind CSS (UI only)

### Backend

- Express.js
- MongoDB
- Mongoose
- JWT authentication
- Centralized response handlers

---

## Architectural Decisions

- No `/auth/me` endpoint  
  → User data is returned at login and stored in Context
- No global state libraries (Redux / Zustand)
- No direct Axios calls in components
- Backend is the source of truth
- Router state used to avoid unnecessary refetches
- Dashboard separated by role concerns

---

##  Data Models

### User

```json
{
  "_id": "ObjectId",
  "name": "string",
  "email": "string",
  "password": "hashed",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

### Gig

```json
{
  "_id": "ObjectId",
  "title": "string",
  "description": "string",
  "budget": "number",
  "ownerId": "ObjectId",
  "status": ["open" , "assigned"],
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

### Bid

```json
{
  "_id": "ObjectId",
  "gigId": "ObjectId",
  "freelancerId": "ObjectId",
  "message": "string",
  "status": ["pending", "hired", "rejected"],
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

---

## API Response Format

### Success

```json
{
  "status": "success",
  "code": "SUCCESS_CODE",
  "message": "Human Readable message",
  "data": {}
}
```

### Error

```json
{
  "status": "error",
  "code": "ERROR_CODE",
  "message": "What went wrong",
  "errors": [{ "field": "fieldName", "message": "Reason" }]
}
```

---

## API Endpoints

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`

### Gigs

- `GET /api/gigs?q=optionalSearch`
- `POST /api/gigs` (auth required)

### Bids

- `POST /api/bids` (auth required)
- `GET /api/bids/:gigId` (owner only)
- `PATCH /api/bids/:bidId/hire` (owner only)
- `GET /api/bids/my` (freelancer)

---

## Error Handling Strategy

| Error Code | Meaning |
|---|---|
| `DATA_INSUFFICIENT` | Missing required fields |
| `UNAUTHORIZED` | Not logged in |
| `FORBIDDEN` | Ownership or role violation |
| `NOT_FOUND` | Invalid resource |
| `CONFLICT` | Duplicate or invalid state |
| `INTERNAL_SERVER_ERROR` | Server failure |

---

## Demo Credentials (For Testing)

Use the following test accounts to explore different flows (client & freelancer):

``` plaintext

User 1
Email: user1@gmail.com
Password: 1234567890

User 2
Email: user2@gmail.com
Password: 1234567890

User 3
Email: user3@gmail.com
Password: 1234567890
```

You can:

- Login with one user to post gigs
- Login with another user to place bids
- Observe bid status updates and hiring flow

---

## Running the Project Locally

### Backend

Create a `.env` file as `server/.env` (follow .env.example for names)

``` plaintext

PORT=3000
MONGO_URI=your_mongo_connection
JWT_SECRET=your_secret
CORS_ORIGIN=http://localhost:5173
NODE_ENV=development
```

Run in terminal

```bash
cd server
npm install
npm run dev
```

### Frontend

Create a `.env` file as `client/.env` (follow the .env.example):

``` plaintext
VITE_API_URL=http://localhost:3000/api
```

Run in the terminal

```bash
cd client
npm install
npm run dev
```

Frontend runs on:

``` URL

http://localhost:5173
```

Backend usually runs on

``` URl

http://localhost:3000