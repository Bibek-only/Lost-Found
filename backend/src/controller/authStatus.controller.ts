import ApiResponse from "../utils/apiResponse";

const getAuthStatus = async (req: Request | any, res: Response | any) => {
  return res
    .status(200)
    .json(new ApiResponse(true, 200, "User is authenticated",null,null));
};

export {getAuthStatus};
