import {API} from "../libs/client";

export const login = async (data: any) => {
    const res = await API.post(`/login`, data);
    return res.data;
}