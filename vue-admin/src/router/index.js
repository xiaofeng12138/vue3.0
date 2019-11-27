import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
      path: "/",
      redirect:"/login",
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
      redirect:"/index",
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
      path:"/info",
      name:"info", 
      meta:{
        name:'信息管理',
        icon:'el-icon-rank'
      },
      component:() => import ('../views/layout/index.vue'),
        children:[
          {
            path:"/infoList",
            name:"infoList", 
            meta:{
              name:'信息列表'
            },
            component:() => import ('../views/info/infoList.vue'),
          },
          {
            path:"/infoCategory",
            name:"infoCategory", 
            meta:{
              name:'信息分类'
            },
            component:() => import ('../views/info/infoCategory.vue'),
          }
        ]
    },
    {
      path:"/user",
      name:"user", 
      meta:{
        name:'用户管理',
        icon:'el-icon-menu'
      },
      component:() => import ('../views/layout/index.vue'),
        children:[
          {
            path:"/userList",
            name:"userList", 
            meta:{
              name:'用户列表'
            },
            component:() => import ('../views/user/index.vue'),
          },
        ]
    }
 ];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
