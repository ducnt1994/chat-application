import LeftConversation from "../LeftConversation";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import {lazy, Suspense} from "react";

const MidConversation = lazy(() => import('../MidConversation'))
const RightConversation = lazy(() => import('../RightConversation'))

export default function Conversation() {
  const {activeConversationId} = useSelector((state : RootState) => state.conversation)
  return (
    <div className={`flex w-full h-max-screen max-h-max-screen`}>
      <LeftConversation />
      {
        activeConversationId ? (
          <>
            <Suspense>
              <MidConversation />
              <RightConversation />
            </Suspense>
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