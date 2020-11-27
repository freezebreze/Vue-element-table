import Vue from "vue";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from "./App.vue";
import router from "./router";
import axios from 'axios';
import Mock from './mock/mock.js'

Mock.mockData();
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.$http = axios;
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
