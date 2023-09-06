import PostContent from "./PostContent";
import ChatContent from "./ChatContent";
import {IConversationItemLoaded} from "../../../../dto";
import {Spin} from "antd";
import {CONVERSATION_TYPE_COMMENT_FB} from "../../../../utils/constants/conversation";

export default function ConversationContent({conversationItem} : {
  conversationItem: IConversationItemLoaded | undefined
}) {
  console.log({conversationItem})
  return (
    <>
      {
        conversationItem && <div className={`overflow-y-scroll bg-empty-bg p-4 flex-1`}>
          {
            conversationItem.info.type === CONVERSATION_TYPE_COMMENT_FB &&
            conversationItem.info.meta_data &&
            <PostContent postData={conversationItem.info.meta_data}/>
          }
          {
            (!conversationItem || conversationItem.isLoadingItem) ? (
              <Spin size={'large'} className={`mt-4`}/>
            ) : (
              <ChatContent conversationItem={conversationItem}/>
            )
          }
        </div>
      }
    </>
  )
}