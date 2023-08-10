import LeftConversation from "../LeftConversation";
import MidConversation from "../MidConversation";
import RightConversation from "../RightConversation";

export default function Conversation() {
  return (
    <div className={`flex w-full h-max-screen max-h-max-screen`}>
      <LeftConversation />
      {
        true ? (
          <>
            <MidConversation />
            <RightConversation />
          </>
        ) : (
          <div className={`bg-empty-bg w-full flex justify-center items-center`}>
            <img width={330} height={102} alt={'empty'} src={'/empty-active-conversation.png'}/>
          </div>
        )
      }

    </div>
  )
}