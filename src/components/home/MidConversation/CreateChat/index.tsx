import { Input, Typography } from 'antd';
import {useEffect, useState} from "react";
// import IconAddImage from "../../../../assets/svg/MidConversation/CreateChat/IconAddImage";
// import IconAddSampleReply from "../../../../assets/svg/MidConversation/CreateChat/IconAddSampleReply";
import IconSend from "../../../../assets/svg/MidConversation/CreateChat/IconSend";
import moment from "moment";
import {IConversationItemLoaded} from "../../../../dto";
import Cookies from "js-cookie";
import {sendChat} from "../../../../api/conversation";
import {CONVERSATION_NOT_FROM_CUSTOMER} from "../../../../utils/constants/customer";
import {useDispatch} from "react-redux";
import {setHistoryItem, setHistoryItemByFakeId} from "../../../../reducers/conversationSlice";
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

  const handleSendMessage = async () => {
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
  return (
    <div className={`bg-create-chat p-3 text-left`}>
      <div className={'flex gap-3 mb-3 flex-wrap'}>
        {/*{[...Array(10)].map((x, i) =>*/}
        {/*  <div key={i} className={`relative`}>*/}
        {/*    <div className={`w-[55px] rounded-md h-[55px] border border-gray-200 flex items-center justify-center relative bg-white`}>*/}
        {/*      <img className={`max-w-full max-h-full object-contain`} alt={'avatar'} src={'https://picsum.photos/300/300'}/>*/}
        {/*    </div>*/}
        {/*    <div className={`absolute -top-1 -right-1 cursor-pointer`}>*/}
        {/*      <IconDelete/>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*)}*/}

      </div>
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