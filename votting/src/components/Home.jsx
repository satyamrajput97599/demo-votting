import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaUser, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import TableComponent from "./TableComponent";
import Counterr from "./Counter";
import Footer from "./Footer";

const Home = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        "https://digitaldemomachine.com/backend/check_session-user.php",
        { withCredentials: true }
      )
      .then((res) => {
        console.log("Session response:", res.data);
        if (res.data.logged_in) {
          setUser(res.data.user);
        } else {
          navigate("/user-login");
        }
      })
      .catch((error) => console.error("Error fetching session", error));
  }, [navigate]);

  const handleLogout = () => {
    axios
      .post(
        "https://digitaldemomachine.com/backend/logout.php",
        {},
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.status === "success") {
          // Clear browser session cookies
          document.cookie =
            "PHPSESSID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          
          // Reset user state
          setUser(null);
  
          // Redirect to login page
          navigate("/");
        } else {
          console.error("Logout failed:", res.data);
        }
      })
      .catch((error) => console.error("Error logging out", error));
  };
  

  return (
    <>
      {/* Account Button */}
      <div className="relative">
        <div className="absolute top-4 right-4">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            {user ? `${user.username}` : "Account"}
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-300 overflow-hidden animate-fadeIn">
              <ul className="text-left">
                {user ? (
                  <>
                    <li className=" py-3 text-gray-700 border-b">
                      {/* <p className="font-semibold">{user.username}</p> */}
                      <h4 className="font-bold text-blue-600 text-lg tracking-wide">
                        Phone No.
                        {user.phone}
                      </h4>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-100 transition-all"
                      >
                        <FaSignOutAlt className="mr-2" /> Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link
                        to="/user-login"
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-600 hover:text-white transition-all"
                      >
                        <FaSignInAlt className="mr-2" /> Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/user-register"
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-600 hover:text-white transition-all"
                      >
                        <FaUser className="mr-2" /> Register
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Vote Banner */}
      <div className="vote-banner">
        <p>
          <span className="bold-text">“कमल”</span>
          <span>
            इस चुनाव चिन्ह के सामने बटन दबाएं और भारी मतों से जितायें मतदान
            दिनांक 5 फरवरी 2025 सुबह ०७:०० से शाम ०६:००
          </span>
        </p>
      </div>

      <TableComponent />
      <Counterr />
      <Footer />
    </>
  );
};

export default Home;
