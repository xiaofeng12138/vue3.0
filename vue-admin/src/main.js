import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueCompositionApi from '@vue/composition-api';
import Router from 'vue-router'
import SvgIcon from './icons/index'

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI)
Vue.use(VueCompositionApi);

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
