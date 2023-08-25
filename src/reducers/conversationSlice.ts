import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  conversationList: [],
  conversationPage: 1,
};


export const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    setConversationList(state: any, action : any) {
      state.conversationList = [...action.payload];
    },

  },
  // extraReducers: (builder) => {
  //   builder.addCase(fetchOneConversation.fulfilled, (state, action) => {
  //     state.conversationList.unshift(action.payload);
  //   });
  // },
});

export const {
  setConversationList,
} = conversationSlice.actions;
export default conversationSlice.reducer;
