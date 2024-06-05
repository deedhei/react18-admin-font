import userAuth from "../api/userAuth";
import { Navigate, useLocation } from "react-router-dom";
const PrivateRoute = ({ children }) => {
  let { hasAuth } = userAuth();
  const location = useLocation();
  let hastoken = hasAuth();
  if (hastoken) {
    return children;
  }
  return <Navigate to="/login" replace state={{ from: location.pathname }} />;
};

export default PrivateRoute;
