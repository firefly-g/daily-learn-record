<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->

    <el-card>
      <!--添加角色按钮区域 -->
      <el-row>
        <el-col>
          <el-button type="primary" @click="addDialogVisible='true'">添加角色</el-button>
        </el-col>
      </el-row>
      <!-- 角色列表 -->
      <el-table :data="rolelist" border stripe>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row
              :class="['bdbottom',i1===0?'bdtop':'','vcenter']"
              v-for="(item1,i1) in scope.row.children"
              :key="item1.id"
            >
              <!-- 渲染一级权限 -->
              <el-col :span="5">
                <el-tag @close="removeRightById(scope.row,item1.id)" closable>{{item1.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 渲染二级和三级权限 -->
              <el-col :span="19">
                <!-- 通过for循环 嵌套渲染二级权限 -->
                <el-row
                  :class="['bdtop',item2.index===0?'':'bdtop','vcenter']"
                  v-for="(item2,i2) in item1.children"
                  :key="item2.id"
                >
                  <el-col :span="6">
                    <el-tag
                      type="success"
                      @close="removeRightById(scope.row,item2.id)"
                      closable
                    >{{item2.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      @close="removeRightById(scope.row,item3.id)"
                      type="warning"
                      v-for="(item3,i3) in item2.children"
                      :key="item3.id"
                      closable
                    >{{item3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <pre>
            <!-- {{scope.row}} -->
            </pre>
          </template>
        </el-table-column>
        <!-- 索引列 -->
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="showEditDialog(scope.row.id)"
            >编辑</el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="removeUserById(scope.row.id)"
            >删除</el-button>
            <!-- 删除按钮 -->
            <el-button
              type="warning"
              size="mini"
              icon="el-icon-setting"
              @click="showSetRightDialog(scope.row)"
            >分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!--添加用户对话框  -->
    <el-dialog title="添加角色" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
      <el-form :model="addForm" :rules="addFormRoles" ref="addFormRef" label-width="70px">
        <el-form-item label="角色名" prop="roleName">
          <el-input v-model="addForm.roleName"></el-input>
        </el-form-item>

        <!-- 角色描述 -->
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="addForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改角色的对话框 -->
    <el-dialog title="修改角色" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
        <el-form-item label="角色名">
          <el-input v-model="editForm.roleName" disabled></el-input>
        </el-form-item>

        <!-- 角色描述 -->
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="editForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false" @close="editDialogClosed">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配权限对话框 -->
    <el-dialog
      title="分配权限"
      :visible.sync="setRightDialogVisible"
      width="50%"
      @close="setRightDialogClosed"
    >
      <!-- 树形控件 -->
      <el-tree
        :data="rightslist"
        :props="treeProps"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="defKeys"
        ref="treeRef"
      ></el-tree>
      <!-- 底部区域 -->
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
      //所有角色列表数据
      rolelist: [],
      addDialogVisible: false,
      editDialogVisible: false,
      setRightDialogVisible: false,
      addForm: {
        roleName: '',
        roleDesc: '',
      },
      addFormRoles: {
        roleName: [
          {
            required: true,
            message: '请输入角色名称',
            trigger: 'blur',
          },
          {
            min: 3,
            max: 10,
            message: '角色名的长度在3~10个字符之间',
            trigger: 'blur',
          },
        ],
        roleDesc: [
          {
            message: '请输入角色描述',
            trigger: 'blur',
          },
          {
            min: 1,
            max: 10,
            message: '角色描述的范围在1~10个字符之间',
            trigger: 'blur',
          },
        ],
      },
      editFormRules: {
        roleDesc: [
          {
            message: '请输入角色描述',
            trigger: 'blur',
          },
          {
            min: 1,
            max: 10,
            message: '角色描述的范围在1~10个字符之间',
            trigger: 'blur',
          },
        ],
      },
      editForm: {},
      rightslist: [],
      //树形控件的属性绑定对象
      treeProps: {
        label: 'authName',
        children: 'children',
      },
      // 默认选中的节点id值数组
      defKeys: [],
      roleId: '', // 当前即将分配权限的角色id
    }
  },
  created() {
    this.getRolesList()
  },
  methods: {
    //获取所有角色的列表
    async getRolesList() {
      const { data: res } = await this.$http.get('roles')
      if (res.meta.status !== 200) {
        return this.$message.error('获取角色列表失败！')
      }
      return (this.rolelist = res.data)
      // console.log(11111111)
      // console.log(this.rolelist)
    },
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
    addUser() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) {
          return
        }
        const { data: res } = await this.$http.post('roles', this.addForm)
        console.log(res, '------')
        if (res.meta.status !== 201) {
          this.$message.error('添加角色失败!！')
        } else {
          this.$message.success('添加角色成功！')
        }
        //隐藏添加用户的对话框
        this.addDialogVisible = false
        //重新获取用户列表, 目的就是获取新添加的数据
        this.getRolesList()
      })
    },
    //展示角色信息
    async showEditDialog(id) {
      const { data: res } = await this.$http.get('roles/' + id)
      if (res.meta.status !== 200) {
        return this.$message.error('查询角色信息失败！')
      }
      this.editForm = res.data
      console.log(this.editForm, 22222222222)
      this.editDialogVisible = true
    },
    //修改角色任务信息并提交
    editUserInfo() {
      console.log(this.editForm, 111111111)
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) {
          return
        }
        const { data: res } = await this.$http.put(
          'roles/' + this.editForm.roleId,
          {
            roleName: this.editForm.roleName,
            roleDesc: this.editForm.roleDesc,
          }
        )
        console.log(this.editForm.roleDesc, 33333333)
        if (res.meta.status !== 200) {
          return this.$message.error('更新角色描述信息失败！')
        }
        this.editDialogVisible = false
        this.getRolesList()
        this.$message.success('更新角色描述信息成功！')
      })
    },
    async removeUserById(id) {
      const confirmResult = await this.$confirm(
        '此操作将永久删除该用户, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).catch((err) => err)
      //如果用户确认删除，则返回值为字符串confirm
      console.log(confirmResult)
      if (confirmResult != 'confirm') {
        return this.$message.info('已经取消删除操作')
      }
      //确认删除
      const { data: res } = await this.$http.delete('roles/' + id)
      if (res.meta.status !== 200) {
        return this.$message.error('删除角色失败！')
      }
      this.$message.success('删除角色成功！')
      this.getRolesList()
    },
    //根据id删除对应的权限
    async removeRightById(role, rightId) {
      const confirmResult = await this.$confirm(
        '此操作将永久删除该用户, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).catch((err) => err)
      //如果用户确认删除，则返回值为字符串confirm
      console.log(confirmResult)
      if (confirmResult != 'confirm') {
        return this.$message.info('已经取消删除操作')
      }
      //确认删除
      const { data: res } = await this.$http.delete(
        `roles/${role.id}/rights/${rightId}/`
      )
      if (res.meta.status !== 200) {
        return this.$message.error('删除权限失败！')
      }
      // this.getRolesList()
      role.children = res.data
    },
    // 展示分配权限的对话框
    async showSetRightDialog(role) {
      this.roleId = role.id
      // 获取所有权限的数据
      const { data: res } = await this.$http.get('rights/tree')
      console.log(res, 111111)
      if (res.meta.status !== 200) {
        return this.$message.error('获取权限数据失败！')
      }
      this.rightslist = res.data
      //递归获取三级节点的id
      this.getLeafKeys(role, this.defKeys)
      this.setRightDialogVisible = true
    },
    // 通过递归形式，获取角色下所有三级权限的id,并保存到defKeys数组中
    getLeafKeys(node, arr) {
      if (!node.children) {
        return arr.push(node.id) //若当前节点不包括node属性，则是三级权限接待你
      }
      node.children.forEach((item) => this.getLeafKeys(item, arr))
    },
    //监听分配权限对话框的关闭事件
    setRightDialogClosed() {
      this.defKeys = []
    },
    //点击为角色分配权限
    async allotRights() {
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys(),
      ]
      // console.log(keys)
      const idStr = keys.join(',')
      const { data: res } = await this.$http.post(
        `roles/${this.roleId}/rights`,
        { rids: idStr }
      )
      if (res.meta.status !== 200) {
        return this.$message.error('分配权限失败！')
      }
      this.$message.success('分配权限成功！')
      this.getRolesList()
      this.setRightDialogVisible=false
    },
  },
}
</script>

<style scoped>
.el-tag {
  margin: 7px;
}
.bdtop {
  border-top: 1px solid #eee;
}
.bdbottom {
  border-bottom: 1px solid #eee;
}
.vcenter {
  display: flex;
  align-items: center;
}
</style>