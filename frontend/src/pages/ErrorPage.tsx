import { Search, Home, ArrowLeft, AlertCircle } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <NavBar />

      {/* Error Hero Section */}
      <section className="bg-gradient-to-b from-sky-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <AlertCircle className="w-12 h-12 text-red-600" />
          </div>

          <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-4">
            404
          </h1>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Oops! This Item Seems to be{" "}
            <span className="text-sky-600">Lost</span>
          </h2>

          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            The page you're looking for doesn't exist. Just like a lost item, it
            might have wandered off somewhere. Let's help you find your way
            back!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate(-1)}
              className="bg-sky-400 text-white px-8 py-3 rounded-lg hover:bg-sky-500 transition-colors font-medium text-lg flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </button>
            <NavLink
              to="/"
              className="bg-green-100 text-green-700 px-8 py-3 rounded-lg hover:bg-green-200 transition-colors font-medium text-lg border border-green-200 flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Go Home
            </NavLink>
          </div>
        </div>
      </section>

      {/* Helpful Links Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Maybe You're Looking For
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Here are some popular destinations in our Lost & Found platform.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <NavLink
              to="/lost"
              className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 group"
            >
              <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-sky-200 transition-colors">
                <Search className="w-8 h-8 text-sky-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Lost Items
              </h3>
              <p className="text-gray-600">
                Browse through reported lost items or report something you've
                lost.
              </p>
            </NavLink>

            <NavLink
              to="/found"
              className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 group"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <Search className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Found Items
              </h3>
              <p className="text-gray-600">
                Check found items or report something you've discovered.
              </p>
            </NavLink>

            <NavLink
              to="/profile"
              className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 group"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                <Home className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Your Profile
              </h3>
              <p className="text-gray-600">
                Manage your account and view your reported items.
              </p>
            </NavLink>
          </div>
        </div>
      </section>

      {/* Encouraging Message Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Lost Something More Important?
            </h3>
            <p className="text-gray-600 mb-6">
              If you've lost an actual item on campus, don't worry! Our IGIT
              Sarang Lost & Found platform is here to help you reconnect with
              your belongings and fellow community members.
            </p>
            <div className="bg-sky-50 p-4 rounded-lg">
              <p className="text-sky-800 font-medium">
                "Every lost item is just waiting to be found by our caring
                community."
              </p>
            </div>
          </div>
        </div>
      </section>
    <Footer></Footer>
      
    </div>
  );
}
