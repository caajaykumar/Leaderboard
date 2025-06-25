# Real-Time Leaderboard System

## Tech Stack
- Node.js + Express
- MongoDB + Mongoose
- Socket.io for real-time communication

## Features
- Real-time score updates
- Leaderboard filtering by region and game mode
- Top N player leaderboard

## How to Run

### Prerequisites
- Node.js
- MongoDB

### Setup
```bash
git clone <repo-url>
cd realtime-leaderboard
npm install


Real-time Leaderboard System
A real-time leaderboard system built with Node.js, Express, Socket.io, and MongoDB that allows players to update scores and view rankings in real-time.
Features

Real-time Score Updates: Instant score updates via Socket.io
Top N Leaderboard: Display top players with customizable limits
Region & Game Mode Filtering: Filter by region (Asia, Europe, America, Global) and game mode (Classic, Survival, Battle)
Live Leaderboard Updates: Automatic leaderboard refresh when scores change
REST API: HTTP endpoints for direct database access
Responsive Design: Mobile-friendly interface

🛠️ Tech Stack

Backend: Node.js, Express
Real-time Communication: Socket.io
Database: MongoDB with Mongoose
Frontend: Vanilla HTML/CSS/JavaScript

📋 Prerequisites
Before running this application, make sure you have:

Node.js (v16 or higher)
MongoDB (local installation or MongoDB Atlas)
npm or yarn package manager

🔧 Installation

Clone the repository
bashgit clone <repository-url>
cd realtime-leaderboard

Install dependencies
bashnpm install

Start MongoDB
For local MongoDB:
bashmongod
Or configure MongoDB Atlas connection string in server.js
Start the server
bash# Development mode with nodemon
npm run dev

# Production mode