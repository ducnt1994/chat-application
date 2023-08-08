import FilterItem from "./FilterItem";
import FilterAll from "../../../assets/svg/FilterAll";
import FilterNotRead from "../../../assets/svg/FilterNotRead";
import FilterComment from "../../../assets/svg/FilterComment";
import FilterMessage from "../../../assets/svg/FilterMessage";
import FilterPhone from "../../../assets/svg/FilterPhone";
import FilterNoPhone from "../../../assets/svg/FilterNoPhone";
import FilterNotReply from "../../../assets/svg/FilterNotReply";
import FilterDate from "../../../assets/svg/FilterDate";
export function Filter() {
  return (
    <div className={`bg-filter w-[68px]`}>
      <FilterItem icon={<FilterAll isActive={true}/>} isActive={true} title={'Tất cả'}/>
      <FilterItem
        icon={<FilterNotRead isActive={false}/>}
        isActive={false}
        title={'Chưa đọc'}
        hasBorderTop={true}
      />
      <FilterItem
        icon={<FilterComment isActive={false}/>}
        isActive={false}
        title={'Bình luận'}
      />
      <FilterItem
        icon={<FilterMessage isActive={false}/>}
        isActive={false}
        title={'Tin nhắn'}
      />
      <FilterItem
        icon={<FilterPhone isActive={false}/>}
        isActive={false}
        title={'Có SĐT'}
        hasBorderTop={true}
      />
      <FilterItem
        icon={<FilterNoPhone isActive={false}/>}
        isActive={false}
        title={'K.có SĐT'}
      />
      <FilterItem
        icon={<FilterNotReply isActive={false}/>}
        isActive={false}
        title={'Chưa trả lời'}
        hasBorderTop={true}
      />
      <FilterItem
        icon={<FilterDate isActive={false}/>}
        isActive={false}
        title={'Theo thời gian'}
      />
    </div>
  )
}