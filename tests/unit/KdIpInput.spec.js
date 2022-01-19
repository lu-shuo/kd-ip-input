/* eslint-disable no-undef */
import KdIpInput from '../../src/kd-ip-input.vue';
import { shallowMount } from '@vue/test-utils';
import Vue from 'vue/dist/vue.min';
import { flushPromise, setValue, triggerKey } from '../utils';

const factory = (propsData) => {
  return shallowMount(KdIpInput, {
    propsData
  });
};

describe('mount', () => {
  it('test mount ip', () => {
    const wrapper = factory({ value: '' });
    // 判断组件是否挂载
    expect(wrapper.exists()).toBe(true);
    // 渲染input容器
    const ul = wrapper.find('ul');
    expect(ul.attributes('class')).toBe('kd-ip-input-group__input-ul');
    // 渲染4个segment
    const liArray = ul.findAll('li');
    expect(liArray.length).toBe(4);
    expect(ul.find('li').attributes('class')).toBe('kd-ip-input-group__input-li');
    expect(ul.find('li').attributes('style')).toBe('width: 25%;');
    // 渲染input
    expect(ul.findAll('input').length).toBe(4);
    // 渲染分割点
    expect(ul.findAll('div .kd-ip-input-group__dot').length).toBe(3);
    wrapper.destroy();
  });

  it('test mount ip with prefix', () => {
    const wrapper = factory({
      value: '',
      prefix: 'http',
      showPrefix: true
    });
    // 判断组件是否挂载
    expect(wrapper.exists()).toBe(true);
    // 渲染前缀
    expect(wrapper.find('div .kd-ip-input-group__prepend').exists()).toBe(true);
    expect(wrapper.find('div .kd-ip-input-group__prepend').text()).toBe('http://');
    // 渲染input容器
    const ul = wrapper.find('ul');
    expect(ul.attributes('class')).toBe('kd-ip-input-group__input-ul');
    // 渲染4个segment
    expect(ul.findAll('li').length).toBe(4);
    expect(ul.find('li').attributes('class')).toBe('kd-ip-input-group__input-li');
    expect(ul.find('li').attributes('style')).toBe('width: 25%;');
    // 渲染input
    expect(ul.findAll('input').length).toBe(4);
    // 渲染分割点
    expect(ul.findAll('div .kd-ip-input-group__dot').length).toBe(3);
    wrapper.destroy();
  });

  it('test mount ip with port', () => {
    const wrapper = factory({
      value: '',
      showPort: true
    });
    // 判断组件是否挂载
    expect(wrapper.exists()).toBe(true);
    // 渲染input容器
    const ul = wrapper.find('ul');
    expect(ul.attributes('class')).toBe('kd-ip-input-group__input-ul');
    // 渲染5个segment
    expect(ul.findAll('li').length).toBe(5);
    expect(ul.find('li').attributes('class')).toBe('kd-ip-input-group__input-li');
    expect(ul.find('li').attributes('style')).toBe('width: 20%;');
    // 渲染input
    expect(ul.findAll('input').length).toBe(5);
    // 渲染分割点
    expect(ul.findAll('div .kd-ip-input-group__dot').length).toBe(3);
    // 渲染端口分割冒号
    expect(wrapper.find('div .kd-ip-input-group__colon').exists()).toBe(true);
    wrapper.destroy();
  });

  it('test mount ip with prefix and port', () => {
    const wrapper = factory({
      value: '',
      prefix: 'http',
      showPrefix: true,
      showPort: true
    });
    // 判断组件是否挂载
    expect(wrapper.exists()).toBe(true);
    // 渲染前缀
    expect(wrapper.find('div .kd-ip-input-group__prepend').exists()).toBe(true);
    // 渲染input容器
    const ul = wrapper.find('ul');
    expect(ul.attributes('class')).toBe('kd-ip-input-group__input-ul');
    // 渲染5个segment
    expect(ul.findAll('li').length).toBe(5);
    expect(ul.find('li').attributes('class')).toBe('kd-ip-input-group__input-li');
    expect(ul.find('li').attributes('style')).toBe('width: 20%;');
    // 渲染前缀
    expect(wrapper.find('div .kd-ip-input-group__prepend').exists()).toBe(true);
    // 渲染input
    expect(ul.findAll('input').length).toBe(5);
    // 渲染分割点
    expect(ul.findAll('div .kd-ip-input-group__dot').length).toBe(3);
    // 渲染端口分割冒号
    expect(wrapper.find('div .kd-ip-input-group__colon').exists()).toBe(true);
    wrapper.destroy();
  });

  it('test disabled', () => {
    const wrapper = factory({ value: '', disabled: true });
    // 判断组件是否挂载
    expect(wrapper.exists()).toBe(true);
    // 渲染input容器
    const ul = wrapper.find('ul');
    expect(ul.attributes('class')).toBe('kd-ip-input-group__input-ul');
    // 渲染4个segment
    const liArray = ul.findAll('li');
    expect(liArray.length).toBe(4);
    expect(ul.find('li').attributes('class')).toBe('kd-ip-input-group__input-li is-disabled');
    expect(ul.find('li').attributes('style')).toBe('width: 25%;');
    // 渲染input
    expect(ul.findAll('input').length).toBe(4);
    expect(ul.find('input').attributes('class')).toBe('kd-ip-input-group__input-inner is-disabled-input');
    // 渲染分割点
    expect(ul.findAll('div .kd-ip-input-group__dot').length).toBe(3);
    wrapper.destroy();
  });
});

