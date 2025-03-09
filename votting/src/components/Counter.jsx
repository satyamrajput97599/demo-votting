import React from "react";

const Counter = () => {
  return (
    <div>
      <div
        className="counter-footer"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          marginBottom: "5vh",
        }}
      >
        <a href="">Counter</a>
        <a style={{ border: "1px solid gray", background: "lightgray" }}>
          <span style={{ borderRight: "1px solid gray", padding: "1px" }}>
            0
          </span>
          <span style={{ borderRight: "1px solid gray", padding: "1px" }}>
            0
          </span>
          <span style={{ borderRight: "1px solid gray", padding: "1px" }}>
            0
          </span>
          <span style={{ borderRight: "1px solid gray", padding: "1px" }}>
            0
          </span>
          <span style={{ borderRight: "1px solid gray", padding: "1px" }}>
            3
          </span>
          <span style={{ borderRight: "1px solid gray", padding: "1px" }}>
            3
          </span>
          <span>2</span>
        </a>
      </div>
    </div>
  );
};

export default Counter;
