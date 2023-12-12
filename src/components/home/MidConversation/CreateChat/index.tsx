import {Input, message, Popover, Tooltip, Typography} from 'antd';
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
import styles from "./custom-upload-file.module.scss"
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
import {ReplySamples} from "./ReplySamples";
import {IReplySampleItem} from "../../../../dto/reply-sample";
import {checkIsInstalledExt, getUserInfor} from "../../../../helper/common";

export interface ISendDataInterface {
  project_id: string
  content?: string
  images?: string[]
}

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
  const [openReplySampleComp, setOpenReplySampleComp] = useState(false)

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
        if(file.file){
          const imageUrl = await handleUploadImage(file.file)
          media.url = imageUrl;
          media.name = imageUrl;
        } else {
          media.url = file.url;
          media.name = file.name;
        }

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
      handleResetData()
    } catch (e) {
      setIsSendMessageSuccess(false)
      dispatch(removeFakeComment(fakeData))
      handleResetData()
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
    const lastCreatedAtChat = typeof conversationItem?.info?.last_time_customer !== 'undefined'
      ? Math.floor(conversationItem?.info?.last_time_customer / 1000)
      : moment().subtract(7, 'days').unix()
    // @ts-ignore
    const messageSent24Hours = (moment().unix() - lastCreatedAtChat) >= (24 * 60 * 60)
    const cannotSendMessageWithoutGlobalId = !conversationItem?.customerInfor?.global_id && messageSent24Hours

    if(cannotSendMessageWithoutGlobalId){
      if(checkIsInstalledExt()){
        const callAPIEvent = new CustomEvent('callAPI',
          {detail:
              {
                method:"FETCH_USER",
                data: {
                  project_id: getUserInfor().last_project_active,
                  page_id: conversationItem?.info.channel_infor?.platform_id,
                  filter: {
                    page_id: conversationItem?.info.channel_infor?.platform_id,
                    id: conversationItem?.customerInfor?.global_id || "",
                    name: conversationItem?.customerInfor?.name,
                    timestamp: conversationItem?.info?.last_chat?.timestamp
                  },
                  user_so9_id: conversationItem?.customerInfor?._id,
                  conversation_id: conversationItem?.info?._id
                }
              }
          });
        const dispatchLog = document.dispatchEvent(callAPIEvent);
        console.log({dispatch_1: dispatchLog})
        message.warning('Extension đang cập nhật thông tin của người nhắn. Vui lòng thử lại sau ít phút')
      }
      else {
        // tin nhắn đã gửi quá 24h và chưa crawl được global id
        message.error('Vui lòng cài đặt extension để sử dụng được chức năng gửi tin nhắn cho khách hàng chưa trả lời quá 24h')
      }
      return
    }

    const data : ISendDataInterface = {
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
        if(file.file){
          const imageUrl = await handleUploadImage(file.file)
          imageSend.push(imageUrl)
        } else {
          imageSend.push(file.url)
        }
      }))
      if(imageSend.length > 0){
        data.images = imageSend
      }
    }
    handleResetData()
    try {

      // @ts-ignore
      if((moment().unix() - lastCreatedAtChat) >= (24 * 60 * 60)){ // gửi tin nhắn cho khách quá 24h
        await handleSendChat24h(data)
      } else {
        const sendMessage = await sendChat(conversationItem?.info._id || "", data)
        dispatch(setHistoryItemByFakeId({
          fakeId: fakeData.fake_id,
          historyItem: sendMessage
        }))
      }
      setIsSendMessageSuccess(true)
      handleResetData()
    } catch (e) {
      setIsSendMessageFail(true)
      handleResetData()
    }
  }

  const handleSendChat24h = async (data: ISendDataInterface) => {
    if(checkIsInstalledExt()){
      if(typeof conversationItem?.customerInfor?.global_id === 'undefined'){
        const callAPIEvent = new CustomEvent('callAPI',
          {detail:
              {
                method:"FETCH_USER",
                data: {
                  project_id: getUserInfor().last_project_active,
                  page_id: conversationItem?.info.channel_infor?.platform_id,
                  filter: {
                    page_id: conversationItem?.info.channel_infor?.platform_id,
                    id: conversationItem?.customerInfor?.global_id || "",
                    name: conversationItem?.customerInfor?.name,
                    timestamp: conversationItem?.info?.last_chat?.timestamp
                  },
                  user_so9_id: conversationItem?.customerInfor?._id,
                  conversation_id: conversationItem?.info?._id
                }
              }
          });
        const dispatchLog = document.dispatchEvent(callAPIEvent);
        console.log({dispatch_2: dispatchLog})
      } else {

        const callAPIEvent = new CustomEvent('callAPI',
          {
            detail: {
              method:"24_PLUS_1",
              data: {
                message: data.content,
                page_id: conversationItem?.info?.channel_infor?.platform_id,
                global_id : conversationItem?.customerInfor?.global_id,
                image_url: data.images
              }
            }
          });
        const dispatchLog = document.dispatchEvent(callAPIEvent);
        console.log({dispatch_3: dispatchLog})
      }

      return
    } else {
      message.error('Vui lòng cài đặt extension để sử dụng được chức năng gửi tin nhắn cho khách hàng chưa trả lời quá 24h')
      return
    }

  }

  const handleResetData = () => {
    setTimeout(() => {
      setValue('')
      setFileListSelected([])
    },50)
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

  const handleSelectSample = (item: IReplySampleItem) => {
    if(item.medias.length > 0){
      const arrFile = item.medias.map((file) => {
        return {
          name: file,
          url: file,
          file: null
        }
      })
      let newFileListSelected = [...fileListSelected]
      newFileListSelected = newFileListSelected.concat(arrFile)
      setFileListSelected(newFileListSelected)
    }
    setValue(item.content)
    setOpenReplySampleComp(false)
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
    <div className={`bg-create-chat px-1 text-left`}>
      <FileUploadPreview
        handleRemoveFileUpload={(index: number) => handleRemoveFileUpload(index)}
        fileListSelected={fileListSelected}/>
      <TextArea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Nhập nội dung tin nhắn"
        autoSize={{ minRows: 2, maxRows: 4 }}
        onPressEnter={(evt) => {
          if(!evt.shiftKey){
            handleSendMessage()
          }
        }}
        allowClear
      />

      <div className={`flex items-center mt-2`}>
        <div className={`flex-1`}>
          {
            isSendMessageSuccess && <Typography className={`text-xs text-green-500`}>Gửi tin nhắn thành công</Typography>
          }
          {
            isSendMessageFail && <Typography className={`text-xs text-red-500`} onClick={handleSendMessage}>Gửi tin nhắn không thành công</Typography>
          }
        </div>
        <div className={`flex gap-3 h-[30px]`}>
          <div className={`relative`}>
            <UploadFile
              handleSelectFileFromLocal={(itemList: ItemFile[]) => handleSelectFileFromLocal(itemList)}
              conversationItem={conversationItem}
            />
            {
              fileListSelected.length > 0 && <div className={`w-[10px] h-[10px] absolute top-0 -right-1 bg-red-600 rounded-full`}></div>
            }
          </div>


          <Popover
            open={openReplySampleComp}
            placement={'top'}
            overlayClassName={`${styles.CustomUpload}`}
            trigger={'click'} title={<ReplySamples handleSelectSample={(item: IReplySampleItem) => handleSelectSample(item)}/>} zIndex={10}>
            <Tooltip title={'Câu trả lời mẫu'} placement={'bottom'} zIndex={9}>
              <div className={`cursor-pointer`} onClick={() => setOpenReplySampleComp(!openReplySampleComp)}><IconAddSampleReply/></div>
            </Tooltip>
          </Popover>
          <div className={`cursor-pointer`} onClick={handleSendMessage}><IconSend/></div>
        </div>
      </div>
    </div>
  )
}