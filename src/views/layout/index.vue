<template>
    <div :class="[isCollapse ?'close': 'open']">
        <Header/>
        <Main/>
        <Nav/>
    </div>
</template>

<script>
import {reactive,ref,onMounted,computed} from '@vue/composition-api'
import Header from './components/header'
import Main from './components/main'
import Nav from './components/nav'
export default {
    components:{
       Header, Main,Nav
    },
    setup(props, {root}){
         const isCollapse = computed(()=>{
         return root.$store.state.app.isCollapse
       });

      return {
          isCollapse,
      }


    }
    
}
</script>

<style lang="scss" scoped>

</style>


