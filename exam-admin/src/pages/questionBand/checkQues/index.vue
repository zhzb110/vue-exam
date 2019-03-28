<template>
  	<div>
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
		    </el-form>
        <div class="text-right-b10">
          <el-button type="primary" plain @click="pageContent">查询</el-button>
        </div>
		</div>
	    <el-table :data="tableData" style="width: 100%;margin-top:10px" border >
	        <el-table-column type="index" width="50" label="序号" ></el-table-column>
	        <el-table-column prop="code" label="课程代码"  ></el-table-column>
	        <el-table-column prop="courseName" label="课程名称"></el-table-column>
	        <el-table-column prop="eduName" label="学历"></el-table-column>
	        <el-table-column prop="orgName" label="所属学院"></el-table-column>
          <el-table-column prop="courseLeader" label="课程状态">
             <template slot-scope="scope">
               <span v-if="scope.row.status===1">启用</span>
               <span v-if="scope.row.status===0">停用</span>
             </template>
          </el-table-column>
	        <el-table-column prop="leader" label="课程负责人"></el-table-column>
	        <el-table-column prop="stayNum" label="待审核">
          </el-table-column>
	        <el-table-column prop="adoptNum" label="审核通过"></el-table-column>
	        <el-table-column prop="rebutNum" width="100" label="审核驳回"></el-table-column>
	        <el-table-column label="操作" width="180">
		        <template slot-scope="scope">
		          <el-button type="primary" plain @click="createQuestion(scope.row.id)" class="el-table-btn">新增试题</el-button>
		          <el-button type="primary" plain @click="gotoQuesList(scope.row.id,scope.row.code,scope.row.courseName)" class="el-table-btn">试题列表</el-button>
		        </template>
		    </el-table-column>
	    </el-table>
      <pagination ref="page" :currentPage="currentPage" :pageSize="pageSize" :totalCount="totalCount" @on-current-page-change="onCurrentPageChange" @on-page-size-change="onPageSizeChange"/>
  	</div>
</template>
<style scoped>
.queList {
  padding: 0 40px;
  max-width: 1000px;
}
.queList li {
  height: 100px;
  margin-bottom: 20px;
  border: 1px solid #e5e5e5;
}
.courseImg {
  width: 100px;
  background: #e5e5e5;
  height: 100px;
  float: left;
  margin-right: 20px;
}
.courseInfo {
  float: left;
  padding-top: 15px;
  font-size: 20px;
}
.courseInfo sub {
  font-size: 16px;
  color: #999;
  position: relative;
  left: 15px;
  top: -4px;
}
.courseInfo p {
  color: #666;
  margin-top: 25px;
  font-size: 15px;
}
.courseInfo p span {
  margin-right: 60px;
}
.queList li .el-button {
  float: right;
  margin: 60px 10px 0 0;
}
</style>
<script>
import Pagination from "@/components/pagination" 
import { apiGet, apiPost } from "@/common/api"
export default {
  data() {
    return {
       // 当前页
      currentPage: 1,
      // 每页条数
      pageSize: 10,
      // 总共多少条数据
      totalCount: 0,
      queryForm: {
        orgId: "",
        id: ""
      },
      tableData: [
      ],
     departmentDropDownList:[],
     courseDropDownList:[],
    };
  },
  methods: {
    pageContent() {
      const page = Object.assign({}, this.queryForm);
      page.pageNum = this.currentPage
      page.pageSize = this.pageSize
      var url='/testques/testquesmodify/getTestquesModifyCourseByPage'
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
    createQuestion(courseId) {
      this.$router.push({
        path: "../maintainQues/createQues",
        query: { courseId: courseId}
      });
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
    gotoQuesList(courseId,courseCode,courseName) {
      this.$router.push({ path: "quesList", query: { courseId: courseId,courseCode: courseCode,courseName: courseName } });
    },
     departmentDropList() { // 获取下拉框失败
       var url='/common/queryDropDownByTypes'
       var types = {types: ["FACULTY"]}
       apiPost(url,types).then(response => {
          if (response.data.code === 200) {
            debugger
             this.departmentDropDownList =response.data.data.FACULTY
          } else{
            this.$message({ message:'获取院系下拉列表错误',type: 'error' })
          }
       }).catch(error => {
          console.log(error)
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
    }
  },
  components:{
    Pagination
  },
  created(){
    this.departmentDropList()
    this.pageContent()
  }
};
</script>
