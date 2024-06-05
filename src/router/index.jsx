import { createHashRouter } from "react-router-dom";
import { lazy } from "react";
// 路由拦截器
import PrivateRoute from "./PrivateRoute.jsx";

// 快速导入工具函数
const lazyLoad = (moduleName) => {
  if (!moduleName) {
    return null;
  }
  const Module = lazy(() =>
    import(/* @vite-ignore */ `/src/views${moduleName}`)
  );
  return <Module />;
};

// 配置路由映射 （不同的路由对应渲染不同的页面组件）
const router = createHashRouter([
  {
    path: "/login",
    element: lazyLoad("/Login"),
  },
  {
    path: "*",
    element: lazyLoad("/Others/404"),
  },
]);
const routes = [
  {
    path: "/login",
    element: lazyLoad("/Login"),
  },
  {
    path: "*",
    element: lazyLoad("/Others/404"),
  },
];
export { router, lazyLoad, routes };
