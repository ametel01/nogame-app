// backend/src/controllers/getBattleReports.ts
import { Request, Response } from "express";
import fetchBattleReportsForPlanet from "../services/fetchBattleReportsForPlanet";

const getBattleReports = async (req: Request, res: Response): Promise<void> => {
  // Extract planet_id from request query parameters
  const planetId = parseInt(req.query.planet_id as string);

  // Check if planetId is a number
  if (isNaN(planetId)) {
    res.status(400).json({ error: "Invalid planet_id provided" });
    return;
  }

  try {
    const data = await fetchBattleReportsForPlanet(planetId);
    res.json(data);
  } catch (error) {
    console.error("Error fetching battle reports:", error);

    // Check if error is an instance of Error
    if (error instanceof Error) {
      res.status(500).json({ error: "Internal server error", message: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export default getBattleReports;
