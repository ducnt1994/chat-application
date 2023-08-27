import LeftConversation from "../LeftConversation";
import MidConversation from "../MidConversation";
import RightConversation from "../RightConversation";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";

export default function Conversation() {
  const {activeConversationId} = useSelector((state : RootState) => state.conversation)
  return (
    <div className={`flex w-full h-max-screen max-h-max-screen`}>
      <LeftConversation />
      {
        activeConversationId ? (
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