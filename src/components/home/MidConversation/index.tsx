import Header from "./Header";
import ConversationContent from "./ConversationContent";
import CreateChat from "./CreateChat";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import {useEffect, useState} from "react";
import {IConversationItemLoaded} from "../../../dto";

export default function MidConversation() {
  const {activeConversationId, conversationListLoaded} = useSelector((state : RootState) => state.conversation)
  const [activeItem, setActiveItem] = useState<IConversationItemLoaded>()

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