import { Input, Typography } from 'antd';
import {useEffect, useState} from "react";
// import IconAddImage from "../../../../assets/svg/MidConversation/CreateChat/IconAddImage";
// import IconAddSampleReply from "../../../../assets/svg/MidConversation/CreateChat/IconAddSampleReply";
import IconSend from "../../../../assets/svg/MidConversation/CreateChat/IconSend";
import moment from "moment";
import {IConversationItemLoaded} from "../../../../dto";
import Cookies from "js-cookie";
import {sendChat, sendComment} from "../../../../api/conversation";
import {CONVERSATION_NOT_FROM_CUSTOMER} from "../../../../utils/constants/customer";
import {useDispatch, useSelector} from "react-redux";
import {
  removeFakeComment,
  setHistoryItem,
  setHistoryItemByFakeId,
  setHistoryItemFakeComment, setNewListComment
} from "../../../../reducers/conversationSlice";
import UploadFile from "./UploadFile";
import {
  CONVERSATION_IS_NOT_HIDE,
  CONVERSATION_IS_NOT_LIKE,
  CONVERSATION_IS_READ,
  CONVERSATION_IS_REPLY,
  CONVERSATION_TYPE_CHAT_FB,
  CONVERSATION_TYPE_COMMENT_FB
} from "../../../../utils/constants/conversation";
import {RootState} from "../../../../store";
import {alertToast} from "../../../../helper/toast";
import {IHistoryChat} from "../../../../dto/conversation-list/response/history-chat";
// import IconDelete from "../../../../assets/svg/IconDelete";

