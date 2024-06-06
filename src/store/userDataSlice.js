import { createSlice } from "@reduxjs/toolkit";

// 定义初始state
const initialState = {
  userInfo: {},
  token: "",
};

export const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    editUserData: (state, { payload }) => {
      state.userInfo = { ...state.userInfo, ...payload };
      state.token = payload.token;
    },
    deleteUserData: (state) => {
      state.userInfo = {};
      state.token = "";
    },
  },
});

// 为每个 case reducer 函数生成 Action creators
export const { editUserData, deleteUserData } = userDataSlice.actions;

export default userDataSlice.reducer;
