<template>
  	<div>
  		<div class="contain" style="width:85%;float: left;">
  			<Quesview :viewData="questionList"></Quesview>
  		</div>
  		<dl class="details">
        <dt><el-button plain type="primary" size="medium" v-if="!this.$route.query.check" @click="checkPaper">审核通过</el-button></dt>
        <dt><el-button plain type="primary" size="medium" v-if="this.$route.query.check==1"  @click="submitCheckPaper">提交审核</el-button></dt>
        <dt><el-button plain type="warning" size="medium" @click="dialogVisible = true">驳回</el-button></dt>
  			<dt><el-button plain type="primary" size="medium" style="width:100%" @click="modify">修改</el-button></dt>
  			<dd>
  				卷面总分
  				<p><b>{{score}}</b> 分</p>
  			</dd>
  			<dd>
  				考试时长
  				<p><b>{{examTime}}</b> 分钟</p>
  			</dd>
  			<dd>
  				<p><b>{{digNum}}</b> 道大题</p>
  				<p><b>{{testquesNum}}</b> 道小题</p>
  			</dd>
  		</dl>

      <!--驳回弹出框-->
      <el-dialog title="审核" width="600px" :visible.sync="dialogVisible">
          <el-input type="textarea" v-model="backwords" :rows="5" placeholder="驳回意见" ></el-input>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" plain @click="submitReject()">确认</el-button>
          </div>
      </el-dialog>
  	</div>
</template>
<style scoped>
.courseTitle span {
  color: #999;
  font-size: 16px;
}

.el-table .el-input {
  width: 60px;
}
.strategyList li {
  line-height: 50px;
  background: #fcfcfc;
  box-shadow: 0 1px 2px #ccc;
  text-indent: 20px;
  margin-bottom: 15px;
  border-radius: 2px;
  cursor: pointer;
}
.strategyList li:hover {
  box-shadow: 0 1px 2px inset #ccc;
  background: #f3f3f3;
}
.details {
  width: 12%;
  float: right;
}
.details > dt{margin-bottom:15px}
.details dd {
  border-radius: 4px;
  border-radius: 4px;
  background: #f8f8f8;
  line-height: 26px;
  box-shadow: 0 1px 3px #ccc;
  padding: 10px;
  margin-top: 20px;
}
.details dd b {
  font-size: 18px;
  color: #409eff;
}

.details .el-button{width:100%}

</style>
<script>
import Quesview from "@/components/questionBand/quesviewPaper"
import { apiGet, apiPost } from "@/common/api"
export default {
  data() {
    return {
      // 当前页
      paperId:"",
      courseName: "", 
       questionList:[], // 查看试试卷的，存放详细信息
      examTime:'',
      testquesNum:'',
      score:'',
      digNum:'',
      courseId:'',
      backwords:'' // 驳回意见
    }
  },
  methods: {
    createQuestion(courseId) {
      this.$router.push({
        path: "../maintainQues/createQues",
        query: { courseId: courseId }
      });
    },
    // 试卷预览
    paperInformation(id) {
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
    createStrategy(id) {
      this.showQueTypeList = false;
      console.log(id);
    },
    goCheck(){
      this.$router.push({ path: "preList", query: { paperId: this.paperId } });  
    },
    modify(){
      this.$router.push({ path: "chooseQueType", query: { paperId: this.paperId } });  
    },
    parperData() {
      var url='/testques/testpaper/info/'+this.paperId
      apiGet(url).then(response => {
         if (response.data.code==200) {
          this.questionList=response.data.data   
          this.examTime=response.data.data.examTime
          this.testquesNum=response.data.data.testquesNum
          this.score=response.data.data.score
          this.digNum=response.data.data.captions.length
          this.courseId = response.data.data.courseId
         } else {      
           this.$message({ message:'获取试题内容失败',type: 'error' })
         }
      })
    },
    // 审核试卷
    checkPaper(){
      const page = {approveStatus:2,testpaperId:this.paperId}
      var url='/testques/testpapermodify/approveTestpaper'
      apiPost(url,page).then(response => {
        if (response.data.code ===200) {
          this.$message({ message:'审核成功',type: 'success' }) 
           this.$router.push({
              path: "../checkPaper",
              query: { courseId: this.courseId}
             });
        } else{
          this.$message({ message:response.message,type: 'error' })
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 驳回并审核下一题
    submitReject() {
     if(this.backwords===''||!this.backwords) {
       this.$message({ message:'驳回意见不能为空',type: 'error' })
       return 
     }
      const page = {approveStatus:3,testpaperId:this.paperId,opinion:this.backwords}
      var url='/testques/testpapermodify/approveTestpaper'
      apiPost(url,page).then(response => {
        if (response.data.code ===200) {
         this.$message({ message:'驳回成功',type: 'success' })
         this.dialogVisible= false
        } else{
          this.$message({ message:response.message,type: 'error' })
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 提交审核
    submitCheckPaper(){
      const page = [{id:this.paperId}]
      var url='/testques/testpaper/toApprove'
      apiPost(url,page).then(response => {
        if (response.data.code ===200) {
           this.$router.push({
              path: "paperList",
              query: { courseId: this.courseId}
             });
        } else{
          this.$message({ message:response.message,type: 'error' })
        }
      }).catch(error => {
        console.log(error)
      })
    }
  },
  created() { 
    this.paperId = this.$route.query.paperId
    this.parperData()
  },
  // 组件引用
  components: {
    Quesview
  }
};
</script>
