<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 视图-->
    <el-card>
      <!-- 搜索，添加区域 -->
      <el-row :gutter="20">
        <el-col :span="10">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable>
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible='true'">添加用户</el-button>
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
      <el-table :data="userlist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row.id)"
            ></el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeUserById(scope.row.id)"
            ></el-button>
            <!-- 分配角色按钮 -->
            <el-tooltip
              effect="dark"
              content="分配角色"
              placement="top"
              :enterable="false"
              @click="setRole(scope.row)"
            >
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
                @click="setRole(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <!-- 修改用户的对话框 -->
    <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="50%">
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <!--手机  -->
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false" @close="editDialogClosed">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 内容主体区域 -->
    <!--添加用户对话框  -->
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>

        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配角色的对话框 -->
    <el-dialog
      title="分配角色"
      :visible.sync="setRoleDialogVisible"
      width="50%"
      @close="setRoleDialogClosed"
    >
      <div>
        <p>当前的用户：{{userInfo.username}}</p>
        <p>当前的角色：{{userInfo.role_name}}</p>
        <p>
          分配新角色：
          <el-select v-model="selectedRoleId" placeholder="请选择">
            <el-option
              v-for="item in rolesList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </p>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="setRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRoleInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    var checkEmail = (rule, value, cb) => {
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      //验证邮箱的规则
      if (regEmail.test(value)) return cb()
      cb(new Error('请输入合法的邮箱'))
    }
    var checkMobile = (rule, value, cb) => {
      const regMobile = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      if (regMobile.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法的手机号码'))
    } //验证手机号的规则
    return {
      //获取用户列表的次数对象
      queryInfo: {
        query: '',
        pagenum: 1, //当前页数
        pagesize: 10,
      },
      userlist: [],
      rolesList: [], //所有角色的数据列表
      selectedRoleId: '', //已选中的roleId
      total: 0,
      addDialogVisible: false, //控制添加用户对话框的显示与隐藏
      setRoleDialogVisible: false,
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: '',
      }, //添加用户的表单数据
      addFormRules: {
        username: [
          {
            required: true,
            message: '请输入用户名字',
            trigger: 'blur',
          },
          {
            min: 3,
            max: 10,
            message: '用户名的长度在3~10个字符之间',
            trigger: 'blur',
          },
        ],
        password: [
          {
            required: true,
            message: '请输入用户密码',
            trigger: 'blur',
          },
          {
            min: 3,
            max: 10,
            essage: '用户名的密码在3~10个字符之间',
            trigger: 'blur',
          },
        ],
        email: [
          {
            required: true,
            message: '请输入用户邮箱',
            trigger: 'blur',
          },
          {
            validator: checkEmail,
            trigger: 'blur',
          },
        ],
        mobile: [
          {
            required: true,
            message: '请输入用户手机',
            trigger: 'blur',
          },
          {
            validator: checkMobile,
            trigger: 'blur',
          },
        ],
      }, //添加表单的验证规则对象
      editDialogVisible: false, //控制修改用户对话框的显示与隐藏
      //查询用户信息对象
      editForm: {},
      //修改表单的验证规则
      userInfo: {}, // 需要被分配角色的用户信息
      editFormRules: {
        email: [
          {
            required: true,
            message: '请输入用户邮箱',
            trigger: 'blur',
          },
          {
            validator: checkEmail,
            trigger: 'blur',
          },
        ],
        mobile: [
          {
            required: true,
            message: '请输入用户手机',
            trigger: 'blur',
          },
          {
            validator: checkMobile,
            trigger: 'blur',
          },
        ],
      },
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      const { data: res } = await this.$http.get('users', {
        params: this.queryInfo,
      })
      // console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error('获取失败')
      }
      this.userlist = res.data.users

      this.total = res.data.total
    },
    //监听pagesize事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getUserList()
    },
    //页码值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getUserList()
    },
    //监听switch开关状态的改变
    async userStateChanged(userInfo) {
      // users/511/state/true
      // users/510/state/true
      const { data: res } = await this.$http.put(
        `users/${userInfo.id}/state/${userInfo.mg_state}`
      )
      if (res.meta.status !== 200) {
        userInfo.mg_state = !userInfo.mg_state
        return this.$message.error('更新用户列表失败')
      }
      this.$message.success('更新用户成功')
    },
    //监听对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    //点击按钮 添加新用户
    addUser() {
      this.$refs.addFormRef.validate(async (valid) => {
        // console.log(valid)
        // valid 是不合法的话,其值就是false.   如果是合法的话,其值就是true.
        if (!valid) {
          return
        }
        //可以发起添加用户的网络请求
        const { data: res } = await this.$http.post('users', this.addForm)
        if (res.meta.status !== 201) {
          this.$message.error('添加用户失败！')
        } else {
          this.$message.success('添加用户成功！')
        }
        //隐藏添加用户的对话框
        this.addDialogVisible = false
        //重新获取用户列表, 目的就是获取新添加的数据
        this.getUserList()
      })
    },
    //展示编辑个人信息
    async showEditDialog(id) {
      const { data: res } = await this.$http.get('users/' + id)
      if (res.meta.status !== 200) {
        return this.$message.error('查询用户信息（id）失败')
      }
      this.editForm = res.data
      this.editDialogVisible = true
    },
    editDialogClosed() {
      this.$refs.resetFields()
    },

    //修改用户信息并提交
    editUserInfo() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) {
          return
        }
        //通过发起修改用户信息的请求
        // users/510
        // users/520
        const { data: res } = await this.$http.put(
          'users/' + this.editForm.id,
          {
            email: this.editForm.email,
            mobile: this.editForm.mobile,
          }
        )
        if (res.meta.status !== 200) {
          return this.$message.error('更新用户信息失败')
        }
        //关闭对话框，刷新数据列表
        this.editDialogVisible = false
        // 再次获取
        this.getUserList()
        this.$message.success('更新信息成功')
      })
    },

    //根据id删除信息
    async removeUserById(id) {
      const confirmResult = await this.$confirm(
        '此操作将永久删除该用户, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).catch((err) => {
        return err
      })
      //如果用户确认删除，则返回值为字符串confirm
      console.log(confirmResult)
      //若用户取消了删除，则返回值为字符串cancel
      if (confirmResult != 'confirm') {
        return this.$message.info('已经取消删除操作')
      }
      //确认删除
      const { data: res } = await this.$http.delete('users/' + id)
      if (res.meta.status !== 200) {
        return this.$message.error('删除用户失败！')
      }
      this.$message.success('删除用户成功！')

      // 再次获取 userInfo 信息列表
      this.getUserList()
    },
    //展示分配角色的对话框
    async setRole(userInfo) {
      this.userInfo = userInfo
      //在对话框出现之前显示角色下拉框->即获取角色列表
      const { data: res } = await this.$http.get('roles')
      if (res.meta.status !== 200) {
        return this.$message.error('获取角色列表失败！')
      }
      this.rolesList = res.data
      this.setRoleDialogVisible = true
    },
    //点击按钮 分配角色
    async saveRoleInfo() {
      if (!this.selectedRoleId) {
        //没有选择新的角色
        return this.$message.error('请选择要分配的角色')
      }
      // put 请求, url 是包含了 userId的,参数是roleId
      const { data: res } = await this.$http.put(
        `users/${this.userInfo.id}/role`,
        {
          rid: this.selectedRoleId,
        }
      )
      if (res.meta.status !== 200) {
        return this.$message.error('更新角色失败！')
      }
      this.$message.success('更新角色成功！')
      this.getUserList()
      this.setRoleDialogVisible = false
    },
  },
}
</script>

<style  lang='less' scoped>
</style>