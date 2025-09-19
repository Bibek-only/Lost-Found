import axios from "axios";
import { API_ENDPOINT } from "../../api/ApiEndPoint";

export const getUserInfoApi = async () => {
  const res = await axios.get(`${API_ENDPOINT}/user/get-info`, {
    withCredentials: true,
  });
  console.log("Here is the user information", res);
  return res.data.data;
};
