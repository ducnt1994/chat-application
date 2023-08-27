import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {conversationSlice} from "../reducers/conversationSlice";

const rootReducer = combineReducers({
  conversation: conversationSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer
});

