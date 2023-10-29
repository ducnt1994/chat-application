import {IReplyTopicItem} from "../../../dto/reply-topic";
import {Popover} from "antd";
import styles from './custom.module.scss'
import {IconTrash} from "../../../assets/svg/ConversationScript/IconConersationScript";

export default function ItemTopic({item, handleDelTopic} : {
  item: IReplyTopicItem
  handleDelTopic: (id: string) => void
}) {

  const genIconDel = () => {
    return <div className={`cursor-pointer`} onClick={() => handleDelTopic(item._id)}>
      <IconTrash/>
    </div>
  }

  return (
    <Popover placement={'right'} title={genIconDel} overlayClassName={`${styles.PopoverCustom}`}>
      <div className={`flex items-center mr-7`}>
        <div className={`w-16 h-8 border border-gray-100 rounded-l-lg`} style={{backgroundColor: `${item.color}`}}></div>
        <div className={`text-base border border-gray-100 flex-1 h-8 flex items-center pl-2 border-l-0 rounded-r-lg`}>{item.name}</div>
      </div>
    </Popover>

  )
}