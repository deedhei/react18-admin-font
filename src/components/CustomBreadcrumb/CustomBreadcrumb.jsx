import { useEffect } from "react";
import { Breadcrumb } from "antd";
// import menu from "../../containers/menu";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const BreadcrumbStyle = {
  padding: "1rem 2rem ",
};

const homeMenu = <a>首页</a>;

const CustomBreadcrumb = () => {
  const menuBreadcrumbData = useSelector(
    (state) => state.menuToggle.menuBreadcrumbData
  );
  let menu = useSelector((state) => state.menuData.menuData);

  const navigate = useNavigate();
  const navigateClick = (path) => {
    // navigate(`/${path}`);
  };
  const setBeadCrumb = (menu, paths) => {
    const labelData = [];
    function traverseMenu(menuItems, parentPath = "") {
      for (const item of menuItems) {
        const currentPath = `${item.key}`;
        if (currentPath == paths[0]) {
          labelData.push({
            title: item.label,
            key: item.key,
          });
        } else if (paths.includes(currentPath)) {
          labelData.push({
            title: (
              <span
                style={{ cursor: "pointer" }}
                onClick={() => navigateClick(currentPath)}
                data-href={currentPath}
              >
                {item.label}
              </span>
            ),
            key: item.key,
          });
        }
        if (item.children) {
          traverseMenu(item.children, currentPath);
        }
      }
    }
    if (paths.length == 0) {
      return [
        {
          title: homeMenu,
        },
      ];
    } else if (menu) {
      traverseMenu(menu);
    }
    labelData.unshift({
      title: homeMenu,
    });
    return labelData;
  };
  let data = [];
  useEffect(() => {
    data = setBeadCrumb(menu, menuBreadcrumbData);
  }, [menuBreadcrumbData, menu]);
  return (
    <Breadcrumb
      style={BreadcrumbStyle}
      items={setBeadCrumb(menu, menuBreadcrumbData)}
    />
  );
};

export default CustomBreadcrumb;
