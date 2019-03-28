<template>
  	<div>
  		<div class="courseTitle"><span>{{this.$route.query.courseName}}</span> 
  			<el-button type="primary" :plain="!isBatch" @click="isBatch=true">批量录入</el-button> 
  			<el-button type="success" :plain="isBatch" @click="isBatch=false">逐题录入</el-button>
  		</div>
  		<div class="filter">
	  		<transition>
		  		<div v-show="isBatch">
            <div>
  		  			试题分类：<el-button @click="showClasses()" size="mini" >{{categoryShowName}}</el-button>
  		  			<label>题型：</label>
  						<el-select v-model="batchData.quesType" size="mini" @change="changeQuesType" style="width:120px">
                  <el-option v-for="item in quesTypeList" :key="item.quesType" :label="item.name" :value="item.quesType">
                  </el-option>
              </el-select>
              <label>难度：</label>
  						<el-select v-model="batchData.level" size="mini" style="width:120px">
                  <el-option v-for="item in queLevels" :key="item.id" :label="item.name" :value="item.id"></el-option>
  	          </el-select>
              <label v-show="batchData.quesType=='4'">主/客观：</label>
              <el-select v-model="diffType" size="mini" style="width:120px" v-show="batchData.quesType=='4'">
                  <el-option label="客观题" :value="1"></el-option>
                  <el-option label="主观题" :value="2"></el-option>
              </el-select>
              <el-button plain type="primary" @click="saveQueBatch" style="float:right;" >保存试题</el-button>
            </div>
            <div class="quesArea">
                <div class="inputArea">
                    <p>输入区 <el-button plain size="mini" type="primary" @click="quesRuleVisible=true" >查看示例</el-button></p>
                    <textarea ref="textInput" @input="markDownUpdate" rows="6" cols="60"></textarea>
                </div>
                <div class="viewArea">
                    <p>检查区 <span v-if="mistakeCount">共<b> {{mistakeCount}} </b>处错误</span></p>
                    <div ref="preview"> </div>
                </div>
            </div>
  		  	</div>
		  	</transition>
		  	<transition>
		  		<div v-show="!isBatch">
            <EditQues :defaultSet="defaultConfig" :quesCategory="quesCategory" />
		  		</div>
		  	</transition>
		  </div>
      <QuesRuleTips :quesRuleVisible="quesRuleVisible" :quesType="batchData.quesType" @closeDiolog="closeTips" />
      <el-dialog title="提示" width="600px" :visible.sync="showTips">
          更换题型会清空当前编辑，确定更换吗？
          <div slot="footer" class="dialog-footer">
            <el-button plain @click="showTips = false">取 消</el-button>
            <el-button plain type="primary" @click="quesTypeChange">确 定</el-button>
          </div>
      </el-dialog>
      <!--单元分类弹出框-->
      <category ref="cg" @category-parent="categoryParent"></category>
  	</div>
