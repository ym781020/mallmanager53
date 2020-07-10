// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import moment from 'moment'

import '@/assets/css/reset.css'
import MyServerHttp from '@/plugins/http.js'
import MyHttpServer from './plugins/http'

import myBread from '@/components/cuscom/myBread'

Vue.use(ElementUI)

Vue.use(MyServerHttp)
Vue.config.productionTip = false

Vue.component(myBread.name,myBread)

Vue.filter('fmtdata',v => {
  return moment(v).format('YYYY-MM-DD')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
