import { NavLink } from "react-router-dom"
import { ArrowLeft, Search, Filter, MapPin, Calendar } from "lucide-react"

export default function LostItemsPage() {
  // Mock data for lost items
  const lostItems = [
    {
      id: 1,
      title: "iPhone 13 Pro - Blue",
      description: "Lost my blue iPhone 13 Pro with a clear case. Has a small crack on the back.",
      location: "Library, 2nd Floor",
      date: "2024-01-15",
      image: "/blue-iphone-13-pro.jpg",
      reporter: {
        name: "Priya Sharma",
        role: "Student",
        department: "ECE",
        image: "/female-student-profile.png",
      },
      keywords: ["iPhone", "blue", "phone", "mobile"],
    },
    {
      id: 2,
      title: "Black Leather Wallet",
      description: "Black leather wallet with college ID, driving license, and some cash.",
      location: "Cafeteria Area",
      date: "2024-01-14",
      image: "/black-leather-wallet.jpg",
      reporter: {
        name: "Amit Kumar",
        role: "Student",
        department: "CSE",
        image: "/male-student-profile.png",
      },
      keywords: ["wallet", "leather", "black", "ID"],
    },
    {
      id: 3,
      title: "Dell Laptop Charger",
      description: "65W Dell laptop charger with original cable. Model: DA65NM111-00",
      location: "Computer Lab - Block A",
      date: "2024-01-13",
      image: "/dell-laptop-charger.jpg",
      reporter: {
        name: "Dr. Rajesh Patel",
        role: "Faculty",
        department: "IT",
        image: "/professor-profile.jpg",
      },
      keywords: ["charger", "laptop", "dell", "adapter"],
    },
    {
      id: 4,
      title: "Red Water Bottle",
      description: "Red stainless steel water bottle with 'IGIT' sticker on it.",
      location: "Sports Ground",
      date: "2024-01-12",
      image: "/red-water-bottle.jpg",
      reporter: {
        name: "Sneha Patel",
        role: "Student",
        department: "ME",
        image: "/female-student-profile.png",
      },
      keywords: ["bottle", "water", "red", "steel"],
    },
  ]

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
            <h1 className="text-xl font-semibold text-gray-900">Lost Items</h1>
            <NavLink
              to="/lost/report"
              className="bg-sky-400 text-white px-4 py-2 rounded-lg hover:bg-sky-500 transition-colors font-medium"
            >
              Report Lost Item
            </NavLink>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </h3>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search items..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Category */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent">
                  <option value="">All Categories</option>
                  <option value="electronics">Electronics</option>
                  <option value="accessories">Accessories</option>
                  <option value="clothing">Clothing</option>
                  <option value="books">Books & Stationery</option>
                  <option value="personal">Personal Items</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Location */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent">
                  <option value="">All Locations</option>
                  <option value="library">Library</option>
                  <option value="cafeteria">Cafeteria</option>
                  <option value="labs">Computer Labs</option>
                  <option value="classrooms">Classrooms</option>
                  <option value="hostel">Hostel</option>
                  <option value="sports">Sports Ground</option>
                  <option value="parking">Parking Area</option>
                </select>
              </div>

              {/* Date Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Date Lost</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent">
                  <option value="">Any Time</option>
                  <option value="today">Today</option>
                  <option value="yesterday">Yesterday</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
              </div>

              <button className="w-full bg-sky-400 text-white py-2 px-4 rounded-lg hover:bg-sky-500 transition-colors font-medium">
                Apply Filters
              </button>
            </div>
          </div>

          {/* Items Grid */}
          <div className="flex-1">
            <div className="mb-6">
              <p className="text-gray-600">{lostItems.length} lost items found</p>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {lostItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                >
                  <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="w-4 h-4 mr-1" />
                        {item.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(item.date).toLocaleDateString()}
                      </div>
                    </div>

                    {/* Reporter Info */}
                    <div className="flex items-center space-x-3 pt-3 border-t border-gray-100">
                      <img
                        src={item.reporter.image || "/placeholder.svg"}
                        alt={item.reporter.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{item.reporter.name}</p>
                        <p className="text-xs text-gray-500">
                          {item.reporter.role} • {item.reporter.department}
                        </p>
                      </div>
                      <button className="text-sky-600 hover:text-sky-700 text-sm font-medium">Contact</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
