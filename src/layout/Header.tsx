import NavItem from "../components/navbar/NavItem";
import IconSetting from "../components/icons/IconSetting";
import IconAnalyst from "../components/icons/IconAnalyst";
export default function Header() {
    return (
        <div className={`bg-header flex fixed top-0 w-full`} style={{height: "64px"}}>
          <div className={`w-[224px]`}></div>
          <NavItem preIcon={<TotalConversation/>} title={"Hội thoại"}/>
          <NavItem preIcon={<IconAnalyst/>} title={"Thống kê"}/>
          <NavItem preIcon={<IconSetting/>} title={"Cài đặt"}/>
        </div>
    )
}

export function TotalConversation() {
  return (
    <div className={`relative`}>
      <div className={`absolute text-[10px] text-white top-1/2 left-1/2 transform: -translate-x-1/2 transform: -translate-y-1/2`}>2</div>
      <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="8.5" cy="8.5" r="8" fill="#EB5757" stroke="white"/>
      </svg>
    </div>
  )
}