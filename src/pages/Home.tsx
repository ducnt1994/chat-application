import {Filter} from "../components/home/Filter";
import Conversation from "../components/home/Conversation";
import Cookies from "js-cookie";
import {getConversations} from "../api/conversation";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {IConversationItem} from "../dto";
import {setConversationList} from "../reducers/conversationSlice";

export default function Home() {
  const dispatch = useDispatch()
  const userInfor = JSON.parse(Cookies.get('userInfor') || "{}")
  const fetchConversation = async () => {
    const conversations : IConversationItem[] = await getConversations({
      project_id: userInfor?.last_project_active || "",
      page: 1
    });
    dispatch(setConversationList(conversations))
  }

  useEffect(() => {
    fetchConversation()
    // eslint-disable-next-line
  }, [])


  return (
    <div className={`flex max-h-max-screen h-max-screen`}>
      <Filter />
      <Conversation/>
    </div>
  )
}