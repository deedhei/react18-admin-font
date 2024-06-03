import React from "react";
// router
import { RouterProvider } from "react-router-dom";
import router from "./router/index.js";

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
