import { useState } from "react";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 shadow-md border-b border-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src="/logo.svg" alt="Logo" className="h-8 w-8" />
            <span className="text-xl font-bold text-gray-100">Job finder</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <a href="#" className="text-white hover:text-blue-600 font-medium">Home</a>
            <a href="#" className="text-white hover:text-blue-600 font-medium">Find Job</a>
            <a href="#" className="text-white hover:text-blue-600 font-medium">Contact Us</a>
          </div>

          {/* Buttons */}
          <div className="hidden md:flex space-x-4">
            <button className="px-4 py-2 text-blue-200 font-medium border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition">
              Login
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">
              Signup
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-700 focus:outline-none">
            {isOpen ? "✖" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden flex flex-col space-y-4 py-4">
            <a href="#" className="text-white hover:text-blue-600 font-medium">Home</a>
            <a href="#" className="text-white hover:text-blue-600 font-medium">Find Job</a>
            <a href="#" className="text-white hover:text-blue-600 font-medium">Contact Us</a>
            <button className="w-full px-4 py-2 text-blue-600 font-medium border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition">
              Login
            </button>
            <button className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">
              Signup
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}