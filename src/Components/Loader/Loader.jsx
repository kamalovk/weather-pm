import React from "react";
import { Spin } from "antd";

const Loader = ({ size = "large" }) => {
  return (
    <div style={wrapperStyle}>
      <div style={spinnerStyle}>
        <Spin size={size} />
      </div>
    </div>
  );
};

const wrapperStyle = {
  position: "relative",
};

const spinnerStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

export default Loader;
