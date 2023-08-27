import { Input, Typography } from 'antd';
import {useState} from "react";
import IconAddImage from "../../../../assets/svg/MidConversation/CreateChat/IconAddImage";
import IconAddSampleReply from "../../../../assets/svg/MidConversation/CreateChat/IconAddSampleReply";
import IconSend from "../../../../assets/svg/MidConversation/CreateChat/IconSend";
import IconDelete from "../../../../assets/svg/IconDelete";

const { TextArea } = Input;
export default function CreateChat() {
  const [value, setValue] = useState('');
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
      />

      <div className={`flex items-center mt-4 pb-2`}>
        <div className={`flex-1`}>
          <Typography className={`text-xs text-green-500`}>Gửi tin nhắn thành công</Typography>
        </div>
        <div className={`flex gap-3`}>
          <div className={`cursor-pointer`}><IconAddImage/></div>
          <div className={`cursor-pointer`}><IconAddSampleReply/></div>
          <div className={`cursor-pointer`}><IconSend/></div>
        </div>
      </div>
    </div>
  )
}