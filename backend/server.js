const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/timeTracker", { useNewUrlParser: true, useUnifiedTopology: true });

const TimeSchema = new mongoose.Schema({
  site: String,
  duration: Number,
  date: { type: Date, default: Date.now }
});

const TimeEntry = mongoose.model("TimeEntry", TimeSchema);

// Endpoint to save time data
app.post("/save", async (req, res) => {
  const { site, duration } = req.body;
  await TimeEntry.create({ site, duration });
  res.json({ success: true });
});

// Endpoint to get analytics data
app.get("/analytics", async (req, res) => {
  const data = await TimeEntry.find();
  res.json(data);
});

app.listen(3000, () => console.log("Server running on port 3000"));