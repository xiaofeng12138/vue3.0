import store from '@/store/index'
import Vue from 'vue'

//定义一个全局方法
export function showBtn(item){
    if(store.getters['promission/roles'].role[0] == 'admin'){
        return true
    }else{
        let showBtn = store.getters['promission/showBtn']
        return showBtn.indexOf(item) != -1 ;  表示匹配到
    }
}
