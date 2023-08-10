import NavItem from "../components/navbar/NavItem";
import IconSetting from "../components/icons/IconSetting";
import IconAnalyst from "../components/icons/IconAnalyst";
import CountMessage from "../components/shared/CountMessage";
export default function Header() {
    return (
        <div className={`bg-header flex fixed top-0 w-full`} style={{height: "64px"}}>
          <div className={`w-[224px]`}></div>
          <NavItem preIcon={<CountMessage total={2}/>} title={"Hội thoại"}/>
          <NavItem preIcon={<IconAnalyst/>} title={"Thống kê"}/>
          <NavItem preIcon={<IconSetting/>} title={"Cài đặt"}/>
        </div>
    )
}
