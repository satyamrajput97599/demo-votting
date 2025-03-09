import React, { useState } from "react";
import axios from "axios";
import Header1 from "../components/Header1";

const AddSubAdmin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [electionSymbol, setElectionSymbol] = useState(null);
  const [partySymbol, setPartySymbol] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // Update Username and Append Last 4 Digits of Phone Number
  const handlePhoneChange = (e) => {
    const phone = e.target.value;
    setPhoneNumber(phone);

    // Append last 4 digits to username (only if username is not empty)
    if (phone.length >= 4) {
      setUsername((prevUsername) => prevUsername.replace(/\d{0,4}$/, "") + phone.slice(-4));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      setElectionSymbol(file);
    } else {
      alert("File size must be less than 5MB");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!startTime || !endTime) {
      alert("Please select both Start Time and End Time.");
      return;
    }

    const formData = new FormData();
    formData.append("name", username); // Username with last 4 digits of phone
    formData.append("password", password);
    formData.append("address", address);
    formData.append("phoneNumber", phoneNumber);
    if (electionSymbol) {
      formData.append("electionSymbol", electionSymbol);
    }
    formData.append("party_symbol", partySymbol);
    formData.append("date", date);
    formData.append("startTime", startTime);
    formData.append("endTime", endTime);

    try {
      const response = await axios.post(
        "https://digitaldemomachine.com/backend/subadmin.php",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("Response:", response.data);
      alert("Data added successfully!");
      window.location.reload();
    } catch (error) {
      console.error(
        "Error adding data:",
        error.response?.data || error.message
      );
      alert("Failed to add data. Please try again.");
    }
  };

  return (
    <>
      <Header1 />
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Create SubAdmin
        </h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md max-w-2xl w-full mx-auto"
        >
          <div className="mb-4">
            {/* User Name (With Auto-Appended Last 4 Digits of Phone) */}
            <label className="block text-gray-700">
              User Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Username"
              required
              className="mt-2 p-2 w-full border rounded"
            />

            {/* Password */}
            <label className="block text-gray-700 mt-2">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              required
              className="mt-2 p-2 w-full border rounded"
            />

            {/* Address */}
            <label className="block text-gray-700 mt-2">
              Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter Address"
              required
              className="mt-2 p-2 w-full border rounded"
            />

            {/* Phone Number */}
            <label className="block text-gray-700 mt-2">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={phoneNumber}
              onChange={handlePhoneChange}
              placeholder="Enter Phone Number"
              required
              className="mt-2 p-2 w-full border rounded"
            />

            {/* Election Symbol (Image) */}
            <label className="block text-gray-700 mt-2">
              Election Symbol (Image) <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-2 p-2 w-full border rounded"
            />

            {/* Party Symbol */}
            <label className="block text-gray-700 mt-2">
              Party Symbol <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={partySymbol}
              onChange={(e) => setPartySymbol(e.target.value)}
              placeholder="Enter Party Symbol"
              required
              className="mt-2 p-2 w-full border rounded"
            />

            {/* Date */}
            <label className="block text-gray-700 mt-2">
              Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="mt-2 p-2 w-full border rounded"
            />

            {/* Start Time */}
            <label className="block text-gray-700 mt-2">
              Start Time <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
              className="mt-2 p-2 w-full border rounded"
            />

            {/* End Time */}
            <label className="block text-gray-700 mt-2">
              End Time <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
              className="mt-2 p-2 w-full border rounded"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full"
            >
              ADD
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddSubAdmin;
