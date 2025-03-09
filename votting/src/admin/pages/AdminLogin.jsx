import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = ({ setUser }) => {
  const [username, setUsername] = useState(""); // Fixed variable name
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://digitaldemomachine.com/backend/admin-login.php",
        { username, password }, // Send 'username' instead of 'email'
        { withCredentials: true }
      );

      if (response.data.status === "success") {
        setUser(response.data.user);
        alert("Login Successful!");
        navigate("/admin-dashboard");
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("Login failed. Please try again.");
    }
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="w-100" style={{ maxWidth: "500px" }}>
        <div className="card shadow border">
          <div className="card-body">
            <div className="text-center mb-3">
              <a href="/admin-login" className="h3 text-primary fw-bold">
                Voting System
              </a>
            </div>
            <h4 className="text-center mb-3 fw-semibold">ADMIN LOGIN</h4>

            {errorMessage && (
              <div className="alert alert-danger text-center">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleLogin} autoComplete="off">
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)} // Fixed here
                  className="form-control form-control-lg text-center"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control form-control-lg text-center"
                  required
                />
              </div>
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="showPassword"
                  onChange={handleShowPassword}
                />
                <label className="form-check-label ms-2" htmlFor="showPassword">
                  Show Password
                </label>
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-primary btn-lg">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
