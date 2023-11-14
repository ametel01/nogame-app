// backend/src/controllers/getLeaderBoard.ts
import { Request, Response } from "express";
import fetchFleetLeaderboard from "../services/fetchFleetLeaderboard";

export const getFleetLeaderBoard = async (req: Request, res: Response) => {
  try {
    const data = await fetchFleetLeaderboard();
    console.log("Leaderboard data:", data);
    res.json(data);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);

    // Check if error is an instance of Error
    if (error instanceof Error) {
      // Now TypeScript knows that error is an Error, and has a message property
      res
        .status(500)
        .json({ error: "Internal server error", message: error.message });
    } else {
      // If it's not an Error, handle it differently or just send a generic response
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
export default getFleetLeaderBoard;
