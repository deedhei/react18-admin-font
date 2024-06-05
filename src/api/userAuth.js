// useAuth.js
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteUserData } from "../store/userDataSlice";
import { clearMenuData } from "../store/menuSlice";
const userAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.userData.userInfo.token);
  const hasAuth = () => {
    return token ? true : false;
  };
  const logoOut = () => {
    dispatch(deleteUserData());
    dispatch(clearMenuData());
    navigate("/login");
  };

  return { token, logoOut, hasAuth };
};

export default userAuth;
