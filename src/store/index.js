import { configureStore } from "@reduxjs/toolkit";
import menuToggleReducer from "./menuToggleSlice.js";
export default configureStore({
  reducer: {
    menuToggle: menuToggleReducer,
  },
});
