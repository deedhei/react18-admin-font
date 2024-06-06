import React, { useState, useEffect, useCallback } from "react";
// router
import { useRoutes } from "react-router-dom";
import { publicRoute } from "./router/publicRoute.config.js";
import { setComponentRoute, combinRoute } from "./containers/handleMenu.js";
// redux
import { useSelector } from "react-redux";
// util
import { deepClone } from "./utils/index.js";

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
