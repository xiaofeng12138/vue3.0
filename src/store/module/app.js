import { getUsername } from '../../utils/cookie'


const state = {
  isCollapse:JSON.parse(localStorage.getItem("isCollapse")) || false,
  to_ken:'',
  user_Name: getUsername() || ''
}

const  mutations =  {
  SET_COLLAPSE(state){
     state.isCollapse = !state.isCollapse  //修改nav 是否折叠
     localStorage.setItem('isCollapse',JSON.stringify(state.isCollapse))
  },
    SET_TOKEN(state,value){
        state.to_ken = value
  },
    SET_USERNAME(state,value){
      state.user_Name = value
    },
}

const actions = {}


export default {
  namespaced:true,   //vuex的命名空间 调用时需要在方法前面加一个app/
  state,
  mutations,
  actions
};

  
