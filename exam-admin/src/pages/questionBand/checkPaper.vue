<template>
  	<div class="top-form">
	  <el-form :model="queryForm" label-width="120px" label-position="right">
	     <el-col :xs="24" :sm="12" :md="8" :lg="6">
              <el-form-item label="所属学院：" prop="orgId">
                 <el-select v-model="queryForm.orgId" filterable @change="courseDropList()">
                  <el-option label="请选择" value=""></el-option>
                  <el-option v-for="item in departmentDropDownList" :key="item.id" :label="item.name+'('+item.code+')'" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="6">
              <el-form-item label="课程：" prop="id">
                  <el-select v-model="queryForm.id">
                     <el-option label="请选择" value=""></el-option>
                    <el-option v-for="item in courseDropDownList" :key="item.id" :label="item.name+'('+item.code+')'" :value="item.id"></el-option>
                 </el-select>
              </el-form-item>
            </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
	        <el-form-item label="审核状态：" prop="checkStatus">
	            <el-select v-model="queryForm.checkStatus">
	              	<el-option key="0" label="全部" value=""></el-option>
	              	<el-option key="1" label="已保存" value="0"></el-option>
	                <el-option key="2" label="待审核" value="1"></el-option>
	                <el-option key="3" label="审核通过" value="2"></el-option>
	                <el-option key="4" label="审核驳回" value="3"></el-option>
	            </el-select>
	        </el-form-item>
        </el-col>
         <el-col :xs="24" :sm="12" :md="8" :lg="6">
              <el-form-item label="关联状态：" prop="relevanceStatus">
                  <el-select v-model="queryForm.relevanceStatus">
                      <el-option  label="全部" value=""></el-option>
                      <el-option  label="已关联" value="1"></el-option>
                      <el-option  label="未关联" value="0"></el-option>
                  </el-select>
              </el-form-item>
            </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
	         <el-form-item label="使用批次：" prop="batchId ">
              <el-select v-model="queryForm.batchId ">
                  <el-option key="0" label="全部" value="0"></el-option>
                  <el-option v-for="item in eaxmBatchDropDownList" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
	        <el-form-item label="试卷名称：" prop="name">
	            <el-input v-model="queryForm.name" />
	        </el-form-item>
        </el-col>
	  </el-form>
	  <div class="formBtns">
	  	<el-button type="primary" plain @click="addPaper">新增</el-button>
	    <el-button type="primary" plain @click="pageContent">查询</el-button>
	    <el-button type="success" plain @click="exportPaper">导出</el-button>
	  </div>
	  <el-table :data="tableData" style="width: 100%;margin-top:10px" border>
          <el-table-column type="index" label="序号"  ></el-table-column>
          <el-table-column prop="courseCode" label="课程代码"  ></el-table-column>
          <el-table-column prop="courseName" label="课程名称"></el-table-column>
          <el-table-column prop="examTime" label="考试时长"></el-table-column>
          <el-table-column prop="name" label="试卷名称"></el-table-column>
          <el-table-column prop="score" label="总分"></el-table-column>
           <el-table-column prop="createBy" label="创建人"></el-table-column>
          <el-table-column prop="createTime" label="创建时间"></el-table-column>
          <el-table-column prop="stayNum" label="待审核数"></el-table-column>
          <el-table-column prop="adoptNum" label="审核通过试题数"></el-table-column>
          <el-table-column prop="rebutNum" label="审核驳回试题数"></el-table-column>
          <el-table-column label="审核状态">
            <template slot-scope="scope">
              <span v-if="scope.row.approveStatus=== 0">已保存</span>
              <span v-else-if="scope.row.approveStatus=== 1">待审核</span>
              <span v-else-if="scope.row.approveStatus=== 2">审核通过</span>
              <span v-else-if="scope.row.approveStatus=== 3">审核驳回</span>
            </template>
          </el-table-column>
          <el-table-column label="关联状态">
            <template slot-scope="scope">
              <span v-if="scope.row.relevanceStatus==1">已关联</span>
              <span v-else>未关联</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="215">
            <template slot-scope="scope">
                <el-button type="primary" plain class="el-table-btn" @click="browse(scope.row.id)" >浏览</el-button>
                <el-button type="primary" v-if="scope.row.stayNum!=0&&scope.row.rebutNum==0" plain class="el-table-btn" @click="checkPaperOne(scope.row.id)">逐题审核</el-button>
                 <el-button type="primary" v-else-if="scope.row.rebutNum!=0" plain class="el-table-btn" disable>审核</el-button>
                <el-button type="primary" v-else plain class="el-table-btn"  @click="checkParper(scope.row.id)">审核</el-button>
                <el-button type="primary" plain class="el-table-btn" @click="editPaper(scope.row.id,scope.row.courseId)">编辑</el-button>
            </template>
        </el-table-column>
      </el-table>
        <pagination ref="page" :currentPage="currentPage" :pageSize="pageSize" :totalCount="totalCount" @on-current-page-change="onCurrentPageChange" @on-page-size-change="onPageSizeChange"/>
         <el-dialog title="试题预览" :visible.sync="dialogCheck" width="1000px">
         <Quesview :viewData="questionList" ref="qv"></Quesview>
      </el-dialog>
	</div>
