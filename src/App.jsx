import React, { useState, useEffect, useCallback } from "react";
// router
import { useRoutes } from "react-router-dom";
import { publicRoute } from "./router/publicRoute.config.js";
import { combinRoute } from "./containers/handleMenu.js";
// redux
import { useSelector } from "react-redux";
// util
import { deepClone } from "./utils/index.js";
import { lazyLoad } from "./router/index.jsx";
import Index from "./views/Index/index.jsx";
// 设置 element
const setComponentRoute = (menus) => {
  if (!menus.length) {
    return [];
  }
  return menus
    .filter((menu) => !menu.hidden)
    .map((menu) => {
      let ele = null;
      if (menu.element === "Layout") {
        ele = <Index></Index>; // 这边为什么这么写 如果用lazyLoad会加载延迟加载会闪
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

const App = () => {
  const [routes, setRoutes] = useState(publicRoute);
  let newRoutes = useSelector((state) => state.menuData.routeData);
  const combineRoute = useCallback(() => {
    let data = combinRoute(setComponentRoute(deepClone(newRoutes)));
    setRoutes(data);
  }, [newRoutes]);

  useEffect(() => {
    combineRoute();
  }, [newRoutes]);
  return <>{useRoutes(routes)}</>;
};

export default App;
