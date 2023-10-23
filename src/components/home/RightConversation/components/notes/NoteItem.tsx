import moment from "moment/moment";
import {Divider, Typography} from "antd";
import {INoteItem} from "../../../../../dto";

const {Paragraph} = Typography
export default function NoteItem({noteItem, hasDivider} : {
  noteItem: INoteItem
  hasDivider?: boolean
}) {
  return (
    <div className={`text-left mt-2`}>
      <div className={`text-[#90949c] text-xs`}>{moment.unix(noteItem.time).format('HH:mm DD/MM/YYYY')}</div>
      <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: 'Xem thêm' }} className={`text-sm font-medium`}>
        {noteItem.note}
      </Paragraph>
      {
        hasDivider && <Divider className={`my-2`}></Divider>
      }
    </div>
  )
}