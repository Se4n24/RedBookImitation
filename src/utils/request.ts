import axios, { AxiosResponse } from 'axios';
import Api from '../api/Apis';

const instance = axios.create({
    baseURL: 'http://192.168.1.10:7001',
    timeout: 10000,
})

instance.interceptors.response.use(
    response => response,
    error => {
        const { response } = error;
        if(response) {
            const { status } = response;
            if(status >= 500) {
                console.log('服务端报错');
            }else if(status === 400) {
                console.log('接口参数错误');
            }else if(status === 401) {
                console.log('登录信息过期，请重新登录');
            }else {
                console.log('其他错误类型');
            }
        }else {
            console.log('网络连接异常，请稍后再试');
        }
        return Promise.reject(error)
    }
)

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