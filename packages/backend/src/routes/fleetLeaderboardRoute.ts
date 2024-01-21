// routes/fleetLeaderboardRoute.ts
import { Router } from "express";
import { getFleetLeaderBoard } from "../controllers/getFleetLeaderBoard"; // Replace with actual import

const router = Router();

// Define the route for the fleet leaderboard
router.get("/", getFleetLeaderBoard);

export default router;
