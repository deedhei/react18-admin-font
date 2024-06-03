import { Layout } from "antd";
const { Sider } = Layout;
import { useSelector } from "react-redux";

import { GithubOutlined } from "@ant-design/icons";

import CustomMenu from "../components/CustomMenu";

import menu from "./menu.jsx";

import style from "../style/view-style/aside.module.scss";

const asideBgColor = "#041527";

const AppAside = () => {
  const menuStatus = useSelector((state) => state.menuToggle.menuStatus);

  const siderStyle = {
    position: "fixed",
    lineHeight: "120px",
    color: "#fff",
    backgroundColor: asideBgColor,
    maxWidth: "200px",
    minWidth: "200px",
    width: "200px",
  };
  return (
    <Sider
      collapsed={menuStatus}
      className={style.asideWrapper}
      style={siderStyle}
    >
      <div className="logo" style={{ textAlign: "center" }}>
        <a
          rel="noopener noreferrer"
          href="https://github.com/ltadpoles"
          target="_blank"
        >
          <GithubOutlined style={{ fontSize: "3.8rem", color: "#fff" }} />
        </a>
      </div>
      <CustomMenu menu={menu}></CustomMenu>
    </Sider>
  );
};

export default AppAside;
