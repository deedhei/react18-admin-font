import { createSlice } from "@reduxjs/toolkit";

// 定义初始state
const initialState = {
  menuStatus: false,
  menuBreadcrumbData: [],
};

export const menuToggleSlice = createSlice({
  name: "menuToggle",
  initialState,
  reducers: {
    changeMenuToggle: (state) => {
      state.menuStatus = !state.menuStatus;
    },
    changeMenuBreadcrumbData: (state, { payload }) => {
      state.menuBreadcrumbData = payload;
    },
  },
});

// 为每个 case reducer 函数生成 Action creators
export const { changeMenuToggle, changeMenuBreadcrumbData } =
  menuToggleSlice.actions;

export default menuToggleSlice.reducer;
