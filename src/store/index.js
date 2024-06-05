import { configureStore } from "@reduxjs/toolkit";
import menuToggleReducer from "./menuToggleSlice.js";
import userDataReducer from "./userDataSlice.js";
import menuReducer from "./menuSlice.js";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "root",
  storage,
};
let rootReducers = combineReducers({
  menuToggle: menuToggleReducer,
  userData: userDataReducer,
  menuData: menuReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducers);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});
const persistor = persistStore(store);
export { store, persistor };
