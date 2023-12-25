import request from "supertest";
import express from "express";
import { getTechLeaderBoard } from "../../src/controllers/getTechLeaderBoard";
import * as service from "../../src/services/fetchTechLeaderboard";

jest.mock("../../src/services/fetchTechLeaderboard");

describe("getTechLeaderBoard Controller", () => {
  let app = express();
  app.use(express.json());
  app.get("/tech-leaderboard", getTechLeaderBoard);

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return tech leaderboard data", async () => {
    const mockLeaderboardData = [
      { tech: "Tech1", score: 100 },
      { tech: "Tech2", score: 80 },
    ];
    (service.fetchTechLeaderboard as jest.Mock).mockResolvedValue(
      mockLeaderboardData
    );
    const res = await request(app).get("/tech-leaderboard");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockLeaderboardData);
  });

  it("should handle service exceptions", async () => {
    const errorMessage = "Error fetching tech leaderboard";
    (service.fetchTechLeaderboard as jest.Mock).mockRejectedValue(
      new Error(errorMessage)
    );
    const res = await request(app).get("/tech-leaderboard");
    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({
      error: "Internal server error",
      message: errorMessage,
    });
  });

  it("should handle non-Error exceptions gracefully", async () => {
    (service.fetchTechLeaderboard as jest.Mock).mockRejectedValue(
      "Unexpected error"
    );
    const res = await request(app).get("/tech-leaderboard");
    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({ error: "Internal server error" });
  });

  it("should return an empty array when the tech leaderboard is empty", async () => {
    (service.fetchTechLeaderboard as jest.Mock).mockResolvedValue([]);
    const res = await request(app).get("/tech-leaderboard");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });
});
