import KdIpInput from './kd-ip-input.vue';

const install = function (Vue) {
  Vue.component(KdIpInput.name, KdIpInput);
};

// 自动注册组件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default install;