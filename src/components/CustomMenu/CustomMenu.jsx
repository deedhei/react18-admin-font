import { useEffect, useState } from "react";

import { Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { changeMenuBreadcrumbData } from "../../store/menuToggleSlice";
const CustomMenu = (props) => {
  const [openKeys, SetOpenKeys] = useState([]);
  const [current, setCurrent] = useState("");
  const dispatch = useDispatch();
  let menuBreadcrumbData = useSelector(
    (state) => state.menuToggle.menuBreadcrumbData
  );
  const onClick = (e) => {
    dispatch(changeMenuBreadcrumbData(e.keyPath));
    setCurrent(e.key);
  };
  return (
    <Menu
      onClick={onClick}
      style={{
        width: "100%",
      }}
      theme="dark"
      defaultOpenKeys={openKeys}
      selectedKeys={[current]}
      mode="inline"
      items={props.menu}
    ></Menu>
  );
};

export default CustomMenu;
