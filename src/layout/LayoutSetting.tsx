import LeftMenu from "./LeftMenu";
import {Outlet} from "react-router-dom";
import React from "react";

export default function LayoutSetting() {
  return (
    <div className={`flex bg-gray-200`}>
      <LeftMenu/>
      <div className={`flex-1 bg-gray-200 p-8 text-left`}>
        <Outlet/>
      </div>
    </div>
  )
}