// app.ts
import express from "express";
import leaderboard from "./routes/leaderboardRoute";
import fleetleaderboard from "./routes/fleetLeaderboardRoute";
import techleaderboard from "./routes/techLeaderboardRoute";
import battleReportsRoute from "./routes/battleReportsRoute"; // Import the battle reports route

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.path}`);
  next();
});
// Define a route handler for the root path to respond with a simple message
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Use your leaderboard routes
app.use("/api", leaderboard);
app.use("/api/fleet", fleetleaderboard);
app.use("/api/tech", techleaderboard);
app.use("/api/battle-reports", battleReportsRoute); // Define the base path for battle reports routes

export default app;
