import Vue from 'vue'
import App from './App.vue'
import KdIpInput from '../../dist/kd-ip-input.min'

Vue.use(KdIpInput)

new Vue({
  el: '#app',
  render: h => h(App)
})
