import IconLike from "../../../../assets/svg/MidConversation/ItemChat/IconLike";
import IconDetele from "../../../../assets/svg/MidConversation/ItemChat/IconDetele";
import Avatar from "../../../shared/Avatar";
import {IHistoryChat} from "../../../../dto/conversation-list/response/history-chat";
import {Image} from "antd";
import {CONVERSATION_FROM_CUSTOMER} from "../../../../utils/constants/customer";
import {IMAGE_ERROR} from "../../../../utils/constants/conversation";


export default function ItemConversationContent({position = 'left', historyItem} : {
  position: 'left' | 'right'
  historyItem: IHistoryChat
}) {

  function generateColGridMedia() {
    const totalItem = historyItem?.media?.length || 0
    return totalItem > 3 ? 3 : totalItem
  }

  return (
    <div className={`flex gap-3 ${position === 'left' ? "" : 'flex-row-reverse'} mt-4`}>
      <Avatar size={50} url={historyItem?.sender?.avatar || ""}/>
      <div className={`flex-1 ${position === 'left' ? '' : 'flex justify-end'}`}>
        <div className={`max-w-[430px] py-2 px-3 bg-white rounded-md relative text-left w-fit`}>
          {/*triangle*/}
          {
            position === 'left' ? (
              <div className="w-3  overflow-hidden inline-block absolute -left-3">
                <div className=" h-4 bg-white -rotate-45 transform origin-top-right"></div>
              </div>
            ) : (
              <div className="w-3  overflow-hidden inline-block absolute -right-3">
                <div className=" h-4  bg-white rotate-45 transform origin-top-left"></div>
              </div>
            )
          }

          <div className={`text-[13px] whitespace-pre-line break-words`} dangerouslySetInnerHTML={{__html: historyItem.content}}></div>
          {
            typeof historyItem?.media !== "undefined" && <div className={`grid grid-cols-${generateColGridMedia()} gap-2 rounded-md`}>
              {
                typeof  historyItem?.media !== "undefined" && historyItem?.media.length > 0 && historyItem?.media.map((image, index) => {
                  return <Image
                    key={index}
                    className={`max-w-[128px] max-h-[128px]`}
                    alt={'avatar'}
                    fallback={IMAGE_ERROR}
                    src={image.url}/>
                })
              }

            </div>
          }

          <div className={`mt-3 flex gap-3 justify-end`}>
            <div className={'cursor-pointer'}><IconLike/></div>
            {/*<div className={'cursor-pointer'}><IconHideComment/></div>*/}
            {/*<div className={'cursor-pointer'}><IconComment/></div>*/}
            {
              historyItem.from_customer === CONVERSATION_FROM_CUSTOMER && <div className={'cursor-pointer'}><img alt={''} src={'/icon-fb-chat.png'}/></div>
            }
            {
              historyItem.from_customer !== CONVERSATION_FROM_CUSTOMER && <div className={'cursor-pointer'}><IconDetele/></div>
            }
          </div>
        </div>


      </div>

    </div>
  )
}