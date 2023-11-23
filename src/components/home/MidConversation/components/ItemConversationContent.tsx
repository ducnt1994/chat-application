// import IconLike from "../../../../assets/svg/MidConversation/ItemChat/IconLike";
// import IconDetele from "../../../../assets/svg/MidConversation/ItemChat/IconDetele";
import Avatar from "../../../shared/Avatar";
import {IHistoryChat, IMediaItem} from "../../../../dto/conversation-list/response/history-chat";
import {Image, Tooltip} from "antd";
import {CONVERSATION_FROM_CUSTOMER} from "../../../../utils/constants/customer";
import {IMAGE_ERROR} from "../../../../utils/constants/conversation";
import styles from "./custom.module.scss"
import {MEDIA_TYPE_FILE_IMAGE, MEDIA_TYPE_FILE_VIDEO} from "../../../../utils/constants/medias";


export default function ItemConversationContent({position = 'left', historyItem, isSameSender} : {
  position: 'left' | 'right'
  historyItem: IHistoryChat
  isSameSender?: boolean
}) {
  function getItemSide(){
    return historyItem.from_customer === CONVERSATION_FROM_CUSTOMER ? 'left' : 'right'
  }
  return (
    <div className={`flex gap-2 ${position === 'left' ? "" : 'flex-row-reverse items-end'} mt-1`}>
      {
        historyItem.from_customer === CONVERSATION_FROM_CUSTOMER && <Tooltip placement={'top'} title={isSameSender ? '' : historyItem?.sender?.name} trigger={'hover'}>
          <div><Avatar hidden={isSameSender} size={getItemSide() === 'left' ? 35 : 24} url={historyItem?.sender?.avatar || ""}/></div>
        </Tooltip>
      }
      <div className={`flex-1 ${position === 'left' ? '' : 'flex justify-end'}`}>
        <div>
          <div className={`max-w-[430px] py-1 px-2 bg-white rounded-md relative text-left w-fit`} style={{background: position === 'left' ? '' : '#FFF6DE'}}>
            <div className={`text-[13px] whitespace-pre-line ${historyItem.content ? 'mb-2' : ''} break-words`} dangerouslySetInnerHTML={{__html: historyItem.content}}></div>
            {
              typeof historyItem?.media !== "undefined" && <div className={`flex flex-wrap gap-2 rounded-md`}>
                {
                  typeof  historyItem?.media !== "undefined" && (historyItem?.media as IMediaItem[]).length > 0 && (historyItem?.media as IMediaItem[]).map((image, index) => {
                    return <div className={`${styles.PopoverCustom} border border-gray-200 rounded-lg`} key={index}>
                      {
                        image.type === MEDIA_TYPE_FILE_IMAGE && <Image
                          key={index}
                          className={`max-w-[128px] max-h-[128px] object-contain flex`}
                          alt={'avatar'}
                          style={{
                            display: 'flex'
                          }}
                          fallback={IMAGE_ERROR}
                          src={image.url}/>
                      }
                      {
                        image.type === MEDIA_TYPE_FILE_VIDEO && <div className={`max-w-[150px]`}>
                          <video width="400" controls>
                            <source src={image.url} type={'video/mp4'}/>
                            Your browser does not support HTML5 video.
                          </video>
                        </div>
                      }
                    </div>
                  })
                }

              </div>
            }

            {
              typeof historyItem.extra_info_chat_content !== 'undefined' && historyItem.extra_info_chat_content.length > 0 && <div className={`flex flex-col gap-2 my-2`}>
                {
                  historyItem.extra_info_chat_content.map((itemEx, keyEx) => {
                    return <div key={keyEx} className={`border-2 shadow-gray-200 border-gray-100 rounded-lg p-2 bg-white`}>
                      <a className={`text-blue-500 text-sm`} rel={'noreferrer'} target={'_blank'} href={itemEx.url}>
                        {itemEx.title}
                      </a>
                    </div>
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