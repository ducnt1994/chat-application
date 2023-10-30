import Header from "./Header";
import ConversationContent from "./ConversationContent";
import CreateChat from "./CreateChat";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store";
import {useEffect, useState} from "react";
import {IConversationItemLoaded} from "../../../dto";
import {loadListReplySample, loadListTopic} from "../../../api/conversationScript";
import {setReplySamples, setReplyTopics} from "../../../reducers/conversationScriptSlice";
import {getUserInfor} from "../../../helper/common";

export default function MidConversation() {
  const {activeConversationId, conversationListLoaded} = useSelector((state : RootState) => state.conversation)
  const [activeItem, setActiveItem] = useState<IConversationItemLoaded>()
  const dispatch = useDispatch()
  const {replySamples, replyTopics} = useSelector((state : RootState) => state.conversationScript)

  const getListRepSample = async () => {
    if(!replySamples){
      try {
        const listReply = await loadListReplySample(getUserInfor()?.last_project_active as string);
        dispatch(setReplySamples(listReply))
      } catch (e) {
        dispatch(setReplySamples(undefined))
      }
    }
  }

  const getListTopic = async () => {
    if(!replyTopics){
      try {
        const listTopic = await loadListTopic(getUserInfor()?.last_project_active as string);
        dispatch(setReplyTopics(listTopic))
      } catch (e) {
        dispatch(setReplyTopics(undefined))
      }
    }

  }

  useEffect(() => {
    getListRepSample()
    getListTopic()
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const checkItemLoaded = conversationListLoaded.find(item => item.conversationId === activeConversationId);
    setActiveItem(checkItemLoaded);
  }, [ activeConversationId, conversationListLoaded ])

  return (
    <div className={'w-[60%] bg-empty-bg flex flex-col'}>
      <Header conversationItem={activeItem}/>
      <ConversationContent conversationItem={activeItem}/>
      <CreateChat conversationItem={activeItem}/>
    </div>
  )
}