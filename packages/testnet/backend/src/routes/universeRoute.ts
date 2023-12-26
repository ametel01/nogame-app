// backend/src/routes/leaderBoard.ts
import { Router } from "express";
import { getUniverse } from "../controllers/getUniverse";

const router = Router();

// Use the getLeaderBoard controller for the "/leaderboard" route
router.get("/", getUniverse);

export default router;
