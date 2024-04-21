import { Cloud_name, API_Key, API_Secret } from "../env.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: Cloud_name,
  api_key: API_Key,
  api_secret: API_Secret,
});

export default cloudinary;
