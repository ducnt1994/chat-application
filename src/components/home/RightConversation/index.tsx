import { Tabs } from 'antd';
import IconLead from "../../../assets/svg/RightConversation/IconLead";
import {useState} from "react";
import styles from "./index.module.scss"
import TabInformation from "./TabInformation";
export default function RightConversation() {
  const [activeTab, setActiveTab] = useState<string>('1')
  const items = [
    {
      key: '1',
      label: <div className={`items-center text-xs ${activeTab === '1' ? 'font-semibold text-gray-900' : 'text-gray-500'}`}><div>Thông tin</div></div>,
      children: <TabInformation/>,
    },
    {
      key: '2',
      label: <div className={`flex gap-1 items-center text-xs ${activeTab === '2' ? 'font-semibold text-gray-900' : 'text-gray-500'}`}><div className={`flex items-center`}><IconLead active={activeTab === '2'}/></div><div>Tạo lead</div></div>,
      children: `Content of Tab Pane 2`,
    },
  ];
  const onChange = (activeKey : string) => {
    setActiveTab(activeKey)
  }
  return (
    <div className={'w-[20%]'}>
      <Tabs className={`${styles.tabCustom}`}
            defaultActiveKey={activeTab}
            items={items}
            onChange={onChange} />
    </div>
  )
}