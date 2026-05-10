import { configDotenv } from "dotenv";
import ImageKit, { toFile } from "@imagekit/nodejs";

configDotenv();

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

export const uploadImage = async (file) => {
  const url = await client.files.upload({
    file: await toFile(Buffer.from(file.buffer), "file"),
    fileName: file.originalname,
    folder: 'socialMedia'
  });
  return url;
};
