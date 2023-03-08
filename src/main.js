import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import dataV from "@jiaminghi/data-view";
import "./assets/scss/resert.scss";
import * as echarts from "echarts";
import "echarts-gl";
import axios from "axios";
import "../src/assets/chalk";
import ScoketService from "../src/utils/socket_service";
ScoketService.Instance.conncet();
Vue.prototype.$scoket = ScoketService.Instance;
Vue.config.productionTip = false;
Vue.use(dataV);
Vue.prototype.$echarts = echarts;
Vue.prototype.$http = axios;
axios.defaults.baseURL = "http://localhost:8888/api/";
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
