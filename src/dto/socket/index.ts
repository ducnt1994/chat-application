import {IConversationItem} from "../conversation-list/response/conversation-list";
import {IHistoryChat} from "../conversation-list/response/history-chat";

export interface ISocketMessage {
  item: string
  action: string
  conversation: IConversationItem
  relate_conversation_item: IHistoryChat
}