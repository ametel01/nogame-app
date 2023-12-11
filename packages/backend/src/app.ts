// app.ts
import express from "express";
import cors from "cors";
import leaderboard from "./routes/leaderboardRoute";
import fleetleaderboard from "./routes/fleetLeaderboardRoute";
import techleaderboard from "./routes/techLeaderboardRoute";
import battleReportsRoute from "./routes/battleReportsRoute";

const app = express();

const allowedOrigins = [
  "https://no-game.xyz",
  "https://www.no-game.xyz",
  "https://api.no-game.xyz",
  "http://localhost:3000",
];

const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS policy violation"));
    }
  },
};

app.use(cors(corsOptions));

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
