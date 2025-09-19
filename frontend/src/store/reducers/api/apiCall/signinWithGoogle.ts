import { API_ENDPOINT } from "../ApiEndPoint";
const signInWithGoogle = async () => {
  try {
    window.location.href = `${API_ENDPOINT}/user/auth/google`;
  } catch (error: any) {
    console.log("Error in the catch block fo signin with google", error);
  }
};

export default signInWithGoogle;
