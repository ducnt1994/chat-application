import {IConversationItemLoaded} from "../../../../../dto";
import {Image, message} from "antd";
import CreateNote from "./CreateNote";
import NoteItem from "./NoteItem";
import {useState} from "react";
import Cookies from "js-cookie";
import {addNoteConversation} from "../../../../../api/conversation";
import {addNoteData, removeNoteData} from "../../../../../reducers/conversationSlice";
import moment from "moment";
import {useDispatch} from "react-redux";
export default function Notes({conversationItemLoaded} : {
  conversationItemLoaded: IConversationItemLoaded | undefined
}) {
  const dispatch = useDispatch()
  const [createNew, setCreateNew] = useState<boolean>(false)
  const [contentNote, setContentNote] = useState('')
  const userInfor = JSON.parse(Cookies.get('userInfor') || "{}")
  const [isCreatingNote, setIsCreatingNote] = useState(false)

  const handleCreateNote = () => {
    const data = {
      note: contentNote,
      project_id: userInfor?.last_project_active
    }
    setIsCreatingNote(true)
    setTimeout(() => {
      setContentNote('')
    }, 10)
    const fakeNoteId = moment().unix() + userInfor.last_project_active
    dispatch(addNoteData({ conversationId: conversationItemLoaded?.conversationId || "", noteItem: {
        id: fakeNoteId,
        time: moment().unix(),
        note: contentNote
      }}))
    addNoteConversation(conversationItemLoaded?.conversationId || "", data)
      .then((response) => {
        if (response.status) {
          message.success("Thêm ghi chú thành công")
        } else {
          message.error("Thêm ghi chú thất bại")
        }
        setIsCreatingNote(false)
        setCreateNew(false)
      })
      .catch((error) => {
        dispatch(removeNoteData({conversationId: conversationItemLoaded?.conversationId || "", fakeNoteId}))
        setIsCreatingNote(false)
        console.log(error);
        message.error("Thêm ghi chú thất bại")
      });
  }

  const handleCancel = () => {
    setCreateNew(false)
    setTimeout(() => {
      setContentNote('')
    }, 10)
  }

  const handleChangeNote = (text : string) => {
    setContentNote(text)
  }

  return (
    <div className={`px-4`}>
      <div className={`flex items-center mt-2 mb-2`}>
        <div className={`text-left text-sm font-bold flex-1`}>Ghi chú</div>
        {
          !createNew && <div
            onClick={() => setCreateNew(!createNew)}
            className={`text-blue-500 text-xs font-medium cursor-pointer`}>Thêm mới</div>
        }
      </div>
      {
        conversationItemLoaded && <div className={`max-h-[300px] overflow-auto`}>
          {
            typeof conversationItemLoaded.info.note !== 'undefined' &&
            conversationItemLoaded.info.note.length > 0 &&
            conversationItemLoaded.info.note.map((item, key) => {
              return <NoteItem
                noteItem={item}
                hasDivider={key !== conversationItemLoaded.info.note.length - 1}/>
            })
          }

          {
            typeof conversationItemLoaded.info.note === 'undefined' && <div className={`w-full h-[100px] mt-10`}>
              <div><Image preview={false} src={'/chat/empty-note.png'}/></div>
              <div className={`text-sm font-medium text-gray-400`}>Chưa có ghi chú</div>
            </div>
          }

        </div>
      }
      {
        createNew && <CreateNote
          handleCancel={handleCancel}
          noteContent={contentNote}
          handleCreateNote={handleCreateNote}
          handleChangeNote={(text) => handleChangeNote(text)}
          isCreatingNote={isCreatingNote}
        />
      }
    </div>
  )
}