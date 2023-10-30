import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {conversationSlice} from "../reducers/conversationSlice";
import {conversationScriptSlice} from "../reducers/conversationScriptSlice";

const rootReducer = combineReducers({
  conversation: conversationSlice.reducer,
  conversationScript: conversationScriptSlice.reducer
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer
});

