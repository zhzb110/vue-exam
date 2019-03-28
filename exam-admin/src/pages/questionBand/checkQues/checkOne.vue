<template>
  	<div>
  		<div class="courseTitle">
  			{{courseName}}
  		</div>
  		<div class="contain" >
  			  <QuesCheck :questionList="questionList" />
  		</div>
  		<dl class="details">
        <dd><el-button plain type="primary" size="medium" @click="checkNext">通过并审核下一个</el-button></dt>
        <dd><el-button plain type="warning" size="medium" @click="dialogVisible = true">驳回</el-button></dt>
  			<dd><el-button plain type="primary" size="medium" style="width:100%" @click="modify()">修改</el-button></dt>
  			<dd>
          待审核<p>{{stayNum}}</p>
  			</dd>
  		</dl>
      <!--驳回弹出框-->
      <el-dialog title="审核" width="600px" :visible.sync="dialogVisible">
          <el-input type="textarea" v-model="backwords" :rows="5" placeholder="驳回意见" ></el-input>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" plain v-if="stayNum!=1" @click="submitReject" >驳回并审核下一题</el-button>
            <el-button type="primary" plain v-else @click="submitReject">审核</el-button>
          </div>
      </el-dialog>
  	</div>
</template>
<style scoped>
.courseTitle span {color: #999;font-size: 16px;box-shadow: 0 1px 5px #e3e3e3;padding: 15px;border-radius: 4px; margin-bottom: 20px;}
.el-table .el-input { width: 60px;}
.strategyList li {line-height: 50px;background: #fcfcfc;box-shadow: 0 1px 2px #ccc;text-indent: 20px;margin-bottom: 15px;border-radius: 2px;cursor: pointer;}
.strategyList li:hover {box-shadow: 0 1px 2px inset #ccc;background: #f3f3f3;}
.details {width: 12%;float: right;}
.details dd {margin-bottom: 10px;}
.details dd:last-child {text-align:center;border-radius: 4px;border-radius: 4px;background: #f8f8f8;
  line-height: 26px;box-shadow: 0 1px 3px #ccc; padding: 10px; margin-top: 20px;}
.details dd p{color:#409eff;font-size:18px;font-weight:bold}
.details .el-button{width:100%}
.contain{width: 86%;float: left;overflow: hidden;}
</style>
<script>
import QuesCheck from "@/components/questionBand/quesCheck"
import { apiGet, apiPost } from "@/common/api"
export default {
  data() {
    return {
      // 当前页
      stayNum: '',
      backwords:"",
      courseName:'',
      dialogVisible:false,
      questionList: [],
      typeName:'',
      courseId:'',
      testId:'',
      oldTestId:'',
      paperId:''
    };
  },
  methods: {
    pageContent(){
      var url
      if (this.testId==='') {  // this.$route.query.courseId
         url='/testques/testquesmodify/oneByOneTestques/'+this.$route.query.courseId
      } else{
         url='/testques/testquesmodify/info/'+this.testId+'/'+this.courseId
      }
      apiGet(url).then(response => {
         if (response.data.code==200) {
          this.questionList=[]
          this.stayNum=response.data.data.stayNum
          this.courseName=response.data.data.courseName
          if (response.data.data.type==0) {
            this.questionList.push(response.data.data.simple)
            this.typeName = response.data.data.simple.typeName
            this.courseName=response.data.data.simple.courseName
            this.oldTestId = response.data.data.simple.id
          } else{
           this.questionList.push(response.data.data.complex)
            this.typeName = response.data.data.complex.typeName
            this.courseName=response.data.data.complex.courseName
             this.oldTestId = response.data.data.complex.id
          }
         } else {      
           this.$message({ message:'获取试题内容失败',type: 'error' })
         }
      })
    },
    pagePaperOne(){
      var page={testpaperId:this.paperId}
      var url='/testques/testpapermodify/oneByOneTestques/'
      apiPost(url,page).then(response => {
         if (response.data.code==200) {
          this.questionList=[]
          this.stayNum=response.data.data.stayNum
          this.courseName=response.data.data.courseName
          if (response.data.data.type==0) {
            this.questionList.push(response.data.data.simple)
            this.typeName = response.data.data.simple.typeName
            this.courseName=response.data.data.simple.courseName
            this.oldTestId = response.data.data.simple.id
          } else{
           this.questionList.push(response.data.data.complex)
            this.typeName = response.data.data.complex.typeName
            this.courseName=response.data.data.complex.courseName
            this.oldTestId = response.data.data.complex.id
          }
         } else {      
           this.$message({ message:'获取试题内容失败',type: 'error' })
         }
      })
    },
    // 审核通过
    checkNext() {
      const page = {approveStatus:1,testId:this.oldTestId}
      var url='/testques/testquesmodify/approveTestques'
      apiPost(url,page).then(response => {
        if (response.data.code ===200) {
          if(this.paperId!=''&& this.paperId){
             if(this.stayNum!=1){
               this.pagePaperOne()
             } else{ // 试卷中试题审核完毕，跳到试卷审核页面
               this.$router.push({path:"./maintainPaper/preview", query:{paperId:this.paperId}})
             }
          } else{
            this.testId = '' // 审核下一题，获取相关内容
            if(this.stayNum!=1){
              this.pageContent()
            } else{ // 试题审核完毕
              // 跳到试题审核列表页面
               this.$router.push({
                path: "../maintainQues/createQues",
                query: { courseId: courseId}
              });
            } 
          }        
        } else{
          this.$message({ message:response.message,type: 'error' })
        }
      }).catch(error => {
        console.log(error)
      })
    },
    modify(){
       let currentQue = this.questionList[this.currentIndex]
       this.$router.push({ path: "../maintainQues/editQues", query: { queId: this.testId} }); 
    },
    // 驳回并审核下一题
    submitReject() {
     if(this.backwords===''||!this.backwords) {
       this.$message({ message:'驳回意见不能为空',type: 'error' })
       return 
     }
      const page = {approveStatus:2,testId:this.testId,opinion:this.backwords}
      var url='/testques/testquesmodify/approveTestques'
      apiPost(url,page).then(response => {
        if (response.data.code ===200) {
         this.$message({ message:'驳回成功',type: 'success' })
         this.dialogVisible= false
         this.testId = '' // 审核下一题，获取相关内容
         this.pageContent()
        } else{
          this.$message({ message:response.message,type: 'error' })
        }
      }).catch(error => {
        console.log(error)
      })
    },
  },
  created(){
    // 获取试题详情
    if(this.$route.query.paperId&&this.$route.query.paperId!=''){ // 试卷下题目审核
      this.paperId=this.$route.query.paperId
       this.pagePaperOne()
    } else {
      this.testId = this.$route.query.testId
      this.courseId = this.$route.query.courseId
      this.pageContent()
    }

  },
  // 组件引用
  components: {
    QuesCheck
  },
};
</script>
