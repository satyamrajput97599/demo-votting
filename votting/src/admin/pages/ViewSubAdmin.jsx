import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header1 from "../components/Header1";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faLink } from "@fortawesome/free-solid-svg-icons";

const API_URL =
  "https://digitaldemomachine.com/backend/get_sub_admin.php";

const ViewSubadmin = () => {
  const [subadmins, setSubAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalContent, setModalContent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); // New state for search input
  const itemsPerPage = 15;
  const navigate = useNavigate();

  useEffect(() => {
    fetchSubAdmins();
  }, []);

  // Fetch sub-admins when the component mounts
  const fetchSubAdmins = async () => {
    try {
      const response = await axios.get(API_URL);
      if (Array.isArray(response.data)) {
        setSubAdmins(response.data);
      } else {
        console.error("Unexpected response format", response.data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching sub-admins:", error);
      setLoading(false);
    }
  };

  // Handle delete sub-admin
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this sub-admin?")) {
      return;
    }

    try {
      const response = await axios.post(
        "https://digitaldemomachine.com/backend/delete_sub_admin.php",
        { id },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.success) {
        alert("Sub-admin deleted successfully!");
        window.location.reload(); // Refresh the page
      } else {
        console.error("Delete request failed:", response.data);
        alert(response.data.message || "Error deleting sub-admin.");
      }
    } catch (error) {
      console.error("Error deleting sub-admin:", error);
      alert("Something went wrong! Please try again.");
    }
  };

  // Handle Enable Sub-Admin
  const handleEnable = async (id, currentStatus) => {
    const newStatus = currentStatus === 1 ? 0 : 1; // Toggle status
    const action = newStatus === 1 ? "enable" : "disable";

    if (newStatus === 1) {
      if (!window.confirm("Are you sure you want to enable this sub-admin?")) {
        return;
      }
    } else {
      if (!window.confirm("Are you sure you want to disable this sub-admin?")) {
        return;
      }
    }

    try {
      const response = await axios.post(
        "https://digitaldemomachine.com/backend/enable_sub_admin.php",
        { id, status: newStatus },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.success) {
        alert(`Sub-admin ${action}d successfully!`);
        fetchSubAdmins(); // Refresh the sub-admin list
      } else {
        alert(response.data.message || `Error ${action}ing sub-admin.`);
      }
    } catch (error) {
      console.error(`Error ${action}ing sub-admin:`, error);
      alert("Something went wrong! Please try again.");
    }
  };

  // Handle Disable Sub-Admin
  const handleDisable = async (id, currentStatus) => {
    const newStatus = currentStatus === 0 ? 1 : 0; // Toggle status
    const action = newStatus === 0 ? "disable" : "enable";

    if (newStatus === 0) {
      if (!window.confirm("Are you sure you want to disable this sub-admin?")) {
        return;
      }
    } else {
      if (!window.confirm("Are you sure you want to Enable this sub-admin?")) {
        return;
      }
    }

    try {
      const response = await axios.post(
        "https://digitaldemomachine.com/backend/disable_sub_admin.php",
        { id, status: newStatus },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.success) {
        alert(`Sub-admin ${action}d successfully!`);
        fetchSubAdmins(); // Refresh the sub-admin list
      } else {
        alert(response.data.message || `Error ${action}ing sub-admin.`);
      }
    } catch (error) {
      console.error(`Error ${action}ing sub-admin:`, error);
      alert("Something went wrong! Please try again.");
    }
  };

  const openModal = (content) => {
    setModalContent(content);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalContent(null);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(modalContent);
    alert("Copied to clipboard!");
  };

  const editSubadmin = (id) => {
    navigate(`/edit-subadmin/${id}`); // Navigate to edit page
  };

  // Filtered subadmins based on search term
  const filteredSubAdmins = subadmins.filter((subadmin) =>
    subadmin.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredSubAdmins.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedData = filteredSubAdmins.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // const totalPages = Math.ceil(subadmins.length / itemsPerPage);
  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const selectedData = subadmins.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <Header1 />
      <div className="container mx-auto mt-10 px-4">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">
          View Sub-Admins
        </h2>
        {/* Search Input */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded-lg shadow-md w-80 focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <p className="text-center text-lg text-gray-600">
              Loading sub-admins...
            </p>
          ) : (
            <table
              className="w-full bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden"
              style={{ marginLeft: "200px" }}
            >
              <thead className="bg-blue-900 text-white">
                <tr>
                  <th className="py-3 px-6 text-left">ID</th>
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Address</th>
                  <th className="py-3 px-6 text-left">Password</th>
                  <th className="py-3 px-6 text-left">Phone Number</th>
                  <th className="py-3 px-6 text-left">Election Symbol</th>
                  <th className="py-3 px-6 text-left">Party Symbol</th>
                  <th className="py-3 px-6 text-left">Profile Link</th>
                  <th className="py-3 px-6 text-left">Date</th>
                  <th className="py-3 px-6 text-left">Month</th>
                  <th className="py-3 px-6 text-left">Start Time</th>
                  <th className="py-3 px-6 text-left">End Time</th>
                  <th className="py-3 px-6 text-left">Action</th>
                  <th className="py-3 px-6 text-left">Auth</th>
                </tr>
              </thead>
              <tbody>
                {selectedData.length > 0 ? (
                  selectedData.map((subadmin) => (
                    <tr key={subadmin.id} className="border-b">
                      <td className="py-3 px-6">{subadmin.id}</td>
                      <td className="py-3 px-6">{subadmin.name}</td>
                      <td className="py-3 px-6">{subadmin.address}</td>
                      <td className="py-3 px-6">{subadmin.password}</td>
                      <td className="py-3 px-6">{subadmin.phone_number}</td>
                      <td className="py-3 px-6">
                        <img
                          src={`https://digitaldemomachine.com/backend/${subadmin.election_symbol}`}
                          alt="Election icon"
                          width="70"
                          height="50"
                        />
                      </td>
                      <td className="py-3 px-6">{subadmin.party_symbol}</td>
                      <td className="py-3 px-6">
                        <button
                          onClick={() => openModal(subadmin.user_link)}
                          className="text-blue-500 cursor-pointer"
                        >
                          <FontAwesomeIcon icon={faLink} className="text-2xl" />
                        </button>
                      </td>
                      <td className="py-3 px-6">{subadmin.date}</td>
                      <td className="py-3 px-6">{subadmin.month_hindi}</td>
                      <td className="py-3 px-6">{subadmin.start_time}</td>
                      <td className="py-3 px-6">{subadmin.end_time}</td>
                      <td className="py-3 px-6">
                        <button
                          onClick={() => handleDelete(subadmin.id)}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
                        >
                          Delete
                        </button>

                        <button
                          onClick={() => editSubadmin(subadmin.id)}
                          className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition"
                        >
                          Edit
                        </button>
                      </td>
                      <td className="py-3 px-6">
                        {/* Enable Button */}
                        <button
                          onClick={() =>
                            handleEnable(subadmin.id, subadmin.status)
                          }
                          className={`px-4 py-2 rounded-lg shadow-md transition ${
                            subadmin.status === 1
                              ? "bg-red-800 hover:bg-red-600"
                              : "bg-green-800 hover:bg-green-600"
                          } text-white`}
                        >
                          {subadmin.status === 1 ? "Disable" : "Enable"}
                        </button>

                        {/* Disable Button */}
                        <button
                          onClick={() =>
                            handleDisable(subadmin.id, subadmin.status)
                          }
                          className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
                          disabled={subadmin.status === 0} // Disable if already disabled
                        >
                          Disable
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-3 text-gray-600">
                      No sub-admins found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6">
          <button
            className="px-4 py-2 bg-gray-300 rounded-lg mr-2"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
          <span className="px-4 py-2 border rounded-lg bg-white shadow-md">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-4 py-2 bg-gray-300 rounded-lg ml-2"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-md flex justify-center items-center">
          <div
            className="relative bg-opacity-20 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-white border-opacity-30 w-96 text-center animate-fadeIn"
            style={{ backgroundColor: "rgb(213, 100, 100)", color: "white" }}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 bg-red-500 text-white w-8 h-8 flex items-center justify-center rounded-full shadow-lg hover:bg-red-600 transition"
            >
              ✖
            </button>

            {/* Icon / Heading */}
            <h3 className="text-2xl font-extrabold text-white drop-shadow-md mb-4">
              🔥 Your Content 🔥
            </h3>

            {/* Content */}
            <p className="text-white text-lg font-medium px-4 py-3 bg-gray-900 bg-opacity-30 rounded-lg break-all">
              {modalContent}
            </p>

            {/* Buttons */}
            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={copyToClipboard}
                className="px-6 py-3 rounded-full bg-blue-500 text-white font-bold shadow-lg hover:bg-blue-600 hover:shadow-blue-500 transition transform hover:scale-105"
              >
                📋 Copy
              </button>
              <button
                onClick={closeModal}
                className="px-6 py-3 rounded-full bg-gray-700 text-white font-bold shadow-lg hover:bg-gray-800 hover:shadow-gray-500 transition transform hover:scale-105"
              >
                ❌ Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewSubadmin;
