import Vue from "vue";
import SvgIcon from './svgIcon.vue'


//定义全局组件需要修改Vue的指向 需要在vue.config.js 里面修改配置
Vue.component('svg-icon',SvgIcon)

/*

   require.context(‘./svg’, false, /\.svg$/) 参数说明：
        第一个：目录
        第二个：是否遍历子级目录
        第三个：定义遍历文件规则

*/
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => {
    //console.log(requireContext.keys())
  return requireContext.keys().map(requireContext)
}
requireAll(req)
