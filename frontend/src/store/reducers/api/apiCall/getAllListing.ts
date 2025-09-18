import axios from "axios";

import {API_ENDPOINT_DEV} from "../../api/ApiEndPoint"


export const getAllListingApi = async():Promise<any> =>{
    const res = await axios.get(`${API_ENDPOINT_DEV}/user/get-all-listing`,{
        withCredentials: true
    });
    console.log("auth status response",res)
    return res.data.data;
}
