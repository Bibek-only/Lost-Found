import { Search, Users, Shield, Heart, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import AuthCard from "../components/Auth";
import { setAuthCardVisible } from "../store/reducers/authReducer";
import type { AppDispatch } from "../store/store";
import Loader from "../components/Loader";

export default function LandingPage() {
  const { isAuthenticate, isAuthCardVisible , authLoading} = useSelector(
    (state: any) => state.authReducer
  );
  console.log(isAuthenticate);
  const dispatch = useDispatch<AppDispatch>();
  const handelAuthVisible = (value: boolean) => {
    dispatch(setAuthCardVisible(value));
  };
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <NavBar></NavBar>

      {/* Hero Section */}
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
                  to="/lost"
                  className="bg-sky-400 text-white px-8 py-3 rounded-lg hover:bg-sky-500 transition-colors font-medium text-lg"
                >
                  Report Lost Item
                </NavLink>
                <NavLink
                  to="/lost"
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

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our simple three-step process helps you recover lost items and
              build a supportive campus community.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-sky-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Report & Search
              </h3>
              <p className="text-gray-600">
                Easily report lost or found items with detailed descriptions,
                photos, and location information.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Connect & Match
              </h3>
              <p className="text-gray-600">
                Our smart matching system connects lost and found items,
                notifying relevant parties instantly.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Reunite & Appreciate
              </h3>
              <p className="text-gray-600">
                Celebrate helpful community members and build a culture of
                support and kindness on campus.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Vision
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                We envision a campus where losing something doesn't cause panic,
                and finding something creates an opportunity to help a fellow
                community member.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Shield className="w-6 h-6 text-sky-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Secure & Private
                    </h4>
                    <p className="text-gray-600">
                      Your personal information is protected and only shared
                      when necessary for item recovery.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="w-6 h-6 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Community Driven
                    </h4>
                    <p className="text-gray-600">
                      Built by students, for students, teachers, and staff of
                      IGIT Sarang.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Heart className="w-6 h-6 text-purple-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Encouraging Kindness
                    </h4>
                    <p className="text-gray-600">
                      Recognize and celebrate those who go out of their way to
                      help others.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600 mb-6">
                To create a digital platform that reduces the stress of losing
                items, saves valuable time in recovery efforts, and fosters a
                culture of mutual support within the IGIT Sarang community.
              </p>
              <div className="bg-sky-50 p-4 rounded-lg">
                <p className="text-sky-800 font-medium">
                  "Together, we can turn every lost item into an opportunity for
                  community connection."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer></Footer>
      {isAuthCardVisible ? <AuthCard></AuthCard> : null}
      {authLoading?<Loader></Loader>:null}
    </div>
  );
}
