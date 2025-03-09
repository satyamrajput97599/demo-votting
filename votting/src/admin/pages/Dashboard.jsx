import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ user, setUser }) => {
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
    try {
      const response = await fetch(
        "https://digitaldemomachine.com/backend/config/logout.php",
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



  return (
    <div>
      <h2>Welcome, {user?.username}!</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
    // <div className="flex flex-col min-h-screen bg-gray-100">
    //   {/* Include Header1 */}
    //   <Header1 onSidebarToggle={handleSidebarToggle} />

    //   {/* Main Content */}
    //   <div className="flex-1 flex flex-col">
    //     <main className="flex-1 p-6" style={{ marginLeft: "260px" }}>
    //       <h3 className="text-2xl font-bold mb-4">Dashboard Overview</h3>

    //       {/* Image */}
    //       <div
    //         className={`flex-1 mt-6 transition-all duration-300 ease-in-out ${
    //           sidebarOpen ? "ml-64" : "ml-0"
    //         }`}
    //       >
    //         <img src={w1} alt="Dashboard Overview" className="w-full h-auto" />
    //       </div>
    //     </main>
    //   </div>
    // </div>
  );
};

export default Dashboard;
