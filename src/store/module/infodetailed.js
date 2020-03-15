
const state = {
    id:'' || localStorage.getItem('id'),
    title:''|| localStorage.getItem('title'),
}

const  mutations =  {
   SET_ID(state,value){
       state.id = value
       localStorage.setItem('id',value)
   },
   SET_TITLE(state,value){
    state.title = value
    localStorage.setItem('title',value)
   }
}

const getters = {
    id:state=>state.id,
    title:state=>state.title
}

const actions = {}


export default {
  namespaced:true,   
  state,
  mutations,
  getters,
  actions
};

  
