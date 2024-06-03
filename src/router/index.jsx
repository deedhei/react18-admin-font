import { createHashRouter } from "react-router-dom";
// 首页
import Index from "../views/Index/index.jsx";

// 导入登录页
import Login from "../views/Login/index.js";
// Other
import View404 from "../views/Others/404/index.js";
import View500 from "../views/Others/500/index.js";
import HomeView from "../views/Home/index.js";
// 配置路由映射 （不同的路由对应渲染不同的页面组件）
const router = createHashRouter([
  {
    path: "/",
    element: <Index></Index>,
    children: [
      {
        path: "/",
        element: <HomeView />,
      },
      {
        path: "view404",
        element: <View404 />,
      },
      {
        path: "view500",
        element: <View500 />,
      },
    ],
    errorElement: <View404 />, // 处理找不到的页面
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
