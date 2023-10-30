import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IReplySampleItem} from "../dto/reply-sample";
import {IReplyTopicItem} from "../dto/reply-topic";

interface IInitialState {
  replySamples: IReplySampleItem[] | undefined;
  replyTopics: IReplyTopicItem[] | undefined;
}

const initialState : IInitialState = {
  replySamples : undefined,
  replyTopics: undefined
};


export const conversationScriptSlice = createSlice({
  name: "conversationScript",
  initialState,
  reducers: {
    setReplySamples(state: any, action: PayloadAction<IReplySampleItem[] | undefined>){
      state.replySamples = action.payload
    },
    setReplyTopics(state: any, action: PayloadAction<IReplyTopicItem[] | undefined>){
      state.replyTopics = action.payload
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(fetchOneConversation.fulfilled, (state, action) => {
  //     state.conversationList.unshift(action.payload);
  //   });
  // },
});

export const {
  setReplySamples,
  setReplyTopics
} = conversationScriptSlice.actions;
export default conversationScriptSlice.reducer;
