import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IConversationItem, IConversationItemLoaded, IFilter} from "../dto";
import {IHistoryChat} from "../dto/conversation-list/response/history-chat";

interface IInitialState {
  conversations: IConversationItem[] | [];
  conversationPage: number
  isLoadingConversations: boolean
  activeConversationId: string
  conversationListLoaded: IConversationItemLoaded[] | []
  filters: IFilter
}

const initialState : IInitialState = {
  conversations: [],
  conversationPage: 1,
  isLoadingConversations: true,
  activeConversationId: '',
  conversationListLoaded: [],
  filters: {}
};

interface IPayloadHistoryChat {
  conversationId: string
  histories: IHistoryChat[]
}


export const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    resetConversationByFilter(state: any) {
      return initialState
    },
    setConversationList(state: any, action : PayloadAction<IConversationItem[]>) {
      state.conversations = state.conversations.concat(action.payload);
      if(state.conversationPage === 1){
        state.isLoadingConversations = false;
      }
      state.conversationPage += 1;
    },
    setFilters(state: any, action : PayloadAction<IFilter>) {
      console.log(action.payload)
      state.filters = action.payload
      console.log(state.filters)
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
    },
    setHistoryChat(state: any, action: PayloadAction<IPayloadHistoryChat>){
      const conversationLoadedIndex = state.conversationListLoaded.findIndex((item : IConversationItemLoaded) => item.conversationId === action.payload.conversationId);
      if(conversationLoadedIndex !== false){
        const newData = {...state.conversationListLoaded[conversationLoadedIndex]}
        newData.chatHistory = action.payload.histories.reverse()
        newData.isLoadingItem = false
        state.conversationListLoaded[conversationLoadedIndex] = newData;
      }
    },
    setLoadingHistoryConversation(state: any, action: PayloadAction<{conversationId: string}>){
      const conversationLoadedIndex = state.conversationListLoaded.findIndex((item : IConversationItemLoaded) => item.conversationId === action.payload.conversationId);
      if(conversationLoadedIndex !== false){
        const newData = {...state.conversationListLoaded[conversationLoadedIndex]}
        newData.isLoadingItem = true;
        state.conversationListLoaded[conversationLoadedIndex] = newData;
      }
    },
    setHistoryItem(state: any, action: PayloadAction<{historyItem: IHistoryChat}>){
      const conversationLoadedIndex = state.conversationListLoaded.findIndex((item : IConversationItemLoaded) => item.conversationId === state.activeConversationId);
      if(conversationLoadedIndex !== false){
        const newData = {...state.conversationListLoaded[conversationLoadedIndex]}
        newData.chatHistory.push(action.payload.historyItem)
        state.conversationListLoaded[conversationLoadedIndex] = newData;
      }
    },
    setHistoryItemByFakeId(state: any, action: PayloadAction<{historyItem: IHistoryChat, fakeId: string}>){
      const conversationLoadedIndex = state.conversationListLoaded.findIndex((item : IConversationItemLoaded) => item.conversationId === state.activeConversationId);
      if(conversationLoadedIndex !== false){
        const newData = {...state.conversationListLoaded[conversationLoadedIndex]}
        const indexHistoryItemByFakeId = newData.chatHistory.findIndex((history : IHistoryChat) => history.fake_id === action.payload.fakeId)
        if(indexHistoryItemByFakeId !== false){
          newData.chatHistory.splice(indexHistoryItemByFakeId, 1, action.payload.historyItem)
        }
        state.conversationListLoaded[conversationLoadedIndex] = newData;
      }
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
  setActiveConversationId,
  setHistoryChat,
  setLoadingHistoryConversation,
  setHistoryItem,
  setHistoryItemByFakeId,
  setFilters,
  resetConversationByFilter
} = conversationSlice.actions;
export default conversationSlice.reducer;
