import cloudinary from "../config/cloudinary.js";
import User from "../models/User.js";

export const updateProfile = async (req, res) => {
  // image => cloudinary => image.cloudinary_url => mongoDB

  try {
    const { image, ...otherData } = req.body;

    let updatedData = otherData;
    // base 64 format image
    if (image) {
      if (image.startsWith("data:image")) {
        try {
          const uploadResponse = await cloudinary.uploader.upload(image);
          updatedData.image = uploadResponse.secure_url;
        } catch (error) {
          console.error("Error uploading image: ", error);
          return res.status(400).json({
            success: false,
            message: "Error uploading image",
          });
        }
      }
    }

    const updatedUser = await User.findByIdAndUpdate(req.user.id, updatedData, {
      new: true,
    });

    res.status(200).json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error in updateProfile: ", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
  
};
