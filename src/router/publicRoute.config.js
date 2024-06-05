import { lazyLoad } from "./index.jsx";
export const publicRoute = [
  {
    path: "/login",
    element: lazyLoad("/Login"),
  },
  {
    path: "*",
    element: lazyLoad("/Others/404"),
  },
];

// 返回最终路由表
export const handelEnd = (routes) => {
  let res = [...routes, ...publicRoute];
  return res;
};
