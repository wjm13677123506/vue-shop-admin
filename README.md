# vue-shop

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

<el-form-item label="邮箱" prop="email">
          <el-input
            prefix-icon="iconfont icon-tianchongxing-"
            v-model="form.email"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input
            prefix-icon="iconfont icon-tianchongxing-"
            v-model="form.phone"
          ></el-input>
        </el-form-item>

        var checkEmail = (rule, value, cb) => {
      var emailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      if (!emailReg.test(value)) return cb(new Error('邮箱不符合规范'))
      cb()
    }