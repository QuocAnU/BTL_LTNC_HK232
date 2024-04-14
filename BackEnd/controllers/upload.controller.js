import cloudinary from "../configs/cloudinary.config.js";
export const uploadImage = async (req, res) => {
  try {
    console.log(req.files);
    const images = req.files.map((file) => file.path);
    const uploadedImage = [];
    for (let image of images) {
      const results = await cloudinary.uploader.upload(image);
      console.log(results);
      uploadedImage.push({
        url: results.secure_url,
        public_id: results.public_id,
      });
    }
    res.status(200).json({
      message: "Image uploaded successfully",
      datas: uploadedImage,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
