<template>
  <div class="login-container">
    <div class="login-box">
      <el-form ref="form" :model="form" :rules="formRules" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input
            prefix-icon="iconfont icon-weibiaoti562"
            v-model="form.username"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            prefix-icon="iconfont icon-tianchongxing-"
            v-model="form.password"
            show-password
            @keypress.enter="login"
          ></el-input>
        </el-form-item>
        <el-form-item class="aa">
          <el-button type="info" @click="resetField">重置</el-button>
          <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      formRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 1,
            max: 15,
            message: '长度在 1 到 15 个字符',
            trigger: 'blur',
          },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: '长度在 6到 15 个字符',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    resetField() {
      this.$refs.form.resetFields()
    },
    login() {
      this.$refs.form.validate(async (boolean) => {
        // console.log(boolean)
        if (!boolean) return
        const { data: res } = await this.$http.post('login', this.form)
        // console.log(res)
        if (res.meta.status !== 200) return this.$message.error('登录失败')
        this.$message.success('登录成功')
        sessionStorage.setItem('token', res.data.token)
        this.$router.push('/home')
      })
    },
  },
}
</script>

<style lang='less'  scoped>
.login-container {
  background-color: pink;
  height: 100%;
}

.login-box {
  width: 450px;
  height: 400px;
  background-color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 50px 40px 0 0px;
  box-sizing: border-box;
}

.aa {
  display: flex;
  justify-content: flex-end;
}
</style>
