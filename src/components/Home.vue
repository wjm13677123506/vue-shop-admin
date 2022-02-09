<template>
  <el-container>
    <el-header>
      <h2>建民电商平台No.1</h2>
      <el-button type="primary" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="menuCollapse ? '70px' : '200px'">
        <div class="menuCollapseBtn" @click="menuCollapse = !menuCollapse">
          |||
        </div>
        <el-menu
          background-color="#363d40"
          text-color="#fff"
          active-text-color="#66b1ff"
          unique-opened
          :collapse="menuCollapse"
          :collapse-transition="false"
          router
          :default-active="ativeNavPath"
        >
          <el-submenu :index="item.id + ''" v-for="item in menu" :key="item.id">
            <template slot="title">
              <i :class="iconObject[item.id]"></i>
              <span>{{ item.authName }}</span>
            </template>
            <el-menu-item
              :index="'/' + subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
              @click="saveNavPath('/' + subItem.path)"
            >
              <i class="el-icon-setting"></i>
              <span slot="title">{{ subItem.authName }}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menu: [],
      iconObject: {
        125: 'iconfont icon-yonghuming',
        103: 'iconfont icon-tijikongjian',
        101: 'iconfont icon-shangpin',
        102: 'iconfont icon-danju',
        145: 'iconfont icon-baobiao',
      },
      menuCollapse: false,
      ativeNavPath: '/users',
    }
  },
  created() {
    this.getMenu()
    this.ativeNavPath = sessionStorage.getItem('activePath')
  },
  methods: {
    logout() {
      this.$router.push('/login')
      sessionStorage.clear()
    },
    async getMenu() {
      const { data: res } = await this.$http.get('menus')
      console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error('获取菜单列表失败')
      }
      console.log('获取菜单列表成功')
      this.menu = res.data
    },
    saveNavPath(path) {
      console.log(path)
      sessionStorage.setItem('activePath', path)
      this.ativeNavPath = path
    },
  },
}
</script>

<style scoped lang='less'>
.el-container {
  height: 100%;
}
.el-header {
  background-color: #363d40;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-aside {
  background-color: #363d40;
  color: white;
  height: 100%;
}
.iconfont {
  margin-right: 15px;
  font-size: 20px;
}
.el-menu {
  border: none;
}
.menuCollapseBtn {
  text-align: center;
  cursor: pointer;
  letter-spacing: 0.2em;
}
.el-main {
  background-color: #e9edf1;
}
</style>
