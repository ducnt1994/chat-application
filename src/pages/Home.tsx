import Filter from "../components/home/Filter";
import Conversation from "../components/home/Conversation";
import Cookies from "js-cookie";
import {getConversations} from "../api/conversation";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {IConversationItem} from "../dto";
import { setConversationList} from "../reducers/conversationSlice";
import {RootState} from "../store";
import {alertToast} from "../helper/toast";
import {message} from "antd";

export default function Home() {
  const dispatch = useDispatch()
  const {conversationPage, filters, searchText} = useSelector((state : RootState) => state.conversation)
  const userInfor = JSON.parse(Cookies.get('userInfor') || "{}")
  const fetchConversation = async () => {
    try {
      const conversations : IConversationItem[] = await getConversations({
        project_id: userInfor?.last_project_active || "",
        page: conversationPage,
        filter: filters,
        ...(searchText && {search: searchText})
      });
      dispatch(setConversationList(conversations))
    } catch (e) {
      // alertToast({
      //   title: 'Lỗi!!',
      //   message: "Đã có lỗi xảy ra khi tải các đoạn hội thoại. Vui lòng thử lại sau.",
      //   type: 'error'
      // })
      message.error('Đã có lỗi xảy ra khi tải các đoạn hội thoại. Vui lòng thử lại sau.');
    }
    
  }

  useEffect(() => {
    fetchConversation()
    // eslint-disable-next-line
  }, [filters, searchText])


  return (
    <div className={`flex max-h-max-screen h-max-screen`}>
      <Filter />
      <Conversation/>
    </div>
  )
}