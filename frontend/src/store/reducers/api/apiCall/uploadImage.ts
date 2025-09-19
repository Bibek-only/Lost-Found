import axios from "axios";
import { API_ENDPOINT_DEV } from "../ApiEndPoint";

export const uploadImageApi = async (imageFile: File): Promise<any> => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const res = await axios.post(`${API_ENDPOINT_DEV}/user/image/upload`, formData, {
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  console.log("Image upload response", res);
  return res.data.data;
};
