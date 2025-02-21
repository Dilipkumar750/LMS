import { configureStore } from "@reduxjs/toolkit";
import sessionLoginReducer from "./sessionUserReducer";

export const store = configureStore({
  reducer: {
    userAuth: sessionLoginReducer,
  },
});
