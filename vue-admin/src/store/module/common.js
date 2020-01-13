
import {getCategory} from '@/api/login.js'

const actions = {
    getInfoCategory(content,repuesData){
        return new Promise((resolve,reject)=>{
        getCategory({}).then((res)=>{
          resolve(res.data.data.data)
            }).catch((err)=>{
                reject(err)
            })
       })
    }
    
}


export default {
  namespaced:true,   //vuex的命名空间 调用时需要在方法前面加一个app/
  actions
};