const { TextArea } = Input;
export default function CreateChat({conversationItem} : {
  conversationItem: IConversationItemLoaded | undefined
}) {
  const dispatch = useDispatch()
  const [value, setValue] = useState('');
  const [isSendMessageSuccess, setIsSendMessageSuccess] = useState(false)
  const [isSendMessageFail, setIsSendMessageFail] = useState(false)
  const userInfor = JSON.parse(Cookies.get('userInfor') || "{}")
  const {selectedCommentIdToReply, activeConversationId} = useSelector((state: RootState) => state.conversation)

  const handleSendMessage = async () => {
    if(conversationItem?.info.type === CONVERSATION_TYPE_CHAT_FB){
      handleSendChat()
    } else if (conversationItem?.info.type === CONVERSATION_TYPE_COMMENT_FB) {
      handleSendComment()
    }
  }

  const handleSendComment = async () => {
    if(!selectedCommentIdToReply){
      alertToast({
        type: "warning",
        message: 'Vui lòng chọn bình luận để trả lời',
      })
      return;
    }

    let selectedCommentInfo = conversationItem?.chatHistory.find((itemHistory) => {
      return selectedCommentIdToReply === itemHistory.social_network_id
    })
    if(!selectedCommentInfo){
      selectedCommentInfo = conversationItem?.chatHistory
        .flatMap((itemHistory) => itemHistory.children)
        .find((child) => child?.social_network_id === selectedCommentIdToReply);
    }

    if(!selectedCommentInfo){
      alertToast({
        type: 'warning',
        message: "Không tồn tại bình luận"
      })
      return;
    }

    const fakeData : IHistoryChat = generateFakeComment(selectedCommentInfo)
    dispatch(setHistoryItemFakeComment(fakeData))

    const dataComment = {
      project_id: userInfor.last_project_active,
      content: value,
      parent_social_network_id: selectedCommentInfo?.social_network_id,
      social_network_post_id: selectedCommentInfo?.social_netword_post_id,
    }
    setValue('')
    try {
      const sendCommentToPlatform : IHistoryChat = await sendComment(conversationItem?.conversationId || "", dataComment)
      if(sendCommentToPlatform){
        dispatch(setNewListComment(sendCommentToPlatform))
        setIsSendMessageSuccess(true)
      }
    } catch (e) {
      setIsSendMessageSuccess(false)
      dispatch(removeFakeComment(fakeData))
    }

    
  }
  
  const generateFakeComment = (selectedComment : IHistoryChat): IHistoryChat => {
    return {
      _id: '',
      channel: conversationItem?.info.channel_infor._id || "",
      content: value,
      conversation_id: selectedComment.conversation_id,
      from_customer: CONVERSATION_NOT_FROM_CUSTOMER,
      is_hide: CONVERSATION_IS_NOT_HIDE,
      is_like: CONVERSATION_IS_NOT_LIKE,
      is_read: CONVERSATION_IS_READ,
      is_reply: CONVERSATION_IS_REPLY,
      parent_social_network_id: selectedComment.parent_social_network_id || selectedComment.social_network_id,
      project_id: selectedComment.project_id,
      social_network_id: moment().unix() + userInfor.last_project_active,
      sender: {
        id: conversationItem?.info.channel_infor._id || "",
        avatar: conversationItem?.info.channel_infor.picture || "",
        name: conversationItem?.info.channel_infor.name || "",
        social_id: conversationItem?.info.channel_infor.platform_id || ""
      },
      time_created_at: moment().utc().format(),
      created_at: moment().utc().format()
    }
  }

  const handleSendChat = async () => {
    const data = {
      project_id: userInfor.last_project_active,
      ...(value !== "" && { content: value }),
      // ...(mediaItems && mediaItems.length > 0 && { images: mediaItems.map((item) => item.name) }),
    };

    let fakeData = generateFakeData();
    const fakeId = moment().unix() + userInfor.last_project_active;
    if(fakeData){
      fakeData.content = value
      fakeData.fake_id = fakeId;
      dispatch(setHistoryItem({historyItem: fakeData}))
    }
    setValue('')
    try {
      const sendMessage = await sendChat(conversationItem?.info._id || "", data)
      dispatch(setHistoryItemByFakeId({
        fakeId,
        historyItem: sendMessage
      }))
      setIsSendMessageSuccess(true)
    } catch (e) {
      setIsSendMessageFail(true)
    }
  }
  
  const generateFakeData = () => {
    let findOneHistoryItemFromPage = conversationItem?.chatHistory.find((item) => item.from_customer === CONVERSATION_NOT_FROM_CUSTOMER)
    if(findOneHistoryItemFromPage){
      const fakeData = {...findOneHistoryItemFromPage};
      fakeData.created_at = moment().utc().format()
      return fakeData
    }
  }

  useEffect(() => {
    if(isSendMessageSuccess){
      setTimeout(() => {
        setIsSendMessageSuccess(false)
      }, 3000)
    }
    if(isSendMessageFail){
      setTimeout(() => {
        setIsSendMessageFail(false)
      }, 3000)
    }
  }, [isSendMessageSuccess, isSendMessageFail])

  useEffect(() => {
    setValue('')
  }, [activeConversationId]);

  return (
    <div className={`bg-create-chat p-3 text-left`}>
      {/*<UploadFile/>*/}

      <TextArea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Nhập nội dung tin nhắn"
        autoSize={{ minRows: 2, maxRows: 4 }}
        allowClear
      />

      <div className={`flex items-center mt-4 pb-2`}>
        <div className={`flex-1`}>
          {
            isSendMessageSuccess && <Typography className={`text-xs text-green-500`}>Gửi tin nhắn thành công</Typography>
          }
          {
            isSendMessageFail && <Typography className={`text-xs text-red-500`} onClick={handleSendMessage}>Gửi tin nhắn không thành công</Typography>
          }
        </div>
        <div className={`flex gap-3`}>
          {/*<div className={`cursor-pointer`}><IconAddImage/></div>*/}
          {/*<div className={`cursor-pointer`}><IconAddSampleReply/></div>*/}
          <div className={`cursor-pointer`} onClick={handleSendMessage}><IconSend/></div>
        </div>
      </div>
    </div>
  )
}