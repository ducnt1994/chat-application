import React, {JSX} from "react";
import {useLocation, useNavigate} from "react-router-dom";

export default function NavItem({preIcon, title, path} : {
  preIcon?: JSX.Element | null
  title: string
  path: string
}) {
  const location = useLocation();
  const navigate = useNavigate()
  return (
    <div
      className={`flex gap-1 ${location.pathname === path ? 'bg-active-nav' : ''} hover:bg-active-nav justify-center items-center cursor-pointer text-base text-white font-medium w-[166px]`}
      onClick={() => navigate(path)}
    >
      {
        preIcon !== undefined && preIcon && <>{preIcon}</>
      }
      {title}
    </div>
  )
}