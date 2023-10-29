import ItemContent from "../../shared/ItemContent";
import {IconQuestion} from "../../../assets/svg/ConversationScript/IconConersationScript";
import {Typography} from "antd";

export function Note() {
  return (
    <div className={`mt-6`}>
      <ItemContent childContent={<div>
        <Typography className={`font-semibold text-sm`}>Nhóm mẫu câu: <Typography className={`inline font-normal`}>Một trang chỉ được áp dụng một nhóm mẫu câu duy nhất</Typography></Typography>
      </div>} iconTitle={<IconQuestion/>} title={'Chú thích'}/>
    </div>
  )
}