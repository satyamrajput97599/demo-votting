import { useParams, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TableComponent.css";
import axios from "axios";
import Footer from "./Footer";

function UserGreeting() {
  const { username } = useParams();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userExists, setUserExists] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [clickedIndex, setClickedIndex] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const audio = new Audio("./AUD-20250219-WA0002.mp3");

  useEffect(() => {
    axios
      .get(
        `https://digitaldemomachine.com/backend/check_user.php?username=${username}`
      )
      .then((response) => {
        console.log("API Response:", response.data);
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
  }, [username]);

  if (loading) return <h2 className="text-center mt-5">Loading...</h2>;
  if (!userExists || !userData || !Array.isArray(userData.candidates))
    return <h2 className="text-center mt-5 text-danger">User Not Found</h2>;

  const handleButtonClick = (index) => {
    setClickedIndex(index);
    setSelectedCandidate(userData.candidates[index]); // Store selected candidate

    // Play audio only if it is not already playing
    if (audio.paused) {
      audio.play().catch((error) => console.error("Audio play failed:", error));
    }

    setTimeout(() => setShowPopup(true), 900);
  };

  const closePopup = () => {
    setShowPopup(false);
    setClickedIndex(null);
  };

  return (
    <>
      {/* User Account Dropdown */}
      <div className="relative">
        {/* <div className="absolute top-4 right-4">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Account
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-lg border border-gray-300 overflow-hidden">
              <ul className="text-left">
                <li>
                  <Link
                    to={`/${username}/user-login`}
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-600 hover:text-white transition"
                  >
                    <FaSignInAlt className="mr-2" /> Login
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div> */}

        {/* Voting Banner */}
        <div className="vote-banner">
          <p>
            {/* <span className="bold-text">"{userData.party_symbol}"</span> */}
            <span>
              <span className="bold-text">"{userData.party_symbol}"</span> इस
              चुनाव चिन्ह के सामने बटन दबाएं और भारी मतों से जितायें मतदान
              दिनांक {userData.date.split("-")[2]} {userData.month_hindi}{" "}
              {userData.year} सुबह {userData.start_time} से शाम{" "}
              {userData.end_time}{" "}
            </span>
          </p>
        </div>
      </div>

      {/* Voting Table */}
      <div
        className="table-container d-flex justify-content-center align-items-center p-1"
        style={{
          // minHeight: "100vh",
          borderWidth: "0px",
        }}
      >
        <table className="table table-bordered border-dark text-center custom-table m-0">
          <thead>
            <tr>
              <th
                className="border p-0 border-dark text-center align-middle"
                style={{ fontSize: "13px" }}
              >
                अ.क्र
              </th>
              <th
                colSpan="2"
                className="border p-0 border-dark text-center align-middle"
                style={{ fontSize: "13px" }}
              >
                उम्मीदवार का नाम
              </th>
              <th
                className="border p-0 border-dark text-center align-middle"
                style={{ fontSize: "13px" }}
              >
                चुनाव चिह्न
              </th>
              <th
                className="border p-0 border-dark text-center align-middle button-column"
                style={{ fontSize: "13px" }}
              >
                बटन
              </th>
            </tr>
          </thead>
          <tbody>
            {userData.candidates.map((candidate, index) => (
              <tr key={index} className="table-row align-middle">
                <td className="border border-dark text-center align-middle">
                  {index + 1}.
                </td>
                <td
                  className="border border-dark text-center align-middle"
                  style={{ whiteSpace: "nowrap" }}
                >
                  {candidate.name}
                </td>
                <td className="image-cell border border-dark p-0 align-middle">
                  <img
                    src={
                      candidate.image
                        ? `https://digitaldemomachine.com/backend/uploads/${candidate.image}`
                        : ""
                    }
                    // alt="Candidate Image"
                    className="table-image "
                    // style={{ objectFit: "cover" }}
                  />
                </td>
                <td className="image-cell border border-dark p-0 align-middle">
                  <img
                    src={
                      candidate.symbol
                        ? `https://digitaldemomachine.com/backend/uploads/${candidate.symbol}`
                        : ""
                    }
                    // alt="Party Symbol"
                    className="table-image "
                    // style={{ objectFit: "cover" }}
                  />
                </td>
                {/* <td className="button-container border-dark d-flex justify-content-center">
                  {candidate.name && candidate.button_checked === "0" && (
                    <>
                      <div
                        className={`rounded-indicator ${
                          clickedIndex === index ? "active" : ""
                        }`}
                      ></div>
                      <button
                        className="vote-button"
                        onClick={() => handleButtonClick(index)}
                      >
                        बटन दबाएँ
                      </button>
                    </>
                  )}
                </td> */}
                <td
                  className="border border-dark text-center align-middle"
                  style={{ width: "89px" }}
                >
                  {/* Ensure flex alignment */}
                  {candidate.name && candidate.button_checked === "0" && (
                    <div
                      className="button-container border-dark d-flex justify-content-center"
                      style={{ height: "44px" }}
                    >
                      <div
                        className={`rounded-indicator ${
                          clickedIndex === index ? "active" : ""
                        }`}
                      ></div>
                      <button
                        className="vote-button"
                        onClick={() => handleButtonClick(index)}
                      >
                        बटन दबाएँ
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <nav className="popup-header">
              <p className="ms-3">{userData.address}</p>
              <button className="close-btn" onClick={closePopup}>
                ×
              </button>
            </nav>
            <div className="popup-body">
              <img
                src="./evm.png"
                alt="Election Banner"
                className="popup-image"
              />
              <button
                className="whatsapp-btn"
                onClick={() => {
                  if (selectedCandidate) {
                    const username = userData?.username || "Guest";
                    const url = `https://digitaldemomachine.com/vote/${username}`;
                    const text = `मैंने ${selectedCandidate.name} को वोट किया। आप भी कीजिए!`;

                    const imageUrl =
                      "https://digitaldemomachine.com/backend/uploads/" +
                      selectedCandidate.image;
                    const encodedText = encodeURIComponent(
                      `${text} ${url}\n\n${imageUrl}`
                    );
                    const whatsappLink = `https://wa.me/?text=${encodedText}`;
                    window.open(whatsappLink, "_blank");

                    window.open(whatsappLink, "_blank");
                  }
                }}
              >
                <i className="ri-whatsapp-line"></i> SHARE
              </button>
            </div>
            {/* Bottom Centered Text and Image */}
            <div
              className="popup-footer"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <p>
                {selectedCandidate?.name?.split(" ").map((word, index) => (
                  <React.Fragment key={index}>
                    {word} <br />
                  </React.Fragment>
                ))}
              </p>
              <div style={{ display: "flex", justifyContent: "center" }}>
                {/* <span
                  style={{
                    fontSize: "2rem",
                    marginRight: "1vw",
                    textAlign: "end",
                  }}
                >
                  1
                </span> */}
                <img
                  src={
                    selectedCandidate?.symbol
                      ? `https://digitaldemomachine.com/backend/uploads/${selectedCandidate.symbol}`
                      : ""
                  }
                  alt="Candidate Symbol"
                />
              </div>
              {/* <h1>{index + 1}</h1> */}
            </div>
          </div>
        </div>
      )}

      {/* WhatsApp Share Button */}
      <div
        className="text-center flex flex-col items-center p-3 container"
        style={{ maxWidth: "90%", margin: "0 auto", marginBottom: "5vh" }}
      >
        <button
          className="whatsapp-btn"
          onClick={() => {
            const username = userData?.username || "Guest"; // Ensures userData is defined
            const url = `http://localhost:5173/${username}`;
            const text = `${url} मैंने डेमो मतदान किया आप भी कीजिए `;
            const encodedText = encodeURIComponent(text);
            const whatsappLink = `https://wa.me/?text=${encodedText}`;

            window.open(whatsappLink, "_blank");
          }}
        >
          <i className="ri-whatsapp-line"></i> SHARE
        </button>
      </div>

      <Footer />
    </>
  );
}

export default UserGreeting;
