import React, { useState } from "react";
import TableData from "./TableData";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap
import "./TableComponent.css"; // Importing external CSS for media queries
import Popup from "./Popup";

const TableComponent = () => {
    const [clickedIndex, setClickedIndex] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const audio = new Audio("/audio/notification.mp3"); // ऑडियो फ़ाइल का पथ सही दें

    const handleButtonClick = (index) => {
        setTimeout(() => {
            setClickedIndex(index);
        }, 600);

        setTimeout(() => {
            setShowPopup(true);
            audio.play(); // पॉपअप खुलने के साथ ऑडियो प्ले होगा
        }, 900);
    };

    const closePopup = () => {
        setShowPopup(false);
        setClickedIndex(null);
    };

    return (
        <div className="table-container d-flex justify-content-center align-items-center p-1" style={{ minHeight:"100vh" }}>
            <table className="table table-bordered border-dark text-center custom-table m-0">
                <thead>
                    <tr>
                        <th className="border border-dark text-center align-middle">अ.क्र</th>
                        <th colSpan="2" className="border border-dark text-center align-middle">उम्मीदवार का नाम</th>
                        <th className="border border-dark text-center align-middle">चुनाव चिह्न</th>
                        <th className="border border-dark text-center align-middle button-column">बटन</th>
                    </tr>
                </thead>
                <tbody>
                    {TableData.map((row, index) => (
                        <tr key={index} className="table-row align-middle">
                            <td className="border border-dark text-center align-middle">{row.column1}</td>
                            <td className="border border-dark text-center align-middle" style={{ whiteSpace: "nowrap" }}>{row.column2A}</td>
                            <td className="image-cell border border-dark p-0 align-middle">
                                <img src={row.column2B} alt="" className="table-image w-100 h-100" style={{ objectFit: "cover" }} />
                            </td>
                            <td className="image-cell border border-dark p-0 align-middle">
                                <img src={row.column3} alt="" className="table-image w-100 h-100" style={{ objectFit: "cover" }} />
                            </td>
                            <td className="button-container border border-dark d-flex justify-content-center ">
                                    <div className={`rounded-indicator ${clickedIndex === index ? "active" : ""}`}></div>
                                    <button className="vote-button" onClick={() => handleButtonClick(index)}>
                                        {row.column4.buttonLabel}
                                    </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showPopup && <Popup closePopup={closePopup} />}
        </div>
    );
};

export default TableComponent;
