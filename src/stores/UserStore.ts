import { request } from "../utils/request"
import { flow } from "mobx";
import { save } from "../utils/Storage";
// 类似于zustand等轻量状态管理库的功能
class UserStore {

    userInfo: any

    // 常规方法
    // requestLogin = async (phone: string, pwd: string, callback: (success: boolean) => void) => {
    //     try{
    //         const params = {
    //             name: phone,
    //             pwd: pwd
    //         }
    //         const { data } = await request('login', params)
    //         if(data) {
    //             this.userInfo = data
    //             callback?.(true)
    //         }else {
    //             this.userInfo = null
    //             callback?.(false)
    //         }
    //     }catch(e){
    //         console.log(e)
    //         this.userInfo = null
    //         callback?.(false)
    //     }
    // }

    // 使用flow包装的异步方法
    requestLogin = flow(function*
        (this: UserStore, phone: string, pwd: string, callback: (success: boolean) => void) {
            try{
                const params = {
                    name: phone,
                    pwd: pwd
                }
                const { data } = yield request('login', params)
                if(data) {
                    save('userInfo', JSON.stringify(data))
                    this.userInfo = data
                    callback?.(true)
                }else {
                    this.userInfo = null
                    callback?.(false)
                }
            }catch(e){
                console.log(e)
                this.userInfo = null
                callback?.(false)
            }
        }
    )
}

// ESM单例导出，在全局获取的都是同样一个对象，常用于登录信息的存储
export default new UserStore();