// src/components/Navbar.jsx
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'Cart', path: '/cart' },
  ];

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition duration-200">
            <span className="text-gray-800">Shop</span><span className="text-blue-600">Ease</span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative group font-medium text-gray-700 hover:text-blue-600 transition duration-200 ${
                    isActive ? 'text-blue-600' : ''
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute left-0 -bottom-1 h-0.5 bg-blue-600 w-0 group-hover:w-full transition-all duration-300 ${
                      isActive ? 'w-full' : ''
                    }`}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
