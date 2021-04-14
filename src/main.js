import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

import uView from "uview-ui";
Vue.use(uView);

require('./mock/index.js');

const app = new Vue({
  ...App
})
app.$mount()
