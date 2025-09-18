import { Search } from "lucide-react";

export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

      {/* Loader Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center">
        {/* Logo */}
        <div className="flex items-center justify-center space-x-2 mb-6">
          <div className="w-8 h-8 bg-sky-400 rounded-lg flex items-center justify-center">
            <Search className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">
            IGIT Lost & Found
          </span>
        </div>

        {/* Spinner */}
        <div className="relative">
          <div className="w-12 h-12 border-4 border-sky-100 border-t-sky-400 rounded-full animate-spin"></div>
        </div>

        {/* Loading Text */}
        <p className="text-gray-600 mt-4 text-center">Please wait...</p>
      </div>
    </div>
  );
}
