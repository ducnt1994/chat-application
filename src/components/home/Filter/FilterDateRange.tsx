import React, {JSX, useState} from "react";
import {Button, DatePicker, Popover} from "antd";
import locale from "antd/es/date-picker/locale/vi_VN";
import {Dayjs} from "dayjs";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store";
import {resetConversationByFilter, setFilters} from "../../../reducers/conversationSlice";
import moment from "moment";

export interface IFilterItem {
  icon: JSX.Element
  title: string
  isActive : boolean
  hasBorderTop?: boolean
  handleClickFilterItem?: () => void
}

type RangeValue = [Dayjs | null, Dayjs | null] | null;
export default function FilterDateRange({icon, title, isActive, hasBorderTop, handleClickFilterItem} : IFilterItem) {
  
  return (
    <Popover placement={'right'} trigger={'click'} content={<DateRangeComp/>}>
      <div
        onClick={handleClickFilterItem}
        className={`px-2 py-4 ${hasBorderTop ? "border-t-gray-600 border-t" : ""} w-full flex justify-center items-center cursor-pointer ${isActive ? "bg-gray-600" : 'bg-filter'} hover:bg-gray-600`}>
          <div className={'flex justify-center items-center'}>{icon}</div>
      </div>
    </Popover>
  )
}

function DateRangeComp() {
  const dispatch = useDispatch()
  const { RangePicker } = DatePicker;
  const {filters} = useSelector((state : RootState) => state.conversation)
  const [dateFilter, setDateFilter] = useState<{from: string, to: string}>({
    from: '',
    to: ''
  })

  const handleChangeDate = (date : RangeValue, dateString: [string, string]) => {
    let newDate = {...dateFilter}
    if(dateString[0]){
      newDate.from = moment(dateString[0],'DD-MM-YYYY').format('YYYY-MM-DD');
    }
    if(dateString[1]){
      newDate.to = moment(dateString[1],'DD-MM-YYYY').format('YYYY-MM-DD');
    }
    setDateFilter(newDate)
  }

  const handleClickFilter = () => {
    let newFilterFetch = {...filters}
    dispatch(resetConversationByFilter())
    if(!dateFilter.from || !dateFilter.to){
      return;
    }
    newFilterFetch.range_time = dateFilter
    dispatch(setFilters(newFilterFetch))
  }

  return (
    <>
      <RangePicker locale={locale} format={'DD-MM-YYYY'} onCalendarChange={handleChangeDate}/>
      <div className={`mt-2 flex justify-end`}>
        <Button onClick={handleClickFilter} type="primary" className={`bg-blue-500`}>Lọc</Button>
      </div>
    </>
  )
}