import NavItem from "../components/navbar/NavItem";
import IconSetting from "../components/icons/IconSetting";
import IconAnalyst from "../components/icons/IconAnalyst";
import CountMessage from "../components/shared/CountMessage";
export default function Header() {
    return (
        <div className={`bg-header flex fixed top-0 w-full`} style={{height: "55px"}}>
          <div className={`w-[224px] flex items-center cursor-pointer`}>
            <img width={141} alt={''} src={'/chat/logo.png'}/>
          </div>
          <NavItem preIcon={<CountMessage total={2}/>} title={"Hội thoại"}/>
          <NavItem preIcon={<IconAnalyst/>} title={"Thống kê"}/>
          <NavItem preIcon={<IconSetting/>} title={"Cài đặt"}/>
        </div>
    )
}
