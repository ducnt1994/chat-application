import React, {JSX} from "react";
// import {Tooltip} from "antd";

export interface IFilterItem {
  icon: JSX.Element
  title: string
  isActive : boolean
  hasBorderTop?: boolean
}
export default function FilterItem({icon, title, isActive, hasBorderTop} : IFilterItem) {
  return (
    <div className={`px-2 py-4 ${hasBorderTop ? "border-t-gray-600 border-t" : ""} w-full flex justify-center items-center cursor-pointer ${isActive ? "bg-gray-600" : 'bg-filter'} hover:bg-gray-600`}>
      <div>
        <div className={'flex justify-center items-center'}>{icon}</div>
        {/*<div className={`${isActive ? 'text-white' : 'text-gray-400'} text-xs`}>{title}</div>*/}
      </div>
    </div>
  )
}