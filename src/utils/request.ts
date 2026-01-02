import axios, { AxiosResponse } from 'axios';
import Api from '../api/Apis';

const instance = axios.create({
    baseURL: 'http://192.168.1.10:7001',
    timeout: 10000,
})

export const request = (name: string, params: any) : Promise<AxiosResponse<any>> => {
    const api = (Api as any)[name];
    const {url, method} = api;

    if(method === 'get') {
        return get(url, params)
    }else {
        return post(url, params)
    }
}

export const get = (url: string, params: any) : Promise<AxiosResponse<any>> => {
    return instance.get(url, {
        params: params
    })
}

export const post = (url: string, params: any) : Promise<AxiosResponse<any>> => {
    return instance.post(url, params)
}