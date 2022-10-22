import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tabname:'upload',
    image:'',
    uploadImageData:'/static/images/blank-profile-picture-gee2347716_640.png',
    celebName:'',
    percentage:0,
    age:0,
    emotion:'',
    gender:'',
  },
  mutations: {
    changeTabname(state, val){
      state['tabname'] = val;
    },
    changeValue(state, valObj){
      Object.keys(valObj).forEach( key => {
        if(key in state){
          state[key] = valObj[key];
        }
      });
    },
  },
  actions:{
    callChangeTabname({state, commit}, {tabname}){
      commit('changeTabname', tabname)
    },
    callChangeValue({state, commit}, valObj){
      commit('changeValue', valObj);
    },
  },
  getters:{
    getTabname(state) {
      return `${state.tabname}`
    },
    getUploadImageData(state) {
      return state.uploadImageData
    },
    getCelebName(state){
      return state.celebName
    },
    getPercentage(state){
      return state.percentage
    },
    getAge(state){
      return state.age
    },
    getEmotion(state){
      return state.emotion
    },
    getGender(state){
      return state.gender
    },
    getImage(state){
      return state.image
    },
  }
})
