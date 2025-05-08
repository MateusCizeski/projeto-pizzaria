import axios, { AxiosError } from "axios";
import { parseCookies } from 'nookies';
import { AuthTokenErrors } from "./errors/AuthTokenErrors";
import { signOut } from "../contexts/AuthContent";

export function setupApiClient(ctx = undefined) {
    let cookies = parseCookies(ctx);

    const api = axios.create({
        baseURL: 'https://meuservidorubuntu.com.br/api/restaurant',
        headers: {
            Authorization: `Bearer ${cookies['@nextauth.token']}`
        }
    })

    api.interceptors.request.use(response => {
        return response;
    }, (error: AxiosError) => {
        if(error.response?.status === 401) {
            if(typeof window != undefined) {
                signOut();
            }else {
                return Promise.reject(new AuthTokenErrors());
            }
        }

        return Promise.reject(error);
    });
    
    return api;
}