import IconLike from "../../../../assets/svg/MidConversation/ItemChat/IconLike";
import IconHideComment from "../../../../assets/svg/MidConversation/ItemChat/IconHideComment";
import IconComment from "../../../../assets/svg/MidConversation/ItemChat/IconComment";
import IconDetele from "../../../../assets/svg/MidConversation/ItemChat/IconDetele";
import Avatar from "../../../shared/Avatar";
import {IHistoryChat, IMediaItem} from "../../../../dto/conversation-list/response/history-chat";
import {Image, Checkbox, Typography} from "antd";
import {IMAGE_ERROR} from "../../../../utils/constants/conversation";
import {getRandomColor} from "../../../../helper/color";
import {CONVERSATION_FROM_CUSTOMER} from "../../../../utils/constants/customer";
import moment from "moment";
import type { CheckboxChangeEvent } from 'antd/es/checkbox';


export default function ItemConversationContentComment({historyItem} : {
  historyItem: IHistoryChat
}) {
  const colorForItem = getRandomColor();

  return (
    <>
      <ItemRender historyItem={historyItem} borderColorItem={colorForItem}/>
      {
        typeof historyItem.children !== "undefined" && historyItem.children.map((item, key) => {
          return <ItemRender historyItem={item} key={key} borderColorItem={colorForItem}/>
        })
      }
    </>
  )
}

export const ItemRender = ({historyItem, borderColorItem} : {
  historyItem: IHistoryChat
  borderColorItem: string
}) => {
  function getItemSide(){
    return historyItem.from_customer === CONVERSATION_FROM_CUSTOMER ? 'left' : 'right'
  }

  const handleOpenComment = () => {
    if(historyItem.social_network_id){
      window.open('https://facebook.com/' + historyItem.social_network_id, '_blank')
    }
  }
  function generateColGridMedia() {
    return 3
  }
  
  const likeComment = () => {

  }

  const hideComment = () => {

  }

  const deleteComment = () => {

  }

  const handleSelectCommentToReply = (e : CheckboxChangeEvent) => {
    console.log(historyItem._id)
  }

  return (
    <div className={`flex gap-3 ${getItemSide() === 'left' ? "" : 'flex-row-reverse items-end'} mt-4`}>
      <Avatar size={getItemSide() === 'left' ? 42 : 24} url={historyItem.sender.avatar || ""}/>
      <div className={` ${getItemSide() === 'left' ? '' : 'flex justify-end'}`}>
        <div
          style={{borderColor: borderColorItem}}
          className={`max-w-[430px] border-l-4 py-2 px-3 bg-white rounded-md relative text-left w-fit`}>
          <div className={`text-[13px] whitespace-pre-line break-words`} dangerouslySetInnerHTML={{__html: historyItem.content}}></div>
          {
            typeof historyItem?.media !== "undefined" && <div className={`grid grid-cols-${generateColGridMedia()} gap-2 rounded-md mt-2`}>
              {
                typeof  historyItem?.media !== "undefined" && <div><Image
                    className={`max-w-[128px] max-h-[128px]`}
                    alt={'avatar'}
                    fallback={IMAGE_ERROR}
                    src={(historyItem?.media as IMediaItem).url}/></div>
              }

            </div>
          }

          <div className={`mt-3 flex gap-3 justify-end`}>
            {
              typeof historyItem.is_like !== 'undefined' && <div className={'cursor-pointer'}><IconLike active={historyItem.is_like === 1}/></div>
            }
            {
              typeof historyItem.is_hide !== 'undefined' && <div className={'cursor-pointer'}><IconHideComment active={historyItem.is_hide === 1}/></div>
            }
            {
              historyItem.from_customer === CONVERSATION_FROM_CUSTOMER && typeof historyItem.is_reply !== 'undefined' &&
              <div className={'cursor-pointer'}><IconComment active={ historyItem.is_reply === 1}/></div>
            }
            {
              typeof historyItem.is_reply !== 'undefined' && <div className={'cursor-pointer'} onClick={handleOpenComment}><img alt={''} src={'/icon-fb-chat.png'}/></div>
            }
            {
              typeof historyItem.is_delete !== 'undefined' && <div className={'cursor-pointer'}><IconDetele active={historyItem.is_delete === 1}/></div>
            }
          </div>
        </div>
      </div>
      {
        getItemSide() === 'left' && <div className={`text-left`}>
          <div className={`text-xs font-bold text-gray-400`}>{historyItem.sender.name}</div>
          <div className={`text-xs text-gray-400`}>{moment(historyItem.time_created_at).format('HH:mm DD/MM/YYYY')}</div>
          <div className={`flex gap-1 items-center cursor-pointer`}>
            <Checkbox style={{transform: 'scale(0.7)'}} onChange={handleSelectCommentToReply}></Checkbox>
            <Typography className={`text-[12px] text-red-500`}>Chọn trả lời</Typography>
          </div>
        </div>
      }
    </div>
  )
}