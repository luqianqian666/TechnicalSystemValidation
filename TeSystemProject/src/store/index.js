import Vue from 'vue'
import Vuex from 'vuex'

// import logIn from './modules/logIn'

Vue.use(Vuex);


const store = new Vuex.Store({
    //定义状态
    
    state: {
  
      user: window.sessionStorage.getItem('user' || '[]') == null ? null : JSON.parse(window.sessionStorage.getItem('user' || '[]')),
      activityId: window.sessionStorage.getItem('activityId') == null ? null : window.sessionStorage.getItem('activityId'),
      activityName: window.sessionStorage.getItem('activityName') == null ? null : window.sessionStorage.getItem('activityName'),
      satellite: window.sessionStorage.getItem('satellite') == null ? null : window.sessionStorage.getItem('satellite'),
     // global_url: config.global_url,  //服务器地址
    //   {
    //     name: window.localStorage.getItem('user' || '[]') == null ? '未登录' : JSON.parse(window.localStorage.getItem('user' || '[]')).name,
    //     username: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).username,
    //     authorities: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).authorities
    //   }
    },
    mutations: {
        login(state, user){
            state.user = user;
            window.sessionStorage.setItem('user', JSON.stringify(user));
        },
        logout(state){
            window.sessionStorage.removeItem('user');
        },
        changeActivity(state, value){
            state.activityName = value[2];
            state.activityId = value[1];
            state.satellite = value[0];
            window.sessionStorage.setItem('activityName', value[2]);
            window.sessionStorage.setItem('activityId', value[1]);
            window.sessionStorage.setItem('satellite', value[0]);
        }
    }
  })
  

  
export default store