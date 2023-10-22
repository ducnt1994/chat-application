import IconLike from "../../../../assets/svg/MidConversation/ItemChat/IconLike";
import IconDetele from "../../../../assets/svg/MidConversation/ItemChat/IconDetele";
import Avatar from "../../../shared/Avatar";
import {IHistoryChat, IMediaItem} from "../../../../dto/conversation-list/response/history-chat";
import {Image} from "antd";
import {CONVERSATION_FROM_CUSTOMER} from "../../../../utils/constants/customer";
import {IMAGE_ERROR} from "../../../../utils/constants/conversation";


export default function ItemConversationContent({position = 'left', historyItem} : {
  position: 'left' | 'right'
  historyItem: IHistoryChat
}) {
  function getItemSide(){
    return historyItem.from_customer === CONVERSATION_FROM_CUSTOMER ? 'left' : 'right'
  }

  return (
    <div className={`flex gap-3 ${position === 'left' ? "" : 'flex-row-reverse items-end'} mt-1`}>
      {
        historyItem.from_customer === CONVERSATION_FROM_CUSTOMER && <Avatar size={getItemSide() === 'left' ? 42 : 24} url={historyItem?.sender?.avatar || ""}/>
      }
      <div className={`flex-1 ${position === 'left' ? '' : 'flex justify-end'}`}>
        <div>
          <div className={`max-w-[430px] py-1 px-2 bg-white rounded-md relative text-left w-fit ${position === 'left' ? '' : 'bg-[#FFF6DE]'}`}>
            <div className={`text-[13px] whitespace-pre-line break-words`} dangerouslySetInnerHTML={{__html: historyItem.content}}></div>
            {
              typeof historyItem?.media !== "undefined" && <div className={`flex flex-wrap gap-2 rounded-md`}>
                {
                  typeof  historyItem?.media !== "undefined" && (historyItem?.media as IMediaItem[]).length > 0 && (historyItem?.media as IMediaItem[]).map((image, index) => {
                    return <Image
                      key={index}
                      className={`max-w-[128px] max-h-[128px] object-contain flex`}
                      alt={'avatar'}
                      style={{
                        display: 'flex'
                      }}
                      fallback={IMAGE_ERROR}
                      src={image.url}/>
                  })
                }

              </div>
            }

            {/*<div className={`mt-3 flex gap-3 justify-end`}>*/}
            {/*  <div className={'cursor-pointer'}><IconLike/></div>*/}
            {/*  {*/}
            {/*    historyItem.from_customer === CONVERSATION_FROM_CUSTOMER && <div className={'cursor-pointer'}><img alt={''} src={'/icon-fb-chat.png'}/></div>*/}
            {/*  }*/}
            {/*  {*/}
            {/*    historyItem.from_customer !== CONVERSATION_FROM_CUSTOMER && <div className={'cursor-pointer'}><IconDetele/></div>*/}
            {/*  }*/}
            {/*</div>*/}
          </div>
          {
            typeof historyItem.is_sending_message && historyItem.is_sending_message && <div className={`text-[10px] text-right text-gray-400`}>Đang gửi...</div>
          }
        </div>
      </div>
    </div>
  )
}