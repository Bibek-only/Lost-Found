import axios from "axios";
import { API_ENDPOINT } from "../ApiEndPoint";
import type { PortalEntryFormData } from "../schema/portalEntrySchema";

// API call function for submitting portal entry
export const portalEntryApi = async (
  data: PortalEntryFormData
): Promise<any> => {
  const res = await axios.post(`${API_ENDPOINT}/user/portal-entry`, data, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log("Portal entry response", res);
  return res.data;
};
