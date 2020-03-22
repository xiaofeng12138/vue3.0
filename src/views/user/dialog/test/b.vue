<template>
    <div>
        孙组件
        这是一个B页面
        {{dataB}}
        <el-button @click="fn">孙组件调用父组件方法</el-button>
    </div>
</template>
<script>
import {reactive, ref,onMounted,computed,watch} from "@vue/composition-api";
export default {
    setup(props,{emit,root,attrs}){
        const dataB = reactive(attrs)
        const fn =()=>{
            emit('xfFn')
        }
        return{
            dataB,
            fn
        }
    }
}
</script>

