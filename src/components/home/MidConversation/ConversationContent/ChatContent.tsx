import ItemConversationContent from "../components/ItemConversationContent";

export default function ChatContent() {
  return (
    <div className={`mt-4`}>
      <ItemConversationContent position={'left'}/>
      <ItemConversationContent position={'right'}/>
    </div>
  )
}