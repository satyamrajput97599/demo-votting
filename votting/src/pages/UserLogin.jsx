import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const [password, setPassword] = useState("");
  const [userExists, setUserExists] = useState(null); // Added state for user existence check
  const [userData, setUserData] = useState(null); // Store user data from API response
  const [loading, setLoading] = useState(true); // For loading state
  const navigate = useNavigate();
  const { username } = useParams(); // Get username from URL

  // UseEffect to check if user exists
  useEffect(() => {
    if (username) {
      axios
        .get(
          `https://digitaldemomachine.com/backend/check_user.php?username=${username}`
        )
        .then((response) => {
          console.log("API Response:", response.data); // Debugging
          if (response.data.status === "success") {
            setUserExists(true);
            setUserData(response.data);
          } else {
            setUserExists(false);
          }
        })
        .catch((error) => {
          console.error("API Error:", error);
          setUserExists(false);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [username]); // ✅ Ensure username is a dependency

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://digitaldemomachine.com/backend/user-login.php",
        { name: username, password },
        { withCredentials: true }
      );

      console.log("Login response:", res.data);
      if (res.data.status === "success") {
        // Redirect to /:username/user-index after login success
        navigate(`/${username}/user-index`);
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error("Login error", error);
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-500 to-blue-600 p-4">
      <div className="container max-w-lg mx-auto bg-white shadow-2xl rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left-side Image */}
          <div
            className="md:w-5/12 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url("/path_to_your_image.jpg")' }}
          >
            <div className="p-8 flex flex-col justify-center h-full bg-gradient-to-r from-green-500 to-blue-600 text-white">
              <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
              <p className="mb-8">Login to continue your journey with us.</p>
              <Link to={`/${username}/`} className="btn btn-danger">
                Home{" "}
              </Link>
            </div>
          </div>

          {/* Right-side Form */}
          <div className="md:w-7/12 p-8">
            <h3 className="mb-6 text-3xl font-bold text-gray-800 text-center">
              Login
            </h3>
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Input */}
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                whileFocus={{ scale: 1.05 }}
              >
                <label className="block text-gray-700 text-lg mb-2">
                  User Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Your Username"
                  value={username}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </motion.div>

              {/* Password Input */}
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                whileFocus={{ scale: 1.05 }}
              >
                <label className="block text-gray-700 text-lg mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-md"
                whileTap={{ scale: 0.95 }}
              >
                Login
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
