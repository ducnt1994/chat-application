import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IConversationItem, IConversationItemLoaded} from "../dto";

interface IInitialState {
  conversations: IConversationItem[] | [];
  conversationPage: number
  isLoadingConversations: boolean
  activeConversationId: string
  conversationListLoaded: IConversationItemLoaded[] | []
}

const initialState : IInitialState = {
  conversations: [],
  conversationPage: 1,
  isLoadingConversations: true,
  activeConversationId: '',
  conversationListLoaded: []
};


export const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    setConversationList(state: any, action : PayloadAction<IConversationItem[]>) {
      state.conversations = [...action.payload];
      if(state.conversationPage === 1){
        state.isLoadingConversations = false;
      }
    },
    setActiveConversationId(state: any, action: PayloadAction<{id: string}>){
      state.activeConversationId = action.payload.id
      const existConversationItem = state.conversationListLoaded.find((item : IConversationItemLoaded) => item.conversationId === action.payload.id)
      if(!existConversationItem){
        const conversationItemClicked = state.conversations.find((item : IConversationItem) => item._id === action.payload.id);
        state.conversationListLoaded.push({
          conversationId: action.payload.id,
          info: conversationItemClicked,
          chatHistory: {},
          customerInfor:  conversationItemClicked.customer_info,
          isLoadingItem: true
        })
      }
    }

  },
  // extraReducers: (builder) => {
  //   builder.addCase(fetchOneConversation.fulfilled, (state, action) => {
  //     state.conversationList.unshift(action.payload);
  //   });
  // },
});

export const {
  setConversationList,
  setActiveConversationId
} = conversationSlice.actions;
export default conversationSlice.reducer;
