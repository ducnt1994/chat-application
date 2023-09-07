import ListItemConversation from "./ListItemConversation";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store";
import {Spin} from "antd";

export default function ListConversations() {
  // eslint-disable-next-line
  const {conversations, isLoadingConversations} = useSelector((state : RootState) => state.conversation)
  return (
    <div className={`overflow-y-scroll h-list-conversation`}>
      {
        isLoadingConversations && <div className={`flex items-center h-full justify-center`}>
          <Spin size="large">
          </Spin>
        </div>
      }
      {
        !isLoadingConversations && conversations.length === 0 && <>Không có cuộc hội thoại nào</>
      }
      {
        !isLoadingConversations && conversations.length > 0 && conversations.map((conv, key) => {
          return <ListItemConversation key={key} conversationItem={conv}/>
        })
      }

    </div>
  )
}