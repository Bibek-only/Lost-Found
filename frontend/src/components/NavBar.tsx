import { Search, Users, Shield, Heart, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthCardVisible } from "../store/reducers/authReducer";
import type { AppDispatch } from "../store/store";

const NavBar = () => {
  const { isAuthenticate, isAuthCardVisible } = useSelector(
    (state: any) => state.authReducer
  );
  const dispatch = useDispatch<AppDispatch>();
  const handelAuthVisible = (value: boolean) => {
    dispatch(setAuthCardVisible(value));
  };
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-sky-400 rounded-lg flex items-center justify-center">
              <Search className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              IGIT Lost & Found
            </span>
          </div>
          {isAuthenticate ? (
            <nav className="hidden md:flex space-x-8">
              <NavLink
                to="/home"
                className="text-gray-700 hover:text-sky-600 font-medium"
              >
                Home
              </NavLink>
              <NavLink
                to="/lost"
                className="text-gray-700 hover:text-sky-600 font-medium"
              >
                Lost Items
              </NavLink>
              <NavLink
                to="/found"
                className="text-gray-700 hover:text-sky-600 font-medium"
              >
                Found Items
              </NavLink>
              <NavLink
                to="/profile"
                className="text-gray-700 hover:text-sky-600 font-medium"
              >
                Profile
              </NavLink>
            </nav>
          ) : null}

          {isAuthenticate ? (
            <NavLink
              to="/profile"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-sky-400 hover:bg-sky-500 transition-colors overflow-hidden border-2 border-transparent hover:border-sky-300"
            >
              {/* Replace with actual user profile image when available */}
              <img
                src=""
                alt="Profile"
                className="w-full h-full object-cover"
                
              />
              {/* <div className="w-full h-full bg-sky-400 flex items-center justify-center ">
                <User className="w-6 h-6 text-white" />
              </div> */}
            </NavLink>
          ) : (
            <button
              onClick={() => handelAuthVisible(true)}
              className="bg-sky-400 text-white px-4 py-2 rounded-lg hover:bg-sky-500 transition-colors font-medium"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
