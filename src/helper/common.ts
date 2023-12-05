import Cookies from "js-cookie";

export const getUserInfor = () => {
  return JSON.parse(Cookies.get('userInfor') || "{}")
}

export const checkIsInstalledExt = () => {
  const domExt = document.querySelectorAll<HTMLInputElement>(
    '[name="9hub"]'
  );
  let isInstalled = false;
  if(domExt && domExt.length){
    domExt.forEach((item) => {
      if(item.value === 'pnggbmbenebnjldiocnpklocljgageeo'){
        isInstalled = true;
        return;
      }
    })
  }
  return isInstalled
}