describe('data', () => {
  it('test default ip', () => {
    const wrapper = factory({ value: '' });
    expect(wrapper.vm.$data.ipList.join('.')).toBe('...');
    wrapper.destroy();
  });

  it('test init correct ip', () => {
    const wrapper = factory({
      value: '127.0.0.1'
    });
    expect(wrapper.vm.$data.ipList.join('.')).toBe('127.0.0.1');
    wrapper.destroy();
  });

  it('test init invalid ip', () => {
    const wrapper = factory({
      value: '127.500.500.1'
    });
    expect(wrapper.vm.$data.ipList.join('.')).toBe('127.0.0.1');
    wrapper.destroy();
  });

  it('test init ip with prefix', () => {
    const wrapper = factory({
      value: 'http://127.0.0.1',
      showPrefix: true,
      prefix: 'http'
    });
    expect(wrapper.vm.$data.ipList.join('.')).toBe('127.0.0.1');
    wrapper.destroy();
  });

  it('test init ip with port', () => {
    const wrapper = factory({
      value: '127.0.0.1:8080',
      showPort: true,
    });
    expect(wrapper.vm.$data.ipList.slice(0, 4).join('.')).toBe('127.0.0.1');
    expect(wrapper.vm.$data.ipList.slice(-1)[0]).toBe('8080');
    wrapper.destroy();
  });

  it('test init ip with prefix and port', () => {
    const wrapper = factory({
      value: 'http://127.0.0.1:8080',
      showPort: true,
      showPrefix: true,
      prefix: 'http'
    });
    expect(wrapper.vm.$data.ipList.slice(0, 4).join('.')).toBe('127.0.0.1');
    expect(wrapper.vm.$data.ipList.slice(-1)[0]).toBe('8080');
    wrapper.destroy();
  });
});

let blurIp = null;

const vmFactory = props => {
  const vm = new Vue({
    template: '<div><kd-ip-input v-model="ip" :show-prefix="showPrefix" :show-port="showPort" :prefix="prefix" clearable ref="kdIpInput" @blur="handleBlur"></kd-ip-input></div>',
    components: {
      KdIpInput
    },
    data() {
      return {
        ip: props.ip,
        showPrefix: props.showPrefix,
        showPort: props.showPort,
        prefix: props.prefix
      };
    },
    methods: {
      handleBlur(ip) {
        blurIp = ip;
      }
    }
  }).$mount();
  document.body.appendChild(vm.$el);
  return vm;
};



