import { expect, describe, it, beforeAll } from "@jest/globals";
import fs from "fs/promises";
import path from "path";
import { mergeImages } from "../src/merge-images";

describe("mergeImages", () => {
  let overlay;
  let photo1;
  let photo2;

  beforeAll(async () => {
    overlay = await fs.readFile(
      path.join(__dirname, "assets", "overlay-test.png")
    );
    photo1 = await fs.readFile(
      path.join(__dirname, "assets", "photo-1-test.jpeg")
    );
    photo2 = await fs.readFile(
      path.join(__dirname, "assets", "photo-2-test.jpeg")
    );
  });

  it("should return a generator", () => {
    const photos = [photo1];
    const result = mergeImages(overlay, photos);

    expect(result).toHaveProperty("next");
    expect(result).toHaveProperty("throw");
    expect(result).toHaveProperty("return");
  });

  it("should merge overlay image with single photo", async () => {
    const photos = [photo1];
    const result = mergeImages(overlay, photos);
    const mergedExpected = await fs.readFile(
      path.join(__dirname, "assets", "photo-1-test-merged.jfif")
    );

    const mergedImage = await result.next();

    expect(mergedImage.value).toBeDefined();
    expect(typeof mergedImage.value).toBe("string");
    expect(mergedImage.value).not.toBe("");
    expect(mergedImage.value).toBe(mergedExpected.toString("base64"));
  });

  it("should merge overlay image with multiple photos", async () => {
    const photos = [photo1, photo2];
    const result = mergeImages(overlay, photos);
    const mergedExpected = await fs.readFile(
      path.join(__dirname, "assets", "photo-1-test-merged.jfif")
    );

    for (let i = 0; i < photos.length; i++) {
      const mergedImage = await result.next();

      expect(mergedImage.value).toBeDefined();
      expect(typeof mergedImage.value).toBe("string");
      expect(mergedImage.value).not.toBe("");
      expect(mergedImage.value).toBe(mergedExpected.toString("base64"));
    }
  });

  it("should throw an error when invalid overlay image is provided", async () => {
    const overlay = { buffer: Buffer.from("invalid overlay image") };
    const photos = [photo1];
    const result = mergeImages(overlay as any, photos);

    await expect(result.next()).rejects.toThrow();
  });

  it("should throw an error when invalid photo is provided", async () => {
    const photos = [{ buffer: Buffer.from("invalid photo") }];
    const result = mergeImages(overlay, photos as any);

    await expect(result.next()).rejects.toThrow();
  });
});
