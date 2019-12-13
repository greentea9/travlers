import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import css from './assets/css/style.css'
import vuetify from './plugins/vuetify';
import VueCarousel from 'vue-carousel';
import axios from 'axios';
import naver from 'vue-naver-maps';
import VueGeolocationApi from 'vue-geolocation-api';
import VueGeolocation from 'vue-browser-geolocation';
import VueMoment from 'vue-moment';
import VueHorizontalTimeline from 'vue-horizontal-timeline'
import VueMasonry from 'vue-masonry-css'
///* eslint-disable */
//import editor from '@/assets/js/HuskyEZCreator.js'

//import 'expose-loader?$!expose-loader?jQuery!jquery'

Vue.use(VueCarousel);
Vue.config.productionTip = false
Vue.config.silent = true
Vue.prototype.$http = axios;
Vue.use(require('vue-moment'));
//window.$ = window.jQuery = require("jquery");

//네이버 지도 키값
Vue.use(naver, {
  clientID: 'l5yzdx6q5m'
});
//위치정보
Vue.use(VueGeolocationApi, {
});
Vue.use(VueGeolocation);
Vue.use(VueMasonry);
Vue.use(VueHorizontalTimeline)

Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})


new Vue({ 
  router,
  store,
  vuetify,
  css,
  VueMoment,
  //useGovAPI: false, //공공 클라우드 API 사용 (선택)
  //subModules: '', //서브모듈 (선택)
  render: h => h(App)
}).$mount('#app')
