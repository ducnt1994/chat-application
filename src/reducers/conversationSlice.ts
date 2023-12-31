import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IConversationItem, IConversationItemLoaded, IFilter, INoteItem} from "../dto";
import {IHistoryChat} from "../dto/conversation-list/response/history-chat";
import {CONVERSATION_IS_READ} from "../utils/constants/conversation";
import {ISocketMessage} from "../dto/socket";
import {ICustomerInformation} from "../dto/customer/info/customer-information";

interface IInitialState {
  conversations: IConversationItem[] | [];
  conversationPage: number
  isLoadingConversations: boolean
  activeConversationId: string
  conversationListLoaded: IConversationItemLoaded[] | []
  filters: IFilter,
  searchText: string,
  selectedCommentIdToReply: string,
  scrollToTop: boolean
}

const initialState : IInitialState = {
  conversations: [],
  conversationPage: 1,
  isLoadingConversations: true,
  activeConversationId: '',
  conversationListLoaded: [],
  filters: {},
  selectedCommentIdToReply: "",
  searchText: "",
  scrollToTop: false
};

interface IPayloadHistoryChat {
  conversationId: string
  histories: IHistoryChat[]
}


export const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    setCommentToReply(state: any, action: PayloadAction<string>){
      state.selectedCommentIdToReply = action.payload
    },
    setSearchText(state: any, action: PayloadAction<string>){
      state.searchText = action.payload
      state.conversationPage = 1
    },
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
      state.filters = action.payload
    },
    setActiveConversationId(state: any, action: PayloadAction<{id: string}>){
      state.activeConversationId = action.payload.id
      const existConversationItem = state.conversationListLoaded.find((item : IConversationItemLoaded) => item.conversationId === action.payload.id)
      if(!existConversationItem){
        const conversationItemClicked = state.conversations.find((item : IConversationItem) => item._id === action.payload.id);
        state.conversationListLoaded.push({
          conversationId: action.payload.id,
          info: conversationItemClicked,
          chatHistory: [],
          customerInfor: {},
          isLoadingItem: true
        })
      }
    },
    setCustomerInformation(state: any, action: PayloadAction<{id: string, customer_info: ICustomerInformation}>){
      const existConversationItem = state.conversationListLoaded.findIndex((item : IConversationItemLoaded) => item.conversationId === action.payload.id)
      if(existConversationItem >= 0){
        let customerInfor = action.payload.customer_info;
        customerInfor.id = customerInfor._id || ""
        state.conversationListLoaded[existConversationItem].customerInfor = customerInfor
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
    setHistoryItem(state: any, action: PayloadAction<{historyItem: IHistoryChat, conversationId: string}>){
      const conversationLoadedIndex = state.conversationListLoaded.findIndex((item : IConversationItemLoaded) => item.conversationId === action.payload.conversationId);
      if(conversationLoadedIndex !== false){
        const newData = {...state.conversationListLoaded[conversationLoadedIndex]}
        newData.chatHistory.push(action.payload.historyItem)
        state.conversationListLoaded[conversationLoadedIndex] = newData;
      }
    },
    setHistoryItemByFakeId(state: any, action: PayloadAction<{historyItem: IHistoryChat, fakeId: string, conversationId: string}>){
      const conversationLoadedIndex = state.conversationListLoaded.findIndex((item : IConversationItemLoaded) => item.conversationId === action.payload.conversationId);
      if(conversationLoadedIndex !== false){
        const newData = {...state.conversationListLoaded[conversationLoadedIndex]}
        const indexHistoryItemByFakeId = newData.chatHistory.findIndex((history : IHistoryChat) => history.fake_id === action.payload.fakeId)
        if(indexHistoryItemByFakeId !== false){
          newData.chatHistory.splice(indexHistoryItemByFakeId, 1, action.payload.historyItem)
        }
        state.conversationListLoaded[conversationLoadedIndex] = newData;
      }
    },
    setHistoryItemFakeComment(state: any, action: PayloadAction<IHistoryChat>){
      const conversationLoadedIndex = state.conversationListLoaded.findIndex((item : IConversationItemLoaded) => item.conversationId === state.activeConversationId);
      if(conversationLoadedIndex !== false){
        const newData = {...state.conversationListLoaded[conversationLoadedIndex]}
        const indexHistoryItemByFakeId = newData.chatHistory.findIndex((history : IHistoryChat) => history.social_network_id === action.payload.parent_social_network_id)
        if(indexHistoryItemByFakeId !== false){
          let parentComment = newData.chatHistory[indexHistoryItemByFakeId];
          if(typeof parentComment.children !== 'undefined'){
            parentComment.children.push(action.payload)
          } else {
            parentComment.children = [action.payload]
          }
          newData.chatHistory[indexHistoryItemByFakeId] = parentComment
        }
        state.conversationListLoaded[conversationLoadedIndex] = newData;
      }
    },
    setNewListComment(state: any, action: PayloadAction<IHistoryChat>){
      const conversationLoadedIndex = state.conversationListLoaded.findIndex((item : IConversationItemLoaded) => item.conversationId === action.payload.conversation_id);
      if(conversationLoadedIndex !== false){
        const newData = {...state.conversationListLoaded[conversationLoadedIndex]}
        const indexCommentResponse = newData.chatHistory.findIndex((history: IHistoryChat) => history.social_network_id === action.payload.social_network_id)
        if(indexCommentResponse !== false){
          newData.chatHistory[indexCommentResponse] = action.payload
        }
        state.conversationListLoaded[conversationLoadedIndex] = newData;
      }
    },
    removeFakeComment(state: any, action: PayloadAction<IHistoryChat>){
      const conversationLoadedIndex = state.conversationListLoaded.findIndex((item : IConversationItemLoaded) => item.conversationId === action.payload.conversation_id);
      if(conversationLoadedIndex !== false){
        const newData = {...state.conversationListLoaded[conversationLoadedIndex]}
        const indexParentComment = newData.chatHistory.findIndex((history: IHistoryChat) => history.social_network_id === action.payload.parent_social_network_id)
        if(indexParentComment !== false){
          const parentComment = newData.chatHistory[indexParentComment]
          const indexFakeComment = parentComment.children.map((child : IHistoryChat) => child.social_network_id === action.payload.social_network_id)
          if(indexFakeComment !== false){
            parentComment.children.splice(indexFakeComment, 1);
            newData.chatHistory[indexParentComment] = parentComment
          }
        }
        state.conversationListLoaded[conversationLoadedIndex] = newData
      }
    },
    setCurrentConversationToTop(state: any){
      const conversationLoadedIndex = state.conversations.findIndex((item : IConversationItem) => item._id === state.activeConversationId);
      if(conversationLoadedIndex !== false){
        const newData = [...state.conversations]
        const itemChatToPushTop = newData[conversationLoadedIndex];
        newData.splice(conversationLoadedIndex,1)
        newData.unshift(itemChatToPushTop)
        state.scrollToTop = !state.scrollToTop
        state.conversations = newData
      }
    },
    markStatusReadConversation(state: any, action: PayloadAction<{conversationId: string, statusRead: number}>){
      const conversationIndex = state.conversations.findIndex((item : IConversationItem) => item._id === action.payload.conversationId);
      if(conversationIndex !== false){
        const newData = [...state.conversations]
        const itemChatToMarkRead : IConversationItem = newData[conversationIndex];
        itemChatToMarkRead.is_read = action.payload.statusRead;
        // đánh dấu thêm chat = 1 nếu đánh dấu chưa đọc
        itemChatToMarkRead.number_new_chat = action.payload.statusRead === CONVERSATION_IS_READ ? 0 : 1;
        newData.splice(conversationIndex, 1, itemChatToMarkRead)
        state.conversations = newData;
      }

      const conversationLoadedIndex = state.conversationListLoaded.findIndex((item : IConversationItemLoaded) => item.conversationId === action.payload.conversationId);
      if(conversationLoadedIndex !== false){
        const newData = [...state.conversationListLoaded]
        const itemChatToMarkRead : IConversationItemLoaded = newData[conversationLoadedIndex];
        itemChatToMarkRead.info.is_read = action.payload.statusRead
      }
    },
    addNoteData(state: any, action : PayloadAction<{conversationId : string, noteItem : INoteItem}>){
      if(action.payload.conversationId && action.payload.noteItem.id){
        const conversationLoadedIndex = state.conversationListLoaded.findIndex((item : IConversationItemLoaded) => item.conversationId === action.payload.conversationId);
        if(conversationLoadedIndex !== false){
          const newData = [...state.conversationListLoaded]
          const itemChatToAddNote : IConversationItemLoaded = newData[conversationLoadedIndex];
          if(typeof itemChatToAddNote.info.note !== 'undefined'){
            itemChatToAddNote.info.note.unshift(action.payload.noteItem)
          } else {
            itemChatToAddNote.info.note = [action.payload.noteItem]
          }
        }
      }
    },
    removeNoteData(state: any, action : PayloadAction<{conversationId : string, fakeNoteId: string}>){
      if(action.payload.conversationId && action.payload.fakeNoteId){
        const conversationLoadedIndex = state.conversationListLoaded.findIndex((item : IConversationItemLoaded) => item.conversationId === action.payload.conversationId);
        if(conversationLoadedIndex !== false){
          const newData = [...state.conversationListLoaded]
          const itemChatToAddNote : IConversationItemLoaded = newData[conversationLoadedIndex];
          const fakeNoteIndex = itemChatToAddNote.info.note.findIndex((item: INoteItem) => typeof item.id !== 'undefined' && item.id === action.payload.fakeNoteId)
          itemChatToAddNote.info.note.splice(fakeNoteIndex, 1)
        }
      }
    },
    setChatSocket(state: any, action : PayloadAction<ISocketMessage>){
      const conversation = action.payload.conversation
      const relateConversationItem = action.payload.relate_conversation_item // có thể là item chat hoặc comment
      // tìm conversation để thay thế
      const conversationIndexBySocket = state.conversations.findIndex((item : IConversationItem) => item._id === conversation._id);
      if(conversationIndexBySocket >= 0){
        // thay bằng conversation mới và đưa lên đầu
        state.conversations.splice(conversationIndexBySocket, 1)
        state.conversations.unshift(conversation)
      } else {
        state.conversations.unshift(conversation)
      }

      // tìm lịch sử chat để thêm mới vào
      const conversationLoadedIndex = state.conversationListLoaded.findIndex((item : IConversationItemLoaded) => item.conversationId === conversation._id);
      if(conversationLoadedIndex >= 0){
        const newData = {...state.conversationListLoaded[conversationLoadedIndex]}
        const childIndex = newData.chatHistory.findIndex((child: IHistoryChat) => child._id === relateConversationItem._id)
        if(childIndex >= 0){
          newData.chatHistory.splice(childIndex, 1 , relateConversationItem)
        } else {
          newData.chatHistory.push(relateConversationItem)
        }
        // if(relateConversationItem.from_customer === CONVERSATION_NOT_FROM_CUSTOMER){
        //   // tìm ra message fake để remove( chỉ xảy ra trong trường hợp gửi tin nhắn quá 24h cho khách)
        //   const indexFakeId = newData.chatHistory.findIndex((child: IHistoryChat) => typeof child.fake_id !== 'undefined')
        //   if(indexFakeId > 0){
        //     newData.chatHistory.splice(indexFakeId,1)
        //   }
        // }
        state.conversationListLoaded[conversationLoadedIndex] = newData;
      }

    },
    setCommentSocket(state: any, action : PayloadAction<ISocketMessage>){
      const conversation = action.payload.conversation
      const relateConversationItem = action.payload.relate_conversation_item // có thể là item chat hoặc comment
      // tìm conversation để thay thế
      const conversationIndexBySocket = state.conversations.findIndex((item : IConversationItem) => item._id === conversation._id);
      if(conversationIndexBySocket >= 0){
        state.conversations.splice(conversationIndexBySocket, 1) // thay bằng conversation mới
        state.conversations.unshift(conversation)
      } else {
        state.conversations.unshift(conversation)
      }

      const conversationLoadedIndex = state.conversationListLoaded.findIndex((item : IConversationItemLoaded) => item.conversationId === conversation._id);
      if(conversationLoadedIndex >= 0){
        const newData = {...state.conversationListLoaded[conversationLoadedIndex]}
        const childIndex = newData.chatHistory.findIndex((child: IHistoryChat) => child._id === relateConversationItem._id)
        if(childIndex >= 0){
          newData.chatHistory.splice(childIndex, 1 , relateConversationItem)
        } else {
          newData.chatHistory.push(relateConversationItem)
        }
        state.conversationListLoaded[conversationLoadedIndex] = newData;
      }
    },
    actionToComment(state: any, action : PayloadAction<{
      conversationId : string,
      parentId: string,
      isChild: boolean,
      childId: string,
      field: {
        key: string,
        value: number
      }
    }>){
      const conversationId = action.payload.conversationId
      // tìm conversation để thay thế
      const findIndexConversationLoaded = state.conversationListLoaded.findIndex((item : IConversationItemLoaded) => item.conversationId === conversationId);
      if(findIndexConversationLoaded >= 0){
        const newData = {...state.conversationListLoaded[findIndexConversationLoaded]}
        const findIndexHistoryItem = newData.chatHistory.findIndex((child: IHistoryChat) => child._id === action.payload.parentId)
        if(findIndexHistoryItem >= 0){
          if(action.payload.isChild){
            const findIndexChild = newData.chatHistory[findIndexHistoryItem].children.findIndex((item: IHistoryChat) => item.id === action.payload.childId)
            if(findIndexChild >= 0){
              newData.chatHistory[findIndexHistoryItem].children[findIndexChild][action.payload.field.key] = action.payload.field.value
            }
          } else {
            newData.chatHistory[findIndexHistoryItem][action.payload.field.key] = action.payload.field.value
          }
        }
        state.conversationListLoaded[findIndexConversationLoaded] = newData;
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
  resetConversationByFilter,
  setCommentToReply,
  setHistoryItemFakeComment,
  setNewListComment,
  removeFakeComment,
  setSearchText,
  setCurrentConversationToTop,
  markStatusReadConversation,
  addNoteData,
  removeNoteData,
  setChatSocket,
  setCommentSocket,
  setCustomerInformation,
  actionToComment
} = conversationSlice.actions;
export default conversationSlice.reducer;
