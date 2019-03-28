<template>
  	<div>
  		<p class="courseTitle margin-b10">{{courseCode}} {{courseName}}</p>
  		<div class="top-form">
	  		<el-form :model="queryForm" label-width="120px" label-position="right">
		  		<el-col :xs="24" :sm="12" :md="8" :lg="6">
			        <el-form-item label="题型：" prop="typeId">
			            <el-select v-model="queryForm.typeId">
			                <el-option label="全部" value=""></el-option>
			                <el-option v-for="item in testQuesTypeDropDownList" :key="item.id" :label="item.name" :value="item.id">
			                </el-option>
			            </el-select>
			        </el-form-item>
		        </el-col>
		        <el-col :xs="24" :sm="12" :md="8" :lg="6">
			        <el-form-item label="试题分类：" prop="classifyId">
			            <el-select v-model="queryForm.classifyId">
			              	<el-option label="全部" value=""></el-option>
			              	<el-option v-for="item in courseClassifyDropDownList" :key="item.id" :label="item.name" :value="item.id"></el-option>
			            </el-select>
			        </el-form-item>
		        </el-col>
		        <el-col :xs="24" :sm="12" :md="8" :lg="6">
			        <el-form-item label="试题难度：" prop="difficultyLevel">
			            <el-select v-model="queryForm.difficultyLevel">
			              	<el-option label="全部" value=""></el-option>
                    <el-option key="1" label="1" value="1"></el-option>
                    <el-option key="2" label="2" value="2"></el-option>
                    <el-option key="3" label="3" value="3"></el-option>
                    <el-option key="4" label="4" value="4"></el-option>
                    <el-option key="5" label="5" value="5"></el-option>
			            </el-select>
			        </el-form-item>
		        </el-col> 
		        <el-col :xs="24" :sm="12" :md="8" :lg="6">
			        <el-form-item label="审核状态：" prop="approveStatus">
			            <el-select v-model="queryForm.approveStatus">
			                <el-option label="全部" value=""></el-option>
			                <el-option key="0" label="待审核" value="0"></el-option>
			                <el-option key="1" label="审核通过" value="1"></el-option>
			                <el-option key="2" label="审核驳回" value="2"></el-option>
			            </el-select>
			        </el-form-item>
		        </el-col>
             <el-col :xs="24" :sm="12" :md="8" :lg="6">
              <el-form-item label="试题状态：" prop="status">
                  <el-select v-model="queryForm.status">
                      <el-option label="全部" value=""></el-option>
                      <el-option key="1" label="启用" value="1"></el-option>
                      <el-option key="0" label="停用" value="0"></el-option>
                  </el-select>
              </el-form-item>
            </el-col>
		        <el-col :xs="24" :sm="12" :md="8" :lg="6">
			        <el-form-item label="试题编号：" prop="code">
			        	<el-input v-model="queryForm.code" placeholder="请输入试题编号"></el-input>
			        </el-form-item>
			    </el-col>
			    <el-col :xs="24" :sm="12" :md="8" :lg="6">
			        <el-form-item label="关键字：" prop="content">
			        	<el-input v-model="queryForm.content" ></el-input>
			        </el-form-item>
			    </el-col>
			    <el-col :xs="24" :sm="12" :md="8" >
		          <el-form-item label="创建时间：">
				    <el-date-picker value-format="yyyy-MM-dd" @change="dateChange" v-model="queryForm.payTime" type="daterange" range-separator=">" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
		          </el-form-item>
		        </el-col>
		    </el-form>
		    <div class="formBtns">
		        <el-button type="primary" plain @click="pageContent">查询</el-button>
		        <el-button type="primary" plain @click="createQuestions">创建试题</el-button>
		        <el-button type="success" plain @click="exportQuestions">导出</el-button>
		    </div>
		</div>
	    <div class="content-table">
	     	<el-table :data="tableData" style="width: 100%" border tooltip-effect="dark">
		        <el-table-column type="index"  width="50" label="序号" ></el-table-column>
		        <el-table-column prop="typeName" label="题型" width="65"></el-table-column>
		        <el-table-column prop="classifyName" label="分类" width="65"></el-table-column>
		        <el-table-column prop="code" label="试题编号"></el-table-column>
		        <el-table-column label="题干" width="180" show-overflow-tooltip>
              <template slot-scope="scope">
                <div v-html='scope.row.content' class="spot"></div>
              </template>  
            </el-table-column>
		        <el-table-column prop="difficultyLevel" label="难度"  width="60"></el-table-column>
		        <el-table-column prop="useFlag" label="试题状态">
              <template slot-scope="scope">
                <span v-if="scope.row.useFlag==0">停用</span>
                <span v-if="scope.row.useFlag==1">启用</span>
              </template>
            </el-table-column>
		        <el-table-column prop="approveStatus" label="审核状态">
              <template slot-scope="scope">
                <span v-if="scope.row.approveStatus==0">待审核</span>
                <span v-if="scope.row.approveStatus==1">审核通过</span>
                <span v-if="scope.row.approveStatus==2">审核驳回</span>
              </template>
            </el-table-column>
            </el-table-column>
		        <el-table-column prop="createBy" label="创建人"></el-table-column>
		        <el-table-column prop="createTime" label="创建时间" width="140"></el-table-column>
		        <el-table-column prop="approveTime" label="审核时间" width="140"></el-table-column>
		        <el-table-column prop="operation" label="操作" width="190">
			        <template  v-if="true" slot-scope="scope" >
			        	<el-button type="primary" plain @click="checkQuestion(scope.row.id)" class="el-table-btn">浏览</el-button>
			            <el-button type="primary" plain @click="edtiorQuestion(scope.row.id)" class="el-table-btn">编辑</el-button>
			           <el-button class="el-table-btn" v-if="scope.row.useFlag===0" type="primary" plain @click="enableQuestion(scope.row.id)" >启用</el-button>
                 <el-button class="el-table-btn" v-if="scope.row.useFlag===1" type="danger" plain @click="stopQuestion(scope.row.id)" >停用</el-button>
			         </template>
			    </el-table-column>
			</el-table>
	     	<!--分页组件-->
	     <pagination ref="page" :currentPage="currentPage" :pageSize="pageSize" :totalCount="totalCount"
            @on-current-page-change="onCurrentPageChange" @on-page-size-change="onPageSizeChange"/>
	    </div>
      <el-dialog title="查看试题" :visible.sync="dialogCheck" width="800px">
         <Quesview :viewData="questionList" ref="qv"></Quesview>
         <div>
           <p class="margin-b10 modifty-record-title">审核及修改记录</p>
           <div class="modifty-record"  v-for="item in modifyRecord">
            <span v-if="item.createBy">{{item.createBy.substr(item.createBy.length-1,item.createBy.length)}}</span>
            <span v-else></span>
            <p><span class="modifty-record-name">{{item.createBy}}</span><span class="modifty-record-time">{{item.createTime}}</span></p>
            <p>{{item.content}}</p>
           </div>
         </div>
      </el-dialog>
  	</div>
