import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCaretDown, FaSignOutAlt, FaHome } from "react-icons/fa";
import axios from "axios";
import { FaTasks } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Header1 = ({ user, setUser }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMasterMenuOpen, setMasterMenuOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      axios
        .get(
          "https://digitaldemomachine.com/backend/check_session_admin.php",
          { withCredentials: true }
        )
        .then((res) => {
          if (res.data.status === "logged_in") {
            setUser(res.data.user);
          } else {
            navigate("/admin-login");
          }
        });
    }
  }, [user, navigate, setUser]);

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return; // If user clicks "Cancel", exit the function

    try {
      const response = await fetch(
        "https://digitaldemomachine.com/backend/config/admin-logout.php",
        {
          method: "GET",
          credentials: "include", // Important for session cookies
          cache: "no-cache",
        }
      );

      const data = await response.json();
      if (data.status === "success") {
        alert("Logged out successfully!");
        window.location.href = "/admin-login"; // Redirect to login page
      } else {
        alert("Logout failed!");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-full w-64 bg-indigo-800 text-white">
        {/* Sidebar Content */}
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="bg-indigo-800 p-6 text-center">
            <h1 className="text-3xl font-bold">Demo Voting</h1>
            <span className="text-lg font-semibold">Admin Panel</span>
          </div>

          {/* Sidebar Menu */}
          <nav className="flex-1 overflow-y-auto bg-black-900">
            <ul className="space-y-2 p-4">
              <li>
                <Link
                  to="/admin-dashboard"
                  className="flex items-center px-4 py-2 text-white hover:bg-indigo-700 rounded-md transition"
                >
                  <FaHome className="mr-2" /> Home
                </Link>
              </li>

              {/* Astrologer Menu */}
              <li>
                <button
                  className="flex items-center px-4 py-2 text-white hover:bg-indigo-700 rounded-md transition w-full text-left"
                  onClick={() => setMasterMenuOpen(!isMasterMenuOpen)}
                >
                  <FaTasks className="mr-2" /> SubAdmin
                  <FaCaretDown className="ml-auto w-4 h-4" />
                </button>
                <ul
                  className={`ml-4 space-y-1 ${
                    isMasterMenuOpen ? "block" : "hidden"
                  }`}
                >
                  <li>
                    <Link
                      to="/view-subadmin"
                      className="flex items-center px-4 py-2 text-white hover:bg-indigo-700 rounded-md transition"
                    >
                      View SubAdmin
                    </Link>
                    <Link
                      to="/add-subadmin"
                      className="flex items-center px-4 py-2 text-white hover:bg-indigo-700 rounded-md transition"
                    >
                      Add SubAdmin
                    </Link>
                  </li>
                </ul>
              </li>

              <li>
                <Link
                  onClick={handleLogout} // ✅ Moved onClick to the button element
                  className="block px-4 py-3 text-red-600 hover:bg-gray-100 flex items-center space-x-3"
                >
                  <FaSignOutAlt className="text-red-600" />
                  <span>Logout</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        <header className="bg-white from-indigo-700 to-purple-600 shadow-lg border-b border-gray-300">
          <nav className="flex items-center justify-between p-4 text-black">
            {/* Page Title */}
            <span className="text-3xl font-bold">Admin Dashboard</span>

            {/* Navbar Right */}
            <div className="flex items-center space-x-6">
              <div className=" text-white p-3 rounded-lg">
                <div
                  className="text-purple-600 font-bold text-lg"
                  onMouseOver={(e) =>
                    e.currentTarget.classList.add("animate-bounce")
                  }
                  onMouseOut={(e) =>
                    e.currentTarget.classList.remove("animate-bounce")
                  }
                >
                  <p className="m-0">
                    Welcome to the Admin Panel of Demo Voting
                  </p>
                </div>
              </div>

              {/* User Account Dropdown */}
              <div className="relative">
                <button
                  className="flex items-center  px-5 py-2 rounded-lg hover:bg-indigo-700 focus:outline-none transition duration-300 ease-in-out"
                  onClick={handleDropdownToggle}
                >
                  <span className="hidden lg:inline-block font-bold hover:text-white">
                    ADMIN
                  </span>
                  <FaCaretDown className="ml-2 text-xl" />
                </button>
                {dropdownOpen && (
                  <ul className="absolute right-0 mt-2 w-56 bg-white text-gray-800 border border-gray-300 rounded-lg shadow-xl">
                    {/* <li>
                      <Link
                        to="/change-password"
                        className="block px-4 py-3 hover:bg-gray-100 flex items-center space-x-3"
                      >
                        <FaUser className="text-gray-600" />
                        <span>Update Profile</span>
                      </Link>
                    </li> */}
                    <li className="border-t">
                      <button
                        onClick={handleLogout} // ✅ Moved onClick to the button element
                        className="block px-4 py-3 text-red-600 hover:bg-gray-100 flex items-center space-x-3"
                      >
                        <FaSignOutAlt className="text-red-600" />
                        <span>Logout</span>
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </nav>
        </header>
        {/* Main content area */}
      </main>
    </div>
  );
};

export default Header1;
