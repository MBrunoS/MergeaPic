import sharp from "sharp";

export async function* mergeImages(
  overlay: Express.Multer.File,
  photos: Express.Multer.File[]
) {
  const overlayImage = sharp(overlay.buffer);
  const { width, height } = await overlayImage.metadata();

  for (const photo of photos) {
    const data = await sharp(photo.buffer)
      .resize(width, height)
      .composite([{ input: overlay.buffer }])
      .toFormat("jpg")
      .toBuffer();

    yield data.toString("base64");
  }
}
