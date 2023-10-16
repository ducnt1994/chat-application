import IconConversationScript from "../assets/svg/LeftMenuSetting/IconConversationScript";
import {useLocation, useNavigate} from "react-router-dom";

export default function LeftMenu() {
  const location = useLocation();
  const navigate = useNavigate()
  const listLeftMenu = [
    {
      id: 1,
      name: 'Quản lý câu trả lời mẫu',
      path: '/setting/conversation-script'
    }
  ]
  return (
    <div className={`w-[280px] h-max-screen bg-white pt-4`}>
      {
        listLeftMenu.map((item, key) => {
          return <div key={key} className={`flex ${location.pathname === item.path ? "bg-gray-100 font-medium" : ""} gap-2 items-center py-4 px-7 hover:bg-gray-100 hover:font-medium text-base cursor-pointer`}>
            <div className={`pt-1`}><IconConversationScript isActive={location.pathname === item.path}/></div>
            <div>{item.name}</div>
          </div>
        })
      }
    </div>
  )
}