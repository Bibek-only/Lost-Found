import { NavLink } from "react-router-dom"
import { ArrowLeft, Search, Filter, MapPin, Calendar } from "lucide-react"

export default function FoundItemsPage() {
  // Mock data for found items
  const foundItems = [
    {
      id: 1,
      title: "Samsung Galaxy Earbuds",
      description: "Found white Samsung Galaxy earbuds in the charging case near the main gate.",
      location: "Main Gate Area",
      date: "2024-01-16",
      image: "/samsung-galaxy-earbuds-white.jpg",
      finder: {
        name: "Rohit Singh",
        role: "Student",
        department: "EEE",
        image: "/male-student-profile.png",
      },
      keywords: ["earbuds", "samsung", "white", "wireless"],
    },
    {
      id: 2,
      title: "Blue Notebook",
      description: "Found a blue spiral notebook with handwritten notes. Looks like engineering notes.",
      location: "Classroom Block B",
      date: "2024-01-15",
      image: "/blue-spiral-notebook.jpg",
      finder: {
        name: "Kavya Reddy",
        role: "Student",
        department: "CSE",
        image: "/female-student-profile.png",
      },
      keywords: ["notebook", "blue", "notes", "spiral"],
    },
    {
      id: 3,
      title: "Silver Watch",
      description: "Found a silver analog watch with leather strap near the library entrance.",
      location: "Library Entrance",
      date: "2024-01-14",
      image: "/silver-analog-watch-leather-strap.jpg",
      finder: {
        name: "Prof. Meera Joshi",
        role: "Faculty",
        department: "Physics",
        image: "/female-professor-profile.jpg",
      },
      keywords: ["watch", "silver", "analog", "leather"],
    },
    {
      id: 4,
      title: "Green Umbrella",
      description: "Found a green folding umbrella left in the cafeteria after yesterday's rain.",
      location: "Cafeteria",
      date: "2024-01-13",
      image: "/green-folding-umbrella.jpg",
      finder: {
        name: "Arjun Patel",
        role: "Staff",
        department: "Administration",
        image: "/male-staff-profile.jpg",
      },
      keywords: ["umbrella", "green", "folding", "rain"],
    },
    {
      id: 5,
      title: "Student ID Card",
      description: "Found a student ID card. Keeping details private for security reasons.",
      location: "Parking Area",
      date: "2024-01-12",
      image: "/student-id-card.jpg",
      finder: {
        name: "Security Team",
        role: "Security",
        department: "Campus Security",
        image: "/security-guard-profile.png",
      },
      keywords: ["ID", "card", "student", "identification"],
    },
    {
      id: 6,
      title: "Black Backpack",
      description: "Found a black backpack with some books and stationery items inside.",
      location: "Sports Ground",
      date: "2024-01-11",
      image: "/black-backpack.png",
      finder: {
        name: "Deepak Kumar",
        role: "Student",
        department: "ME",
        image: "/male-student-profile.png",
      },
      keywords: ["backpack", "black", "bag", "books"],
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
            <h1 className="text-xl font-semibold text-gray-900">Found Items</h1>
            <NavLink
              to="/found/report"
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors font-medium"
            >
              Report Found Item
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
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Category */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Location Found</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option value="">All Locations</option>
                  <option value="library">Library</option>
                  <option value="cafeteria">Cafeteria</option>
                  <option value="labs">Computer Labs</option>
                  <option value="classrooms">Classrooms</option>
                  <option value="hostel">Hostel</option>
                  <option value="sports">Sports Ground</option>
                  <option value="parking">Parking Area</option>
                  <option value="main-gate">Main Gate</option>
                </select>
              </div>

              {/* Date Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Date Found</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option value="">Any Time</option>
                  <option value="today">Today</option>
                  <option value="yesterday">Yesterday</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
              </div>

              <button className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors font-medium">
                Apply Filters
              </button>
            </div>
          </div>

          {/* Items Grid */}
          <div className="flex-1">
            <div className="mb-6">
              <p className="text-gray-600">{foundItems.length} found items available</p>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {foundItems.map((item) => (
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

                    {/* Finder Info */}
                    <div className="flex items-center space-x-3 pt-3 border-t border-gray-100">
                      <img
                        src={item.finder.image || "/placeholder.svg"}
                        alt={item.finder.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{item.finder.name}</p>
                        <p className="text-xs text-gray-500">
                          {item.finder.role} • {item.finder.department}
                        </p>
                      </div>
                      <button className="text-green-600 hover:text-green-700 text-sm font-medium">Claim</button>
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
