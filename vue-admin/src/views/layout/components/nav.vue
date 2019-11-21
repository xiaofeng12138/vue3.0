<template>
    <div class="nav">
         <el-menu
          class="el-menu-vertical-demo" 
          @open="handleOpen" 
          @close="handleClose" 
          background-color ='transparent'
          text-color='#fff'
          active-text-color	="#639FB5"
          router
           >
                <template v-for="(item,index) in router">  <!--template在遍历的时候不会显示出来 -->
                    <el-submenu  :key='index' :index="index + ''" v-if="!item.hidden" >
                    <template slot="title">
                        <!-- 一级菜单 -->
                    <i :class="item.meta.icon" style="color:#fff"></i>
                    <!-- <svg-icon :iconClass="item.meta.icon" :className="item.meta.icon" /> -->
                        <!-- <svg-icon :iconClass="item.meta.icon" :className="item.meta.icon" /> -->
                        {{item.meta.name}}
                    </template>

                    <!-- 子菜单 -->
                    <el-menu-item  v-for="(subItem,index) in item.children" :key="index" :index="subItem.path">{{subItem.meta.name}}</el-menu-item>
               
                </el-submenu>
            </template>
        </el-menu>
        <svg-icon />
    </div>
</template>

<script>
import {reactive,ref,onMounted} from '@vue/composition-api'

export default {

    setup(props,{root}){


       const router = reactive(root.$router.options.routes)
       const handleOpen = (key, keyPath) => {
        //console.log(key, keyPath);
      }

      const handleClose = (key, keyPath)=>{
        //console.log(key, keyPath);
      }


      return {
          router,
          handleOpen,
          handleClose,

      }
    }
    
}
</script>

<style lang="scss" scoped>
@import '../../../styles/config.scss';
 .nav{
     position: fixed;
     top: 0;
     left:0;
     height: 100vh;
     width:$menuWidth;
     background-color: #3D6B8C;
      svg {
            font-size: 20px;
            margin-right: 10px;
        }
     
 }
</style>


