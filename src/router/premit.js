import router from "./index";
import { getCookie,removeCookie,removeUsername} from '../utils/cookie'
import { Message } from 'element-ui';
import  store  from '../store/index'

const whiteRouter = ['/login']



router.beforeEach((to,form,next)=>{
   
    if(getCookie()){   //如果cookie值存在的话
        //动态路由添加  非配角色 为每个不同的角色分配不同的路由 
        //console.log(to.path)
        if(to.path === '/login'){
          removeCookie()  //清除token
          removeUsername()  //清除用户名
          store.commit('app/SET_TOKEN','')  //清除store 里面的token
          store.commit('app/SET_USERNAME','')  //清除store 里面的username
          next()
        }else{
          if(store.getters['promission/roles'].length == 0 ){
            store.dispatch('promission/getRoles').then(r=>{
                 let role = r;
                 let buttonValue = r.button;
                 let buttonPerm = r.btnPerm
                 store.commit('promission/SET_BUTTON',buttonPerm)
                 console.log( r.btnPerm)
                 store.dispatch('promission/createRouters',role).then(res=>{
                    let newRouters =  store.getters['promission/newRouters'] //获取匹配到的路由
                    let allRouters =  store.getters['promission/allRouters'] //获取所有的路由
                    router.options.routes = allRouters  //修改页面路由显示
                    router.addRoutes(newRouters)
                    next({...to,replace:true})
                 }) 
            })
          }else{
            next()
          }
        }
        
    }else{
        if(whiteRouter.indexOf(to.path) !== -1){    //存在
            next()   //to 跳转对应的路由
        }else{
            next('/login')   //路由指向 不存在直接返回登录页
            Message.error('您暂无权限访问该页面')
        }
        console.log('不存在')
    }
})