</template>
<script>
import pagination from "@/components/pagination"
import { apiGet, apiPost } from "@/common/api"
import Quesview from "@/components/questionBand/quesviewPaper"
export default {
  data() {
    return {
  	 // 当前页
    	currentPage: 1,
    	// 每页条数
    	pageSize: 20,
    	// 总共多少条数据
    	totalCount: 0,
      dialogCheck:false,
  	 queryForm:{
  		orgId: "",
      id: "",
      approveStatus:'',
      batchId:'',
      relevanceStatus:'',
      name:''
  	 },
     questionList:[],
     departmentDropDownList:[],
     courseDropDownList:[],
     eaxmBatchDropDownList:[],
     tableData: []
    }
  },
  methods: {
    pageContent() {
      const page = Object.assign({}, this.queryForm);
      page.pageNum = this.currentPage
      page.pageSize = this.pageSize
      var url='/testques/testpapermodify/getTestpaperModifylistByPage'
      apiPost(url,page).then(response => {
        if (response.data.code ===200) {
          this.totalCount = parseInt(response.data.data.total)
          this.tableData =response.data.data.list
        } else{
          this.$message({ message:response.message,type: 'error' })
        }
      }).catch(error => {
        console.log(error)
      })
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
  	checkPaper(paperId){
  		this.$router.push({path:"./maintainPaper/preview", query:{paperId:paperId,isCheck:1}})
  	},
    departmentDropList() { // 获取下拉框失败
       var url='/common/queryDropDownByTypes'
       var types = {types: ["FACULTY","EXAM_BATCH"]}
       apiPost(url,types).then(response => {
          if (response.data.code === 200) {
             this.departmentDropDownList =response.data.data.FACULTY
              this.eaxmBatchDropDownList = response.data.data.EXAM_BATCH;
          } else{
            this.$message({ message:'获取下拉列表错误',type: 'error' })
          }
       }).catch(error => {
          console.log(error)
       })
    },
    browse(id) {
      this.dialogCheck=true
      var url='/testques/testpaper/info/'+id
      apiGet(url).then(response => {
         if (response.data.code==200) {
          this.questionList=response.data.data   
         } else {      
           this.$message({ message:'获取试题内容失败',type: 'error' })
         }
      })
    },
      // 学院课程联动查询
    courseDropList() {
      if (!this.queryForm.orgId || this.queryForm.orgId===''){
        this.courseDropDownList = []
        this.queryForm.id = ''
        return
      }
       var url='/sys/course/queryCourseDropDown'
       var types = { orgId:this.queryForm.orgId }
       apiPost(url,types).then(response => {
         if (response.data.code === 200) {
             this.courseDropDownList =response.data.data
          } else {
            this.$message({ message:'获取课程下拉列表错误',type: 'error' })
          }
       }).catch(error => {
          console.log(error)
       })
    },
    // 试卷中审核单个题型
    checkPaperOne(paperId){
      this.$router.push({ path: "./checkQues/checkOne?paperId="+paperId });
    },
    // 试卷审核
    checkParper(paperId){
      this.$router.push({path:"./maintainPaper/preview", query:{paperId:paperId}})
    },
    editPaper(id,courseId){
       this.$router.push({
        path: "./maintainPaper/chooseQueType",
        query: { paperId: id,courseId:courseId }
      });
    }
  },
  components:{
  	pagination,Quesview
  },
  created(){
    this.departmentDropList()
    this.pageContent()
  }
};
</script>
