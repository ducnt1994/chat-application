import React, {JSX} from "react";
export default function NavItem({preIcon, title} : {
  preIcon?: JSX.Element
  title: string
}) {
  return (
    <div
      className={`flex gap-1 hover:bg-active-nav justify-center items-center cursor-pointer text-base text-white font-medium w-[166px]`}
    >
      {
        preIcon !== undefined && <>{preIcon}</>
      }
      {title}
    </div>
  )
}