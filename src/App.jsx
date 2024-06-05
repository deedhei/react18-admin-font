import React, {
  Suspense,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { createHashRouter } from "react-router-dom";
// router
import { RouterProvider } from "react-router-dom";
import { publicRoute } from "./router/publicRoute.config.js";
import { useSelector } from "react-redux";
import { setComponentRoute } from "./containers/handleMenu.js";

import { deepClone } from "./utils/index.js";

function Loading() {
  return <h2>🌀 Loading...</h2>;
}
const App = () => {
  const [routes, setRoutes] = useState(publicRoute);
  let newRoutes = useSelector((state) => state.menuData.routeData);
  const routeRef = useRef(routes);
  const combineRoute = useCallback(() => {
    let data = setComponentRoute(deepClone(newRoutes));
    const updatedRoutes = [...data, ...routes];
    setRoutes(() => {
      routeRef.current = updatedRoutes;
      return updatedRoutes;
    });
  }, []);

  useEffect(() => {
    if (newRoutes.length > 0) {
      combineRoute();
    }
    console.log("[Log] routeRef.current-->", routeRef.current);
  }, [newRoutes]);
  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={createHashRouter(routeRef.current)} />
    </Suspense>
  );
};

export default App;
