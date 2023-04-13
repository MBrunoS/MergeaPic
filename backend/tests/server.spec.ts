import { afterAll, describe, expect, it } from "@jest/globals";
import request from "supertest";
import path from "path";
import { server } from "../src/server";

describe("Server", () => {
  const overlayPath = path.join(__dirname, "assets", "overlay-test.png");
  const photoPath = path.join(__dirname, "assets", "photo-1-test.jpeg");

  afterAll(() => {
    server.close();
  });

  it("should be running and return successful response when files are uploaded", async () => {
    const res = await request(server)
      .post("/merge")
      .attach("overlay", overlayPath)
      .attach("photos", photoPath);

    expect(res.status).toBe(200);
    expect(res.type).toBe("multipart/mixed");

    // TODO: Check if the response contains the merged image
  });

  it("should return an error when files are missing", async () => {
    const res = await request(server).post("/merge");

    expect(res.status).toBe(400);
    expect(res.text).toContain("Missing required files");
  });

  it("should return an error when overlay file is missing", async () => {
    const res = await request(server)
      .post("/merge")
      .attach("photos", photoPath);

    expect(res.status).toBe(400);
    expect(res.text).toContain("Missing overlay file");
  });

  it("should return an error when photo files are missing", async () => {
    const res = await request(server)
      .post("/merge")
      .attach("overlay", overlayPath);

    expect(res.status).toBe(400);
    expect(res.text).toContain("Missing photo files");
  });
});
