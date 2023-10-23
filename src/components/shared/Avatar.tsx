import {JSX} from "react";
import {Avatar as Avt} from "antd";

export default function Avatar({size, absoluteComp, url, hidden} : {
  size : number
  absoluteComp?: JSX.Element
  url: string
  hidden?: boolean
}) {
  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`
      }}
      className={`rounded-full border border-gray-400 flex items-center justify-center relative ${hidden ? 'opacity-0' : ''}`}>
      <Avt size={size} className={`max-w-full max-h-full object-contain rounded-full`} alt={'avatar'} src={url}/>
      {
        absoluteComp && absoluteComp
      }
    </div>
  )
}