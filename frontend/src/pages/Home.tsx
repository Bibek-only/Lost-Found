import { Search, Users, Shield, Heart } from "lucide-react"
import { NavLink } from "react-router-dom"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-sky-400 rounded-lg flex items-center justify-center">
                <Search className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">IGIT Lost & Found</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <NavLink to="/" className="text-gray-700 hover:text-sky-600 font-medium">
                Home
              </NavLink>
              <NavLink to="/lost" className="text-gray-700 hover:text-sky-600 font-medium">
                Lost Items
              </NavLink>
              <NavLink to="/found" className="text-gray-700 hover:text-sky-600 font-medium">
                Found Items
              </NavLink>
              <NavLink to="/profile" className="text-gray-700 hover:text-sky-600 font-medium">
                Profile
              </NavLink>
            </nav>
            <NavLink
              to="/auth"
              className="bg-sky-400 text-white px-4 py-2 rounded-lg hover:bg-sky-500 transition-colors font-medium"
            >
              Sign In
            </NavLink>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-sky-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 text-balance">
            Lost Something? <br />
            <span className="text-sky-600">We'll Help You Find It</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto text-pretty">
            IGIT Sarang's digital platform connecting students, teachers, and staff to report and recover lost items
            quickly and efficiently.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <NavLink
              to="/lost"
              className="bg-sky-400 text-white px-8 py-3 rounded-lg hover:bg-sky-500 transition-colors font-medium text-lg"
            >
              Report Lost Item
            </NavLink>
            <NavLink
              to="/found"
              className="bg-green-100 text-green-700 px-8 py-3 rounded-lg hover:bg-green-200 transition-colors font-medium text-lg border border-green-200"
            >
              Report Found Item
            </NavLink>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our simple three-step process helps you recover lost items and build a supportive campus community.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-sky-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Report & Search</h3>
              <p className="text-gray-600">
                Easily report lost or found items with detailed descriptions, photos, and location information.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Connect & Match</h3>
              <p className="text-gray-600">
                Our smart matching system connects lost and found items, notifying relevant parties instantly.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Reunite & Appreciate</h3>
              <p className="text-gray-600">
                Celebrate helpful community members and build a culture of support and kindness on campus.
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
              <p className="text-lg text-gray-600 mb-6">
                We envision a campus where losing something doesn't cause panic, and finding something creates an
                opportunity to help a fellow community member.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Shield className="w-6 h-6 text-sky-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Secure & Private</h4>
                    <p className="text-gray-600">
                      Your personal information is protected and only shared when necessary for item recovery.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="w-6 h-6 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Community Driven</h4>
                    <p className="text-gray-600">
                      Built by students, for students, teachers, and staff of IGIT Sarang.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Heart className="w-6 h-6 text-purple-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Encouraging Kindness</h4>
                    <p className="text-gray-600">
                      Recognize and celebrate those who go out of their way to help others.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 mb-6">
                To create a digital platform that reduces the stress of losing items, saves valuable time in recovery
                efforts, and fosters a culture of mutual support within the IGIT Sarang community.
              </p>
              <div className="bg-sky-50 p-4 rounded-lg">
                <p className="text-sky-800 font-medium">
                  "Together, we can turn every lost item into an opportunity for community connection."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-sky-400 rounded-lg flex items-center justify-center">
                  <Search className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">IGIT Lost & Found</span>
              </div>
              <p className="text-gray-400 mb-4">
                Connecting the IGIT Sarang community through kindness and mutual support.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick NavLinks</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <NavLink to="/lost" className="hover:text-white">
                    Lost Items
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/found" className="hover:text-white">
                    Found Items
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/profile" className="hover:text-white">
                    Profile
                  </NavLink>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Guidelines
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 IGIT Sarang Lost & Found. Made with ❤️ for our campus community.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
