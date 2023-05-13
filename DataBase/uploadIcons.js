import { deleteObject, getDownloadURL, ref, uploadString } from "firebase/storage";
import { storage } from "../firebase";
import { v4 as uuid } from "uuid";

export const uploadIcon = async (file) => {
  if (file) {
    const icon = file.split(",");
    const preExtension = icon[0].split("/");
    const extension = preExtension[1].split(";");
    const storageRef = ref(storage, `icon-${uuid()}.${extension[0]}`);
    const snapshot = await uploadString(storageRef, icon[1], "base64");
    const url = await getDownloadURL(ref(storage,`${snapshot.metadata.name}`))
    console.log(url);
    //Get link for download the image from firebase
    return {url, iconName: snapshot.metadata.name}
  }else{
    return ''
  }
};
export const deleteIcon = async(icon)=>{
    console.log(icon)
    const storageRef = ref(storage, icon);
    await deleteObject(storageRef)
}
