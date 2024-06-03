import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  GithubOutlined,
  BellOutlined,
  SettingOutlined,
  LogoutOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Layout, Dropdown, Avatar } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { changeMenuToggle } from "../store/menuToggleSlice";
const { Header } = Layout;
const headerStyle = {
  color: "#000",
  height: 64,
  lineHeight: "64px",
  padding: 0,
  backgroundColor: "#ffffff",
};
const AppHeader = (props) => {
  const items = [
    {
      key: "2",
      label: "个人设置",
      icon: <EditOutlined />,
    },
    {
      key: "3",
      label: "系统设置",
      icon: <SettingOutlined />,
    },
    {
      key: "4",
      label: "退出登录",
      icon: <LogoutOutlined />,
    },
  ];
  const menuStatus = useSelector((state) => state.menuToggle.menuStatus);
  const dispatch = useDispatch();
  return (
    <Header className="header" style={headerStyle}>
      <div className="left">
        <div
          onClick={() => dispatch(changeMenuToggle())}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          {menuStatus ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>
      </div>
      <div className="right">
        <div className="iconHeader">
          <GithubOutlined />
        </div>
        <div className="iconHeader">
          <BellOutlined />
        </div>
        <div className="iconHeader">
          <Dropdown
            menu={{
              items,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Avatar
                src={
                  <img
                    src={
                      "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    }
                    alt="avatar"
                  />
                }
              />
            </a>
          </Dropdown>
        </div>
      </div>
    </Header>
  );
};

export default AppHeader;
