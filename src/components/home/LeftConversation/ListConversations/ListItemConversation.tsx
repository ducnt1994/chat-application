import CountMessage from "../../../shared/CountMessage";
import IconPhone from "../../../../assets/svg/IconPhone";
import IconMessenger from "../../../../assets/svg/IconMessenger";
import IconReply from "../../../../assets/svg/LeftConversation/IconReply";
// import Tag from "../../../shared/Tag";
import Avatar from "../../../shared/Avatar";
import {IConversationItem} from "../../../../dto";
import {CONVERSATION_IS_NOT_READ, CONVERSATION_TYPE_CHAT_FB} from "../../../../utils/constants/conversation";
import IconComment from "../../../../assets/svg/IconComment";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store";
import {setActiveConversationId} from "../../../../reducers/conversationSlice";
import {CONVERSATION_FROM_CUSTOMER} from "../../../../utils/constants/customer";

export default function ListItemConversation({conversationItem} : {
  conversationItem: IConversationItem
}) {
  const dispatch = useDispatch();
  const {activeConversationId} = useSelector((state : RootState) => state.conversation)
  function generateLastChat() {
    if(conversationItem.last_chat.image){
      return '[Gửi hình ảnh]'
    } else {
      if(!conversationItem.last_chat.content){
        return '[Không có nội dung]';
      }
      return conversationItem.last_chat.content.substring(0,20) + (conversationItem.last_chat.content.length > 20 ? '...' : '')
    }
  }

  const handleClickItem = () => {
    dispatch(setActiveConversationId({id: conversationItem._id}))
  }
  return (
    <div className={`flex py-3 gap-4 pl-3 pr-1 items-center ${conversationItem._id === activeConversationId 
      ? 'bg-conversation-active' 
      : (conversationItem.is_read === CONVERSATION_IS_NOT_READ && conversationItem.last_chat.from_customer === CONVERSATION_FROM_CUSTOMER)
        ? 'bg-conversation-not-read' 
        : 'bg-white'} hover:bg-conversation-active cursor-pointer border-t border-t-gray-300`}
         onClick={handleClickItem}
    >
      <div className={`flex-1 flex items-center gap-4`}>
        <Avatar
          url={conversationItem.customer_info.avatar}
          size={50}
          absoluteComp={
            conversationItem.is_read === CONVERSATION_IS_NOT_READ ? <div className={`absolute right-0 bottom-0`}><CountMessage total={conversationItem.number_new_chat}/></div> : <></>
          }/>
        <div className={`flex-1 text-left`}>
          <div className={`font-bold text-gray-500 text-sm`}>{conversationItem.customer_info.name}</div>
          <div className={`text-black text-xs flex gap-1`}>{conversationItem.last_chat.from_customer === CONVERSATION_FROM_CUSTOMER ? '' : <IconReply/>}{generateLastChat()}</div>
          <div className={`flex gap-1 mt-2 flex-wrap`}>
            {/*<Tag title={'Tiềm năng'} color={'#33FF33'}/>*/}
          </div>
        </div>
      </div>
      <div>
        <div className={`text-sm text-gray-500`}>20:02</div>
        <div className={`mt-4 flex gap-1 justify-center`}>
          {
            conversationItem.customer_info.phones.length > 0 && <div><IconPhone/></div>
          }
          {
            conversationItem.type === CONVERSATION_TYPE_CHAT_FB
              ? (<div><IconMessenger isActive={true}/></div>)
              : (<div><IconComment isActive={true}/></div>)
          }

        </div>
      </div>
    </div>
  )
}