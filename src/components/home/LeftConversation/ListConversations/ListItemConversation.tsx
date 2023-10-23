import CountMessage from "../../../shared/CountMessage";
import IconPhone from "../../../../assets/svg/IconPhone";
import IconMessenger from "../../../../assets/svg/IconMessenger";
import IconReply from "../../../../assets/svg/LeftConversation/IconReply";
// import Tag from "../../../shared/Tag";
import Avatar from "../../../shared/Avatar";
import {IConversationItem} from "../../../../dto";
import {
  CONVERSATION_IS_NOT_READ,
  CONVERSATION_IS_READ,
  CONVERSATION_TYPE_CHAT_FB
} from "../../../../utils/constants/conversation";
import IconComment from "../../../../assets/svg/IconComment";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store";
import {
  markStatusReadConversation,
  setActiveConversationId,
  setHistoryChat,
  setLoadingHistoryConversation
} from "../../../../reducers/conversationSlice";
import {CONVERSATION_FROM_CUSTOMER} from "../../../../utils/constants/customer";
import moment from "moment";
import Cookies from "js-cookie";
import {confirmRead, getConversationChats, getConversationComments} from "../../../../api/conversation";
import {Tooltip, Avatar as Avt, message} from "antd";

export default function ListItemConversation({conversationItem} : {
  conversationItem: IConversationItem
}) {
  const dispatch = useDispatch();
  const {activeConversationId, conversationListLoaded} = useSelector((state : RootState) => state.conversation)
  const userInfor = JSON.parse(Cookies.get('userInfor') || "{}")
  function generateLastChat() {
    if(conversationItem.last_chat.image){
      return '[Gửi hình ảnh]'
    } else {
      if(!conversationItem.last_chat.content){
        return '[Không có nội dung]';
      }
      return conversationItem.last_chat.content.substring(0,18) + (conversationItem.last_chat.content.length > 18 ? '...' : '')
    }
  }
  const handleMarkingReadConversation = async () => {
    if(conversationItem.is_read === CONVERSATION_IS_NOT_READ){
      try {
        const res : any = await confirmRead(conversationItem._id, {
          project_id: userInfor.last_project_active
        });
        if(res && res.status){
          dispatch(markStatusReadConversation({conversationId: conversationItem._id, statusRead: CONVERSATION_IS_READ}))
        }
      } catch (e) {
        message.error('Đánh dấu đã đọc không thành công. Vui lòng thử lại sau ít phút!!!')
      }
    }
  }

  const handleClickItem = async () => {
    dispatch(setActiveConversationId({id: conversationItem._id}))
    //mark-read if not read
    handleMarkingReadConversation()

    const checkExistConversationLoaded = conversationListLoaded.find(item => conversationItem._id === item.conversationId)
    if(!checkExistConversationLoaded || !checkExistConversationLoaded.chatHistory){
      dispatch(setLoadingHistoryConversation({conversationId: conversationItem._id}))
      const data = {
        params: {
          project_id: userInfor?.last_project_active || '',
          page: 1,
        },
      };
      let historyChat;
      if(conversationItem.type === CONVERSATION_TYPE_CHAT_FB){
        historyChat = await getConversationChats(conversationItem._id, data)
      } else {
        historyChat = await getConversationComments(conversationItem._id, data)
      }
      dispatch(setHistoryChat({
        conversationId: conversationItem._id,
        histories: historyChat
      }))
    }
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
            conversationItem.is_read === CONVERSATION_IS_NOT_READ && conversationItem.last_chat.from_customer === CONVERSATION_FROM_CUSTOMER ? <div className={`absolute right-0 bottom-0`}><CountMessage total={conversationItem.number_new_chat}/></div> : <></>
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
        <div className={`flex gap-2`}>
          <div>
            <Tooltip placement="bottom" title={conversationItem.channel_infor.name}>
              <div>
                <Avt size={18} src={conversationItem.channel_infor.picture}/>
              </div>
            </Tooltip>
          </div>
          <div>
            <div className={`text-[11px] text-gray-500`}>{moment(conversationItem.last_chat.created_at).format('DD/MM')}</div>
            <div className={`text-[11px] text-gray-500`}>{moment(conversationItem.last_chat.created_at).format('HH:mm')}</div>
          </div>
        </div>

        <div className={`mt-4 flex gap-1 justify-end`}>
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