import router from "./index";
import { getCookie,removeCookie,removeUsername} from '../utils/cookie'
import { Message } from 'element-ui';
import  store  from '../store/index'

const whiteRouter = ['/login']



router.beforeEach((to,form,next)=>{
   
    if(getCookie()){   //如果cookie值存在的话
        //动态路由添加  非配角色 为每个不同的角色分配不同的路由 
        console.log(to.path)
        if(to.path == '/login'){
          removeCookie()  //清除token
          removeUsername()  //清除用户名
          store.commit('app/SET_TOKEN','')  //清除store 里面的token
          store.commit('app/SET_USERNAME','')  //清除store 里面的username
          next()
        }else{
          next()
        }
        
      //console.log('存在')
    }else{
        if(whiteRouter.indexOf(to.path) !== -1){    //存在
            next()   //to 跳转对应的路由
        }else{
            next('/login')   //路由指向 不存在直接返回登录页
            Message.error('您暂无权限访问该页面')
        }
        console.log('不存在')
    }
  next()
})