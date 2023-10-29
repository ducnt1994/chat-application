import {JSX} from "react";
import {Typography} from "antd";

export default function ItemContent({childContent, iconTitle, title, iconExtra} : {
  childContent: JSX.Element
  iconTitle: JSX.Element
  title: string
  iconExtra?: JSX.Element
}) {
  return (
    <div>
      <div className={`flex p-4 bg-gray-100 items-center gap-2 rounded-t-lg`}>
        <div >
          {iconTitle}
        </div>
        <Typography className={`flex-1 text-sm font-semibold`}>{title}</Typography>
        <div>
          {iconExtra}
        </div>
      </div>
      <div className={`p-4 bg-white rounded-b-lg`}>
        {childContent}
      </div>
    </div>
  )
}