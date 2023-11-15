// app.ts
import express from "express";
import cors from "cors";
import leaderboard from "./routes/leaderboardRoute";
import fleetleaderboard from "./routes/fleetLeaderboardRoute";
import techleaderboard from "./routes/techLeaderboardRoute";
import battleReportsRoute from "./routes/battleReportsRoute";

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (
        ["http://127.0.0.1:5173", "http://localhost:5173"].indexOf(origin) !==
        -1
      ) {
        return callback(null, true);
      }
      callback(new Error("CORS policy violation"));
    },
  })
);

app.use(express.json());

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
