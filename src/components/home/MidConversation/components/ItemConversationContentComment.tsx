import IconLike from "../../../../assets/svg/MidConversation/ItemChat/IconLike";
import IconHideComment from "../../../../assets/svg/MidConversation/ItemChat/IconHideComment";
import IconComment from "../../../../assets/svg/MidConversation/ItemChat/IconComment";
import IconDetele from "../../../../assets/svg/MidConversation/ItemChat/IconDetele";
import Avatar from "../../../shared/Avatar";
import {IHistoryChat, IMediaItem} from "../../../../dto/conversation-list/response/history-chat";
import {Image, Checkbox, Typography, Popover, Tooltip, message} from "antd";
import {
  CONVERSATION_IS_DELETE,
  CONVERSATION_IS_HIDE,
  CONVERSATION_IS_LIKE, CONVERSATION_IS_NOT_DELETE,
  CONVERSATION_IS_NOT_HIDE,
  CONVERSATION_IS_NOT_LIKE,
  IMAGE_ERROR
} from "../../../../utils/constants/conversation";
import {getRandomColor} from "../../../../helper/color";
import {CONVERSATION_FROM_CUSTOMER} from "../../../../utils/constants/customer";
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store";
import {actionToComment, setCommentToReply} from "../../../../reducers/conversationSlice";
import {useMemo} from "react";
import styles from "./custom.module.scss"
import {MEDIA_TYPE_FILE_IMAGE} from "../../../../utils/constants/medias";
import {deleteCommentFacebook, hideCommentFacebook, likeCommentFacebook} from "../../../../api/conversation";
import {getUserInfor} from "../../../../helper/common";


export default function ItemConversationContentComment({historyItem} : {
  historyItem: IHistoryChat
}) {
  const colorForItem = useMemo(() => {
    return getRandomColor()
  },[])

  return (
    <>
      <ItemRender historyItem={historyItem} borderColorItem={colorForItem}/>
      {
        typeof historyItem.children !== "undefined" && historyItem.children.map((item, key) => {
          return <ItemRender
            historyItem={item}
            isChild={true}
            key={key}
            parentId={historyItem._id}
            borderColorItem={colorForItem}
          />
        })
      }
    </>
  )
}

