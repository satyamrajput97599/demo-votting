import React from "react";
import "./Popup.css"

const Popup = ({ closePopup, imageUrl }) => {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <nav className="popup-header d-flex justify-content-between align-items-center">
          <p>20- चांदनी चौक विधानसभा आम चुनाव 2025</p>
          <button className="close-btn" onClick={closePopup}>
            <i className="ri-close-large-line"></i>
          </button>
        </nav>
        <div className="popup-body">
          <img src="./evm.png" alt="Election Banner" className="popup-image" />
          <button className="whatsapp-button">
            <span className="icon">
              <i className="ri-whatsapp-line"></i>
            </span>
            <span className="text">SHARE</span>
          </button>
        </div>
          {/* Bottom Centered Text and Image */}
          <div className="popup-footer" style={{ display:"flex", flexDirection:"column",justifyContent:"center" }}>
          <p>अनुराधा <br/>अतुल चव्हाण</p>
         <div style={{ display:"flex" , justifyContent:"center" }}><span style={{ fontSize:"2rem" , marginRight:"1vw",textAlign:"end" }}>1</span><img src="./bnw-logo.png" alt="Election Logo" /></div>
        </div>
      </div>

      
    </div>
  );
};

export default Popup;
