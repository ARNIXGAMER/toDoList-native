import * as cloudinary from 'cloudinary'
import {v4 as uuidv4} from 'uuid'
import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_SECRET
} from "@env"
// Configuration
cloudinary.v2.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_SECRET,
});

export const taskIconUpload = async (path) => {
  try {
    const upload = await cloudinary.v2.uploader.upload(path, {
      public_id: `${uuidv4()}`,
      folder: "native-Icon",
    });
    return upload.secure_url;
  } catch (error) {
    return error
  }
};

export const deleteImage = async (iconPath) => {
  try {
    console.log(iconPath)
    const publicId = await iconPath.split("/");
    const id = await publicId[8].split(".");
    const result = await cloudinary.v2.uploader.destroy(
      `${idPublica[7]}/${id[0]}`
    );
    return { status: result };
  } catch (error) {
    return { error: error.message };
  }
};
