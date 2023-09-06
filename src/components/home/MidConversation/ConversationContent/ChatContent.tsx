import ItemConversationContent from "../components/ItemConversationContent";
import {IConversationItemLoaded} from "../../../../dto";
import {CONVERSATION_TYPE_CHAT_FB} from "../../../../utils/constants/conversation";
import {CONVERSATION_FROM_CUSTOMER} from "../../../../utils/constants/customer";

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
          />
        })
      }

        {/*<ItemConversationContent position={'right'}/>*/}
    </div>
  )
}