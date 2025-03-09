import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Header1 from "../components/Header1";

const EditSubAdmin = () => {
  const [UserSubAdmin, setUserSubAdmin] = useState({
    id: "",
    name: "",
    password: "",
    phone_number: "",
    election_symbol: "",
    date: "",
    start_time: "",
    end_time: "",
  });

  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Added state to toggle password visibility
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `https://digitaldemomachine.com/backend/Edit_sub_admin1.php?id=${id}`
      )
      .then((response) => {
        console.log("Fetched data:", response.data); // Debugging line
        if (response.data.error) {
          setError(response.data.error);
        } else {
          setUserSubAdmin({
            ...response.data,
            start_time: response.data.start_time
              ? response.data.start_time.slice(0, 5)
              : "",
            end_time: response.data.end_time
              ? response.data.end_time.slice(0, 5)
              : "",
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching UserSubAdmin:", error);
        setError("Failed to fetch UserSubAdmin data.");
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserSubAdmin((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", UserSubAdmin.id);
    formData.append("name", UserSubAdmin.name);
    formData.append("password", UserSubAdmin.password);
    formData.append("phone_number", UserSubAdmin.phone_number);
    formData.append("address", UserSubAdmin.address);
    formData.append("election_symbol", file); // Append file
    formData.append("party_symbol", UserSubAdmin.party_symbol);
    formData.append("date", UserSubAdmin.date);
    formData.append("start_time", UserSubAdmin.start_time);
    formData.append("end_time", UserSubAdmin.end_time);

    try {
      await axios.post(
        `https://digitaldemomachine.com/backend/update_sub_admin.php`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("UserSubAdmin updated successfully!");
      navigate("/view-subadmin");
    } catch (error) {
      console.error("Error updating SubAdmin:", error);
      setError("Error updating SubAdmin. Please try again.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="page-wrapper">
      <Header1 />
      <div className="container mx-auto p-4">
        <div className="row justify-center">
          <div className="col-lg-11 mb-5">
            <div
              className="bg-white p-6 rounded shadow-md"
              style={{ marginLeft: "215px" }}
            >
              <h1 className="text-2xl font-bold mt-5">
                <span className="text-red-600">Edit</span> SubAdmin
              </h1>

              {error && <div className="text-red-600 mb-4">{error}</div>}

              <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                className="border border-red-500 p-4"
              >
                <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
                  <div className="flex-1">
                    <label className="block text-gray-700">
                      UserName Not Change<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={UserSubAdmin.name}
                      onChange={handleChange}
                      placeholder="Enter Name"
                      className="mt-2 p-2 w-full border rounded" readOnly
                    />
                  </div>

                  <div className="flex-1 relative">
                    {" "}
                    {/* relative for positioning the button */}
                    <label className="block text-gray-700 mt-2">
                      Update Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      type={showPassword ? "text" : "password"} // Toggle input type based on showPassword state
                      name="password"
                      value={UserSubAdmin.password}
                      onChange={handleChange}
                      placeholder="Enter Password"
                      className="mt-2 p-2 w-full border rounded"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-2 top-2 text-red-500"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mt-2">
                    Update Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={UserSubAdmin.address}
                    onChange={handleChange}
                    placeholder="Enter Update Address"
                    className="mt-2 p-2 w-full border rounded"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mt-2">
                    Update Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="phone_number"
                    value={UserSubAdmin.phone_number}
                    onChange={handleChange}
                    placeholder="Enter Update Phone Number"
                    className="mt-2 p-2 w-full border rounded"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mt-2">
                    Update Election Icon (Image){" "}
                    <span className="text-red-500">*</span>
                  </label>
                  {UserSubAdmin.election_symbol ? (
                    <img
                      src={`https://digitaldemomachine.com/backend/${UserSubAdmin.election_symbol}`}
                      alt="Party icon"
                      width="70"
                      height="50"
                    />
                  ) : (
                    <p className="text-gray-500">No image available</p>
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="mt-2 p-2 w-full border rounded"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mt-2">
                    Update Party Symbol <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="party_symbol"
                    value={UserSubAdmin.party_symbol}
                    onChange={handleChange}
                    className="mt-2 p-2 w-full border rounded"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mt-2">
                    Update Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={UserSubAdmin.date}
                    onChange={handleChange}
                    className="mt-2 p-2 w-full border rounded"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mt-2">
                    Update Start Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    name="start_time"
                    value={UserSubAdmin.start_time}
                    onChange={handleChange}
                    className="mt-2 p-2 w-full border rounded"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mt-2">
                    Update End Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    name="end_time"
                    value={UserSubAdmin.end_time}
                    onChange={handleChange}
                    className="mt-2 p-2 w-full border rounded"
                  />
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSubAdmin;
