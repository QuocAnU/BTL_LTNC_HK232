import express from "express";
import cloudinary from "../configs/cloudinary.config.js";
import multer from "multer";
import { Readable } from "stream";
const router = express.Router();
const upload = multer();
router.post("/upload", upload.single("file"), (req, res) => {
  function cloudinaryDone(error, result) {
    if (error) {
      console.log("Error in cloudinary.uploader.upload_stream\n", error);
      res.status(500).send("Upload failed");
      return;
    }
    res.status(200).send(result.secure_url);
  }
  try {
    var uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "mybkar", // Thư mục trên Cloudinary
        resource_type: "auto", // Tự động xác định loại tệp
      },
      cloudinaryDone
    );
    var fileStream = Readable.from([req.files[0].buffer]);
    fileStream.pipe(uploadStream);
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
    res.status(500).send("Upload failed");
  }
});

export const uploadRouter = router;
