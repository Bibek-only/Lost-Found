import ImageKit from "imagekit";
import { validENV } from "../schemas/envSchema";

const imagekit = new ImageKit({
  publicKey: validENV.IMAGE_KIT_PUBLIC_KEY,
  privateKey: validENV.IMAGE_KIT_PRIVATEkEY,
  urlEndpoint: validENV.IMAGE_KIT_URL_ENDPOINT,
});

export default imagekit;
