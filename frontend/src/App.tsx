import { Outlet } from "react-router-dom";
import { getAuthStatus } from "./store/reducers/api/asynthunk/authAsyncThunk";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "./store/store";
import { useEffect } from "react";
import { ToastContainer, Slide } from "react-toastify";
const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getAuthStatus());
  }, []);
  return (
    <>
      <Outlet></Outlet>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
      ;
    </>
  );
};

export default App;
