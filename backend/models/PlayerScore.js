// const mongoose = require("mongoose");

// const PlayerScoreSchema = new mongoose.Schema({
//   playerId: String,
//   region: String,
//   mode: String,
//   score: { type: Number, default: 0 },
// });



// module.exports = mongoose.model("PlayerScore", PlayerScoreSchema);
const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  playerId: String,
  score: Number,
  region: String,
  mode: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("PlayerScore", playerSchema);

