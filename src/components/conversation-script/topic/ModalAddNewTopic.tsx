import {Modal, ColorPicker, Button, Input, message} from "antd";
import {useState} from "react";
import {Color} from "antd/es/color-picker";
import Cookies from "js-cookie";
import {createTopic} from "../../../api/conversationScript";

export default function ModalAddNewTopic({open, handleClose, handleConfirm} : {
  open: boolean
  handleClose: () => void
  handleConfirm: (name: string, color: string, _id: string) => void
}) {
  const [newTopic, setNewTopic] = useState({
    name: 'Chủ đề mới',
    color: 'red'
  })
  const [creatingTopic, setCreatingTopic] = useState(false)
  const userInfor = JSON.parse(Cookies.get('userInfor') || "{}")
  const handleCreateTopic = async () => {
    setCreatingTopic(true)
    try {
      const createTop = await createTopic(userInfor?.last_project_active as string, {
        name: newTopic.name,
        color: newTopic.color
      })
      if(createTop){
        setNewTopic({
          name: 'Chủ đề mới',
          color: 'red'
        })
        handleConfirm(newTopic.name, newTopic.color, createTop)
        message.success('Tạo chủ đề mới thành công')
      }
      setCreatingTopic(false)
    } catch (e) {
      message.error('Tạo chủ đề mới thất bại')
      setCreatingTopic(false)
    }
  }

  const handleChangeName = (e: any) => {
    const newTopicDataSet = {...newTopic}
    newTopicDataSet.name = e.target.value
    setNewTopic(newTopicDataSet)
  }

  const handleChangeColor = (value: Color, hex: string) => {
    const newTopicDataSet = {...newTopic}
    newTopicDataSet.color = hex
    setNewTopic(newTopicDataSet)
  }

  return (
    <>
      <Modal
        open={open}
        onCancel={handleClose}
        footer={[
          <Button key="back" onClick={handleClose}>
            Huỷ
          </Button>,
          <Button key="submit" loading={creatingTopic} onClick={handleCreateTopic} type="primary" className={`bg-blue-500 hover:bg-green-400`}>
            Lưu
          </Button>
        ]}
      >
        <div className={`text-xl font-semibold mb-3`}>Tạo mới chủ để</div>
        <div className={`flex flex-col gap-2`}>
          <div className={`flex gap-2 items-center`}>
            <div className={`w-10 font-semibold`}>Tên: </div>
            <div><Input allowClear maxLength={16} placeholder={'Tên chủ đề'} value={newTopic.name} onChange={(e) => handleChangeName(e)}/></div>
          </div>
          <div className={`flex gap-2 items-center`}>
            <div className={`w-10 font-semibold`}>Màu: </div>
            <div><ColorPicker onChange={handleChangeColor} value={newTopic.color}/></div>
          </div>
        </div>
      </Modal>
    </>
  );
}