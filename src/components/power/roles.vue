<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card class="box-card">
      <!-- 添加角色 -->
      <el-row>
        <el-button type="primary">添加角色</el-button>
      </el-row>
      <el-table :data="roleList" style="width: 100%" border stripe>
        <el-table-column type="expand">
          <template #default="scope">
            <!-- 一级 -->
            <el-row
              class="vcenter"
              :class="['bd-bm', i1 === 0 ? 'bd-tp' : '']"
              v-for="(item1, i1) in scope.row.children"
              :key="item1.id"
            >
              <el-col :span="5">
                <el-tag
                  closable
                  @close="removeRightById(scope.row, item1.id)"
                  >{{ item1.authName }}</el-tag
                >
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="19">
                <!-- 二级 -->
                <el-row
                  class="vcenter"
                  v-for="(item2, i2) in item1.children"
                  :key="item2.id"
                  :class="i2 === 0 ? '' : 'bd-tp'"
                >
                  <el-col :span="5"
                    ><el-tag
                      type="success"
                      closable
                      @close="removeRightById(scope.row, item2.id)"
                      >{{ item2.authName }}</el-tag
                    >
                    <i class="el-icon-caret-right"></i
                  ></el-col>
                  <!-- 三级 -->
                  <el-col :span="19">
                    <el-tag
                      type="warning"
                      v-for="item3 in item2.children"
                      :key="item3.id"
                      closable
                      @close="removeRightById(scope.row, item3.id)"
                      >{{ item3.authName }}</el-tag
                    >
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <pre
              >{{ scope.row }}
            </pre>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="roleName" label="角色名称" width="180">
        </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述" width="180">
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <!-- {{ scope.row }} -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="edit(scope.row.id)"
              >编辑</el-button
            >
            <el-button type="danger" icon="el-icon-delete">删除</el-button>
            <el-button
              type="warning"
              icon="el-icon-share"
              @click="showSetRightDialog(scope.row)"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分配权限对话框 -->
    <el-dialog
      title="分配权限"
      :visible.sync="setRightDialogVisible"
      width="50%"
    >
      <el-tree
        :data="rightList"
        :props="treeProps"
        ref="treeRef"
        show-checkbox
        default-expand-all
        :default-checked-keys="defThreeNodeId"
        node-key="id"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotRights">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roleList: [],
      setRightDialogVisible: false,
      rightList: [],
      treeProps: {
        children: 'children',
        label: 'authName',
      },
      defThreeNodeId: [],
      roleId: '',
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    // 获取角色列表
    async getRoleList() {
      const { data: res } = await this.$http.get('roles')
      console.log(res)
      if (res.meta.status !== 200) return console.log('获取角色列表失败')
      console.log('获取角色列表成功')
      this.roleList = res.data
    },
    // 删除角色权限byid
    async removeRightById(role, rightId) {
      console.log(role, rightId)
      const { data: res } = await this.$http.delete(
        `roles/${role.id}/rights/${rightId}`
      )
      console.log(res)
      if (res.meta.status !== 200) return this.$message.error('删除权限失败')
      console.log('删除权限成功')
      role.children = res.data
    },
    // 点击分配权限,显示分配权限对话框,渲染权限树
    async showSetRightDialog(row) {
      this.defThreeNodeId = []
      const { data: res } = await this.$http.get('rights/tree')
      console.log(res)
      if (res.meta.status !== 200) return console.log('获取权限列表失败')
      console.log('获取权限列表成功')
      this.rightList = res.data
      // 获取当前角色的所有三级id并添加到defThreeNodeId
      this.getLeafKeys(row, this.defThreeNodeId)
      this.setRightDialogVisible = true
      this.roleId = row.id
    },
    // 获取当前角色的所有三级id并添加到defThreeNodeId
    getLeafKeys(node, arr) {
      if (!node.children) {
        return arr.push(node.id)
      }
      node.children.forEach((item) => {
        this.getLeafKeys(item, arr)
      })
    },
    // 点击确定，分配权限
    async allotRights() {
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys(),
      ]
      const idStr = keys.join(',')
      console.log(idStr)
      const { data: res } = await this.$http.post(
        `roles/${this.roleId}/rights`,
        {
          rids: idStr,
        }
      )
      console.log(res)
      if (res.meta.status !== 200) return this.$message.error('分配权限失败')
      this.$message.success('分配权限成功')
      this.getRoleList()
      this.setRightDialogVisible = false
    },
  },
}
</script>

<style lang='less'  scoped>
/* .el-row {
  border-top: 1px solid #efefef;
  margin: 0 20px;
  &:last-of-type {
    border-bottom: 1px solid #efefef !important;
  }
} */
.bd-bm {
  border-bottom: 1px solid #efefef;
  margin: 0px 30px;
}
.bd-tp {
  border-top: 1px solid #efefef;
}
.el-tag {
  margin: 7px;
}
.vcenter {
  display: flex;
  align-items: center;
}
</style>
