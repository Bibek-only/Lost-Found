import { NavLink } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  User,
  GraduationCap,
} from "lucide-react";
import Loader from "../components/Loader";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../store/reducers/api/asynthunk/userInfoAsyncThunk";
import type { RootState, AppDispatch } from "../store/store";

export default function ProfilePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { userInfo, userInfoLoading, error, hasDataFetched } = useSelector(
    (state: RootState) => state.userInfoReducer
  );

  useEffect(() => {
    // Only fetch data if we haven't fetched it before
    if (!hasDataFetched && !userInfoLoading) {
      dispatch(getUserInfo());
    }
  }, [dispatch, hasDataFetched, userInfoLoading]);

  if (userInfoLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Error Loading Profile
          </h2>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => dispatch(getUserInfo())}
            className="mt-4 bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!userInfo) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-600">
            No Profile Data
          </h2>
          <p className="text-gray-500">Unable to load profile information</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <NavLink
              to="/"
              className="inline-flex items-center text-sky-600 hover:text-sky-700"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </NavLink>
            <h1 className="text-xl font-semibold text-gray-900">My Profile</h1>
            <button className="text-sky-600 hover:text-sky-700 font-medium">
              Edit Profile
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
            <img
              src={userInfo.profileImage || "/placeholder.svg"}
              alt={userInfo.fullName || "Profile"}
              className="w-24 h-24 rounded-full object-cover border-4 border-sky-100"
            />
            <div className="text-center sm:text-left flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                {userInfo.fullName || "Name not available"}
              </h2>
              <p className="text-sky-600 font-medium mb-2">
                {userInfo.campusRole || "Role not specified"}
                {userInfo.branch && ` • ${userInfo.branch}`}
              </p>
              {userInfo.currentYear && (
                <p className="text-gray-600 mb-2">
                  {userInfo.currentYear} Year
                </p>
              )}
              <div className="flex items-center justify-center sm:justify-start space-x-2 mb-4">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    userInfo.isProfileCompleted
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {userInfo.isProfileCompleted
                    ? "Profile Complete"
                    : "Profile Incomplete"}
                </span>
                <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                  {userInfo.userType || "User"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Contact Information
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="text-gray-900">
                  {userInfo.email || "Not provided"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="text-gray-900">
                  {userInfo.phoneNo || "Not provided"}
                </p>
              </div>
            </div>
            {userInfo.branch && (
              <div className="flex items-center space-x-3">
                <GraduationCap className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Branch</p>
                  <p className="text-gray-900">{userInfo.branch}</p>
                </div>
              </div>
            )}
            {userInfo.section && (
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Section</p>
                  <p className="text-gray-900">{userInfo.section}</p>
                </div>
              </div>
            )}
            {userInfo.academicYear && (
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Academic Year</p>
                  <p className="text-gray-900">{userInfo.academicYear}</p>
                </div>
              </div>
            )}
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Member Since</p>
                <p className="text-gray-900">
                  {new Date(userInfo.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information (if available) */}
        {(userInfo.designation ||
          userInfo.department ||
          userInfo.jobTitle ||
          userInfo.staffDept) && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Additional Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {userInfo.designation && (
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Designation</p>
                    <p className="text-gray-900">{userInfo.designation}</p>
                  </div>
                </div>
              )}
              {userInfo.department && (
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Department</p>
                    <p className="text-gray-900">{userInfo.department}</p>
                  </div>
                </div>
              )}
              {userInfo.jobTitle && (
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Job Title</p>
                    <p className="text-gray-900">{userInfo.jobTitle}</p>
                  </div>
                </div>
              )}
              {userInfo.staffDept && (
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Staff Department</p>
                    <p className="text-gray-900">{userInfo.staffDept}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
