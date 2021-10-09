import { configureStore } from "@reduxjs/toolkit";
import padReducer from "../features/pagSlice";

export default configureStore({
  reducer: {
    pag: padReducer,
  },
});
