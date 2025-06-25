// const PlayerScore = require("../models/PlayerScore");

// module.exports = (io, socket) => {
//   // Update score
// socket.on("scoreUpdate", async ({ playerId, region, mode, score }) => {
//   const player = await PlayerScore.findOneAndUpdate(
//     { playerId, region, mode },
//     { $inc: { score: score } },  // use "score" directly
//     { new: true, upsert: true }
//   );
//   io.emit("leaderboardUpdate", await getTopPlayers(region, mode));
// });

//   // Fetch top N players
//   socket.on("fetchTopPlayers", async ({ region, mode, limit = 10 }) => {
//     const players = await getTopPlayers(region, mode, limit);
//     socket.emit("topPlayers", players);
//   });

//   const getTopPlayers = async (region, mode, limit = 10) => {
//     return await PlayerScore.find({ region, mode })
//       .sort({ score: -1 })
//       .limit(limit);
//   };
// };


const PlayerScore = require("../models/PlayerScore");

module.exports = (io, socket) => {
  socket.on("scoreUpdate", async ({ playerId, region, mode, score }) => {
    console.log("📬 scoreUpdate received:", playerId, score);

    const player = await PlayerScore.findOneAndUpdate(
      { playerId, region, mode },
      { $inc: { score: score } },
      { new: true, upsert: true }
    );

    const topPlayers = await getTopPlayers(region, mode);
    io.emit("leaderboardUpdate", topPlayers);
  });

  socket.on("fetchTopPlayers", async ({ region, mode, limit = 10 }) => {
    console.log("📬 fetchTopPlayers for:", region, mode);
    const players = await getTopPlayers(region, mode, limit);
    socket.emit("topPlayers", players);
  });

  const getTopPlayers = async (region, mode, limit = 10) => {
    return await PlayerScore.find({ region, mode })
      .sort({ score: -1 })
      .limit(limit);
  };

  socket.on("sendScore", (data) => {
  // Save to DB or memory
  saveScore(data); // your logic

  const updatedLeaderboard = getTopPlayers(data.region, data.mode); // your logic
  io.emit("topPlayers", updatedLeaderboard); // broadcast to all clients
});

};
