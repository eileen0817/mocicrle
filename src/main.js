import Vue from 'vue'
import App from './App' 
import uView from 'uview-ui'
import Utils from './utils' 

import '@/style/font/iconfont.css' 

Vue.config.productionTip = false
const use = [uView, Utils]
use.forEach(v => Vue.use(v))

App.mpType = 'app'
const app = new Vue({ 
  ...App
})
app.$mount()