export const ItemRender = ({historyItem, borderColorItem, isChild = false, parentId} : {
  historyItem: IHistoryChat
  borderColorItem: string
  isChild?: boolean
  parentId?: string
}) => {
  const {selectedCommentIdToReply} = useSelector((state : RootState) => state.conversation)
  const dispatch = useDispatch()
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
  
  const likeComment = async () => {
    if(typeof historyItem.is_like === 'undefined' || historyItem.is_like === CONVERSATION_IS_NOT_LIKE){
      dispatch(actionToComment({
        parentId: isChild && parentId ? parentId : historyItem._id,
        isChild: isChild,
        childId: historyItem.id || "",
        conversationId: historyItem.conversation_id,
        field: {
          key: 'is_like',
          value: CONVERSATION_IS_LIKE
        }
      }))
      try {
        const response = await likeCommentFacebook(getUserInfor().last_project_active, historyItem.channel, {social_network_id: historyItem.social_network_id})
        if(!response){
          dispatch(actionToComment({
            parentId: isChild && parentId ? parentId : historyItem._id,
            childId: historyItem.id || "",
            conversationId: historyItem.conversation_id,
            isChild: isChild,
            field: {
              key: 'is_like',
              value: CONVERSATION_IS_NOT_LIKE
            }
          }))
        }
      } catch (e) {
        message.error('Không thể thực hiện tác vụ. Vui lòng thử lại sau')
      }
    }
  }
  //
  const hideComment = async () => {
    if(typeof historyItem.is_like === 'undefined' || historyItem.is_hide === CONVERSATION_IS_NOT_HIDE){
      dispatch(actionToComment({
        parentId: isChild && parentId ? parentId : historyItem._id,
        isChild: isChild,
        childId: historyItem.id || "",
        conversationId: historyItem.conversation_id,
        field: {
          key: 'is_hide',
          value: CONVERSATION_IS_HIDE
        }
      }))
      try {
        const response = await hideCommentFacebook(getUserInfor().last_project_active, historyItem.channel, {social_network_id: historyItem.social_network_id})
        if(!response){
          dispatch(actionToComment({
            parentId: isChild && parentId ? parentId : historyItem._id,
            isChild: isChild,
            childId: historyItem.id || "",
            conversationId: historyItem.conversation_id,
            field: {
              key: 'is_hide',
              value: CONVERSATION_IS_NOT_HIDE
            }
          }))
        }
      } catch (e) {
        message.error('Không thể thực hiện tác vụ. Vui lòng thử lại sau')
      }
    }
  }

  const deleteComment = async () => {
    if(typeof historyItem.is_delete === 'undefined' || historyItem.is_delete === CONVERSATION_IS_NOT_DELETE){
      dispatch(actionToComment({
        parentId: isChild && parentId ? parentId : historyItem._id,
        isChild: isChild,
        childId: historyItem.id || "",
        conversationId: historyItem.conversation_id,
        field: {
          key: 'is_delete',
          value: CONVERSATION_IS_DELETE
        }
      }))
      try {
        const response = await deleteCommentFacebook(getUserInfor().last_project_active, historyItem.channel, {social_network_id: historyItem.social_network_id})
        if(!response){
          dispatch(actionToComment({
            parentId: isChild && parentId ? parentId : historyItem._id,
            isChild: isChild,
            childId: historyItem.id || "",
            conversationId: historyItem.conversation_id,
            field: {
              key: 'is_hide',
              value: CONVERSATION_IS_NOT_DELETE
            }
          }))
        }
      } catch (e) {
        message.error('Không thể thực hiện tác vụ. Vui lòng thử lại sau')
      }
    }
  }

  const handleSelectCommentToReply = () => {
    const idToSet = historyItem.social_network_id !== selectedCommentIdToReply ? historyItem.social_network_id : ""
    dispatch(setCommentToReply(idToSet))
  }
  
  const hoverItem = () => {
    return <div className={`text-left bg-transparent`}>
      <div className={`text-xs font-bold text-gray-400`}>{historyItem.sender.name}</div>
      <div className={`text-xs text-gray-400`}>{moment(historyItem.time_created_at).format('HH:mm DD/MM/YYYY')}</div>
      {
        historyItem.from_customer === CONVERSATION_FROM_CUSTOMER && <div className={`flex gap-1 items-center cursor-pointer`} onClick={() => handleSelectCommentToReply()}>
          <Checkbox
            style={{transform: 'scale(0.7)'}}
            checked={selectedCommentIdToReply === historyItem.social_network_id}
            onChange={() => handleSelectCommentToReply()}></Checkbox>
          <Typography className={`text-[12px] text-red-500`}>Chọn trả lời</Typography>
        </div>
      }

    </div>
  }

  return (
    <div className={`flex gap-3 ${getItemSide() === 'left' ? "" : 'flex-row-reverse items-end'} mt-4`}>
      {
        historyItem.from_customer === CONVERSATION_FROM_CUSTOMER && <Tooltip placement={'top'} title={historyItem?.sender?.name} trigger={'hover'}>
          <div><Avatar size={getItemSide() === 'left' ? 42 : 24} url={historyItem.sender.avatar || ""}/></div>
        </Tooltip>
      }
      <div className={`${getItemSide() === 'left' ? '' : 'flex justify-end'}`}>
        <Popover
          overlayClassName={`${styles.PopoverCustom}`}
          trigger={'hover'}
          placement={historyItem.from_customer === CONVERSATION_FROM_CUSTOMER ? 'rightTop' : 'leftTop'}
          content={hoverItem}>
          <div
            style={{borderColor: borderColorItem, background: historyItem.from_customer === CONVERSATION_FROM_CUSTOMER ? 'white' : '#FFF6DE'}}
            className={`max-w-[430px] border-l-4 py-1 px-2 bg-white rounded-md relative text-left w-fit`} >
            <div className={`text-[13px] whitespace-pre-line break-words`} dangerouslySetInnerHTML={{__html: historyItem.content}}></div>
            {
              typeof historyItem?.media !== "undefined" && historyItem?.media && <div className={`grid grid-cols-${generateColGridMedia()} gap-2 rounded-md mt-2`}>
                {
                  typeof  historyItem?.media !== "undefined" && <div className={`${styles.PopoverCustom}`}><Image
                    className={`max-w-[128px] max-h-[128px]`}
                    alt={'avatar'}
                    fallback={IMAGE_ERROR}
                    src={(historyItem?.media as IMediaItem)?.type === MEDIA_TYPE_FILE_IMAGE ? (historyItem?.media as IMediaItem).url : (historyItem?.media as IMediaItem).thumb}/></div>
                }

              </div>
            }

            <div className={`mt-2 flex gap-3 justify-end`}>
              {
                typeof historyItem.is_like !== 'undefined'
                && <Tooltip placement={'top'}
                            overlayInnerStyle={{
                              padding: '2px 4px',
                              minHeight: 'fit-content',
                              fontSize: '10px'
                }} title={'Thích bình luận'} trigger={'hover'}>
                  <div className={'cursor-pointer'} onClick={likeComment}>
                    <IconLike active={historyItem.is_like === 1}/>
                  </div>
                </Tooltip>
              }
              {
                typeof historyItem.is_hide !== 'undefined'
                && <Tooltip placement={'top'}
                            overlayInnerStyle={{
                              padding: '2px 4px',
                              minHeight: 'fit-content',
                              fontSize: '10px'
                            }} title={'Ẩn bình luận'} trigger={'hover'}>
                  <div onClick={hideComment} className={'cursor-pointer'}><IconHideComment active={historyItem.is_hide === 1}/></div>
                </Tooltip>
              }
              {
                historyItem.from_customer === CONVERSATION_FROM_CUSTOMER && typeof historyItem.is_reply !== 'undefined' &&
                <Tooltip placement={'top'}
                         overlayInnerStyle={{
                           padding: '2px 4px',
                           minHeight: 'fit-content',
                           fontSize: '10px'
                         }} title={'Gửi tin nhắn riêng'} trigger={'hover'}>
                  <div className={'cursor-pointer'}><IconComment active={ historyItem.is_reply === 1}/></div>
                </Tooltip>
              }
              {
                typeof historyItem.is_reply !== 'undefined'
                && <Tooltip placement={'top'}
                            overlayInnerStyle={{
                              padding: '2px 4px',
                              minHeight: 'fit-content',
                              fontSize: '10px'
                            }} title={'Xem bình luận trên fb'} trigger={'hover'}>
                  <div className={'cursor-pointer'} onClick={handleOpenComment}><img alt={''} src={'/icon-fb-chat.png'}/></div>
                </Tooltip>
              }
              {
                 <Tooltip placement={'top'}
                            overlayInnerStyle={{
                              padding: '2px 4px',
                              minHeight: 'fit-content',
                              fontSize: '10px'
                            }} title={'Xoá bình luận'} trigger={'hover'}>
                  <div onClick={deleteComment} className={'cursor-pointer'}><IconDetele active={historyItem.is_delete === 1}/></div>
                </Tooltip>
              }
            </div>
          </div>
          {
            typeof historyItem.is_sending_message && historyItem.is_sending_message && <div className={`text-[10px] text-right text-gray-400`}>Đang gửi...</div>
          }
        </Popover>
      </div>
      {/*{*/}
      {/*  getItemSide() === 'left' && */}
      {/*}*/}
    </div>
  )
}