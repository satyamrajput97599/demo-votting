import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Topsection = () => {
  const [url, setUrl] = useState("");

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = () => {
    if (url) {
      // Check if the URL is valid
      const validUrl = /^(ftp|http|https):\/\/[^ "]+$/.test(url);
      if (validUrl) {
        // Redirect to the URL in the same tab
        window.location.href = url;
      } else {
        alert("Please enter a valid URL.");
      }
    }
  };

  const handleKeyDown = (e) => {
    // Trigger submit when Enter key is pressed
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="relative">
      {/* Search Bar and Submit Button */}
      <div className="flex justify-center items-center mt-12">
        <div className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 p-8 rounded-xl shadow-2xl w-full max-w-lg">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-extrabold text-white mb-4 animate__animated animate__fadeIn">
              Submit Your URL
            </h2>
            <p className="text-white text-lg opacity-80">
              Paste your URL below and hit submit to proceed.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="url"
              value={url}
              onChange={handleUrlChange}
              onKeyDown={handleKeyDown}
              placeholder="Paste your URL here"
              className="w-full py-4 px-5 rounded-l-xl border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-400 transition ease-in-out duration-300 text-lg"
            />
            <button
              onClick={handleSubmit}
              className="bg-yellow-400 text-white px-8 py-4 rounded-r-xl hover:bg-yellow-500 hover:scale-105 transform transition duration-300 ease-in-out"
            >
              <FaSearch className="inline-block mr-2" />
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topsection;
