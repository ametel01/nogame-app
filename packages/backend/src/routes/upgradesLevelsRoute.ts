// routes/battleReportsRoute.ts
import { Router } from "express";
import getUpgradesLevels from "../controllers/getUpgradesLevels";

const router = Router();

// Define the route for fetching battle reports for a specific planet
// The `planet_id` will be provided as a query parameter
router.get("/", getUpgradesLevels);

export default router;
