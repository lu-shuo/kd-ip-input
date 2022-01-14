import Vue from 'vue'
import App from './App.vue'
import KdIpInput from '../../dist/kd-ip-input.esm'
import '../../dist/kd-ip-input.esm.css'

Vue.use(KdIpInput)

new Vue({
  el: '#app',
  render: h => h(App)
})
