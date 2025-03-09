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
  const audio_beep = new Audio("./beep-1082.wav");
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


const handleButtonClick = async (index) => {
  setClickedIndex(index);
  setSelectedCandidate(userData.candidates[index]); // Store selected candidate

  try {
    // Play beep sound first
    await audio_beep.play();
    
    // Wait for 1 second before playing the second audio
    setTimeout(async () => {
      await audio.play();
    }, 1000);

    // Show popup after 1 second
    setTimeout(() => setShowPopup(true), 1000);
  } catch (error) {
    console.error("Audio play failed:", error);
  }
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
        <table className="table table-bordered border-dark border-2 text-center custom-table m-0">
          <thead>
            <tr>
              <th
                className="border-2 p-0 border-dark text-center align-middle"
                style={{ fontSize: "10px" }}
              >
                अ.क्र
              </th>
              <th
                colSpan="2"
                className="border-2 p-0 border-dark text-center align-middle"
                style={{ fontSize: "13px" }}
              >
                उम्मीदवार का नाम
              </th>
              <th
                className="border-2 p-0 border-dark text-center align-middle"
                style={{ fontSize: "13px" }}
              >
                चुनाव चिह्न
              </th>
              <th
                className="border-2 p-0 border-dark  text-center align-middle button-column"
                style={{ fontSize: "13px" }}
              >
                बटन
              </th>
            </tr>
          </thead>
          <tbody>
            {userData.candidates.map((candidate, index) => (
              <tr key={index} className="table-row align-middle">
                <td className="border-2 border-dark text-center align-middle">
                  {index + 1}.
                </td>
                <td
                  className="border-2 border-dark text-center align-middle"
                  style={{ whiteSpace: "nowrap", fontFamily: "unset" }}
                >
                  <b>{candidate.name}</b>
                </td>
                <td className="image-cell border-2 border-dark p-0 align-middle">
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
                <td className="image-cell border-2 border-dark p-0 align-middle">
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
                <td
                  className="border-2 border-dark text-center align-middle"
                  style={{ width: "89px" }}
                >
                  {/* Ensure the button is displayed for all candidates */}
                  <div
                    className="button-container border-dark d-flex justify-content-center"
                    style={{ height: "32px" }}
                  >
                    <div
                      className={`rounded-indicator ${
                        clickedIndex === index ? "active" : ""
                      }`}
                    ></div>
                    <button
                      className="vote-button"
                      onClick={() => handleButtonClick(index)}
                      disabled={candidate.button_checked !== "0"} // Only clickable if button_checked is "0"
                      style={{
                        backgroundColor:
                          candidate.button_checked === "0" ? "" : "",
                        color:
                          candidate.button_checked === "0" ? "white" : "#666",
                        border: "1px solid #ccc",
                        cursor:
                          candidate.button_checked === "0"
                            ? "pointer"
                            : "not-allowed",
                        padding: "-1px 30px",
                      }}
                    >
                      {candidate.button_checked === "0"
                        ? "बटन दबाएँ"
                        : "\u00A0"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup Modal */}
      {showPopup && selectedCandidate && (
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
                  const previewUrl = `https://digitaldemomachine.com/backend/share-preview.php?candidate=${encodeURIComponent(
                    selectedCandidate.name
                    // )}&symbol=${encodeURIComponent(
                    //   selectedCandidate.symbol
                  )}&image=${encodeURIComponent(
                    selectedCandidate.image
                  )}&v=${Date.now()}`;

                  const baseurl = `https://digitaldemomachine.com/${username}`;

                  const text = `मैंने ${selectedCandidate.name} को वोट किया। आप भी कीजिए!\n🔗 ${previewUrl}\n\n वोट करने के लिए इस लिंक पर क्लिक करें 👇👇👇 \n🔗 ${baseurl} `;

                  const whatsappLink = `https://wa.me/?text=${encodeURIComponent(
                    text
                  )}`;

                  window.open(whatsappLink, "_blank");
                }}
              >
                Share on WhatsApp
              </button>
            </div>

            <div
              className="popup-footer"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <p>
                {selectedCandidate.name.split(" ").map((word, index) => (
                  <React.Fragment key={index}>
                    {word} <br />
                  </React.Fragment>
                ))}
              </p>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  src={`https://digitaldemomachine.com/backend/uploads/${selectedCandidate.symbol}`}
                  alt="Candidate Symbol"
                  style={{ maxWidth: "100px" }}
                />
              </div>
              <div
                style={{
                  display: "none",
                  // display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  src={
                    selectedCandidate?.symbol
                      ? `https://digitaldemomachine.com/backend/uploads/${selectedCandidate.image}`
                      : ""
                  }
                  alt="Candidate Image"
                />
              </div>
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
            const previewUrl = `https://digitaldemomachine.com/backend/share.php?username=${encodeURIComponent(
              userData.username
            )}&image=${encodeURIComponent(userData.election_symbol)}`;

            const baseurl = `https://digitaldemomachine.com/${userData.username}`;

            const text = `मैंने ${userData.username} को वोट किया। आप भी कीजिए!\n🔗 ${previewUrl}\n\n वोट करने के लिए इस लिंक पर क्लिक करें 👇👇👇 \n🔗 ${baseurl}`;

            const whatsappLink = `https://wa.me/?text=${encodeURIComponent(
              text
            )}`;
            window.open(whatsappLink, "_blank");
          }}
        >
          Share
        </button>
      </div>

      <div className="footer">
        <span className="footer-text">@2025</span>
        <span className="footer-text">
          Crafted with ❤️ by
          <a href="tel:+919536310555" className="footer-link">
            {" "}
            Call Now
          </a>
        </span>
      </div>
    </>
  );
}

export default UserGreeting;
