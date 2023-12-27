// app.ts
import express from "express";
import cors from "cors";
import leaderboard from "./routes/leaderboardRoute";
import fleetleaderboard from "./routes/fleetLeaderboardRoute";
import techleaderboard from "./routes/techLeaderboardRoute";
import battleReportsRoute from "./routes/battleReportsRoute";
import upgradesLevelsRoute from "./routes/upgradesLevelsRoute";
import universeRoute from "./routes/universeRoute";
const app = express();

const allowedOrigins = [
  "https://www.app.testnet.no-game.xyz",
  "https://www.api.testnet.no-game.xyz",
  "http://localhost:3000",
  "http://localhost:5173",
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
app.use("/leaderboard", leaderboard);
app.use("/fleet", fleetleaderboard);
app.use("/tech", techleaderboard);
app.use("/battle-reports", battleReportsRoute);
app.use("/upgrades-levels", upgradesLevelsRoute);
app.use("/universe", universeRoute);

export default app;
