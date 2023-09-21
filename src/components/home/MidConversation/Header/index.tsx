// import IconLocation from "../../../../assets/svg/MidConversation/IconLocation";
import IconEye from "../../../../assets/svg/MidConversation/IconEye";
import IconUser from "../../../../assets/svg/IconUser";
import IconUpload from "../../../../assets/svg/IconUpload";
import IconMail from "../../../../assets/svg/IconMail";
import IconRedirect from "../../../../assets/svg/IconRedirect";
// import IconBirthDay from "../../../../assets/svg/MidConversation/IconBirthDay";
// import IconFemale from "../../../../assets/svg/MidConversation/IconFemale";
import Avatar from "../../../shared/Avatar";
import {IConversationItemLoaded} from "../../../../dto";
import {Skeleton} from "antd";
import {CONVERSATION_NOT_FROM_CUSTOMER} from "../../../../utils/constants/customer";
import moment from "moment";
export default function Header({conversationItem} : {
  conversationItem: IConversationItemLoaded | undefined
}) {
  return (
    <>
      {
        !conversationItem ? ( <Skeleton active={true}/> ) : (
          <div className={`flex bg-white px-4 py-3`}>
            <div className={`flex gap-1 flex-1`}>
              <Avatar size={50} url={conversationItem.customerInfor?.avatar}/>
              <div className={`flex-1 flex flex-col`}>
                <div className={`flex gap-2`}>
                  <div className={`font-bold text-gray-900 text-sm`}> {conversationItem.customerInfor.name} </div>
                  {/*<div className={`flex items-center gap-1`}>*/}
                  {/*  <div><IconLocation/></div>*/}
                  {/*  <div className={`text-gray-500 text-xs`}>Phú thọ, Lạng Sơn, Việt Nam </div>*/}
                  {/*</div>*/}
                </div>

                {
                  conversationItem?.info?.last_user_care && <div className={`flex gap-1 items-center`}>
                    <div><IconEye/></div>
                    <div className={`text-gray-500 text-xs`}>Đã trả lời bởi {conversationItem.info.last_user_care.name} lúc {
                      conversationItem?.info?.last_chat?.from_customer === CONVERSATION_NOT_FROM_CUSTOMER && moment(conversationItem?.info?.last_chat?.created_at).format('HH:mm DD/MM/YYYY')}</div>
                  </div>
                }

                {/*<div className={`mt-1 flex gap-2`}>*/}
                {/*  <IconBirthDay/>*/}
                {/*  <IconFemale/>*/}
                {/*</div>*/}
              </div>
            </div>
            <div className={`flex gap-2 items-center`}>
              <div className={`p-1 bg-neutral-200 rounded-md cursor-pointer hover:bg-neutral-400`}><IconUser/></div>
              <div className={`p-1 bg-neutral-200 rounded-md cursor-pointer hover:bg-neutral-400`}><IconUpload/></div>
              <div className={`p-1 bg-neutral-200 rounded-md cursor-pointer hover:bg-neutral-400`}><IconMail/></div>
              <div className={`p-1 bg-neutral-200 rounded-md cursor-pointer hover:bg-neutral-400`}><IconRedirect/></div>
            </div>

          </div>
        )
      }
    </>

  )
}