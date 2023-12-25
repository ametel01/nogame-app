// routes/battleReportsRoute.ts
import { Router } from "express";
import { getBattleReports } from "../controllers/getBattleReports"; // Import the correct controller for battle reports

const router = Router();

// Define the route for fetching battle reports for a specific planet
// The `planet_id` will be provided as a query parameter
router.get("/", getBattleReports);

export default router;
