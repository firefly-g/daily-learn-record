<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 视图-->

    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="showAddCateDialog">添加分类</el-button>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <tree-table
        class="treeTable"
        :data="catelist"
        :columns="columns"
        :selection-type="false"
        :expand-type="false"
        show-index
        index-text="#"
        border
        :show-row-hover="false"
      >
        <!-- 有效 -->
        <template slot="isOk" slot-scope="scope">
          <i class="el-icon-success" v-if="scope.row.cat_deleted===false" style="color:lightgreen"></i>
          <i class="el-icon-error" v-else style="color:red"></i>
        </template>

        <!-- 排序 -->
        <template slot="order" slot-scope="scope">
          <el-tag size="mini" v-if="scope.row.cat_level===0">一级</el-tag>
          <el-tag type="success" size="mini" v-else-if="scope.row.cat_level===1">二级</el-tag>
          <el-tag type="warning" size="mini" v-else>三级</el-tag>
        </template>
        <!-- 操作 -->
        <template slot="opt" slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
        </template>
      </tree-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[3, 5,10,15]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 添加分类的对话框 -->
    <el-dialog title="添加分类" :visible.sync="addCateDialogVisible" width="50%" @close="addCateDialogClosed" >
      <!-- 添加验证规则的表单 -->
      <el-form
        :model="addCateForm"
        :rules="addCateFormRules"
        ref="addCateFormRef"
        label-width="100px"
      >
        <!-- 分类名称 -->
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="addCateForm.cat_name"></el-input>
        </el-form-item>

        <!-- 分类名称 -->
        <el-form-item label="父级分类:">
          <el-cascader
          expand-trigger='hover'
            v-model="selectedKeys"
            :options="parentCateList"
            :props="cascaderProps "
            @change="parentCateChanged"
            clearable
           change-on-select
          
          ></el-cascader>
        </el-form-item>
      </el-form>
      <!-- 底部 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCateDialogVisible = false" >取 消</el-button>
        <el-button type="primary" @click="addCate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //查询条件
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5,
      },
      //商品分类的数据列表 默认为空 从后台发起请求获取
      catelist: [],
      total: 0,
      columns: [
        {
          //为table指定列的定义
          label: '分类名称',
          prop: 'cat_name',
        },
        {
          label: '是否有效',
          type: 'template', //将当前列定义为模板列
          template: 'isOk', // 表示当前这一列使用模板名称
        },
        {
          label: '排序',
          type: 'template',
          template: 'order',
        },
        {
          label: '操作',
          type: 'template',
          template: 'opt',
        },
      ],
      //控制添加分类对话框的显示与隐藏
      addCateDialogVisible: false,
      //添加分类得表得算据对象
      addCateForm: {
        cat_name: '', //将要添加得数据名称
        cat_pid: 0, //分类父 ID
        cate_level: 0, //默认要添加得是一级分类
      },
      //添加分类表单得验证规则
      addCateFormRules: {
        cat_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
        ],
      },
      parentCateList: [], //父级分类得列表
      //指定级联选择器得配置对象
      cascaderProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children',
      },
      //(用户）选中得父级分类得id
      selectedKeys: [],
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    //预先获取商品分类数据
    async getCateList() {
      const { data: res } = await this.$http.get('categories', {
        params: this.queryInfo,
      })
      if (res.meta.status !== 200) {
        return this.$message.error('获取商品分类失败！')
      }
      console.log(res.data)
      this.catelist = res.data.result //把数据列表赋值给catelist
      this.total = res.data.total
    },
    //监听pagesize改变
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getCateList()
    },
    //监听pagenum改变
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getCateList()
    },
    showAddCateDialog() {
      //先获取父级分类得数据列表
      this.getParentCateList()
      //再展示对话框
      this.addCateDialogVisible = true
    },
    //获取父级分类得数据列表
    async getParentCateList() {
      const { data: res } = await this.$http.get('categories', {
        params: { type: 2 },
      })
      if (res.meta.status !== 200) {
        return this.$message.error('获取父级分类数失败！')
      }
      console.log(res)
      this.parentCateList = res.data
      console.log(  this.parentCateList)
    },
    //选择项发生变化触发函数
    parentCateChanged() {
      console.log(this.selectedKeys)
      //如果selectedKeys中得length大于0，则选中分类 。反之，没有选中任何分类
      if(this.selectedKeys.length>0){
       this.addCateForm.cat_pid= this.selectedKeys[this.selectedKeys.length-1]
       this.addCateForm.cate_level=this.selectedKeys.length
       return
      }else{
        this.addCateForm.cat_pid= 0
       this.addCateForm.cate_level=0
      }
    },
    //点击按钮，添加新分类
    addCate(){
    //  console.log( this.addCateForm)
    this.$refs.addCateFormRef.validate(async valid=>{
      if(!valid) return
         const {data:res}=await this.$http.post('categories',this.addCateForm)
         if(res.meta.status!==201){
           return this.$message.error('添加分类失败！')
         }
           this.$message.success('添加分类成功！')
           this.getCateList()
           this.addCateDialogVisible=false
    })
    
    },
    //监听对话框得关闭事件，重置表单事件
    addCateDialogClosed(){
      this.$refs.addCateFormRef.resetFields()
      this.selectedKeys=[]
      this.addCateForm.cat_level=0
      this.addCateForm.cat_pid=0
    }
  }
}
</script>


<style lang="less" scoped>
.treeTable {
  margin-top: 15px;
}
.el-cascader{
  width: 100%;
}
</style>