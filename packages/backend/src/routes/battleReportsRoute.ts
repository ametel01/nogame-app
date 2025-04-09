// routes/battleReportsRoute.ts
import { Router, Request, Response } from "express";
import getBattleReports from "../controllers/getBattleReports";

const router = Router();

// Define the route for fetching battle reports for a specific planet
// The `planet_id` will be provided as a query parameter
router.get("/", async function(req: Request, res: Response) {
  await getBattleReports(req, res);
});

export default router;
