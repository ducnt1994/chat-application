import Avatar from "../../shared/Avatar";
import {Typography} from "antd";
import IconPhone from "../../../assets/svg/RightConversation/IconPhone";
// import IconComment from "../../../assets/svg/RightConversation/IconComment";
// import IconTicket from "../../../assets/svg/RightConversation/IconTicket";
import {IConversationItemLoaded} from "../../../dto";
import Notes from "./components/notes/Notes";

export default function TabInformation({conversationItem} : {
  conversationItem: IConversationItemLoaded | undefined
}) {
  return (
    <div>
      <div className={`p-3 bg-[#FAFAFA]`}>
        <div className={`flex gap-2 items-center`}>
          <Avatar size={32} url={conversationItem?.info.customer_info.avatar || ''}/>
          <Typography className={`text-sm font-bold`}> {conversationItem?.info.customer_info.name} </Typography>
        </div>
        <div className={`mt-2 flex gap-3`}>
          {
            typeof conversationItem?.customerInfor?.phones !== 'undefined' &&
            conversationItem?.customerInfor?.phones.length > 0 && <div className={`cursor-pointer flex items-center gap-1`}>
              <div className={`flex items-center mt-[1px]`}>
                <IconPhone/>
              </div>
              <div className={`px-1 text-white bg-brand-secondary rounded-xl text-[10px]`}>{conversationItem?.customerInfor?.phones[0]}</div>
            </div>
          }

          {/*<div className={`flex gap-[2px] items-center`}>*/}
          {/*  <IconComment/> 2*/}
          {/*</div>*/}
          {/*<div className={`flex gap-[2px] items-center`}>*/}
          {/*  <IconTicket/> 1*/}
          {/*</div>*/}
        </div>
      </div>
      <Notes conversationItemLoaded={conversationItem}/>
    </div>
  )
}