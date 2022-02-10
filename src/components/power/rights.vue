<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-table :data="rightList" style="width: 100%" border stripe>
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="authName" label="权限名称" align="center">
        </el-table-column>
        <el-table-column prop="path" label="路径" align="center">
        </el-table-column>
        <el-table-column prop="level" label="权限等级" align="center">
          <template #default="scope">
            <el-tag v-if="scope.row.level == 0">一级</el-tag>
            <el-tag type="success" v-else-if="scope.row.level == 1"
              >二级</el-tag
            >
            <el-tag type="warning" v-else>三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rightList: [],
    }
  },
  created() {
    this.getRightList()
  },
  methods: {
    async getRightList() {
      const { data: res } = await this.$http.get('rights/list')
      console.log(res)
      if (res.meta.status !== 200) this.$message.error('获取权限列表失败')
      console.log('获取权限列表成功')
      this.rightList = res.data
    },
  },
}
</script>

<style>
</style>