</template>
<style scoped>
.courseTitle{margin-top: -15px;}
.courseTitle > span {color: #409eff;font-size: 20px;margin-right: 50px;}
.courseTitle .el-button {margin-right: 20px;width:100px}
.filter label {margin-left: 30px;}
.diffType-create label {margin-left: 10px;}
.filter .el-select {width: auto;}
.quesArea{height:500px;border-radius:4px; margin-top:10px}
.quesArea > div{width:49.5%;height:600px;background:#eee;box-shadow:0 0 10px inset #aaa}
.quesArea p{line-height:40px;font-size:18px;width:95%;margin-left:5%}
.inputArea{float:left;border-right:1px solid #eee}
.inputArea textarea, .viewArea > div{margin:0 5%;width:86%;border:none;resize:none;height:500px;padding:15px 2%;background:#fff;overflow:auto}
.inputArea .el-button{margin-left:20px}
.viewArea{float:left;}
.viewArea p span{color:#666;font-size:12px}
.viewArea p b{color:#f00;font-size:14px;font-family:arial}
</style>
<script>
import { Editor, defaultConstant} from "@/common/util" 
import Pagination from "@/components/pagination"
import "../../../assets/css/question_import.css"
import QuesRuleTips from "@/components/questionBand/quesRuleTips"
import EditQues from "@/components/questionBand/editQues"
import category from "@/components/questionBand/category"
import { apiGet, apiPost } from "@/common/api"
export default {
  data() {
    return {
      // 当前页
      isBatch: true,
      // 每页条数
      quesRuleVisible:false,
      showTips:false,
      defaultConfig:defaultConstant.editorConfig,
      mistakeCount:0,
      courseName:'',
      batchData: {
        quesType: "1",
        oldQueType: 1,
        level: "1",
      },
      courseId:this.$route.query.courseId,
      queType: 1,
      // 总共多少条数据
      quesTypeList:[ // 传后台加“200”
        { quesType: "1", name: "单选题" },
        { quesType: "2", name: "多选题" },
        { quesType: "3", name: "判断题" },
        { quesType: "4", name: "填空题" },
        { quesType: "5", name: "简答题" }
      ],
      queLevels:[
        { id: "1", name: "1" },
        { id: "2", name: "2" },
        { id: "3", name: "3" },
        { id: "4", name: "4" },
        { id: "5", name: "5" }
      ],
      categoryShowName:'请选择分类',
      categoryShowId:'',
      diffType:2
    }
  },
  computed:{
  },

  methods: {
    dateChange(e) {
      this.queryForm.startTime = e[0];
      this.queryForm.endTime = e[1];
    },

    markDownUpdate(e){
      qt_type = this.batchData.quesType
      e.target.editor.update();
    },

    checkCategory(category) {
      this.batchData.category = category;
      this.showClasses = false;
    },

    changeQuesType(){
      if(this.$refs.textInput.value != ""){
        this.showTips = true
      }
    },
    quesTypeChange(){
        this.$refs.textInput.value = ""
        this.$refs.preview.innerHTML = ""
        this.showTips = false
        this.mistakeCount = 0
    },
    closeTips() {
      this.quesRuleVisible = false
    },
    // 保存试题
    saveQueBatch(){
      let queContent = this.$refs.preview.querySelector(".question")
      this.mistakeCount = queContent.querySelectorAll(".qt_error, .error, .check_error").length;
      if(this.mistakeCount > 0){
        this.$message.error("试题编辑不正确，请检查")
        return
      }else{
        let data = this.serializeFn()
        console.log(data)
        if(data===''){
           this.$message.error("试题分值不能为空")
           return
        }
        var url='/testques/testques/batchSaveTestques'
         apiPost(url,data).then(response => {
          if (response.data.code ===200) {
            this.$message.success("成功添加试题")
            this.$refs.textInput.value =''
            this.$refs.preview.innerHTML = ""
          } else{
            this.$message({ message:response.data.message,type: 'error' })
          }
        }).catch(error => {
          console.log(error)
        })
      }

    },
    // 单元分类弹出框显示
    showClasses() {
      this.$refs.cg.classesDialog(this.courseId)
    },
    serializeFn() {
      let data=[];
      this.$refs.preview.querySelectorAll(".question").forEach(function(element,index){
          let question =element.querySelector(".qt_title").innerHTML;
           if (qt_type=="1"||qt_type=="2"){
              let option1 = element.querySelector(".key_A") ? element.querySelector(".key_A").innerHTML:"";
              let answerFlag1 = $(".key_A").find('input').is(':checked')?'1':'0'
              let option2 = element.querySelector(".key_B") ? element.querySelector(".key_B").innerHTML:"";
              let answerFlag2 = $(".key_B").find('input').is(':checked')?'1':'0'
              let option3 = element.querySelector(".key_C") ? element.querySelector(".key_C").innerHTML:"";
              let answerFlag3 = $(".key_C").find('input').is(':checked')?'1':'0'
              let option4 = element.querySelector(".key_D") ? element.querySelector(".key_D").innerHTML:"";
              let answerFlag4 = $(".key_D").find('input').is(':checked')?'1':'0'
              let option5 = element.querySelector(".key_E") ? element.querySelector(".key_E").innerHTML:"";
              let answerFlag5 = $(".key_E").find('input').is(':checked')?'1':'0'
              let option6 = element.querySelector(".key_F") ? element.querySelector(".key_F").innerHTML:"";
              let answerFlag6 = $(".key_F").find('input').is(':checked')?'1':'0'
              let option7 = element.querySelector(".key_G") ? element.querySelector(".key_G").innerHTML:"";
              let answerFlag7 = $(".key_G").find('input').is(':checked')?'1':'0'
              let option8 = element.querySelector(".key_H") ? element.querySelector(".key_H").innerHTML:"";
              let answerFlag8 = $(".key_H").find('input').is(':checked')?'1':'0'
           } 
          let answer = answer=element.querySelector(".qt_answer").innerHTML;
          let analysis=element.querySelector(".qt_analysis")?element.querySelector(".qt_analysis").innerHTML:"";
          let score=element.querySelector(".qt_score").querySelector("input").value;
           if(analysis!==''){
            analysis=analysis.split("</span>")[1]
          }
          if(answer!==""){
            answer=answer.split("</span>")[1]
          }
          var simple={}
          if (qt_type=="1"||qt_type=="2") {
            answer=element.querySelector(".qt_answer").innerHTML.toUpperCase();
            var options=[]
            for(var i=1;i<=8;i++){
              var optionConent=eval('option'+i)
              var answerFlag=eval('answerFlag'+i)
              if(optionConent!=='') { // 选择题的选项内容
                optionConent= optionConent.split("</span>")[1]
                options.push({'optionContent':optionConent,'answerFlag':answerFlag,'sort':i+1})
              }
            }
            simple.options=options
            simple.answer=''
          } else if (qt_type=="3") {
             var options=[]
            answer=element.querySelector(".qt_answer").innerHTML.replace(/(正确|对)/,1).replace(/(错误|错)/,0);
             if(answer.indexOf('正确')>=0||answer.indexOf('对')>=0){
                options.push({'optionContent':'正确','answerFlag':1,'sort':1})
                options.push({'optionContent':'错误','answerFlag':0,'sort':2})    
             } else {
               options.push({'optionContent':'错误','answerFlag':1,'sort':2})    
               options.push({'optionContent':'正确','answerFlag':0,'sort':1}) 
             }
             simple.options=options
            
          //  simple.options = {'optionContant':optionConent,'answerFlag':answerFlag,'scort':i}
          } else if (qt_type=="4") { // 填空题
            answer=(element.querySelector(".qt_answer").innerHTML).replace(/(，|,)/,'&<gap@>')
            var number= (question.split('_____')).length-1;
            simple.spaceNum= number
            simple.answer=answer
          }
          else {
            answer=answer;
          }
          simple.content = question.split("</span>")[1]
          simple.answerAnalysis = analysis
          simple.courseId= this.courseId
          if(score===''){
            return ''
          }
          simple.score= score
          simple.diffType = this.diffType // 主观题
          simple.difficultyLevel= this.batchData.level
          simple.typeId ="200"+this.batchData.quesType
          if (this.categoryShowId!=''){
            simple.classifyId = this.categoryShowId
          }
          data.push({'simple':simple,'type':0})
      }.bind(this));
      // 题型判断
      return data;
    },
    // 分类选择
    categoryParent(id,name) {
      this.categoryShowName = name
      this.categoryShowId = id
    }
  },
  mounted() {
    new Editor(this.$refs.textInput, this.$refs.preview);
    // 获取试题分类  
  },
  // 组件引用
  components: {
    Pagination, QuesRuleTips, EditQues,category
  }
}
</script>
