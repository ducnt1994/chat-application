import ItemConversationContent from "../components/ItemConversationContent";
import {IConversationItemLoaded} from "../../../../dto";
import {CONVERSATION_TYPE_CHAT_FB, CONVERSATION_TYPE_COMMENT_FB} from "../../../../utils/constants/conversation";
import {CONVERSATION_FROM_CUSTOMER, CONVERSATION_NOT_FROM_CUSTOMER} from "../../../../utils/constants/customer";
import ItemConversationContentComment from "../components/ItemConversationContentComment";

export default function ChatContent({conversationItem} : {
  conversationItem: IConversationItemLoaded | undefined
}) {
  return (
    <div className={`mt-4`}>
      {
        conversationItem?.info?.type === CONVERSATION_TYPE_CHAT_FB &&
        conversationItem?.chatHistory.length > 0 &&
        conversationItem?.chatHistory.map((historyItem, index) => {
          return <ItemConversationContent
            key={index}
            position={historyItem.from_customer === CONVERSATION_FROM_CUSTOMER ? 'left' : 'right'}
            historyItem={historyItem}
            isSameSender={(index === 0 && historyItem.from_customer === CONVERSATION_NOT_FROM_CUSTOMER) || (index > 0 && conversationItem?.chatHistory[index-1].from_customer === CONVERSATION_FROM_CUSTOMER && historyItem.from_customer === CONVERSATION_FROM_CUSTOMER)}
          />
        })
      }

      {
        conversationItem?.info?.type === CONVERSATION_TYPE_COMMENT_FB &&
        conversationItem?.chatHistory.length > 0 &&
        conversationItem?.chatHistory.map((historyItem, index) => {
          return <ItemConversationContentComment
            key={index}
            historyItem={historyItem}
          />
        })
      }

        {/*<ItemConversationContent position={'right'}/>*/}
    </div>
  )
}