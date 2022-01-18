<template>
  <div class="kd-ip-input-group">
    <div
      class="kd-ip-input-group__prepend"
      v-if="showPrefix"
    >{{prefix | prefixFormat}}</div>
    <ul class="kd-ip-input-group__input-ul" :class="{'is-empty': checkEmptyOnBlur && isEmptyOnBlur}">
      <li
        v-for="(segment,index) in ipList"
        class="kd-ip-input-group__input-li"
        :key="index"
        :style="{width: liWidth}"
        :class="{'is-disabled': disabled}"
      >
        <input
          ref="ipInput"
          class="kd-ip-input-group__input-inner"
          placeholder=""
          autocomplete="off"
          :value="segment"
          :disabled='disabled'
          :class="{'is-disabled-input': disabled}"
          @input="handleInput($event, index)"
          @keydown="handleKeyDown($event, index)"
          @blur="handleBlur($event, index)"
        >
        <div
          class="kd-ip-input-group__dot"
          v-if="index < 3"
        ></div>
        <div
          class="kd-ip-input-group__colon"
          v-if="ipList.length === 5 && index === 4"
        >
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
      </li>
    </ul>
  </div>

</template>

<script>
import { getCursorPosition } from './utils';

export default {
  name: 'kd-ip-input',
  props: {
    value: {
      type: String,
      required: true,
      default: '',
    },
    prefix: {
      // 可选http|https|wss|ws
      type: String,
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ['http', 'https', 'wss', 'ws'].indexOf(value) !== -1;
      },
    },
    showPrefix: {
      // 是否输出url，需同时设置prefix
      type: Boolean,
      default: false,
    },
    showPort: {
      // 是否开启端口
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    checkEmptyOnBlur: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      ipList: this.showPort ? ['', '', '', '', ''] : ['', '', '', ''],
      isEmptyOnBlur: false,
    };
  },
  computed: {
    liWidth() {
      return this.showPort ? '20%' : '25%';
    },
  },
  watch: {
    value(newVal) {
      this.init(newVal);
    },
    ipList(newVal) {
      if (newVal.every((segment) => segment === '')) {
        this.$emit('input', '');
        return;
      }
      let ip;
      const tempList = newVal.slice(0, 4);
      // 添加前缀
      ip =
        this.showPrefix && this.prefix
          ? this.prefix + '://' + tempList.join('.')
          : tempList.join('.');
      // 添加端口
      ip = this.showPort ? ip + ':' + newVal[4] : ip;
      this.$emit('input', ip);
    },
  },
  filters: {
    /* istanbul ignore next */
    prefixFormat(val) {
      if (val.indexOf('://') === -1) return val + '://';
      return val;
    },
  },
  mounted() {
    this.init(this.value);
  },
  beforeDestroy() {
    this.resetField();
  },
  methods: {
    resetField() {
      this.isEmptyOnBlur = false;
    },
    // 回显ip
    init(ip) {
      if (!ip) {
        this.ipList = this.showPort ? ['', '', '', '', ''] : ['', '', '', ''];
        return;
      }
      // 校验格式
      if (ip.split('.').length !== 4) {
        console.error('[kd-ip-input]：ip格式不合法');
        return;
      }

      // 带前缀，分离前缀
      if (this.showPrefix) {
        if (!this.prefix) {
          console.error('[kd-ip-input]：showPrefix模式需指定prefix');
          return;
        }
        if (ip.indexOf(this.prefix) !== -1) {
          ip = ip
            .split(/(http|https|wss|ws):\/\//)
            .slice(-1)[0]
            .trim();
        }
      }
      // 带端口，分离端口
      if (this.showPort) {
        if (ip.indexOf(':') !== -1) {
          const port = ip.split(':')[1].trim();
          this.ipList[4] = port;
          ip = ip.split(':')[0].trim();
        } else {
          console.error('[kd-ip-input]：invalid ip with port(missing colon)');
          return;
        }
      }

      const tempList = ip.split('.');
      for (let i = 0, length = tempList.length; i < length; i++) {
        const segment = tempList[i].trim();
        if (isNaN(segment) || segment < 0 || segment > 255) {
          console.info(
            '%c[kd-ip-input]：输入ip范围不合法，已默认恢复至0',
            'color: red'
          );
          this.ipList.splice(i, 1, '0');
          // break;
        } else {
          this.ipList.splice(i, 1, segment);
        }
      }
    },
    genIp(onBlur = false) {
      const ipList = this.ipList;
      let ip;
      if (ipList.every((segment) => segment !== '')) {
        if (onBlur) this.isEmptyOnBlur = false;
        const tempList = ipList.slice(0, 4);
        // 添加前缀
        ip =
          this.showPrefix && this.prefix
            ? this.prefix + '://' + tempList.join('.')
            : tempList.join('.');
        // 添加端口
        ip = this.showPort ? ip + ':' + ipList[4] : ip;
      } else {
        ip = '';
        if (onBlur) this.isEmptyOnBlur = true;
      }
      return ip;
    },
    handleInput(e, index) {
      let value = e.target.value;
      //当输入的是空格时，值赋为空
      value = value.trim();
      const segment = parseInt(value, 10);
      if (isNaN(segment)) {
        value = '';
      } else {
        // ip范围 0-255
        if (index <= 3) {
          value = segment > 255 ? '255' : '' + segment;
        } else {
          // 端口范围 0-65535
          value = segment > 65535 ? '65535' : '' + segment;
        }
      }
      this.$set(this.ipList, index, value);
      // 满三位向右跳转
      if (
        (!this.showPort && value.length === 3 && index < 3) ||
        (this.showPort && value.length === 3 && index < 4)
      ) {
        this.$refs.ipInput[index + 1].focus();
      }
    },
    handleKeyDown(e, index) {
      const keyCode = e.keyCode,
        value = e.target.value;
      // 8-删除键，37-左方向键
      // 当前input值为空或者光标在最左边，光标向左边input跳转
      if (keyCode === 8 || keyCode === 37) {
        if (
          (value.length === 0 || getCursorPosition(e.target).end === 0) &&
          index > 0
        ) {
          this.$refs.ipInput[index - 1].focus();
        }
      }
      // 39-右方向键
      // 光标在最右边，光标向右边input跳转
      if (keyCode === 39) {
        if (
          getCursorPosition(e.target).end === value.length &&
          ((!this.showPort && index < 3) || (this.showPort && index < 4))
        ) {
          this.$refs.ipInput[index + 1].focus();
        }
      }
      // 32-空格，13-回车 向右跳转
      if (
        (keyCode === 32 || keyCode === 13) &&
        ((!this.showPort && index < 3) || (this.showPort && index < 4))
      ) {
        this.$refs.ipInput[index + 1].focus();
      }
    },
    handleBlur() {
      // nextTick等待焦点跳到下一个input
      this.$nextTick(() => {
        // 整体blur
        const activeClassName = document.activeElement.className;
        if (activeClassName.indexOf('kd-ip-input-group__input-inner') === -1) {
          // 输入其中任意位，其他位补0
          if (this.ipList.some((segment) => segment || segment === '0')) {
            this.ipList.forEach((item, index) => {
              if (item === '') {
                this.$set(this.ipList, index, '0');
              }
            });
          }
          const ip = this.genIp(true);
          this.$emit('blur', ip);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
$dotColor: #dcdfe6;

.is-disabled {
  background-color: #f5f7fa !important;
  border-color: #e4e7ed !important;
  cursor: not-allowed;
}
.is-disabled-input {
  cursor: not-allowed;
  color: #c0c4cc !important;
}
.is-empty {
  border: 1px solid #f56c6c!important;
}
.kd-ip-input-group {
  line-height: normal;
  display: inline-table;
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  position: relative;
  font-size: 14px;
  .kd-ip-input-group__prepend {
    background-color: #f5f7fa;
    color: #909399;
    vertical-align: middle;
    display: table-cell;
    position: relative;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    border-right: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    padding: 0 20px;
    width: 1px;
    white-space: nowrap;
  }
  .kd-ip-input-group__input-ul {
    width: 100%;
    height: 32px;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    background-color: #fff;
    background-image: none;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    display: flex;
    align-items: center;
    font-size: inherit;
    outline: none;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    .kd-ip-input-group__input-li {
      height: 100%;
      line-height: 100%;
      list-style: none;
      position: relative;
      .kd-ip-input-group__dot {
        width: 5px;
        height: 5px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 0;
        border-radius: 50%;
        background: $dotColor;
      }
      .kd-ip-input-group__colon {
        width: 5px;
        height: 15px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-content: center;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        .dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: $dotColor;
        }
      }
    }
    .kd-ip-input-group__input-inner {
      width: 100%;
      height: 100%;
      border: none;
      color: #606266;
      text-align: center;
      background: transparent;
      &:focus {
        outline: none; /*取消掉默认的input focus状态*/
      }
    }
  }
}
</style>