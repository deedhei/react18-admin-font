import Axios from "../server/index.js";

const getUserMenu = () => {
  return Axios.request({
    method: "get",
    url: "/admin/user/menus",
  });
};

const getListMenu = (params) => {
  return Axios.request({
    method: "get",
    url: "/admin/menus",
    params,
  });
};
export default { getUserMenu, getListMenu };
