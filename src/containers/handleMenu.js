import { publicRoute } from "../router/publicRoute.config.js";
import { IconFont } from "../utils/createIcon.js";
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
        icon: menu.icon,
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

/**
 * 合并公共路由和静态路由
 * @param {*} newRoutes
 * @returns
 */
const combinRoute = (newRoutes) => {
  return [...newRoutes, ...publicRoute];
};

export { handleMenu, handleRoute, combinRoute };
