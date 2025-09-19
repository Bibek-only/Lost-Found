import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { setAuthCardVisible } from "../../store/reducers/authReducer";
import type { AppDispatch } from "../../store/store";
const Hero = () => {
  const { isAuthenticate } = useSelector(
    (state: any) => state.authReducer
  );
  const dispatch = useDispatch<AppDispatch>();
  const handelAuthVisible = (value: boolean) => {
    dispatch(setAuthCardVisible(value));
  };
  return (
    <section className="bg-gradient-to-b from-sky-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 text-balance">
          Lost Something? <br />
          <span className="text-sky-600">We'll Help You Find It</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto text-pretty">
          IGIT Sarang's digital platform connecting students, teachers, and
          staff to report and recover lost items quickly and efficiently.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {isAuthenticate ? (
            <>
              <NavLink
                to="/portal-entry"
                className="bg-sky-400 text-white px-8 py-3 rounded-lg hover:bg-sky-500 transition-colors font-medium text-lg"
              >
                Report Lost Item
              </NavLink>
              <NavLink
                to="/portal-entry"
                className="bg-green-100 text-green-700 px-8 py-3 rounded-lg hover:bg-green-200 transition-colors font-medium text-lg border border-green-200"
              >
                Report Found Item
              </NavLink>
            </>
          ) : (
            <button
              onClick={() => handelAuthVisible(true)}
              className="bg-sky-400 text-white px-8 py-3 rounded-lg hover:bg-sky-500 transition-colors font-medium text-lg"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
