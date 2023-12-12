import request from "supertest";
import express from "express";
import { getLeaderBoard } from "../../src/controllers/getLeaderBoard";
import * as service from "../../src/services/fetchLeaderboard";

jest.mock("../../src/services/fetchLeaderboard");

describe("getLeaderBoard Controller", () => {
  let app = express();
  app.use(express.json());
  app.get("/leaderboard", getLeaderBoard);

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return leaderboard data", async () => {
    const mockLeaderboardData = [
      { player: "Player1", points: 100 },
      { player: "Player2", points: 80 },
    ];
    (service.fetchLeaderBoard as jest.Mock).mockResolvedValue(
      mockLeaderboardData
    );
    const res = await request(app).get("/leaderboard");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockLeaderboardData);
  });

  it("should handle service exceptions", async () => {
    const errorMessage = "Error fetching leaderboard";
    (service.fetchLeaderBoard as jest.Mock).mockRejectedValue(
      new Error(errorMessage)
    );
    const res = await request(app).get("/leaderboard");
    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({
      error: "Internal server error",
      message: errorMessage,
    });
  });

  it("should handle non-Error exceptions gracefully", async () => {
    (service.fetchLeaderBoard as jest.Mock).mockRejectedValue(
      "Unexpected error"
    );
    const res = await request(app).get("/leaderboard");
    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({ error: "Internal server error" });
  });

  it("should return an empty array when the leaderboard is empty", async () => {
    (service.fetchLeaderBoard as jest.Mock).mockResolvedValue([]);
    const res = await request(app).get("/leaderboard");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });
});
