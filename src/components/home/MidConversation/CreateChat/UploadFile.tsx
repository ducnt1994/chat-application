import { Upload} from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';

import IconAddImage from "../../../../assets/svg/MidConversation/CreateChat/IconAddImage";
import {IConversationItemLoaded, ItemFile} from "../../../../dto";
import {getBase64} from "../../../../helper/file";
import {CONVERSATION_TYPE_CHAT_FB} from "../../../../utils/constants/conversation";

export default function UploadFile({handleSelectFileFromLocal, conversationItem} : {
  handleSelectFileFromLocal: (itemFile: ItemFile[]) => void
  conversationItem: IConversationItemLoaded | undefined
}) {

  const handleChange: UploadProps['onChange'] = async ({ fileList: newFileList }) => {
    let listPreview : ItemFile[] = []
    await Promise.all(newFileList.map(async (file) => {
        const previewImageBase = await getBase64(file.originFileObj as RcFile);
        listPreview.push({
          name: file.name,
          url: previewImageBase,
          file: file.originFileObj
        })
      })
    )
    handleSelectFileFromLocal(listPreview)
  }

  return (
    <div className={'flex gap-3 mb-3 flex-wrap'}>
      <Upload
        onChange={handleChange}
        beforeUpload={() => false}
        showUploadList={false}
        accept={'image/*'}
        fileList={[]}
        multiple={conversationItem?.info.type === CONVERSATION_TYPE_CHAT_FB}
      >
        <div className={`cursor-pointer`}><IconAddImage/></div>
      </Upload>
    </div>
  )
}