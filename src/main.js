import Vue from 'vue'
import App from './App.vue'
import router from './router'
//引入ElementUI组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//引入axios组件
import axios from 'axios'

Vue.use(ElementUI)
//Vue.use(axios)
Vue.config.productionTip = false
Vue.prototype.$http = axios
var token = localStorage.getItem('token') ;
axios.defaults.headers.common['token'] = token;
axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('token') != null) {
      config.headers['token'] = localStorage.getItem('token');
    }
    return config;
  },
  err => Promise.reject(err)
);
axios.interceptors.response.use(
  response => {
    if (response.data.code == 20002) {
      alert(response.data.msg);
      localStorage.removeItem('token');
      router.push('/login');
      return Promise.reject(response);
    } else if (response.data.code == 20003) {
      alert(response.data.msg);
      router.push('/login');
      return Promise.reject(response);
    } else {
      return response;
    }
  },
  error => Promise.reject(error)
);

// axios.interceptors.request.use(function (config) {
//   alert(localStorage.getItem('token'));
//   axios.defaults.headers.common['token'] = localStorage.getItem('token')
//   //config.headers.contentType = 'application/json;charset=UTF-8';
//   return config;
// }, function (error) {
//   return Promise.reject(error);
// });

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
