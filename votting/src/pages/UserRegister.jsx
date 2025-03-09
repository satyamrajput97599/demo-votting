import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://digitaldemomachine.com/backend/user-register.php",
        {
          username: user.username,
          email: user.email,
          password: user.password,
          phone: user.phone, // Ensure phone is included
        },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data.message) {
        alert("User Registered Successfully!"); // ✅ Show success alert
        navigate("/user-login"); // Redirect to login or homepage
      } else {
        alert(res.data.error || "Registration failed!"); // ✅ Show error alert
      }
    } catch (err) {
      alert("Something went wrong!");
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
              <h2 className="text-3xl font-bold mb-4">Join Us Today!</h2>
              <p className="mb-8">
                Create your account and explore new possibilities.
              </p>
            </div>
          </div>

          {/* Right-side Form */}
          <div className="md:w-7/12 p-8">
            <h3 className="mb-6 text-3xl font-bold text-gray-800">
              Register Now
            </h3>
            {/* Error Message Display */}
            {message && <div className="mb-4 text-red-600">{message}</div>}
            <form onSubmit={handleSubmit} autoComplete="off">
              {/* Name Input */}
              <div className="mb-4">
                <label className="block text-gray-700 text-lg mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={user.username}
                  onChange={(e) =>
                    setUser({ ...user, username: e.target.value })
                  }
                  placeholder="Enter Your Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              {/* Email Input */}
              <div className="mb-4">
                <label className="block text-gray-700 text-lg mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  placeholder="Enter Your Email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              {/* Phone Number Input */}
              <div className="mb-4">
                <label className="block text-gray-700 text-lg mb-2">
                  Phone Number
                </label>
                <input
                  type="number"
                  value={user.phone}
                  onChange={(e) => setUser({ ...user, phone: e.target.value })}
                  placeholder="Enter Your Phone Number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="mb-4">
                <label className="block text-gray-700 text-lg mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  placeholder="Minimum 6 characters"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-md"
              >
                Register
              </button>
            </form>

            {/* Login Link */}
            <p className="text-center text-gray-600 mt-6">
              Already have an account?{" "}
              <a href="/user-login" className="text-green-600 hover:underline">
                Login Here
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
