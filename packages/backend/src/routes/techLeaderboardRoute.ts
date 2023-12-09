import { Router } from "express";
import getTechLeaderBoard from "../controllers/getTechLeaderBoard"; // Replace with actual import

const router = Router();

// Define the route for the fleet leaderboard
router.get("/", getTechLeaderBoard);

export default router;
