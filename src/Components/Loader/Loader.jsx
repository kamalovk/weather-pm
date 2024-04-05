import React from "react";
import { Spin } from "antd";

const LoaderWrapper = ({ loading, children }) => {
  return (
    <div style={wrapperStyle}>
      {loading ? (
        <div style={spinnerStyle}>
          <Spin size="large" />
        </div>
      ) : (
        children
      )}
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

export default LoaderWrapper;
