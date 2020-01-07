import Vue from "vue";
import Vuex from "vuex";
import app from './module/app'
import common from './module/common'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    common
  }
});
