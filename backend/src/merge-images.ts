import sharp from "sharp";

export async function mergeImages(
  overlay: Express.Multer.File,
  photos: Express.Multer.File[]
) {
  const overlayImage = sharp(overlay.buffer);
  const { width, height } = await overlayImage.metadata();

  return Promise.all(
    photos.map((photo) =>
      sharp(photo.buffer)
        .resize(width, height, {
          position: sharp.strategy.attention,
        })
        .composite([{ input: overlay.buffer }])
        .toFormat("jpg")
        .toBuffer()
        .then((data) => data.toString("base64"))
    )
  );
}
