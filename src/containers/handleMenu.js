import { lazyLoad } from "../router/index.jsx";
import { publicRoute } from "../router/publicRoute.config.js";
/**
 * 转化为菜单
 * @param {*} menus
 * @param {*} parentPath
 * @returns
 */
const handleMenu = (menus, parentPath = "") => {
  return menus
    .filter((menu) => !menu.hidden)
    .map((menu) => {
      if (!menu.name) {
        let temMenu = menu.children[0];
        temMenu.path = menu.path;
        menu = temMenu;
      }
      const transformedMenu = {
        label: menu.name,
        key: parentPath + menu.path,
        icon: null,
        hidden: menu.hidden,
        children:
          menu.children?.length > 0
            ? handleMenu(menu.children, menu.path)
            : null,
      };
      return transformedMenu;
    });
};
/**
 * 转换为route放到redux进行存储
 * @param {*} menus
 * @returns
 */
const handleRoute = (menus) => {
  const modules = import.meta.glob("@/views/**/*.js"); // 获取所有的
  if (!menus.length) {
    return [];
  }
  return menus
    .filter((menu) => !menu.hidden)
    .map((menu) => {
      const transformedMenu = {
        path: menu.path,
        element: menu.component,
        children: menu.children?.length > 0 ? handleRoute(menu.children) : null,
      };
      return transformedMenu;
    });
};
// 因为用redux进行这么存储会报错 序列化的问题，所以只能在写一个方法用到的时候进行给component赋值
const setComponentRoute = (menus) => {
  if (!menus.length) {
    return [];
  }
  return menus
    .filter((menu) => !menu.hidden)
    .map((menu) => {
      let ele = null;
      if (menu.element === "Layout") {
        ele = lazyLoad("/Index");
      } else {
        ele = lazyLoad(menu.element);
      }
      const transformedMenu = {
        path: menu.path,
        element: ele,
        children:
          menu.children?.length > 0
            ? setComponentRoute(
                menu.children.map((child) => ({
                  ...child,
                  path:
                    child.path.startsWith("/") && child.path !== "/"
                      ? child.path.substring(1)
                      : child.path,
                }))
              )
            : null,
      };
      return transformedMenu;
    });
};
/**
 * 合并公共路由和静态路由
 * @param {*} newRoutes
 * @returns
 */
const combinRoute = (newRoutes) => {
  return [...newRoutes, ...publicRoute];
};

export { handleMenu, handleRoute, setComponentRoute, combinRoute };
