/*
   自定义一个获取信息分类的函数
*/

import {getCategory,getCategoryAll} from '@/api/login.js'
import {reactive} from '@vue/composition-api'
 
export function common(){
    const categoryItem = reactive({
        item:[]
    })
    const getCategoryInfo =()=>{
        getCategory().then((res)=>{
         
           categoryItem.item = res.data.data.data
        }).catch((err)=>{
          console.log(err)
        })
    }

    const getCategoryInfoAll =()=>{
        getCategoryAll().then((res)=>{
           categoryItem.item = res.data.data
        }).catch((err)=>{
          console.log(err)
        })
    }
    return{
        getCategoryInfo,
        categoryItem,
        getCategoryInfoAll
    }
}

