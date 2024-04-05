import React from "react";
import { Layout } from "antd";

const Header = () => {
  return (
    <Layout.Header style={{ display: "flex", alignItems: "center" }}>
      <h1 style={{ color: "white" }}>Weather App</h1>
    </Layout.Header>
  );
};

export default Header;
