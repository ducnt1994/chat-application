import Header from "./Header";
import ConversationContent from "./ConversationContent";
import CreateChat from "./CreateChat";

export default function MidConversation() {
  return (
    <div className={'w-[52%] bg-red-400 flex flex-col'}>
      <Header/>
      <ConversationContent/>
      <CreateChat/>
    </div>
  )
}