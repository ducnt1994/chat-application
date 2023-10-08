import FilterItem from "./FilterItem";
import FilterAll from "../../../assets/svg/FilterAll";
import FilterNotRead from "../../../assets/svg/FilterNotRead";
import FilterComment from "../../../assets/svg/FilterComment";
import FilterMessage from "../../../assets/svg/FilterMessage";
import FilterPhone from "../../../assets/svg/FilterPhone";
import FilterNoPhone from "../../../assets/svg/FilterNoPhone";
import FilterNotReply from "../../../assets/svg/FilterNotReply";
import FilterDate from "../../../assets/svg/FilterDate";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {resetConversationByFilter, setFilters} from "../../../reducers/conversationSlice";
import {RootState} from "../../../store";
import {CONVERSATION_FILTER_COMMENT, CONVERSATION_FILTER_MESSAGE} from "../../../utils/constants/conversation";
import FilterDateRange from "./FilterDateRange";

interface IStatusFilter {
    all: boolean
    not_read: boolean
    comment: boolean
    message: boolean
    phone: boolean
    no_phone: boolean
    not_reply: boolean
}

export default function Filter() {
    const dispatch = useDispatch();
    const {filters} = useSelector((state : RootState) => state.conversation)
    const [statusFilters, setStatusFilter] = useState<IStatusFilter>({
        all: true,
        not_read: false,
        comment: false,
        message: false,
        phone: false,
        no_phone: false,
        not_reply: false
    })
    const handleClickFilterItem = (field: "not_reply" | "all" | "phone" | "no_phone" | "not_read" | "comment" | "message") => {
        dispatch(resetConversationByFilter())
        if(field === 'all'){
            dispatch(setFilters({}))
            setStatusFilter({
                all: true,
                not_read: false,
                comment: false,
                message: false,
                phone: false,
                no_phone: false,
                not_reply: false
            })
        }
        if(field === 'not_read'){
            let newStatusFilter = {...statusFilters}
            newStatusFilter.not_read = !newStatusFilter.not_read
            newStatusFilter.all = !Object.entries(newStatusFilter).find(([key, value])=> key !== 'all' && value)
            setStatusFilter(newStatusFilter)
            let newFilterFetchData = {...filters}
            if(typeof newFilterFetchData.not_read !== "undefined" && !newStatusFilter.not_read){
                delete newFilterFetchData.not_read
            } else {
                newFilterFetchData.not_read = true;
            }
            dispatch(setFilters(newFilterFetchData))
        }
        if(field === 'not_reply'){
            let newStatusFilter = {...statusFilters}
            newStatusFilter.not_reply = !newStatusFilter.not_reply
            newStatusFilter.all = !Object.entries(newStatusFilter).find(([key, value])=> key !== 'all' && value)
            setStatusFilter(newStatusFilter)
            let newFilterFetchData = {...filters}
            if(typeof newFilterFetchData.not_reply !== "undefined" && !newStatusFilter.not_reply){
                delete newFilterFetchData.not_reply
            } else {
                newFilterFetchData.not_reply = true;
            }
            dispatch(setFilters(newFilterFetchData))
        }
        if(field === 'comment'){
            let newStatusFilter = {...statusFilters}
            if(newStatusFilter.message && !newStatusFilter.comment){
                newStatusFilter.message = false
            }
            newStatusFilter.comment = !newStatusFilter.comment
            newStatusFilter.all = !Object.entries(newStatusFilter).find(([key, value])=> key !== 'all' && value)
            setStatusFilter(newStatusFilter)
            let newFilterFetchData = {...filters}
            if(typeof newFilterFetchData.type !== 'undefined'){
                if(newStatusFilter.comment){
                    newFilterFetchData.type = CONVERSATION_FILTER_COMMENT
                } else {
                    delete newFilterFetchData.type
                }
            } else {
                if(newStatusFilter.comment){
                    newFilterFetchData.type = CONVERSATION_FILTER_COMMENT
                }
            }
            dispatch(setFilters(newFilterFetchData))


        }
        if(field === 'message'){
            let newStatusFilter = {...statusFilters}
            if(newStatusFilter.comment && !newStatusFilter.message){
                newStatusFilter.comment = false
            }
            newStatusFilter.message = !newStatusFilter.message
            newStatusFilter.all = !Object.entries(newStatusFilter).find(([key, value])=> key !== 'all' && value)
            setStatusFilter(newStatusFilter)

            let newFilterFetchData = {...filters}
            if(typeof newFilterFetchData.type !== 'undefined'){
                if(newStatusFilter.message){
                    newFilterFetchData.type = CONVERSATION_FILTER_MESSAGE
                } else {
                    delete newFilterFetchData.type
                }
            } else {
                if(newStatusFilter.message){
                    newFilterFetchData.type = CONVERSATION_FILTER_MESSAGE
                }
            }
            dispatch(setFilters(newFilterFetchData))
        }
        if(field === 'phone'){
            let newStatusFilter = {...statusFilters}
            if(newStatusFilter.no_phone && !newStatusFilter.phone){
                newStatusFilter.no_phone = false
            }
            newStatusFilter.phone = !newStatusFilter.phone
            newStatusFilter.all = !Object.entries(newStatusFilter).find(([key, value])=> key !== 'all' && value)
            setStatusFilter(newStatusFilter)

            let newFilterFetchData = {...filters}
            if(typeof newFilterFetchData.type !== 'undefined'){
                if(newStatusFilter.phone){
                    newFilterFetchData.has_phone = true
                } else {
                    delete newFilterFetchData.has_phone
                }
            } else {
                if(newStatusFilter.phone){
                    newFilterFetchData.has_phone = true
                }
            }
            dispatch(setFilters(newFilterFetchData))
        }
        if(field === 'no_phone'){
            let newStatusFilter = {...statusFilters}
            if(newStatusFilter.phone && !newStatusFilter.no_phone){
                newStatusFilter.phone = false
            }
            newStatusFilter.no_phone = !newStatusFilter.no_phone
            newStatusFilter.all = !Object.entries(newStatusFilter).find(([key, value])=> key !== 'all' && value)
            setStatusFilter(newStatusFilter)

            let newFilterFetchData = {...filters}
            if(typeof newFilterFetchData.type !== 'undefined'){
                if(newStatusFilter.phone){
                    newFilterFetchData.has_phone = true
                } else {
                    delete newFilterFetchData.has_phone
                }
            } else {
                if(newStatusFilter.phone){
                    newFilterFetchData.has_phone = true
                }
            }
            dispatch(setFilters(newFilterFetchData))
        }
    }

  return (
    <div className={`bg-filter w-[68px]`}>
      <FilterItem
        icon={<FilterAll isActive={statusFilters.all}/>}
        isActive={statusFilters.all}
        title={'Tất cả'}
        handleClickFilterItem={() => handleClickFilterItem('all')}
      />
      <FilterItem
        icon={<FilterNotRead isActive={statusFilters.not_read}/>}
        isActive={statusFilters.not_read}
        title={'Chưa đọc'}
        hasBorderTop={true}
        handleClickFilterItem={() => handleClickFilterItem('not_read')}
      />
      <FilterItem
        icon={<FilterComment isActive={statusFilters.comment}/>}
        isActive={statusFilters.comment}
        title={'Bình luận'}
        handleClickFilterItem={() => handleClickFilterItem('comment')}
      />
      <FilterItem
        icon={<FilterMessage isActive={statusFilters.message}/>}
        isActive={statusFilters.message}
        title={'Tin nhắn'}
        handleClickFilterItem={() => handleClickFilterItem('message')}
      />
      <FilterItem
        icon={<FilterPhone isActive={statusFilters.phone}/>}
        isActive={statusFilters.phone}
        title={'Có SĐT'}
        hasBorderTop={true}
        handleClickFilterItem={() => handleClickFilterItem('phone')}
      />
      <FilterItem
        icon={<FilterNoPhone isActive={statusFilters.no_phone}/>}
        isActive={statusFilters.no_phone}
        title={'K.có SĐT'}
        handleClickFilterItem={() => handleClickFilterItem('no_phone')}
      />
      <FilterItem
        icon={<FilterNotReply isActive={statusFilters.not_reply}/>}
        isActive={statusFilters.not_reply}
        title={'Chưa trả lời'}
        hasBorderTop={true}
        handleClickFilterItem={() => handleClickFilterItem('not_reply')}
      />
        <FilterDateRange
          icon={<FilterDate isActive={false}/>}
          isActive={false}
          title={'Theo thời gian'}
        />
    </div>
  )
}