import {Button, Input} from "antd";

const {TextArea} = Input
export default function CreateNote({handleCancel, noteContent, handleCreateNote, handleChangeNote, isCreatingNote} : {
  handleCancel: () => void
  handleCreateNote: () => void
  noteContent: string
  handleChangeNote: (text : string) => void
  isCreatingNote: boolean
}) {

  return (
    <div className={`mt-2`}>
      <TextArea
        value={noteContent}
        onChange={(e) => handleChangeNote(e.target.value)}
        placeholder="Nhập ghi chú (Enter để gửi)"
        allowClear
        showCount
        maxLength={100}
        onPressEnter={(e) => {
          handleCreateNote()
        }}
      />

      <div className={`flex mt-6`}>
        <div className={`flex-1 text-left`}>
          <Button type={'default'} onClick={handleCancel}>Huỷ</Button>
        </div>
        <div>
          <Button type={'primary'} loading={isCreatingNote} className={`bg-blue-500`} onClick={handleCreateNote}>Lưu</Button>
        </div>
      </div>
    </div>
  )
}