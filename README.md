# kd-ip-input (Vue2)
> An ip input component by vue 2.0
## Usage

### install
```bash
npm install kd-ip-input --save
```
### ES6

#### Global import
```javascript
// main.js
import KdIpInput from 'kd-ip-input';
import 'kd-ip-input.css'

Vue.use(KdIpInput)
```

#### On demand
```javascript
import KdIpInput from 'kd-ip-input';
import 'kd-ip-input.css'

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
        onIpChange(ip) {
            console.log('ip input change:', ip);
        },
        onIpBlur(ip) {
            console.log('ip input blur:', ip);
        }
    },
    template: '<kd-ip-input v-model="ip" urlMode prefix="http" :on-change="onIpChange" :on-blur="onIpBlur"></kd-ip-input>'
})
```

### Attributes
| Attribute | Description | Type | Accepted Values | Default
|:--|:--|:--|:--|:--|
| value / v-model | binding value | String | -- | --
| prefix | network protocol (required when showPrefix) | String | http/https/wss/ws | --
| showPrefix | whether use prefix | Boolean | -- | false
| showPort | whether use port | Boolean | -- | false

### Events
| Attribute | Description | Type |
|:--|:--|:--|
| blur | triggers when the input blur | the value of the input