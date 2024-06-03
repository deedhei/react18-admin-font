import React from "react";
import { Layout } from "antd";

const { Footer } = Layout;
const footerStyle = {
  textAlign: "center",
  color: "#000",
  backgroundColor: "#f0f2f5",
};
export default () => (
  <Footer style={footerStyle}>React Admin &copy;2024 Created By GG</Footer>
);
