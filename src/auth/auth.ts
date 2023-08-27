import axios from "axios"
import Cookies from "js-cookie"
export default class Auth {
    static saveToken(token: any){
        window.localStorage.setItem('accessToken', token);
        Cookies.set('accessToken', token, {domain: process.env.REACT_APP_COOKIE_DOMAIN, expires: 1})
    }

    static removeToken() {
        window.localStorage.removeItem('accessToken');
    }

    static async refreshToken(){
        // this.removeToken();
        try {
            const refreshRes = await axios.post(process.env.REACT_APP_URL_API + "api/v1/refresh",{},{
                headers: {'Authorization': 'Bearer ' + Cookies.get('accessToken')},
            });
            const newToken = refreshRes?.data?.data?.access_token;
            if(!newToken) {
                return false;
            }
            this.saveToken(newToken);
            return true;
        }
        catch (e) {
            this.removeToken();
            window.location.href = process.env.REACT_APP_APP_URL + 'auth-login?redirectUrl=' + process.env.REACT_APP_CHAT_URL;
        }
    }
}
