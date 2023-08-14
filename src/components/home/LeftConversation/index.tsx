import Header from "./Header";
import ListConversations from "./ListConversations";

export default function LeftConversation() {
  return (
    <div className={'w-[25%] min-w-[300px]'}>
      <Header/>
      <ListConversations/>
    </div>
  )
}