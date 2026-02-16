import { request } from "../../utils/request";

const SIZE = 10
export default class HomeStore {

    page: number = 1

    homeList: ArticleSimple[] = []

    requestHomeList = async () => {
        try{
            const params = {
                page: this.page,
                size: SIZE
            };
            const { data } = await request('homeList', params);
            this.homeList = data
        }catch(err){
            console.log('requestHomeList err', err);
        }
        
    }
}