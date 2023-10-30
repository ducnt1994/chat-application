import Cookies from "js-cookie";

export const getUserInfor = () => {
  return JSON.parse(Cookies.get('userInfor') || "{}")
}