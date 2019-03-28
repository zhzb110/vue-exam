<template>
  <div>
  	<div class="top-form">
      <el-form :model="queryForm" ref="queryForm" label-width="120px" label-position="right">
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="应用题型：" prop="name">
            <el-input v-model="queryForm.name"></el-input>
          </el-form-item>
        </el-col>      
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="状态：" prop="useFlag">
            <el-select v-model="queryForm.useFlag">
              <el-option key="1" label="全部" value=""></el-option>
              <el-option key="2" label="启用" value="1"></el-option>
              <el-option key="3" label="停用" value="0"></el-option>
           </el-select>
          </el-form-item>
        </el-col>
       </el-form>
      <div class="formBtns">
        <el-button type="primary" plain @click="pageContent">查询</el-button>
        <el-button type="success" plain @click="exportQuestions">导出</el-button>
        <el-button type="primary" plain @click="addQuestions">新增</el-button>
      </div>
    </div>
    <div class="content-table">
     	<el-table :data="tableData" style="width: 100%" border >
	       <el-table-column type="index" label="序号"></el-table-column>
	       <el-table-column prop="parentName" label="基础题型"></el-table-column>
	       <el-table-column prop="name" label="应用题型"></el-table-column>
	       <el-table-column prop="description" label="题型描述"></el-table-column>
	       <el-table-column label="状态">
	       		<template slot-scope="scope">{{scope.row.useFlag == 1 ? "启用" : "停用"}}</template>
	       </el-table-column>
	       <el-table-column label="操作" width="180">
          <template slot-scope="scope">
	           <el-button
	            type="primary" plain @click="edtiorQuestions(scope.row.id)" class="el-table-btn">编辑</el-button>
	           <el-button
	            size="mini"
	            type="danger" plain @click="deleteQuestions(scope.row.id)" class="el-table-btn">删除</el-button>
          </template>
	       </el-table-column>
		  </el-table>
     	<!--分页组件-->
      <pagination ref="page" :currentPage="currentPage" :pageSize="pageSize" :totalCount="totalCount" @on-current-page-change="onCurrentPageChange" @on-page-size-change="onPageSizeChange"/>
    </div>
	  <el-dialog :title='newAndEditor === 1 ? "新增设置题型" : "编辑题型"' width="600px" :visible.sync="dialogVisible">
      <el-form :model="dialogForm" ref="dialogForm" label-width="140px" label-position="right">
        <el-row>
          <el-col :span="23">
            <el-form-item label="所属基础题型：" prop="parentId" :rules="[{ required: true, message: '请选择基础题型', trigger: 'change'}]">
              <el-select v-model="dialogForm.parentId" filterable>
                <el-option v-for="item in getTestquesTypeBasic" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="23">
            <el-form-item label="应用题型：" prop="name" :rules="[{ required: true, message: '请输入应用题型', trigger: 'blur' }]">
              <el-input v-model="dialogForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="23">
            <el-form-item label="题型描述：" prop="description">
              <el-input type="textarea" v-model="dialogForm.description"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="23">
            <el-form-item label="状态：" prop="useFlag" class="red-star">
              <el-switch v-model="dialogForm.useFlag" :active-value="1" :inactive-value="0" active-text="启用" inactive-text="停用"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" plain @click="save">保存</el-button>
        <el-button @click="dialogVisible=false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from "@/components/pagination"
import { apiGet, apiPost } from "@/common/api"
export default {
  name: "Main",
  data() {
    return {
      getTestquesTypeBasic:[], // 基础题型下拉列表
      // 当前页
      currentPage: 1,
      // 每页条数
      pageSize: 20,
      // 总共多少条数据
      totalCount: 0,
      // 查询数据的表单
      queryForm: {
        name: "",
        useFlag: ""
      },
      tableData: [
          {parentName:"单选题",name:"单选题",description:"单选题题型",useFlag:1,id:1},
          {parentName:"多选题",name:"多选题",description:"多选题题型",useFlag:0,id:2},
          {parentName:"简单题",name:"简单题",description:"简单题题型",useFlag:1,id:3}
      ],
      dialogVisible: false,
      dialogForm: {
        parentId: "",
        name: "",
        description: "",
        useFlag: 1
      },
      newAndEditor:'', // 新增修改状态
    };
  },
  methods: {
    // 获取页面列表
    pageContent(){
      // const page = Object.assign({}, this.queryForm);
      // page.pageNum = this.currentPage
      // page.pageSize = this.pageSize
      // var url='/testques/testquestype/getTestquesTypelistByPage'
      // apiPost(url,page).then(response => {
      //   if (response.data.code ===200) {
      //     this.totalCount = parseInt(response.data.data.total)
      //     this.tableData =response.data.data.list
      //   } else{
      //     this.$message({ message:response.message,type: 'error' })
      //   }
      // }).catch(error => {
      //   console.log(error)
      // })
    },
     // 分页，改变第几页
    onCurrentPageChange(val) {
      this.currentPage = val
      this.pageContent()
    },
    // 改变每页现实的数据条数
    onPageSizeChange(val) {
      this.pageSize = val
      this.pageContent()
    },
    exportQuestions() {},
    // 表格中删除
    deleteQuestions(id) {
      this.$message({ message:'删除成功',type: 'success' })
    },
    // 表格中编辑
    edtiorQuestions(id) {
      // 每次打开数据清空
      this.dialogVisible = true
      this.newAndEditor = 2
    },
    // 新增
    addQuestions() {
      // 每次打开数据清空
      this.dialogVisible = true;
      if (this.newAndEditor !== "") {
        this.$refs["dialogForm"].resetFields()
      }
      this.newAndEditor = 1
    },
    // 新增修改提交
    save() {
       this.$refs["dialogForm"].validate(valid => {
        if (valid) {
          if (this.newAndEditor === 1) {
            // 新增提交
             this.$message({ message:'添加成功',type: 'success' })
          } else {
            // 编辑提交
            this.$message({ message:'修改成功',type: 'success' })
          }
           this.dialogVisible = false;
        }
      })
    },
    // 获取基础题型下拉列表
    testquesTypeBasicList() {
       var url='/testques/testquestype/getTestquesTypeBasic'
       apiPost(url).then(response => {
          if (response.data.code === 200) {
             this.getTestquesTypeBasic =response.data.data
          } else{
            this.$message({ message:'获取基础题型下拉列表失败',type: 'error' })
          }
       }).catch(error => {
          console.log(error)
       })
    }
  },
  // 组件引用
  components: {
    Pagination
  },
  created() {
    // 进入页面加载相关内容,html未加载完成前
    this.pageContent()
   // this.testquesTypeBasicList() // 获取基础题型下拉列表
  }
};
</script>
