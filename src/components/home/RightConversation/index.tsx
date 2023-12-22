import { Tabs } from 'antd';
import IconLead from "../../../assets/svg/RightConversation/IconLead";
import {useEffect, useState} from "react";
import styles from "./index.module.scss"
import TabInformation from "./TabInformation";
import {IConversationItemLoaded} from "../../../dto";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
export default function RightConversation() {
  const {activeConversationId, conversationListLoaded} = useSelector((state : RootState) => state.conversation)
  const [activeTab, setActiveTab] = useState<string>('1')
  const [activeItem, setActiveItem] = useState<IConversationItemLoaded>()
  const items = [
    {
      key: '1',
      label: <div className={`items-center text-xs ${activeTab === '1' ? 'font-semibold text-gray-900' : 'text-gray-500'}`}><div>Thông tin</div></div>,
      children: <TabInformation conversationItem={activeItem}/>,
    },
    {
      key: '2',
      label: <div className={`flex gap-1 items-center text-xs ${activeTab === '2' ? 'font-semibold text-gray-900' : 'text-gray-500'}`}><div className={`flex items-center`}><IconLead active={activeTab === '2'}/></div><div>Tạo lead</div></div>,
      children: ``,
    },
  ];
  const onChange = (activeKey : string) => {
    setActiveTab(activeKey)
  }

  useEffect(() => {
    const checkItemLoaded = conversationListLoaded.find(item => item.conversationId === activeConversationId);
    setActiveItem(checkItemLoaded);
  }, [ activeConversationId, conversationListLoaded ])

  return (
    <div className={'lg:w-[20%] w-0 hidden lg:block'}>
      <Tabs className={`${styles.tabCustom}`}
            defaultActiveKey={activeTab}
            items={items}
            onChange={onChange} />
    </div>
  )
}