describe('input(v-model)', () => {
  it('only ip input', async () => {
    const vm = vmFactory({
      ip: '127.0.0.1'
    });
    vm.$refs['kdIpInput'].ipList.splice(3, 1, '2');
    await flushPromise();
    expect(vm.ip).toBe('127.0.0.2');
    vm.$destroy();
  });

  it('ip with prefix input', async () => {
    const vm = vmFactory({
      ip: '',
      showPrefix: true,
      prefix: 'http'
    });
    vm.$refs['kdIpInput'].ipList.splice(0, 1, '127');
    vm.$refs['kdIpInput'].ipList.splice(1, 1, '0');
    vm.$refs['kdIpInput'].ipList.splice(2, 1, '0');
    vm.$refs['kdIpInput'].ipList.splice(3, 1, '1');
    await flushPromise();
    expect(vm.ip).toBe('http://127.0.0.1');
    vm.$destroy();
  });

  it('ip with prefix and port input', async () => {
    const vm = vmFactory({
      ip: '',
      showPrefix: true,
      prefix: 'http',
      showPort: true
    });
    vm.$refs['kdIpInput'].ipList.splice(0, 1, '127');
    vm.$refs['kdIpInput'].ipList.splice(1, 1, '0');
    vm.$refs['kdIpInput'].ipList.splice(2, 1, '0');
    vm.$refs['kdIpInput'].ipList.splice(3, 1, '1');
    vm.$refs['kdIpInput'].ipList.splice(4, 1, '8080');
    await flushPromise();
    expect(vm.ip).toBe('http://127.0.0.1:8080');
    vm.$destroy();
  });

  it('auto complete with 0', async () => {
    const vm = vmFactory({
      ip: ''
    });
    const input = vm.$refs['kdIpInput'].$refs['ipInput'][0];
    setValue(input, '127');
    const input1 = vm.$refs['kdIpInput'].$refs['ipInput'][1];
    input1.blur();
    await flushPromise();
    expect(vm.ip).toBe('127.0.0.0');
    vm.$destroy();
  });

  it('auto set to absNum if the input is below 0', async () => {
    const vm = vmFactory({
      ip: ''
    });
    const input = vm.$refs['kdIpInput'].$refs['ipInput'][0];
    input.focus();
    setValue(input, '-');
    setValue(input, '1');
    input.blur();
    await flushPromise();
    expect(vm.ip).toBe('1.0.0.0');
    vm.$destroy();
  });

  it('auto set to 255 if the input is over 255', async () => {
    const vm = vmFactory({
      ip: ''
    });
    const input = vm.$refs['kdIpInput'].$refs['ipInput'][0];
    input.focus();
    setValue(input, '500');
    const input1 = vm.$refs['kdIpInput'].$refs['ipInput'][1];
    input1.blur();
    await flushPromise();
    expect(vm.ip).toBe('255.0.0.0');
    vm.$destroy();
  });

  it('auto set port within 0~65535', async () => {
    const vm = vmFactory({
      ip: '',
      showPort: true
    });
    const input = vm.$refs['kdIpInput'].$refs['ipInput'][4];
    input.focus();
    setValue(input, '10000000');
    input.blur();
    await flushPromise();
    expect(vm.ip).toBe('0.0.0.0:65535');
    input.focus();
    setValue(input, '-');
    setValue(input, '8080');
    input.blur();
    await flushPromise();
    expect(vm.ip).toBe('0.0.0.0:8080');
    vm.$destroy();
  });

  it('auto move the cursor to next', () => {
    const vm = vmFactory({
      ip: ''
    });
    const input = vm.$refs['kdIpInput'].$refs['ipInput'][0];
    input.focus();
    // 右方向键
    triggerKey(input, 39);
    // 空格
    triggerKey(input, 32);
    // 回车
    triggerKey(input, 13);
    expect(document.activeElement).toStrictEqual(vm.$refs['kdIpInput'].$refs['ipInput'][3]);
    vm.$destroy();

    const vm1 = vmFactory({
      ip: '',
      showPort: true,
    });
    const input3 = vm1.$refs['kdIpInput'].$refs['ipInput'][1];
    input3.focus();
    // 右方向键
    triggerKey(input3, 39);
    // 空格
    triggerKey(input, 32);
    // 回车
    triggerKey(input, 13);
    expect(document.activeElement).toStrictEqual(vm1.$refs['kdIpInput'].$refs['ipInput'][4]);
    vm1.$destroy();
  });

  it('auto move the cursor to previous', () => {
    const vm = vmFactory({
      ip: '0.11.0.0'
    });
    const input = vm.$refs['kdIpInput'].$refs['ipInput'][1];
    input.focus();
    // 左方向键
    triggerKey(input, 37);
    // 左方向键
    triggerKey(input, 37);
    expect(document.activeElement).toStrictEqual(vm.$refs['kdIpInput'].$refs['ipInput'][0]);
    vm.$destroy();

    const vm1 = vmFactory({
      ip: '0.11.0.0',
    });
    const input1 = vm1.$refs['kdIpInput'].$refs['ipInput'][1];
    input1.focus();
    // 右方向键
    triggerKey(input1, 8);
    triggerKey(input1, 8);
    // console.log(document.activeElement);
    expect(document.activeElement).toStrictEqual(vm1.$refs['kdIpInput'].$refs['ipInput'][0]);
    vm1.$destroy();
  });

  it('emit blur when trigger blur', async () => {
    const vm = vmFactory({
      ip: '127.0.0.1'
    });
    const input = vm.$refs['kdIpInput'].$refs['ipInput'][0];
    input.focus();
    input.blur();
    await flushPromise();
    expect(blurIp).toBe('127.0.0.1');
    vm.$destroy();
  });

  it('emit blur when trigger blur void', async () => {
    const vm = vmFactory({
      ip: ''
    });
    const input = vm.$refs['kdIpInput'].$refs['ipInput'][0];
    input.focus();
    input.blur();
    await flushPromise();
    expect(blurIp).toBe('');
    vm.$destroy();
  });
});

// describe('clear', () => {
//   it('mount clear button', async () => {
//     const wrapper = factory({
//       value: '127.0.0.1',
//       clearable: true
//     });
//     await flushPromise();
//     const input = wrapper.find('input');
//     await input.trigger('focus');
//     expect(wrapper.find('div .clear-btn').isVisible()).toBe(true);
//     wrapper.destroy();
//   });

//   it('not mount clear button when empty', () => {
//     const wrapper = factory({
//       value: '',
//       clearable: true
//     });
//     const input = wrapper.find('input');
//     input.trigger('click');
//     // expect(wrapper.find('div .clear-btn').exists()).toBe(false);
//     console.log(wrapper.find('div .clear-btn').attributes('style'));
//     wrapper.destroy();
//   });
// });
