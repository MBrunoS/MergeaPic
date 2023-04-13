import { beforeAll, describe, expect, it, jest } from "@jest/globals";
import fs from "fs/promises";
import path from "path";
import { Controller } from "../src/controller";

describe("Controller", () => {
  let overlay;
  let photo;
  let mergedImage: Buffer;

  beforeAll(async () => {
    overlay = await fs.readFile(
      path.join(__dirname, "assets", "overlay-test.png")
    );
    photo = await fs.readFile(
      path.join(__dirname, "assets", "photo-1-test.jpeg")
    );
    mergedImage = await fs.readFile(
      path.join(__dirname, "assets", "photo-1-test-merged.jfif")
    );
  });

  it("should set response header", async () => {
    const req = {
      files: {
        overlay: [overlay],
        photos: [photo],
      },
    };
    const res = {
      setHeader: jest.fn(),
      write: jest.fn(),
      end: jest.fn(),
    };

    await Controller(req, res as any);

    expect(res.setHeader).toHaveBeenCalledWith(
      "Content-Type",
      "multipart/mixed; boundary=merged-image"
    );
  });

  it("should write merged images to response", async () => {
    const req = {
      files: {
        overlay: [overlay],
        photos: [photo, photo],
      },
    };
    const res = {
      setHeader: jest.fn(),
      write: jest.fn(),
      end: jest.fn(),
    };

    await Controller(req, res as any);

    expect(res.write).toHaveBeenCalledTimes(6 * 2 + 1); // 6 * 2 photos + 1 end
    expect(res.write).toHaveBeenCalledWith("--merged-image\r\n");
    expect(res.write).toHaveBeenCalledWith("Content-Type: image/jpeg\r\n");
    expect(res.write).toHaveBeenCalledWith(
      `Content-Length: ${mergedImage.toString("base64").length}\r\n`
    );
    expect(res.write).toHaveBeenCalledWith("\r\n");
    expect(res.write).toHaveBeenCalledWith(mergedImage.toString("base64"));
    expect(res.write).toHaveBeenCalledWith("\r\n");
    expect(res.write).toHaveBeenCalledWith("--merged-image--\r\n");
    expect(res.end).toHaveBeenCalled();
  });

  it("should handle error when merging images", async () => {
    const req = {
      files: {
        overlay: [overlay],
        photos: [{ buffer: Buffer.from("invalid photo") }],
      },
    };
    const res = {
      setHeader: jest.fn(),
      write: jest.fn(),
      end: jest.fn(),
      statusCode: 200,
    };

    await Controller(req, res as any);

    expect(res.statusCode).toBe(400);
    expect(res.write).toHaveBeenCalledTimes(1);
    expect(res.write).toHaveBeenCalledWith(expect.any(String));
    expect(res.end).toHaveBeenCalled();
  });
});
