# kd-ip-input (Vue2)
> An ip input component for Vue2.x
> support prefix and port
## Usage

### install
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