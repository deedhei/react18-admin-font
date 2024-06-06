import { Suspense, lazy } from "react";
// 路由拦截器
import PrivateRoute from "./PrivateRoute.jsx";

// 快速导入工具函数
const lazyLoad = (moduleName) => {
  if (!moduleName) {
    return null;
  }
  const Module = lazy(
    () =>
      new Promise((resolve, reject) => {
        import(/* @vite-ignore */ `/src/views${moduleName}`).then((res) =>
          resolve(res)
        );
      })
  );
  if (moduleName == "/Login") {
    return (
      <Suspense>
        <Module />
      </Suspense>
    );
  } else {
    return (
      <PrivateRoute>
        <Suspense>
          <Module />
        </Suspense>
      </PrivateRoute>
    );
  }
};

// 配置路由映射 （不同的路由对应渲染不同的页面组件）

export { lazyLoad };
