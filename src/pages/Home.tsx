import {Filter} from "../components/home/Filter";
import Conversation from "../components/home/Conversation";

export default function Home() {
  return (
    <div className={`flex max-h-max-screen h-max-screen`}>
      <Filter />
      <Conversation/>
    </div>
  )
}