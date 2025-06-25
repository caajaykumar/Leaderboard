const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
const Player = require("./models/PlayerScore");

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/leaderboard", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Create Express app and HTTP server
const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// 🔁 Socket.io logic
io.on("connection", (socket) => {
  console.log("🔌 Client connected:", socket.id);

  // ✅ Always insert new score — no update
  socket.on("sendScore", async (data) => {
    console.log("⬇️ Received score:", data);
    try {
      const newScore = new Player({
        playerId: data.playerId,
        score: data.score,
        region: data.region,
        mode: data.mode,
        createdAt: new Date(),
      });

      await newScore.save();
      console.log("✅ Score saved");
    } catch (err) {
      console.error("❌ Error saving score:", err);
    }
  });

  // 🔝 Get top 10 scores by region & mode
  socket.on("getTopPlayers", async ({ region, mode }) => {
    try {
      const topPlayers = await Player.find({ region, mode })
        .sort({ score: -1 })
        .limit(10);

      socket.emit("topPlayers", topPlayers);
      console.log("📤 Leaderboard sent");
    } catch (err) {
      console.error("❌ Error fetching leaderboard:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

// Start server
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
