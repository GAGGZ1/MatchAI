# ❤️ MatchAI

AI-powered matchmaking platform built with the MERN stack, combining traditional compatibility rules with LLM-based relationship insights.

Frontend link : https://match-ai-xi.vercel.app/
Backend link : https://matchai-1.onrender.com/

## Overview

MatchAI helps users discover meaningful connections through:

* Profile-based matching
* AI-powered compatibility analysis
* AI-generated introduction messages
* Like / Pass system
* Mutual match detection
* Personalized recommendations
* Detailed matchmaking profiles

The application combines business-rule matching with AI-generated compatibility scores using Groq LLMs.

---

## Features

### Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes

### Profile Management

Users can create detailed matchmaking profiles including:

* First Name & Last Name
* Gender
* Date of Birth
* Location
* Height & Weight
* Religion & Caste
* Education Details
* Company & Designation
* Income Information
* Languages Known
* Family Information
* Relationship Preferences
* Personality Scores
* Interests & Hobbies
* About Me Section

---

### AI Compatibility Analysis

Generate AI-powered compatibility reports between users.

Includes:

* Compatibility Score
* Relationship Analysis
* Green Flags
* Yellow Flags
* Personalized Insights

Powered by Groq LLM.

---

### AI Introduction Generator

Generate personalized introduction messages between matched users.

Example:

> Hi, I'm excited to connect with a fellow coding and travel enthusiast. Looking forward to getting to know you.

---

### Recommendation Engine

Hybrid scoring system:

#### Business Score

Based on:

* Shared Interests
* Family Preferences
* Relocation Preferences
* Children Preferences
* Location Compatibility

#### AI Score

Generated using Groq AI.

#### Final Score

Final recommendation ranking:

```text
70% Business Score
30% AI Score
```

---

### Like / Pass System

Users can:

* ❤️ Like Profiles
* ❌ Pass Profiles

When two users like each other:

* Match is automatically created
* Connection appears in "My Connections"

---

### Connections

View all mutual matches including:

* Name
* Email
* Match Score
* Match Explanation

---

## Tech Stack

### Frontend

* React
* Vite
* React Router
* Axios
* Tailwind CSS
* React Toastify

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcryptjs

### AI

* Groq API
* Llama Models

---

## Project Structure

```text
MatchAI
│
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── services
│   │   ├── utils
│   │   ├── app.js
│   │   ├── server.js
│   │   └── seed.js
│
├── frontend
│   ├── src
│   │   ├── api
│   │   ├── components
│   │   ├── pages
│   │   ├── App.jsx
│   │   └── main.jsx
│
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/MatchAI.git

cd MatchAI
```

---

## Backend Setup

```bash
cd backend

npm install
```

Create a `.env` file:

```env
PORT=5001

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GROQ_API_KEY=your_groq_api_key
```

Start backend:

```bash
npm start
```

or

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

Backend runs on:

```text
http://localhost:5001
```

---

## Seed Demo Users

Generate sample matchmaking profiles:

```bash
node seed.js
```

Creates:

* Male Profiles
* Female Profiles
* Sample Interests
* Demo Matchmaking Data

---

## API Endpoints

### Auth

```http
POST /api/auth/register

POST /api/auth/login

GET /api/auth/me
```

### Profiles

```http
POST /api/profile

GET /api/profile/:id
```

### Matches

```http
GET /api/matches

GET /api/matches/connections
```

### Likes

```http
POST /api/likes

POST /api/likes/pass
```

### AI

```http
POST /api/ai/compatibility

POST /api/ai/intro
```

---

## Screenshots

### Login
<img width="1474" height="717" alt="image" src="https://github.com/user-attachments/assets/cbbed1e4-bb43-4fb0-a6bb-7a25c25e756c" />


Modern authentication UI built with Tailwind CSS.

### Dashboard
<img width="1512" height="711" alt="image" src="https://github.com/user-attachments/assets/e2305ea8-e868-4d57-b12d-59de6c8ce493" />


* Recommended Matches
* AI Match Scores
* Compatibility Insights
* Like / Pass Actions
  <img width="1506" height="743" alt="image" src="https://github.com/user-attachments/assets/7e407832-78cd-4ad9-a4f4-58bb0e37b685" />
  <img width="1469" height="713" alt="image" src="https://github.com/user-attachments/assets/2b9c023d-c9b4-4189-baa1-ce5d81377f72" />



### Connections
<img width="1481" height="676" alt="image" src="https://github.com/user-attachments/assets/3e175050-25e0-47b4-8128-7225c9222f9f" />


* Mutual Matches
* Match History
* Relationship Insights

---

## Future Improvements

* Profile Photo Uploads
* Real-time Chat
* Notifications
* Advanced Search Filters
* Video Profiles
* AI Relationship Coach
* Mobile App
* Subscription Plans
* Voice Introductions
* Multi-language Support

---

## Learning Outcomes

This project demonstrates:

* Full Stack MERN Development
* JWT Authentication
* MongoDB Data Modeling
* REST API Design
* AI Integration with Groq
* Recommendation Systems
* React State Management
* Tailwind CSS UI Development

---

## Author

**Gagan Chauhan**

Software Engineer | Full Stack Developer | AI Enthusiast

GitHub: https://github.com/GAGGZ1
