import ListItemConversation from "./ListItemConversation";

export default function ListConversations() {
  return (
    <div className={`overflow-y-scroll h-list-conversation`}>
      <ListItemConversation/>
      <ListItemConversation/>
      <ListItemConversation/>
    </div>
  )
}