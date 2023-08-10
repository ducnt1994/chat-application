import CountMessage from "../../../shared/CountMessage";
import IconPhone from "../../../../assets/svg/IconPhone";
import IconMessenger from "../../../../assets/svg/IconMessenger";
import Tag from "../../../shared/Tag";

export default function ListItemConversation() {
  return (
    <div className={`flex py-3 gap-4 pl-3 pr-1 items-center bg-conversation-not-read hover:bg-conversation-active cursor-pointer border-t border-t-gray-300`}>
      <div className={`flex-1 flex items-center gap-4`}>
        <div className={`w-[50px] h-[50px] rounded-full border border-gray-400 flex items-center justify-center relative`}>
          <img className={`max-w-full max-h-full object-contain rounded-full`} alt={'avatar'} src={'https://picsum.photos/200/200'}/>
          <div className={`absolute right-0 bottom-0`}><CountMessage total={3}/></div>
        </div>
        <div className={`flex-1 text-left`}>
          <div className={`font-bold text-gray-500 text-sm`}>Đức béo</div>
          <div className={`text-gray-900 text-xs`}>Đây là đoạn chat mới nhé...</div>
          <div className={`flex gap-1 mt-2 flex-wrap`}>
            <Tag title={'Tiem nang'} color={'#33FF33'}/>
            <Tag title={'Khong Tiem nang'} color={'red'}/>
            <Tag title={'Ngon phet'} color={'#009966'}/>
            <Tag title={'Ngon 2'} color={'#009966'}/>
            <Tag title={'Ngon 3'} color={'#009966'}/>
            <Tag title={'Ngon 3123jk123 123kj123kjh12 123123'} color={'#009966'}/>
          </div>
        </div>
      </div>
      <div>
        <div className={`text-sm text-gray-500`}>20:02</div>
        <div className={`mt-4 flex gap-1 justify-center`}>
          <div><IconPhone/></div>
          <div><IconMessenger isActive={true}/></div>
        </div>
      </div>
    </div>
  )
}