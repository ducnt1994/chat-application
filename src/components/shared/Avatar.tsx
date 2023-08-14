import {JSX} from "react";

export default function Avatar({size, absoluteComp} : {
  size : number
  absoluteComp?: JSX.Element
}) {
  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`
      }}
      className={`rounded-full border border-gray-400 flex items-center justify-center relative`}>
      <img className={`max-w-full max-h-full object-contain rounded-full`} alt={'avatar'} src={'https://picsum.photos/200/200'}/>
      {
        absoluteComp && absoluteComp
      }
    </div>
  )
}