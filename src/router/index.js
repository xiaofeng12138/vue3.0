import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

//默认路由
export const defaultRouters = [
    {
      path: "/",
      redirect:"login",
      hidden:true,
      meta:{
        name:'首页'
      }
    },

    {
      path:"/login",
      name:"login",
      hidden:true,
      meta:{
        name:'登录'
      },
      component:() => import ('../views/login/index.vue')
    },
    {
      path:"/console",
      name:"console", 
      redirect:"index",
      meta:{
        name:'控制台',
        icon:'el-icon-printer'
      },
      component:() => import ('../views/layout/index.vue'),
        children:[
          {
            path:"/index",
            name:"Index", 
            meta:{
              name:'首页'
            },
            component:() => import ('../views/console/index.vue'),
          }
        ]
    },
      {
      path:"/page404",
      meta:{
        name:'404',
        icon:'el-icon-printer'
      },
      hidden:true,
      component:() => import ('../views/layout/index.vue'),
        children:[
          {
            path:"/404",
            meta:{
              name:'404'
            },
            component:() => import ('../views/404.vue'),
          }
        ]
    },
]

//动态路由 
  export  const asyncRouters = [
    {
      path:"/info",
      name:"info", 
      meta:{
        role:['sale',],
        system:"infoSystem",
        name:'信息管理',
        icon:'el-icon-rank'
      },
      component:() => import ('../views/layout/index.vue'),
        children:[
          {
            path:"/infoList",
            name:"infoList", 
            meta:{
              role:['sale',],
              name:'信息列表'
            },
            component:() => import ('../views/info/infoList.vue'),
          },
          {
            path:"/infoCategory",
            name:"infoCategory", 
            meta:{
              role:['sale',],
              name:'信息分类'
            },
            component:() => import ('../views/info/infoCategory.vue'),
          },  
          {
            path:"/infoDetailed",
            name:"infoDetailed", 
            hidden:true,
            meta:{
              role:['sale'],
              name:'信息详情'
            },
            component:() => import ('../views/info/detailed.vue'),
          }
        ]
    },
    {
      path:"/user",
      name:"user", 
      meta:{
        role:['technician'],
        system:"userSystem",
        name:'用户管理',
        icon:'el-icon-menu'
      },
      component:() => import ('../views/layout/index.vue'),
        children:[
          {
            path:"/userList",
            name:"userList", 
            meta:{
              role:['technician'],
              name:'用户列表'
            },
            component:() => import ('../views/user/index.vue'),
          },
        ]
    },
    {path:'*',redirect:'/404',hidden:true}
]

//系统默认配置系统默认路由
const routes = defaultRouters

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
