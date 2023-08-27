import {JSX} from "react";
import {Avatar as Avt} from "antd";

export default function Avatar({size, absoluteComp, url} : {
  size : number
  absoluteComp?: JSX.Element
  url: string
}) {
  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`
      }}
      className={`rounded-full border border-gray-400 flex items-center justify-center relative`}>
      <Avt size={size} className={`max-w-full max-h-full object-contain rounded-full`} alt={'avatar'} src={url}/>
      {
        absoluteComp && absoluteComp
      }
    </div>
  )
}