import { Search, Home, ArrowLeft, AlertCircle } from "lucide-react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    
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
                Connecting the IGIT Sarang community through kindness and mutual
                support.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
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
            <p>
              &copy; 2024 IGIT Sarang Lost & Found. Made with ❤️ for our campus
              community.
            </p>
          </div>
        </div>
      </footer>
  )
}

export default Footer
