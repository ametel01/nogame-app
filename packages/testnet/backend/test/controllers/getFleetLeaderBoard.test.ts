import request from "supertest";
import express from "express";
import { getFleetLeaderBoard } from "../../src/controllers/getFleetLeaderBoard";
import * as service from "../../src/services/fetchFleetLeaderboard";

jest.mock("../../src/services/fetchFleetLeaderboard");

describe("getFleetLeaderBoard Controller", () => {
  let app = express();
  app.use(express.json());
  app.get("/fleet-leaderboard", getFleetLeaderBoard);

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return fleet leaderboard data", async () => {
    const mockLeaderboardData = [
      { fleet: "Planet1", points: 100 },
      { fleet: "Planet2", points: 80 },
    ];
    (service.fetchFleetLeaderboard as jest.Mock).mockResolvedValue(
      mockLeaderboardData
    );
    const res = await request(app).get("/fleet-leaderboard");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockLeaderboardData);
  });

  it("should handle service exceptions", async () => {
    const errorMessage = "Error fetching leaderboard";
    (service.fetchFleetLeaderboard as jest.Mock).mockRejectedValue(
      new Error(errorMessage)
    );
    const res = await request(app).get("/fleet-leaderboard");
    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({
      error: "Internal server error",
      message: errorMessage,
    });
  });

  it("should handle non-Error exceptions gracefully", async () => {
    (service.fetchFleetLeaderboard as jest.Mock).mockRejectedValue(
      "Unexpected error"
    );
    const res = await request(app).get("/fleet-leaderboard");
    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({ error: "Internal server error" });
  });

  it("should return an empty array when the leaderboard is empty", async () => {
    (service.fetchFleetLeaderboard as jest.Mock).mockResolvedValue([]);
    const res = await request(app).get("/fleet-leaderboard");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });
});
