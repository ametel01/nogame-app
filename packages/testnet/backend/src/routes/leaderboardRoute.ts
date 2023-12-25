// backend/src/routes/leaderBoard.ts
import { Router } from "express";
import { getLeaderBoard } from "../controllers/getLeaderBoard"; // Import the controller

const router = Router();

// Use the getLeaderBoard controller for the "/leaderboard" route
router.get("/leaderboard", getLeaderBoard);

export default router;
