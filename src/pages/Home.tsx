import {Filter} from "../components/home/Filter";
import Conversation from "../components/home/Conversation";
import Cookies from "js-cookie";

export default function Home() {
  const data = Cookies.get('accessToken');
  console.log(data)
  return (
    <div className={`flex max-h-max-screen h-max-screen`}>
      <Filter />
      <Conversation/>
    </div>
  )
}