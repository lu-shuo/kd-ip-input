# kd-ip-input
> An ip input component for Vue2.x

## Demo
[https://rookiels.github.io/kd-ip-input/](https://rookiels.github.io/kd-ip-input/)
## Usage

### Install
```bash
npm install kd-ip-input --save
```
### ES

#### Global import
```javascript
// main.js
import KdIpInput from 'kd-ip-input';

Vue.use(KdIpInput)
```

#### On demand
```javascript
import KdIpInput from 'kd-ip-input';

new Vue({
    components: {
        'kd-ip-input': KdIpInput
    },
    data() {
        return {
            ip: '127.0.0.1'
        };
    },
    methods: {
       handleBlur(val) {}
    },
    template: '<kd-ip-input v-model="ip" show-prefix show-port prefix="http" @blur="handleBlur"></kd-ip-input>'
})
```

### Check (with element form)
```vue
<template>
    <el-form :model="form" :rule="rules" ref="form"> 
        <el-form-item
            label="IP地址："
            prop="ipv4"
            required
        >
            <kd-ip-input
                v-model="form.ipv4"
                check-empty-on-blur
                @blur="$refs.form.validateField('ipv4')"
            />
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    data() {
        return {
            form: {
                ipv4: '',
                rules: {
                    ipv4: [
                        {required: true, message: '请输入ip地址', trigger: 'blur'},
                    ],
                }
            }
        }
    }
}
</script>
```
### Attributes
| Attribute | Description | Type | Accepted Values | Default
|:--|:--|:--|:--|:--|
| value / v-model | binding value | String | -- | --
| prefix | network protocol (required when showPrefix) | String | http/https/wss/ws | --
| showPrefix | whether use prefix | Boolean | -- | false
| showPort | whether use port | Boolean | -- | false
| disabled | whether input is disabled | Boolean | -- | false
| checkEmptyOnBlur | whether check value is empty on blur(red border when empty) | Boolean | -- | false
| clearable | whether to show clear button | Boolean | -- | false
| themeColor | highlight color | String | -- | #427bf1


### Events
| Event Name | Description | Parameters |
|:--|:--|:--|
| blur | triggers when the input blur | the value of the input