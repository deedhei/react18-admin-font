import Axios from "../server/index.js";
const login = (params) => {
  return Axios.request({
    method: "post",
    url: "/users/login",
    params,
  });
};

export default {
  login,
};