</template>
<script>
import Pagination from "@/components/pagination"
import { apiGet, apiPost } from "@/common/api"
import Quesview from "@/components/questionBand/quesview"
export default {
  data() {
    return {
      courseId: this.$route.query.courseId,
      courseCode: this.$route.query.courseCode,
      courseName: this.$route.query.courseName,
      dialogCheck:false,
      questionList:[], // 查看试题的，存放详细信息
      queryForm: {
        typeId: "",
        classifyId: "",
        difficultyLevel: "",
        status: "0",
        approveStatus: "",
        code: "",
        content: "",
        startTime: "",
        endTime: ""
      },
      modifyRecord:[], // 浏览时显示修改记录
      tableData: [],
      // 当前页
      currentPage: 1,
      // 每页条数
      pageSize: 20,
      // 总共多少条数据
      totalCount: 0,
      testQuesTypeDropDownList:[],//应用题型下拉列表
      courseClassifyDropDownList:[]//试题分类下拉列表
    };
  },
  methods: {
    pageContent() {
      this.queryForm.courseId = this.courseId;
      const page = Object.assign({}, this.queryForm);
      page.pageNum = this.currentPage
      page.pageSize = this.pageSize
      apiPost('/testques/testques/getTestqueslistByPage',page).then(response => {
        if (response.data.code ===200) {
          this.totalCount = parseInt(response.data.data.total)
          this.tableData =response.data.data.list;
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
    // 获取应用题型下拉列表
    getTestQuesType() {
      apiPost('/testques/testquestype/getTestquesTypeApply').then(response => {
        if (response.data.code === 200) {
          this.testQuesTypeDropDownList = response.data.data;
        } else{
          this.$message({ message:response.message,type: 'error' })
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 获取课程下试题分类下拉列表
    getCourseClassify() {
      var data= {courseId:this.courseId}
      apiPost('/testques/testques/getCourseClassify',data).then(response => {
        if (response.data.code === 200) {
          this.courseClassifyDropDownList = response.data.data
        } else{
          this.$message({ message:response.message,type: 'error' })
        }
      }).catch(error => {
        console.log(error)
      })
    },
    dateChange(e) {
      this.queryForm.startTime = new Date(e[0]);
      this.queryForm.endTime = new Date(e[1]);
    },
    createQuestions() {
      this.$router.push({ path: "createQues?courseId="+this.courseId+"&courseName="+this.courseName });
    },

    exportQuestions() {},

    checkQuestion(quesId) { // 查看试题做成弹出框形式
      this.dialogCheck=true
      var url='/testques/testques/info/'+quesId
      apiGet(url).then(response => {
         if (response.data.code==200) {
          this.questionList=[]
          if(response.data.data.type==0){
             this.questionList.push(response.data.data.simple)
          } else{
            this.questionList.push(response.data.data.complex)
          }     
         } else {      
           this.$message({ message:'获取试题内容失败',type: 'error' })
         }
      })
      // 试题的修改及录
      this.recordList(quesId)
    },
    recordList(quesId){
      // 试题的修改记录
      var url='/testques/testques/testquesModifyInfo/'+quesId
      apiGet(url).then(response => {
         if (response.data.code==200) {
          this.questionList=[]
          this.modifyRecord=response.data.data
         } else {      
           this.$message({ message:'获取试题内容失败',type: 'error' })
         }
      })
    },
    edtiorQuestion(quesId) {
    	this.$router.push({ path: "editQues", query:{quesId:quesId,courseId:this.courseId} });
    },

    switchQuestion(quesId) {
    	this.$router.push({ path: "editQues" });
    },
    enableQuestion(id){ // 启用
      var url='/testques/testques/useFlagTestques'
      var data = { id: id,useFlag:1 }
      apiPost(url,data).then(response => {
        if (response.data.code ===200) {
          this.$message({ message:'启用成功',type: 'success' })
          this.pageContent()
        } else {
          this.$message({ message:'启用失败',type: 'error' })
        }
      }).catch(error => {
        console.log(error)
      })
    },
    stopQuestion(id){ // 停用
      var url='/testques/testques/useFlagTestques'
      var data = { id: id,useFlag:0}
      apiPost(url,data).then(response => {
        if (response.data.code ===200) {
          this.$message({ message:'停用成功',type: 'success' })
          this.pageContent()
        } else {
          this.$message({ message:'停用失败',type: 'error' })
        }
      }).catch(error => {
        console.log(error)
      })
    },
   
  },
  created() {
    this.getTestQuesType();
    this.getCourseClassify();
    this.pageContent();
  },
  // 组件引用
  components: {
    Pagination,Quesview
  }
};
</script>
