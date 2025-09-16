import { NavLink } from "react-router-dom"
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Award, Package } from "lucide-react"

export default function ProfilePage() {
  // Mock user data
  const user = {
    name: "Rahul Kumar",
    email: "rahul.kumar@igitsarang.ac.in",
    phone: "+91 9876543210",
    role: "Student",
    department: "Computer Science & Engineering",
    year: "3rd Year",
    joinedDate: "September 2022",
    profileImage: "/student-profile.png",
    stats: {
      itemsReported: 5,
      itemsFound: 12,
      helpfulReturns: 8,
    },
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <NavLink to="/" className="inline-flex items-center text-sky-600 hover:text-sky-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </NavLink>
            <h1 className="text-xl font-semibold text-gray-900">My Profile</h1>
            <button className="text-sky-600 hover:text-sky-700 font-medium">Edit Profile</button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
            <img
              src={user.profileImage || "/placeholder.svg"}
              alt={user.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-sky-100"
            />
            <div className="text-center sm:text-left flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{user.name}</h2>
              <p className="text-sky-600 font-medium mb-2">
                {user.role} • {user.department}
              </p>
              <p className="text-gray-600 mb-4">{user.year}</p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center sm:justify-start gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-sky-600">{user.stats.itemsReported}</div>
                  <div className="text-sm text-gray-600">Items Reported</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{user.stats.itemsFound}</div>
                  <div className="text-sm text-gray-600">Items Found</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{user.stats.helpfulReturns}</div>
                  <div className="text-sm text-gray-600">Helpful Returns</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Contact Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="text-gray-900">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="text-gray-900">{user.phone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Department</p>
                    <p className="text-gray-900">{user.department}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Joined</p>
                    <p className="text-gray-900">{user.joinedDate}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                  <Package className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Found: iPhone 13 Pro</p>
                    <p className="text-sm text-gray-600">Library, 2nd Floor • 2 days ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-sky-50 rounded-lg">
                  <Package className="w-5 h-5 text-sky-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Reported: Lost Wallet</p>
                    <p className="text-sm text-gray-600">Cafeteria Area • 5 days ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                  <Award className="w-5 h-5 text-purple-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Helped Return: Laptop Charger</p>
                    <p className="text-sm text-gray-600">Successfully returned to owner • 1 week ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                  <Award className="w-6 h-6 text-yellow-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Helper Hero</p>
                    <p className="text-xs text-gray-600">Returned 5+ items</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <Award className="w-6 h-6 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Community Star</p>
                    <p className="text-xs text-gray-600">Active member</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <NavLink
                  to="/lost"
                  className="block w-full bg-sky-400 text-white text-center py-2 px-4 rounded-lg hover:bg-sky-500 transition-colors font-medium"
                >
                  Report Lost Item
                </NavLink>
                <NavLink
                  to="/found"
                  className="block w-full bg-green-100 text-green-700 text-center py-2 px-4 rounded-lg hover:bg-green-200 transition-colors font-medium border border-green-200"
                >
                  Report Found Item
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
