import Axios from "../server/index.js";
const login = (params) => {
  return Axios.request({
    method: "post",
    url: "/api/users/login",
    params,
  });
};

export default {
  login,
};
