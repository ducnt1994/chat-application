import {Button, Divider, Image, Input, message, Modal, Select, Upload} from "antd";
import {useEffect, useState} from "react";
import {RcFile, UploadProps} from "antd/es/upload";
import {ItemFile} from "../../../dto";
import {getBase64} from "../../../helper/file";
import IconDelete from "../../../assets/svg/IconDelete";
import {uploadImage} from "../../../api/uploadFile";
import {updateReplySample} from "../../../api/conversationScript";
import {IReplySampleItem} from "../../../dto/reply-sample";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import {getUserInfor} from "../../../helper/common";
import styles from "./custom.module.scss"

const {TextArea} = Input

const initialState = {
  topicId: '',
  shortcut: '',
  content: '',
  images: [],
  _id: ''
}
export default function ModalUpdateSample({open, handleClose, handleConfirm, currentSampleId} : {
  open: boolean
  handleClose: () => void
  handleConfirm: (item: IReplySampleItem) => void
  currentSampleId: string
}) {
  const { replyTopics, replySamples} = useSelector((state : RootState) => state.conversationScript)
  const [creatingSample, setCreatingSample] = useState(false)
  const [currentSampleItem, setCurrentSampleItem] = useState<{
    topicId: string,
    shortcut: string,
    content: string,
    images: ItemFile[]
    _id: string
  }>(initialState)

  const handleChangeShortcut = (e: any) => {
    const newTopicDataSet = {...currentSampleItem}
    newTopicDataSet.shortcut = e.target.value
    setCurrentSampleItem(newTopicDataSet)
  }

  const handleChangeContent = (e: any) => {
    const newTopicDataSet = {...currentSampleItem}
    newTopicDataSet.content = e.target.value
    setCurrentSampleItem(newTopicDataSet)
  }

  const handleChangeTopic = (value: string) => {
    const newTopicDataSet = {...currentSampleItem}
    newTopicDataSet.topicId = value
    setCurrentSampleItem(newTopicDataSet)
  }

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
    const newTopicDataSet = {...currentSampleItem}
    newTopicDataSet.images = newTopicDataSet.images.concat(listPreview)
    setCurrentSampleItem(newTopicDataSet)
  }

  const handleRemoveFileUpload = (indexFile : number) => {
    const newListFile = {...currentSampleItem}
    newListFile.images.splice(indexFile, 1)
    setCurrentSampleItem(newListFile);
  }

  const handleUploadImage = async (): Promise<string[]> => {
    return await Promise.all(currentSampleItem.images.map(async (file) => {
      if(file.file){
        try {
          const data = new FormData();
          data.append("image", file.file);
          data.append("projectId", getUserInfor()?.last_project_active);
          data.append("folder", "engage");
          const response = await uploadImage(data);
          return response.data.url;
        } catch (e) {
          message.error('Tải ảnh lên thất bại')
          return "";
        }
      } else {
        return file.url
      }
    }))
  }
  const handleCreateNewSample = async () => {
    if(currentSampleItem.images.length === 0 && !currentSampleItem.content){
      message.warning('Vui lòng thêm ảnh hoặc thêm nội dung câu trả lời mẫu')
      return;
    }
    setCreatingSample(true)
    try {
      let listMedias: string[] = []
      if(currentSampleItem.images.length > 0){
        listMedias = await handleUploadImage()
      }
      let data = {
        content: currentSampleItem.content,
        medias: listMedias,
        reply_topic_id: currentSampleItem.topicId,
        shortcut: currentSampleItem.shortcut
      }
      const addSample = await updateReplySample(getUserInfor()?.last_project_active as string, data, currentSampleItem._id)
      handleConfirm(addSample)
      setCreatingSample(false)
      setCurrentSampleItem(initialState)
      message.success('Cập nhật câu trả lời mẫu thành công')
    } catch (e) {
      setCreatingSample(false)
      message.error('Cập nhật câu trả lời mẫu không thành công')
    }
  }

  useEffect(() => {
    if(currentSampleItem){
      const currentItemFromList = replySamples?.find((item) => item._id === currentSampleId)
      if(currentItemFromList){
        const convertData = {
          topicId: currentItemFromList.reply_topic_id,
          shortcut: currentItemFromList.shortcut,
          content: currentItemFromList.content,
          _id: currentItemFromList._id,
          images: currentItemFromList.medias.length > 0 ? currentItemFromList?.medias.map((item) => {
            return {
              name: item,
              url: item,
              file: null
            }
          }) : []
        }
        setCurrentSampleItem(convertData)
      }
    }
    // eslint-disable-next-line
  }, [currentSampleId]);

  return (
    <>
      <Modal
        open={open}
        onCancel={handleClose}
        footer={[
          <Button key="back" onClick={handleClose}>
            Huỷ
          </Button>,
          <Button key="submit" loading={creatingSample} onClick={handleCreateNewSample} type="primary" className={`bg-blue-500 hover:bg-green-400`}>
            Lưu
          </Button>
        ]}
      >
        <div className={`text-xl font-semibold mb-3`}>Cập nhật câu trả lời nhanh</div>
        <div className={`flex flex-col gap-2`}>
          <div className={`flex gap-2 items-center`}>
            <div className={`w-[90px] text-sm font-semibold`}>Chọn chủ đề: </div>
            <div>
              <Select
                value={currentSampleItem.topicId}
                style={{ width: 200 }}
                onChange={handleChangeTopic}
                options={typeof replyTopics !== "undefined" ? replyTopics.map((item) => {
                  return {
                    value: item._id,
                    label: <div className={`flex gap-2 items-center`}>
                      <div className={`w-[20px] h-[20px]`} style={{backgroundColor: `${item.color}`}}></div>
                      <div>{item.name}</div>
                    </div>
                  }
                }) : []}
              />
            </div>
          </div>
        </div>

        <div className={`flex flex-col gap-2 mt-3`}>
          <div className={`flex gap-2 w-full items-center`}>
            <div className={`w-[90px] text-sm font-semibold`}>Lối tắt: </div>
            <div className={`flex-1`}><Input  addonBefore={'/'} allowClear maxLength={16} placeholder={'Lối tắt'} value={currentSampleItem.shortcut} onChange={(e) => handleChangeShortcut(e)}/></div>
          </div>
        </div>

        <Divider className={`my-5`}></Divider>

        <div className={`flex flex-col gap-2`}>
          <div className={`flex gap-2 items-center`}>
            <div className={`w-[90px] text-sm font-semibold`}>Lối tắt: </div>
            <div className={`flex-1`}><TextArea allowClear rows={4} placeholder={'Nội dung câu trả lời mẫu'} value={currentSampleItem.content} onChange={(e) => handleChangeContent(e)}/></div>
          </div>
        </div>

        <div className={`flex flex-col gap-2 mt-3`}>
          <div className={`flex gap-2 items-center`}>
            <div className={`w-[90px] text-sm font-semibold`}>Hình ảnh: </div>
            <div className={`flex-1 flex flex-wrap gap-2`}>
              <Upload
                onChange={handleChange}
                beforeUpload={() => false}
                showUploadList={false}
                accept={'image/*'}
                fileList={[]}
                multiple
              >
                <div className={`cursor-pointer w-[60px] h-[60px] bg-white border border-gray-100 relative rounded-lg`}>
                  <div className={`absolute top-[50%] left-[50%]`} style={{transform: 'translate(-50%, -50%)'}}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.33333 7.40033L4.66667 6.067L8.33333 9.73367L10.6667 7.40033L12.6667 9.40033V3.33333H3.33333V7.40033ZM2.66667 2H13.3333C13.7015 2 14 2.29848 14 2.66667V13.3333C14 13.7015 13.7015 14 13.3333 14H2.66667C2.29848 14 2 13.7015 2 13.3333V2.66667C2 2.29848 2.29848 2 2.66667 2ZM10.3333 6.66667C9.78107 6.66667 9.33333 6.21895 9.33333 5.66667C9.33333 5.11438 9.78107 4.66667 10.3333 4.66667C10.8856 4.66667 11.3333 5.11438 11.3333 5.66667C11.3333 6.21895 10.8856 6.66667 10.3333 6.66667Z" fill="#0EA5E9"/>
                    </svg>
                  </div>
                </div>
              </Upload>
              {
                currentSampleItem.images.length > 0 && currentSampleItem.images.map((item, key) => {
                  return <div className={`${styles.ImageCustom} rounded-lg flex items-center cursor-pointer w-[60px] h-[60px] bg-white border border-gray-100 relative`} key={key}>
                    <Image src={item.url} alt={item.name} className={`max-w-full max-h-full object-contain`}/>
                    <div className={`absolute -top-1 -right-1 cursor-pointer`} onClick={() => handleRemoveFileUpload(key)}>
                      <IconDelete/>
                    </div>
                  </div>
                })
              }
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}