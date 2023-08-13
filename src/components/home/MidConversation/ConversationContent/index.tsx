import PostContent from "./PostContent";
import ChatContent from "./ChatContent";

export default function ConversationContent() {
  return (
    <div className={`overflow-y-scroll bg-empty-bg p-4`}>
      <PostContent/>
      <ChatContent/>
    </div>
  )
}