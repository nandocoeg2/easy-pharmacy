import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LogOut, Search, Menu, ShoppingCart, X } from "lucide-react";
import { RootState } from "../../stores/Store";
import { Link, useNavigate } from "react-router";
import { logout } from "../../stores/AuthSlice";
import { setSearchQuery } from "../../stores/SearchSlice";
import { toggleCart } from "../../stores/CartSlice";
import Dialog from "../uis/Dialog";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const searchQuery = useSelector((state: RootState) => state.search.query);
  const isOnDashboard = window.location.pathname === "/dashboard";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  if (!isAuthenticated) return null;

  const cartItemsCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main navbar */}
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-600 md:hidden"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
            <Link to="/dashboard">
              <span className="text-xl font-semibold text-gray-800 ml-2">
                EasyPharmacy
              </span>
            </Link>
          </div>

          {/* Desktop right section */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {/* Search */}
            {isOnDashboard && (
              <div className="relative w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                  placeholder="Search products..."
                  className="block w-full pl-10 pr-8 py-2 border border-gray-300 rounded-md text-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => dispatch(setSearchQuery(""))}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <X className="h-4 w-4 text-gray-400 hover:text-gray-500" />
                  </button>
                )}
              </div>
            )}

            {/* Cart button */}
            <button
              onClick={() => dispatch(toggleCart())}
              className="relative p-2 rounded-full text-gray-400 hover:text-gray-500"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>

            <div className="flex items-center ml-2">
              <img
                className="h-8 w-8 rounded-full"
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  user?.email || ""
                )}&background=random`}
                alt="Profile"
              />
              <span className="ml-2 text-sm font-medium text-gray-700 hidden lg:block">
                {user?.email}
              </span>
            </div>

            <button
              onClick={() => setLogoutDialogOpen(true)}
              className="ml-2 px-3 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              <span className="hidden sm:inline">Logout</span>
              <LogOut className="h-4 w-4 sm:hidden" />
            </button>
          </div>

          {/* Mobile right section */}
          <div className="flex items-center space-x-2 md:hidden">
            <button
              onClick={() => dispatch(toggleCart())}
              className="relative p-2 text-gray-400"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200">
          {/* Mobile search */}
          {isOnDashboard && (
            <div className="px-4 py-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                  placeholder="Search products..."
                  className="block w-full pl-10 pr-8 py-2 border border-gray-300 rounded-md text-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => dispatch(setSearchQuery(""))}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <X className="h-4 w-4 text-gray-400 hover:text-gray-500" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Mobile profile */}
          <div className="px-4 py-3 border-t border-gray-200">
            <div className="flex items-center">
              <img
                className="h-10 w-10 rounded-full"
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  user?.email || ""
                )}&background=random`}
                alt="Profile"
              />
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">
                  {user?.email}
                </div>
              </div>
            </div>
            <div className="mt-3">
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-base font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
      <Dialog
        isOpen={logoutDialogOpen && isAuthenticated !== null}
        onClose={() => setLogoutDialogOpen(false)}
        onConfirm={handleLogout}
        title="Logout Account"
        description="Are you sure you want to logout?"
        confirmText="Logout"
        cancelText="Cancel"
      />
    </nav>
  );
}
