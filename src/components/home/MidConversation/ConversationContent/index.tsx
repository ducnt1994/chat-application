import PostContent from "./PostContent";
import ChatContent from "./ChatContent";
import {IConversationItemLoaded} from "../../../../dto";
import {Spin} from "antd";
import {CONVERSATION_TYPE_COMMENT_FB} from "../../../../utils/constants/conversation";
import {useEffect, useRef} from "react";

export default function ConversationContent({conversationItem} : {
  conversationItem: IConversationItemLoaded | undefined
}) {
  const refDom = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if(typeof conversationItem !== 'undefined' && conversationItem?.chatHistory.length > 0){
      setTimeout(() => {
        refDom.current?.scrollIntoView({ behavior: 'smooth', block: 'end'})
      }, 500)
    }
  }, [conversationItem]);
  return (
    <>
      {
        conversationItem && <div className={`overflow-y-scroll bg-empty-bg px-4 pt-4 flex-1`}>
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
          <div className={`mt-3`} id={'chat-content'} ref={refDom} />
        </div>
      }
    </>
  )
}