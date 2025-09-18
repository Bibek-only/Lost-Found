import { Outlet } from "react-router-dom";
import { getAuthStatus } from "./store/reducers/api/asynthunk/authAsyncThunk";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "./store/store";
import { useEffect } from "react";
const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(()=>{
    dispatch(getAuthStatus());
  },[])
  return <Outlet></Outlet>;
};

export default App;
