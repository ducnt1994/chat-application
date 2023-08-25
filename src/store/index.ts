import { configureStore } from "@reduxjs/toolkit";
import {conversationSlice} from "../reducers/conversationSlice";

export const store = configureStore({
  reducer: {
    conversation: conversationSlice.reducer,
  },
});
