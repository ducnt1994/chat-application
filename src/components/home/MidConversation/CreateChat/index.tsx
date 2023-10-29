import {Input, message, Typography} from 'antd';
import {useEffect, useState} from "react";
import IconAddSampleReply from "../../../../assets/svg/MidConversation/CreateChat/IconAddSampleReply";
import IconSend from "../../../../assets/svg/MidConversation/CreateChat/IconSend";
import moment from "moment";
import {IConversationItemLoaded, ItemFile} from "../../../../dto";
import Cookies from "js-cookie";
import {sendChat, sendComment} from "../../../../api/conversation";
import {CONVERSATION_NOT_FROM_CUSTOMER} from "../../../../utils/constants/customer";
import {useDispatch, useSelector} from "react-redux";
import {
  removeFakeComment, setCommentToReply, setCurrentConversationToTop,
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
import {IHistoryChat, IMediaItem} from "../../../../dto/conversation-list/response/history-chat";
import FileUploadPreview from "./FileUploadPreview";
import {uploadImage} from "../../../../api/uploadFile";

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
  const [fileListSelected, setFileListSelected] = useState<ItemFile[]>([])

  const handleSendMessage = async () => {
    if(conversationItem?.info.type === CONVERSATION_TYPE_CHAT_FB){
      handleSendChat()
    } else if (conversationItem?.info.type === CONVERSATION_TYPE_COMMENT_FB) {
      handleSendComment()
    }
  }

  const handleSendComment = async () => {
    if(!selectedCommentIdToReply){
      message.warning('Vui lòng chọn bình luận để trả lời',2)
      return;
    }

    let media = {
      created_at: moment().utc().format(),
      name: '',
      url: '',
      project_id: userInfor.last_project_active
    }
    if(fileListSelected.length > 0){
      await Promise.all(fileListSelected.map(async (file) => {
        const imageUrl = await handleUploadImage(file.file)
        media.url = imageUrl;
        media.name = imageUrl;
      }))
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
      message.warning("Không tồn tại bình luận")
      return;
    }

    const fakeData : IHistoryChat = generateFakeComment(selectedCommentInfo, media)
    dispatch(setHistoryItemFakeComment(fakeData))
    dispatch(setCurrentConversationToTop())

    const dataComment = {
      project_id: userInfor.last_project_active,
      content: value,
      parent_social_network_id: selectedCommentInfo?.social_network_id,
      social_network_post_id: selectedCommentInfo?.social_netword_post_id,
      ...(media.url && {image: media.url})
    }
    setValue('')
    setFileListSelected([])
    try {
      const sendCommentToPlatform : IHistoryChat = await sendComment(conversationItem?.conversationId || "", dataComment)
      if(sendCommentToPlatform){
        dispatch(setNewListComment(sendCommentToPlatform))
        setIsSendMessageSuccess(true)
        dispatch(setCommentToReply(''))
      }
    } catch (e) {
      setIsSendMessageSuccess(false)
      dispatch(removeFakeComment(fakeData))
    }
  }

  const handleUploadImage = async (file: any) => {
    try {
      const data = new FormData();
      data.append("image", file);
      data.append("projectId", userInfor.last_project_active);
      data.append("folder", "engage");
      const response = await uploadImage(data);
      return response.data.url;
    } catch (e) {
      message.error('Tải ảnh lên thất bại')
      return "";
    }
  }
  
  const generateFakeComment = (selectedComment : IHistoryChat, media: IMediaItem): IHistoryChat => {
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
      created_at: moment().utc().format(),
      is_sending_message: true,
      ...(media && media.url && {media})
    }
  }

  const handleSendChat = async () => {
    const data : {
      project_id: string
      content?: string
      images?: string[]
    } = {
      project_id: userInfor.last_project_active,
      ...(value !== "" && { content: value }),
      // ...(mediaItems && mediaItems.length > 0 && { images: mediaItems.map((item) => item.name) }),
    };
    dispatch(setCurrentConversationToTop())

    let fakeData = generateFakeData(fileListSelected.map((item) => {
      return {
        created_at: moment().utc().format(),
        name: item.name,
        url: item.url,
        project_id: userInfor.last_project_active
      }
    }));
    dispatch(setHistoryItem({historyItem: fakeData}))
    let imageSend : string[] = []
    if(fileListSelected.length > 0){
      await Promise.all(fileListSelected.map(async (file) => {
        const imageUrl = await handleUploadImage(file.file)
        imageSend.push(imageUrl)
      }))
      if(imageSend.length > 0){
        data.images = imageSend
      }
    }
    setValue('')
    setFileListSelected([])
    try {
      const sendMessage = await sendChat(conversationItem?.info._id || "", data)
      dispatch(setHistoryItemByFakeId({
        fakeId: fakeData.fake_id,
        historyItem: sendMessage
      }))
      setIsSendMessageSuccess(true)
    } catch (e) {
      setIsSendMessageFail(true)
    }
  }
  
  const generateFakeData = (media: IMediaItem[]) => {
    return {
      _id: '',
      channel: conversationItem?.info.channel_infor._id || "",
      content: value,
      conversation_id: conversationItem?.conversationId || "",
      from_customer: CONVERSATION_NOT_FROM_CUSTOMER,
      is_read: CONVERSATION_IS_READ,
      project_id: userInfor.last_project_active,
      social_network_id: moment().unix() + userInfor.last_project_active,
      sender: {
        id: conversationItem?.info.channel_infor._id || "",
        avatar: conversationItem?.info.channel_infor.picture || "",
        name: conversationItem?.info.channel_infor.name || "",
        social_id: conversationItem?.info.channel_infor.platform_id || ""
      },
      time_created_at: moment().utc().format(),
      created_at: moment().utc().format(),
      is_sending_message: true,
      fake_id: moment().unix() + userInfor.last_project_active,
      ...(media && media.length > 0 && {media})
    }
    // let findOneHistoryItemFromPage = conversationItem?.chatHistory.find((item) => item.from_customer === CONVERSATION_NOT_FROM_CUSTOMER)
    // if(findOneHistoryItemFromPage){
    //   const fakeData = {...findOneHistoryItemFromPage};
    //   fakeData.created_at = moment().utc().format()
    //   return fakeData
    // }
  }
  
  const handleSelectFileFromLocal = (fileList : ItemFile[]) => {
    let newList = [...fileListSelected]
    newList = newList.concat(fileList)
    setFileListSelected(newList)
  }

  const handleRemoveFileUpload = (indexFile : number) => {
    const newListFile = [...fileListSelected]
    newListFile.splice(indexFile, 1)
    setFileListSelected(newListFile);
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
    <div className={`bg-create-chat px-1 py-2 text-left`}>
      <FileUploadPreview
        handleRemoveFileUpload={(index: number) => handleRemoveFileUpload(index)}
        fileListSelected={fileListSelected}/>
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
          <UploadFile
            handleSelectFileFromLocal={(itemList: ItemFile[]) => handleSelectFileFromLocal(itemList)}
            conversationItem={conversationItem}
          />
          <div className={`cursor-pointer`}><IconAddSampleReply/></div>
          <div className={`cursor-pointer`} onClick={handleSendMessage}><IconSend/></div>
        </div>
      </div>
    </div>
  )
}