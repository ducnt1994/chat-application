import Header from "./Header";
import {Outlet} from "react-router-dom";

export default function Layout() {
    return (
      <>
        <Header/>
        <div className={`mt-[55px]`}>
          <Outlet/>
        </div>
      </>
    )
}