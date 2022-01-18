<template>
  <div id="app">
    <div class="box">
      <div class="title">
        <h1>only ip</h1>
        <button @click="ip = ''">reset</button>
      </div>
      <div class="wrapper">
        <kd-ip-input
          v-model="ip"
          check-empty-on-blur
          @blur="handleBlur"
        />
      </div>
      <p class="ip">输出：{{ip ? ip : 'void string'}}</p>
    </div>
    <div class="box">
      <div class="title">
        <h1>show prefix</h1>
        <button @click="ipWithPrefix = ''">reset</button>
      </div>
      <div class="wrapper">
        <kd-ip-input
          v-model="ipWithPrefix"
          :prefix="prefix"
          show-prefix
        />
      </div>
      <p class="ip">输出：{{ipWithPrefix ? ipWithPrefix : 'void string'}}</p>
    </div>
    <div class="box">
      <div class="title">
        <h1>show port</h1>
        <button @click="ipWithPort = ''">reset</button>
      </div>
      <div class="wrapper">
        <kd-ip-input
          v-model="ipWithPort"
          show-port
        />
      </div>
      <p class="ip">输出：{{ipWithPort ? ipWithPort : 'void string'}}</p>
    </div>
    <div class="box">
      <div class="title">
        <h1>show prefix and port</h1>
        <button @click="ipWithPrefixAndPort = ''">reset</button>
      </div>
      <div class="wrapper">
        <kd-ip-input
          v-model="ipWithPrefixAndPort"
          :prefix="prefix"
          show-prefix
          show-port
        />
      </div>
      <p class="ip">输出：{{ipWithPrefixAndPort ? ipWithPrefixAndPort : 'void string'}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      ip: '127.0.0.1',
      ipWithPrefix: '',
      prefix: 'http',
      ipWithPort: '',
      ipWithPrefixAndPort: '',
    };
  },
  methods: {
    handleBlur(val) {
      console.log('blur', val);
    },
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #2c3e50;
  margin-top: 60px;
  /* background: greenyellow; */
}
.wrapper {
  width: 400px;
  margin-bottom: 30px;
}
.ip {
  font-size: 20px;
  margin-bottom: 30px;
}
.box {
  border-bottom: 2px solid black;
}
.box .title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
