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
      if (!origin) return callback(null, true);
      // Add your frontend address to the list of allowed origins
      const allowedOrigins = [
        "http://127.0.0.1:5173",
        "http://localhost:5173",
        "http://103.252.117.72:3000", // Add this line
      ];
      if (allowedOrigins.indexOf(origin) !== -1) {
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
