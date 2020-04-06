import {getUserRole} from '@/api/login'
import {defaultRouters,asyncRouters} from '@/router'



function hasPromission(roles,router){
   if(router.meta && router.meta.role){
        return roles.some(item => router.meta.role.indexOf(item) >= 0)
   } 
}
/*
  权限划分 可以根据两种情况划分 
  1、系统功能
  2、用户角色
*/

const state = {
    roles:[],
    newRouters:[],
    allRouters:defaultRouters,
    showBtn:[],
}


const getters = {
    roles : state=>state.roles,
    newRouters : state=>state.newRouters,
    allRouters : state=>state.allRouters,
    showBtn : state=>state.showBtn
}

const  mutations =  { //同步 没有回调处理事件
    SET_ROLES(state,value){
       state.roles = value
    },
    SET_NEWROUTERS(state,router){
        state.newRouters = router
        state.allRouters = defaultRouters.concat(router)
     },
     SET_BUTTON(state,value){
         state.showBtn = value
         console.log(state.showBtn)
      },
}

const actions = { // 可以处理回调事件

    /* 
     获取用户角色
    */
    getRoles({commit},requsetData){
        return new Promise((resolve,reject)=>{
            getUserRole().then(r=>{
                let value = r.data.data
                console.log(value)
                commit('SET_ROLES',value)
                resolve(value)
            })
        })
    },
     /* 
      创建动态路由
    */
    createRouters({commit},data){
        return new Promise((resolve,reject)=>{
            let roles = data.role;
            let newRouters = []
            //超管状态，不需要匹配
            if(data.role[0].includes('admin')){
                newRouters = asyncRouters
            }else{
                newRouters = asyncRouters.filter(item=>{
                    console.log(hasPromission(roles,item))
                    if(hasPromission(roles,item)){   //判断二级路由
                        if(item.children && item.children.length > 0){
                            item.children = item.children.filter(child =>{
                                if(hasPromission(roles,child)){
                                    return child
                                }
                            })
                        }
                        return item  //有限返回第一层目录
                    }

                    // 根据系统功能来划分全权限
                    // if(data.includes(item.meta.system)){
                    //     return item
                    // }
                    newRouters.push(asyncRouters[asyncRouters.length - 1])
                })
            }
            commit('SET_NEWROUTERS',newRouters)
            resolve() //告知外面 内部已经处理完成 一定要返回
        })
    }
} 


export default {
  namespaced:true,   
  state,
  getters,
  mutations,
  actions,
};

  
