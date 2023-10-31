import NavItem from "../components/navbar/NavItem";
import IconSetting from "../components/icons/IconSetting";
import IconAnalyst from "../components/icons/IconAnalyst";
import CountMessage from "../components/shared/CountMessage";
import {useNavigate} from "react-router-dom";
export default function Header() {
  const navigate = useNavigate()
  const headerList = [
    {
      id: 1,
      path: '/',
      name: 'Hội thoại',
      preIcon: <CountMessage total={2}/>
    },
    {
      id: 2,
      path: '/analyst',
      name: 'Thống kê',
      preIcon: <IconAnalyst/>
    },
    {
      id: 3,
      path: '/setting/conversation-script',
      name: 'Cài đặt',
      preIcon: <IconSetting/>
    }
  ];
    return (
        <div className={`bg-header flex fixed top-0 w-full`} style={{height: "55px"}}>
          <div className={`w-[224px] flex items-center cursor-pointer`} onClick={() => navigate('/')}>
            <img width={141} alt={''} src={'/chat/logo.png'}/>
          </div>
          {
            headerList.map((item, key) => {
              return <NavItem key={key} path={item.path} preIcon={item.preIcon} title={item.name}/>
            })
          }
        </div>
    )
}
