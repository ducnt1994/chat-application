import ItemContent from "../../shared/ItemContent";
import {IconPlus, IconTopic} from "../../../assets/svg/ConversationScript/IconConersationScript";
import {message, Spin} from "antd";
import ItemTopic from "./ItemTopic";
import {lazy, Suspense, useState} from "react";
import {delTopic} from "../../../api/conversationScript";
import Cookies from "js-cookie";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store";
import {setReplyTopics} from "../../../reducers/conversationScriptSlice";

export default function Topic({loadingTopic} : {
  loadingTopic: boolean
}) {
  const dispatch = useDispatch()
  const [openModalAdd, setOpenModalAdd] = useState(false)
  const {replyTopics} = useSelector((state: RootState) => state.conversationScript)
  const userInfor = JSON.parse(Cookies.get('userInfor') || "{}")
  const generateListTopic = () => {
    if(loadingTopic){
      return <div className={`flex items-center h-full justify-center`}>
        <Spin size="large">
        </Spin>
      </div>
    } else {
      if(replyTopics === undefined){
        return <>Không tồn tại chủ đề</>
      } else if (replyTopics.length === 0){
        return <div className={`flex justify-center text-sm font-semibold`}>Chưa có chủ đề</div>
      } else {
        return <div className={`flex flex-col max-h-[200px] gap-2 overflow-auto`}>
          {
            replyTopics.map((item, key) => {
              return <ItemTopic handleDelTopic={(id: string) => handleDelTopic(id)} item={item} key={key}/>
            })
          }
        </div>
      }
    }
  }

  const handleCreateTopic = (name: string, color: string, _id: string) => {
    const newListTopic = [...replyTopics || []]
    newListTopic.push({
      name,
      color,
      _id
    })
    dispatch(setReplyTopics(newListTopic))
    setOpenModalAdd(false)
  }

  const handleDelTopic = async (id: string) => {
    try {
      const delTop = await delTopic(userInfor?.last_project_active, id)
      if(delTop){
        const newListTopic = [...replyTopics || []]
        const findIndexTopicByIdDel = newListTopic.findIndex((item) => item._id === id)
        if(findIndexTopicByIdDel >= 0){
          newListTopic.splice(findIndexTopicByIdDel, 1)
          dispatch(setReplyTopics(newListTopic))
        }
        message.success('Xoá chủ đề thành công')
      }
    } catch (e) {
      message.error('Xoá chủ đề thất bại')
    }

  }


  return (
    <>
      <ItemContent
        childContent={generateListTopic()}
        iconTitle={<IconTopic/>}
        iconExtra={<div className={`cursor-pointer`} onClick={() => setOpenModalAdd(true)}>
          <IconPlus/>
        </div>}
        title={'Chủ đề'}
      />
      <Suspense>
        <ModalAddNewTopic
          open={openModalAdd}
          handleClose={() => setOpenModalAdd(false)}
          handleConfirm={(name: string, color: string, _id: string) => handleCreateTopic(name, color, _id)}
        />
      </Suspense>
    </>
  )
}

const ModalAddNewTopic = lazy(() => import('../topic/ModalAddNewTopic'))