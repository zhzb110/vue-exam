<template>
    <div>
      <div class="top-form">
        <el-form :model="queryForm" label-width="120px" label-position="right">          
            <el-col :xs="24" :sm="12" :md="8" :lg="6">
              <el-form-item label="审核状态：" prop="approveStatus">
                  <el-select v-model="queryForm.approveStatus">
                      <el-option key="" label="全部" value=""></el-option>
                      <el-option key="0" label="已保存" value="0"></el-option>
                      <el-option key="1" label="待审核" value="1"></el-option>
                      <el-option key="2" label="审核通过" value="2"></el-option>
                      <el-option key="3" label="审核驳回" value="3"></el-option>
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
                  <el-input v-model="queryForm.name" ></el-input>
              </el-form-item>
            </el-col>
            <div class="formBtns">
              <el-button type="primary" plain @click="createPaper" >新增</el-button>
              <el-button type="primary" plain @click="pageContent">查询</el-button>
              <el-button type="success" plain>导出</el-button>
            </div>
        </el-form>
    </div>
      <el-table :data="tableData" style="width: 100%;margin-top:10px" border @selection-change="handleSelectionChange" >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="courseCode" label="课程代码"  ></el-table-column>
          <el-table-column prop="courseName" label="课程名称"></el-table-column>
          <el-table-column prop="examTime" label="考试时长"></el-table-column>
          <el-table-column prop="name" label="试卷名称"></el-table-column>
          <el-table-column prop="score" label="总分"></el-table-column>
          <el-table-column prop="testquesNum" label="试题数"></el-table-column>
          <el-table-column prop="checkStatus" label="审核状态">
            <template slot-scope="scope">
              <span v-if="scope.row.approveStatus === 0">已保存</span>
              <span v-else-if="scope.row.approveStatus === 1">待审核</span>
              <span v-else-if="scope.row.approveStatus === 2">审核通过</span>
              <span v-else-if="scope.row.approveStatus === 3">审核驳回</span>
            </template>
          </el-table-column>
          <el-table-column label="关联状态">
            <template slot-scope="scope">
              <span v-if="scope.row.relevanceStatus==1">已关联</span>
              <span v-else>未关联</span>
            </template>
          </el-table-column>
          <el-table-column prop="createBy" label="创建人"></el-table-column>
          <el-table-column prop="createTime" label="创建时间"></el-table-column>
          <el-table-column label="操作" width="195">
            <template slot-scope="scope">
                <el-button type="primary" plain @click="browse(scope.row.id)" class="el-table-btn">浏览</el-button>
                <el-button type="primary" plain @click="editPaper(scope.row.id,scope.row.courseId)" class="el-table-btn">编辑</el-button>
                <el-button type="danger" plain @click="deleteParper(scope.row.id)" class="el-table-btn">删除</el-button>
            </template>
        </el-table-column>
      </el-table>
       <pagination ref="page" :currentPage="currentPage" :pageSize="pageSize" :totalCount="totalCount" @on-current-page-change="onCurrentPageChange" @on-page-size-change="onPageSizeChange"/>

      <el-dialog title="试题预览" :visible.sync="dialogCheck" width="1000px">
         <Quesview :viewData="questionList" ref="qv"></Quesview>
      </el-dialog>
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
import pagination from "@/components/pagination";
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
      dialogCheck:false, // 试卷预览弹出框
       questionList:[], // 查看试试卷的，存放详细信息
      courseId: this.$route.query.courseId,
      eaxmBatchDropDownList:[],
      queryForm: {
        approveStatus: "",
        relevanceStatus: "",
        batchId: "",
        name: ""
      },
      tableData: [],
      timesList: []
    };
  },
  methods: {
     pageContent() {
      const page = Object.assign({}, this.queryForm);
      page.pageNum = this.currentPage
      page.pageSize = this.pageSize
      page.courseId = this.courseId
      apiPost('/testques/testpaper/getTestpaperlistByPage',page).then(response => {
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
    createPaper() {
      this.$router.push({ path: "baseInfo?courseId="+this.courseId });
    },
    editPaper(id,courseId) {
      this.$router.push({
        path: "chooseQueType",
        query: { paperId: id,courseId:courseId }
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
// 批次下拉框数据
    intDropDown() {
      var types = {types: ["EXAM_BATCH"]}
      apiPost('/common/queryDropDownByTypes',types).then(response => {
        if (response.data.code === 200) {
          this.eaxmBatchDropDownList = response.data.data.EXAM_BATCH;
        } else{
          this.$message({ message:'获取下拉框数据错误',type: 'error' })
        }
      }).catch(error => {
        console.log(error)
      })
    },
    handleSelectionChange(val) {
      console.log(val);
    },
    // 删除试卷
    deleteParper(id){
      var url='/testques/testpaper/deleteTestpaper'
      var data = { id: id }
      apiPost(url,data).then(response => {
        if (response.data.code ===200) {
          this.$message({ message:'删除成功',type: 'success' })
          this.pageContent()
        } else {
          this.$message({ message:'删除失败',type: 'error' })
        }
      }).catch(error => {
        console.log(error)
      })
    }
  },
  created(){
    this.pageContent()
    this.intDropDown()
  },
  // 组件引用
  components: {
    pagination,Quesview
  }
};
</script>
