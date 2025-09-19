import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { getAuthStatus } from "../store/reducers/api/asynthunk/authAsyncThunk";
import { getAllListing } from "../store/reducers/api/asynthunk/listingAsyncThunk";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../store/store";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

interface ListingItem {
  title: string;
  description: string;
  keywords: string[];
  listingType: "LOST" | "FOUND";
  status: "ACTIVE" | "RESOLVED" | "EXPIRED";
  landmark: string;
  lostOrFoundAt: string;
  images: Array<{ imageUrl: string }>;
  user: {
    fullName: string;
    profileImage?: string;
    email: string;
    campusRole: string;
    branch?: string;
    currentYear?: string;
    section?: string;
    staffDept?: string;
    other?: string;
    department?: string;
    designation?: string;
    jobTitle?: string;
  };
}

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { listingLoading, listItems } = useSelector(
    (state: any) => state.listingReducer
  );
  const [activeTab, setActiveTab] = useState<"lost" | "found">("lost");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getAuthStatus());
    // Only fetch listings if we don't have any data yet
    if (listItems.length === 0) {
      dispatch(getAllListing());
    }
  }, [dispatch, listItems.length]);

  // Filter items based on listing type
  const lostItems = listItems.filter(
    (item: ListingItem) => item.listingType === "LOST"
  );
  const foundItems = listItems.filter(
    (item: ListingItem) => item.listingType === "FOUND"
  );

  const currentItems = activeTab === "lost" ? lostItems : foundItems;
  const filteredItems = currentItems.filter(
    (item: ListingItem) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.keywords.some((keyword) =>
        keyword.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      item.landmark?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getUserDetails = (user: ListingItem["user"]) => {
    if (user.campusRole === "Student") {
      return `${user.branch || "Unknown Branch"} - ${
        user.currentYear || "Unknown Year"
      } Year${user.section ? `, Section ${user.section}` : ""}`;
    } else if (user.campusRole === "Teacher" || user.campusRole === "Faculty") {
      return `${user.designation || "Faculty"}, ${
        user.department || "Department"
      }`;
    } else if (user.campusRole === "Staff") {
      return `${user.jobTitle || "Staff"}, ${user.staffDept || "Department"}`;
    } else if (user.other) {
      return user.other;
    }
    return user.campusRole;
  };

  if (listingLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-white">
      <NavBar />

      {/* Toggle Buttons */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-2 flex border">
            <button
              onClick={() => setActiveTab("lost")}
              className={`px-8 py-4 rounded-xl font-semibold transition-all duration-200 ${
                activeTab === "lost"
                  ? "bg-sky-400 text-white shadow-md"
                  : "text-gray-600 hover:text-sky-600"
              }`}
            >
              Lost Items ({lostItems.length})
            </button>
            <button
              onClick={() => setActiveTab("found")}
              className={`px-8 py-4 rounded-xl font-semibold transition-all duration-200 ${
                activeTab === "found"
                  ? "bg-green-500 text-white shadow-md"
                  : "text-gray-600 hover:text-green-600"
              }`}
            >
              Found Items ({foundItems.length})
            </button>
          </div>
        </div>

        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder={`Search ${activeTab} items...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 pl-14 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none shadow-sm text-lg"
            />
            <svg
              className="absolute left-5 top-4.5 h-6 w-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item: ListingItem, index: number) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200 border"
            >
              <div className="h-48 bg-gray-50 flex items-center justify-center">
                {item.images && item.images.length > 0 ? (
                  <img
                    src={item.images[0].imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    
                  />
                ) : null}
                <div
                  className="flex items-center justify-center h-full w-full"
                  style={{ display: item.images?.length ? "none" : "flex" }}
                >
                  <span className="text-gray-400 text-lg">No Image</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-900 line-clamp-2">
                    {item.title}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-2 ${
                      item.listingType === "LOST"
                        ? "bg-sky-100 text-sky-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {item.listingType}
                  </span>
                </div>

                {item.description && (
                  <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                    {item.description}
                  </p>
                )}

                {item.keywords && item.keywords.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {item.keywords.slice(0, 3).map((keyword, keyIndex) => (
                        <span
                          key={keyIndex}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                        >
                          {keyword}
                        </span>
                      ))}
                      {item.keywords.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                          +{item.keywords.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <div className="space-y-3 text-sm text-gray-500 mb-6">
                  {item.landmark && (
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-3 text-gray-400 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span className="text-gray-600">{item.landmark}</span>
                    </div>
                  )}

                  {item.lostOrFoundAt && (
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-3 text-gray-400 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-gray-600">
                        {new Date(item.lostOrFoundAt).toLocaleDateString()}
                      </span>
                    </div>
                  )}

                  <div className="flex items-start">
                    <div className="w-8 h-8 mr-3 flex-shrink-0">
                      {item.user.profileImage ? (
                        <img
                          src={item.user.profileImage}
                          alt={item.user.fullName}
                          className="w-full h-full rounded-full object-cover"
                         
                        />
                      ) : null}
                      <div
                        className={`w-full h-full rounded-full bg-sky-400 flex items-center justify-center ${
                          item.user.profileImage ? "hidden" : "flex"
                        }`}
                      >
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-gray-900 font-medium truncate">
                        {item.user.fullName}
                      </div>
                      <div className="text-gray-600 text-xs truncate">
                        {getUserDetails(item.user)}
                      </div>
                      <div className="text-gray-500 text-xs truncate mt-1">
                        📧 {item.user.email}
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  className={`w-full px-6 py-3 rounded-lg font-semibold transition-colors duration-200 ${
                    item.listingType === "LOST"
                      ? "bg-sky-400 hover:bg-sky-500 text-white"
                      : "bg-green-500 hover:bg-green-600 text-white"
                  }`}
                >
                  Contact
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredItems.length === 0 && !listingLoading && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="h-8 w-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 17H9v-2.25A6.75 6.75 0 0115.75 8.25v8.75z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No {activeTab} items found
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              {searchTerm
                ? `No items match your search "${searchTerm}". Try different keywords.`
                : `No ${activeTab} items have been reported yet.`}
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
