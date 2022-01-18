import Vue from 'vue'
import App from './App.vue'
import KdIpInput from '../../dist/kd-ip-input.esm'

Vue.use(KdIpInput)

new Vue({
  el: '#app',
  render: h => h(App)
})
