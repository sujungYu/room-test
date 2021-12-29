import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store/store'
// import axios from 'axios'

Vue.config.productionTip = false
// Vue.prototype.$http = axios

new Vue({
  render: h => h(App),
  router,
  store,
  // created() {
  //   //앱 실행시 
  //   const userid = JSON.parse(localStorage.getItem("user")).id //localstoreage에 user가 있으면
  //   if(!userid) {
  //     console.log("no user id");
  //   }
  //   else{
  //     // console.log(userid);
  //   this.$store.dispatch('setlogin', {userid}) //store.js에 setlogin에 userid값을 전달한다

  //   }
    
  // }
  
}).$mount('#app')
