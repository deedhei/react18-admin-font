import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import menuApi from "../api/menuApi";
import { handleMenu, handleRoute } from "../containers/handleMenu";
export const getAsyncMenuData = createAsyncThunk(
  "getAsyncMenuData",
  async () => {
    let res = await menuApi.getUserMenu();
    return res.data;
  }
);

// 定义初始state
const initialState = {
  menuData: {},
  routeData: [],
};

export const menuSlice = createSlice({
  name: "menuData",
  initialState,
  reducers: {
    clearMenuData: (state) => {
      state.menuData = {};
      state.routeData = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAsyncMenuData.fulfilled, (state, { payload }) => {
      console.log("getAsyncMenuData.fulfilled payload", payload);
      state.menuData = handleMenu(payload);
      state.routeData = handleRoute(payload);
    });
  },
});

// 为每个 case reducer 函数生成 Action creators
export const { clearMenuData } = menuSlice.actions;

export default menuSlice.reducer;
