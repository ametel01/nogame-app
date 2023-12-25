import request from "supertest";
import express from "express";
import { getBattleReports } from "../../src/controllers/getBattleReports";
import * as service from "../../src/services/fetchBattleReportsForPlanet";

jest.mock("../../src/services/fetchBattleReportsForPlanet");

describe("getBattleReports Controller", () => {
  let app = express();
  app.use(express.json());
  app.get("/battle-reports", getBattleReports);

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return battle reports for a valid planet_id", async () => {
    (service.fetchBattleReportsForPlanet as jest.Mock).mockResolvedValue({
      reports: ["report1", "report2"],
    });
    const res = await request(app).get("/battle-reports?planet_id=1");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ reports: ["report1", "report2"] });
  });

  it("should return 400 for non-numeric planet_id", async () => {
    const res = await request(app).get("/battle-reports?planet_id=abc");
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ error: "Invalid planet_id provided" });
  });

  it("should return 400 when planet_id is missing", async () => {
    const res = await request(app).get("/battle-reports");
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ error: "Invalid planet_id provided" });
  });

  it("should return an empty array when there are no battle reports", async () => {
    (service.fetchBattleReportsForPlanet as jest.Mock).mockResolvedValue([]);
    const res = await request(app).get("/battle-reports?planet_id=1");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  it("should handle non-Error exceptions gracefully", async () => {
    (service.fetchBattleReportsForPlanet as jest.Mock).mockRejectedValue(
      "Unexpected error"
    );
    const res = await request(app).get("/battle-reports?planet_id=1");
    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({ error: "Internal server error" });
  });

  it("should return specific battle reports for a valid planet_id", async () => {
    const mockReports = [
      { id: 1, details: "Report 1" },
      { id: 2, details: "Report 2" },
    ];
    (service.fetchBattleReportsForPlanet as jest.Mock).mockResolvedValue(
      mockReports
    );
    const res = await request(app).get("/battle-reports?planet_id=1");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockReports);
  });
});
