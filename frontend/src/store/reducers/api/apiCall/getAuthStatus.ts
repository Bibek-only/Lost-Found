import axios from "axios";

import { API_ENDPOINT } from "../../api/ApiEndPoint";
import type { authType } from "../../../../types/authSchema";

export const getAuthStatusApi = async (): Promise<authType> => {
  const res = await axios.get(`${API_ENDPOINT}/user/auth/status`, {
    withCredentials: true,
  });
  console.log("auth status response", res);
  return res.data.data;
};
