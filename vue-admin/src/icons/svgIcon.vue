<template>
    <!-- <svg :class="svgClass" aria-hidden="true">
        <use :xlink:href="iconNaame"></use>
    </svg> -->
     <svg class="ybp" aria-hidden="true">
        <use :xlink:href="iconNaame"></use>
    </svg>
    
</template>

<script>
import {reactive,ref,onMounted,computed} from '@vue/composition-api'
export default {
    props: {
        // 分页
        iconClass: {
            type: String,  // 定义接收的值类型
            default: ''
        },
        className : {
            type: String,
            default: ''
        }
    },
    setup(props,{root}){
       //console.log(props.iconName)

      // 计算属性，得出最终结果，并返回
        const iconNaame = computed(() => `#icon-${props.iconName}`)

        const svgClass = computed(() => {
            if(props.className) {
                return `svg-icon ${props.className}`
            }else{
                return `svg-icon`
            }
        })

        return{
            iconNaame,
            svgClass
        }
    }
    
}
</script>

<style lang="scss" scoped>
.svg-icon {
    width: 1em;
    height: 1em;
    fill: currentColor;
    color: red;
}

</style>


