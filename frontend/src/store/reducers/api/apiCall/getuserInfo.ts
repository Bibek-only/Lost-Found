import axios from "axios";
import { API_ENDPOINT_DEV } from "../../api/ApiEndPoint";

export const getUserInfoApi = async () => {
  const res = await axios.get(`${API_ENDPOINT_DEV}/user/get-info`, {
    withCredentials: true,
  });
  console.log("Here is the user information", res);
  return res.data.data;
};
