import { useEffect, useState, useAs } from "react";

import { Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IconFont } from "../../utils/createIcon";
import { changeMenuBreadcrumbData } from "../../store/menuToggleSlice";
const CustomMenu = (props) => {
  const [openKeys, setOpenKeys] = useState([]);
  const [current, setCurrent] = useState("/");
  const [menuData, setMenuData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  let { pathname } = location;
  const onClick = (e) => {
    dispatch(changeMenuBreadcrumbData(e.keyPath));
    setCurrent(e.key);
    setOpenKeys(getPathArray(pathname));
    navigate(e.key, { replace: true });
  };
  const getPathArray = (path) => {
    if (!path || typeof path !== "string") {
      return [];
    }

    const pathArray = path.split("/").filter(Boolean);
    const result = [];

    let currentPath = "";
    for (let i = 0; i < pathArray.length; i++) {
      if (i === pathArray.length - 1) {
        break;
      }
      currentPath += `/${pathArray[i]}`;
      result.push(currentPath);
    }

    return result;
  };
  const setIconFont = (menu, parentPath = "") => {
    return menu.map((item) => {
      let transformedMenu = {
        ...item,
        icon: <IconFont type={item.icon}></IconFont>,
        children: item.children?.length > 0 ? setIconFont(item.children) : null,
      };
      return transformedMenu;
    });
  };
  const onOpenChange = (openKeys) => {
    setOpenKeys(openKeys);
  };
  useEffect(() => {
    setMenuData(setIconFont(props.menu));
    setCurrent(pathname);
    setOpenKeys(getPathArray(pathname));
  }, []);
  return (
    <Menu
      onClick={onClick}
      style={{
        width: "100%",
      }}
      theme="dark"
      openKeys={openKeys}
      selectedKeys={[current]}
      onOpenChange={onOpenChange}
      mode="inline"
      items={menuData}
    ></Menu>
  );
};

export default CustomMenu;
