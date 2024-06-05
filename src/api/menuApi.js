import Axios from "../server/index.js";
const getUserMenu = () => {
  return Axios.request({
    method: "get",
    url: "/api/admin/user/menus",
  });
};

export default { getUserMenu };
