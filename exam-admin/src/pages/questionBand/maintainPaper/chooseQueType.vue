<template>
  	<div>
  		<div class="courseTitle">
  			{{courseName}}
  			<el-button plain type="primary" @click="save" >保存试卷</el-button>
  		</div>
  		<div class="contain">
  			<dl>
  				<dt>{{strategyInfo.quesCount}} 道题，{{strategyInfo.totalScore}} 分</dt>
  				<dd v-for="(item, index) in questionTypeList"  >
  					<div>{{item.name}}  <i class="el-icon-delete" title="删除" @click="currentQuesDelete(index)" ></i></div>
  					<p>{{item.count}}道题，{{item.score}}分  
  						<i v-if="index >= questionTypeList.length-1" class="el-icon-sort-down" :style="'color:#ccc'" ></i>
  						<i v-else class="el-icon-sort-down" @click="downQues(index)"></i>
  						<i v-if="index <= 0" class="el-icon-sort-up" :style="'color:#ccc'"></i>
  						<i v-else class="el-icon-sort-up"   @click="upQues(index)"></i>
  					</p>
  				</dd>
  			</dl>
  			<div class="paper">
  				<p>{{paperName}}</p>
          <ul>
  					<li v-for="(item,inde) in questionTypeList">
  						<el-form :model="item.captionOne">
                <div class="topRow">
		  							<el-form-item  prop="testquesTitleName">
						        	<el-input v-model="item.captionOne.testquesTitleName" />
						        </el-form-item>
						        <el-form-item label="每题" prop="testquesScore" label-width="50px" label-position="right" style="margin:0 20px">
						        	<el-input type="number" min="0" style="width:70px;text-align:center;" v-model="item.captionOne.testquesScore" @blur="blurQueType(inde,item.captionOne.testquesScore,item.parentId)"/> 分
						        </el-form-item>
		  							<el-checkbox v-model="item.captionOne.testquesDisorder" v-if="item.parentId!=1006||item.parentId!=1007">试题乱序</el-checkbox>
		  							<el-checkbox v-model="item.captionOne.optionDisorder" v-if="item.parentId==1001||item.parentId==1002">选项乱序</el-checkbox>
                  </div>
		  					<div style="margin-bottom: 10px">
		  						<p>答题说明：</p>
                  <UE :ueditorConfig="defaultConfig" ref="option" :defaultContent="item.captionOne.answerNote"></UE>
		  					</div>
                <div v-for="(itemm,index) in item.captionOne.content" style="border-bottom: 1px dashed #e5e5e5;padding-bottom: 10px;margin-bottom: 10px">
                    <div class="selectQues" v-if="itemm.parentTypeId != '1006'&& itemm.parentTypeId != '1007'" style="margin-bottom: 0px;">
                      <div style="min-height: 55px">
                        <div class="no">{{index+1}}. </div>
                        <div class="title" v-html="itemm.content"></div>
                        <span><el-input type="number" v-model="itemm.score" @blur="blurQueTypeSmall(inde,item.captionOne.testquesScore,itemm.score)"/> 分</span>
                        <span v-if="itemm.approveStatus==1" style="top: 30px">审核通过</span>
                        <span v-else style="top: 30px;color: red" >待审核</span>
                      </div>
                    </div>
                   <div class="selectQues" v-if="itemm.parentTypeId == '1001'|| itemm.parentTypeId == '1002'" >
                    <ul class="options" v-if="itemm.parentTypeId == '1001'">
                        <li v-for="(option,indexx) in itemm.options" :class="option.answerFlag == 1 ? 'active clear':'clear'">
                          <samp>{{String.fromCharCode(indexx+65)}}</samp> 
                          <div v-html="option.optionContent"></div>
                        </li>
                    </ul>
                    <ul class="options" v-if="itemm.parentTypeId == '1002'">
                        <li v-for="(option,indexx) in itemm.options" :class="option.answerFlag == 1 ? 'active clear':'clear'">
                          <samp style="border-radius:0">{{String.fromCharCode(indexx+65)}}</samp> 
                          <div v-html="option.optionContent"></div>
                        </li>
                    </ul>              
                  </div>
                  <div class="selectQues" v-if="itemm.parentTypeId == '1003'">
                      <div class="answer">答案： 
                       <i v-if="itemm.options[0].answerFlag == 1&&itemm.options[0].optionContent=='正确'" class="el-icon-check"></i>
                       <i v-if="itemm.options[1].answerFlag == 1&&itemm.options[1].optionContent=='错误'" class="el-icon-close"></i>
                     </div>
                  </div>
                  <div class="selectQues" v-if="itemm.parentTypeId == '1004'">
                    <div class="answerTk"><samp>答案：</samp> 
                      <ul><li v-for="(answer,indexxx) in itemm.answer.split('&<multi@>')"><div class="orderInx">{{indexxx+1}}</div> {{answer}}</li></ul>
                    </div>
                  </div>
                  <div class="selectQues" v-if="itemm.parentTypeId == '1005'">
                      <div class="answer"><span style="float:left">答案：</span><div v-html="itemm.answer || '无'"></div>
                     </div>
                  </div>
                  <div v-if="itemm.parentTypeId == '1006'||itemm.parentTypeId == '1007'">
                     <div style="overflow:hidden;">
                        <div class="no">{{index+1}}. </div>
                        <div class="title" v-html="itemm.content"></div>
                        <span>{{itemm.score}} 分</span>
                     </div>
                     <div v-for="(que,index2) in itemm.subSimple" style="margin-left: 10px;">
                      <div class="selectQues" v-if="que.parentTypeId == '1001'|| que.parentTypeId == '1002'" >
                        <div>
                          <div class="no">{{index2+1}}. </div>
                          <div class="title" v-if="que.parentTypeId == '1002'" v-html="'<span>[多选题] </span>'+que.content"></div>
                           <div class="title" v-if="que.parentTypeId == '1001'" v-html="'<span>[单选题]</span>'+que.content"></div>
                          <span><el-input type="number" v-model="que.score" @blur="blurQueTypeSmall(inde,item.captionOne.testquesScore,que.score)"/> 分</span>
                        </div>
                        <ul class="options" v-if="que.parentTypeId == '1001'">
                            <li v-for="(option,indexx) in que.options" :class="option.answerFlag == 1 ? 'active clear':'clear'">
                              <samp>{{String.fromCharCode(indexx+65)}}</samp> 
                              <div v-html="option.optionContent"></div>
                            </li>
                        </ul>
                        <ul class="options" v-if="que.parentTypeId == '1002'">
                            <li v-for="(option,indexx) in que.options" :class="option.answerFlag == 1 ? 'active clear':'clear'">
                              <samp style="border-radius:0">{{String.fromCharCode(indexx+65)}}</samp> 
                              <div v-html="option.optionContent"></div>
                            </li>
                        </ul>              
                      </div>
                      <div class="selectQues" v-if="que.parentTypeId == '1003'">
                        <div>
                            <div class="no">{{index2+1}}. </div>
                            <div class="title" v-html="'<span>[判断题] </span>'+que.content"></div>
                            <span><el-input type="number" v-model="que.score" @blur="blurQueTypeSmall(inde,item.captionOne.testquesScore,que.score)"/> 分</span>
                         </div>
                          <div class="answer">答案： 
                           <i v-if="que.options[0].answerFlag == 1&&que.options[0].optionContent=='正确'" class="el-icon-check"></i>
                           <i v-if="que.options[1].answerFlag == 1&&que.options[1].optionContent=='错误'" class="el-icon-close"></i>
                         </div>
                      </div>
                      <div class="selectQues" v-if="que.parentTypeId == '1004'">
                          <div>
                            <div class="no">{{index2+1}}.</div>
                            <div class="title" v-html="'<span>[填空题] </span>'+que.content"></div>
                            <span><el-input type="number" v-model="que.score" @blur="blurQueTypeSmall(inde,item.captionOne.testquesScore,que.score)"/> 分</span>
                         </div>
                        <div class="answerTk"><samp>答案：</samp> 
                          <ul><li v-for="(answer,indexxx) in que.answer.split('&<multi@>')"><div class="orderInx">{{indexxx+1}}</div> {{answer}}</li></ul>
                        </div>
                      </div>
                      <div class="selectQues" v-if="que.parentTypeId == '1005'">
                         <div>
                            <div class="no">{{index2+1}}.</div>
                            <div class="title" v-html="'<span>[简答题] </span>'+que.content"></div>
                            <span><el-input type="number" v-model="que.score" @blur="blurQueTypeSmall(inde,item.captionOne.testquesScore,que.score)"/> 分</span>
                         </div>
                          <div class="answer"><span style="float:left">答案：</span><div v-html="que.answer || '无'"></div>
                         </div>
                      </div>
                      <div><span style="float:left">解析：</span><div v-html="que.answerAnalysis || '无'"></div></div>
                    </div>
                  </div>
                  <div v-if="itemm.parentTypeId != '1006'&&itemm.parentTypeId != '1007'"><span style="float:left">解析：</span><div v-html="itemm.answerAnalysis || '无'"></div></div>
                   <div class="operation-detete">
                      <i v-if="index <= 0" class="el-icon-sort-up" :style="'color:#ccc'"></i>
                      <i v-else class="el-icon-sort-up" @click="singleUp(inde,index)"></i>
                      <i v-if="index >= item.captionOne.content.length-1" class="el-icon-sort-down" :style="'color:#ccc'"></i>
                      <i v-else class="el-icon-sort-down" @click="singleDown(inde,index)"></i>
                      <i class="el-icon-delete"  @click="singleDelete(inde,index)"></i>
                  </div>
                  </div>
                  <div style="border-bottom: 1px solid #e5e5e5; padding-bottom: 15px; margin-bottom:25px;overflow:hidden;"> <el-button plain type="primary" size="medium" class="margin-t10" @click="showChooseQuesDialog(item.testquesTypeId)">选择试题</el-button></div>
	  					</el-form>
            
  					</li>
  				</ul>
  				<el-button plain type="primary" size="medium" @click="showQueTypeList=true">选择题型添加大题</el-button>
  			</div>
  		</div>
  		<!--选择试题出框-->
	    <choose-ques ref='cq' @choose-ques-content='chooseQuesContent'></choose-ques>

      <!--题型列表弹出框-->
      <el-dialog title="请选择策略类型" width="500px" :visible.sync="showQueTypeList">
        <ul class="strategyList">
          <li v-for="item in queTypesList" :key="item.id" @click="createStrategy(item.id,item.name,item.parentId)" >{{item.name}}</li>
        </ul>
      </el-dialog>
  	</div>
</template>
<script>
import { defaultConstant} from "@/common/util" 
import pagination from "@/components/pagination";
import chooseQues from "@/components/questionBand/chooseQues"
import UE from "@/components/UEditor"
import { apiGet, apiPost } from "@/common/api"
export default {
  data() {
    return {
      // 当前页
      paperId:"",
      defaultConfig:defaultConstant.editorConfig,
      courseName: this.$route.query.courseName,
      paperName:this.$route.query.name,
      answerExplain:'', // 答案说明
      currentQues: 0,
      showChooseQues: false,
      showQueTypeList: false,
      strategyInfo: {
        totalScore: 0,
        quesCount: 0
      },
      questionTypeList: [],// 试题类型显示p
      queryFormList: [], // 卷面试题
      queTypesList: [], // 试题下拉
      questionOneList:[],// 临时存放一个插入试题的内容
      addQuesLength:'', //  临时存放一个插入试题的长度
      config: {
        initialFrameWidth: null,
        initialFrameHeight: 350
      },
      courseId: this.$route.query.courseId,
      mode:1,
    };
  },
  methods: {
    parperInformation(){
      apiGet('/testques/testpaper/info/'+this.paperId).then(response => {
        if (response.data.code ===200) {
          this.questionTypeList=[]
          this.courseName=response.data.data.courseName
          this.paperName=response.data.data.name
          this.courseId=response.data.data.courseId
          this.strategyInfo.totalScore=response.data.data.score
          this.strategyInfo.quesCount=response.data.data.testquesNum
          var captions=response.data.data.captions
          for(var i=0;i<captions.length;i++){
            // 根据应用题型找出，找出基础题型的名称
            var parentId=''
            var name=""
            for(let item of this.queTypesList){
              if(captions[i].testquesTypeId == item.id){
                 parentId=item.parentId
                 name=item.name
                 break
              }
            }
            var content=[]
            for(var item of captions[i].captionTestquesInfo){
              if(item.testquesInfo.type==0){
                item.testquesInfo.simple.score=item.score
                content.push(item.testquesInfo.simple)
              } else{ // 综合题
                 content.push(item.testquesInfo.complex)
              }
            }
            this.questionTypeList.push( {
               name: name,
               score: captions[i].score,
               count: captions[i].subTestquesNum,
               id: captions[i].testquesTypeId,
               testquesTypeId:captions[i].testquesTypeId,
               parentId:parentId,
               captionOne:{
                 testquesTitleName:captions[i].testquesTitleName,
                 testquesScore:captions[i].testquesScore?captions[i].testquesScore:'',
                 optionDisorder:captions[i].optionDisorder==0?false:true,
                 testquesDisorder:captions[i].testquesDisorder==0?false:true,
                 answerExplain:captions[i].answerExplain?captions[i].answerExplain:'',
                 content:content,
                 answerNote:captions[i].answerNote
               }
             })
            }
            console.log(this.questionTypeList)
        } else{
          this.$message({ message:"获取试卷的基本信息失败",type: 'error' })
        }
      }).catch(error => {
        console.log(error)
      })
    },
    save() {
      // 需要上传的数据进行处理
      var captions=[]
      var i=0
      for(let item of this.questionTypeList) {
        if(item.captionOne.content.length<=0){
          this.$message({ message:"大型题下的小题不能为空",type: 'error' })
          continue
        }
        var optionDisorder=0
        var testquesDisorder=0
        if(item.captionOne.testquesDisorder){ // 试题乱序
          testquesDisorder=1
        }
        if(item.captionOne.optionDisorder){ // 选项乱序
          optionDisorder=1
        }
        if(item.captionOne.testquesTitleName==""||!item.captionOne.testquesTitleName){
          this.$message({ message:"试题的名称不能为空",type: 'error' })
          return
        }
        var captionsContent={
          restartAt:2,// 只有字母计数
          answerNote: this.$refs.option[i].getHtmlContent(), // 答题说明
          captionSort:i+1,
          optionDisorder:optionDisorder,
          testquesDisorder:testquesDisorder,
          score:item.score,
          subTestquesNum:item.captionOne.content.length,
          testquesScore:item.captionOne.testquesScore,
          testquesTitleName:item.captionOne.testquesTitleName,
          testquesTypeId:item.testquesTypeId
        }
        // 遍历每道小题的内容
        var captionTestquesInfo=[]
        for(var j=0;j<item.captionOne.content.length;j++){
          if(item.captionOne.content[j].score==''||!item.captionOne.content[j].score){
             this.$message({ message:item.captionOne.testquesTitleName+"中有分数为空的题",type: 'error' })
             return
          }
          captionTestquesInfo.push({score:item.captionOne.content[j].score,sort:j,testquesId:item.captionOne.content[j].id})
        }
        captionsContent.captionTestquesInfo=captionTestquesInfo
        i++
        captions.push(captionsContent)
      }
      var page={}
       page={
        captions:captions,
        captionNum:this.questionTypeList.length,
        courseId:this.courseId,
        testquesNum:this.strategyInfo.quesCount,
        score:this.strategyInfo.totalScore,
        name:this.paperName,
        mode:this.mode
       }
       if(this.$route.query.paperId && this.$route.query.paperId!=''){ // 修改试卷
         page.id = this.$route.query.paperId
         apiPost('/testques/testpaper/updateTestpaper',page).then(response => {
           if (response.data.code ===200) {
            this.$router.push({
              path: "paperList",
              query: { courseId: this.courseId }
              });
            } else{
              this.$message({ message:response.message,type: 'error' })
            }
          }).catch(error => {
            console.log(error)
          })
       } else{ // 新增试卷
         apiPost('/testques/testpaper/saveTestpaper',page).then(response => {
           if (response.data.code ===200) {
            this.$router.push({
              path: "preview",
              query: { paperId: response.data.data ,check:1}
              });
            } else{
              this.$message({ message:response.message,type: 'error' })
            }
          }).catch(error => {
            console.log(error)
          })
       }
      
    },
    createQuestion(courseId) {
      this.$router.push({
        path: "../maintainQues/createQues",
        query: { courseId: courseId }
      });
    },

    gotoQuesList(courseId) {
      this.$router.push({ path: "quesList", query: { courseId: courseId } })
    },

    createQuesItem(id) {
      this.showQueTypeList = false
    },

    handleCheckedAnswerChange(answer) {
      answer.sort((a, b) => {
        return a > b;
      });
    },
    queTypesListData() {
      // 获取基础题型下拉列表
       var url='/testques/testquestype/getTestquesTypeApply'
       apiPost(url).then(response => {
          if (response.data.code === 200) {
             this.queTypesList =response.data.data
             if(this.paperId&&this.paperId!=''){ // 编辑试题
                this.parperInformation()
             }
          } else{
            this.$message({ message:'获取基础题型下拉列表失败',type: 'error' })
          }
       }).catch(error => {
          console.log(error)
       })
    },
    // 选择题的类型
    createStrategy(id,name,parentId){
      for(var item of this.questionTypeList){
        if(item.id===id){
          this.$message({ message:'该题型已经选过，不能重复选',type: 'error' })
          return
        }
      }
      this.questionTypeList.push( { name: name,score: 0,count: 0,id: id,testquesTypeId:id,parentId:parentId,captionOne:{
        testquesTitleName:name,testquesScore:'',optionDisorder:false,testquesDisorder:false,answerNote:'',content:[]}})
      this.showQueTypeList = false
    },
    // 删除选择的题型
    currentQuesDelete(index) {
       this.questionTypeList.splice(index,1)
    },
    // 题型下移
    downQues(index){
      var arr=this.questionTypeList.splice(index,1)[0]
      this.questionTypeList.splice(index+1,0,arr)
    },
    // 题型上移
    upQues(index){
      var arr=this.questionTypeList.splice(index,1)[0]
      this.questionTypeList.splice(index-1,0,arr)
    },
    showChooseQuesDialog(id){ // 选择试题下的小题
      this.$refs.cq.showChooseQuesDialogList(id)
    },
    // 单个题删除
    singleDelete(index,indexx){
      this.questionTypeList[index].captionOne.content.splice(indexx,1)
    },
    // 单个题上移
    singleUp(index,indexx){
     var arr= this.questionTypeList[index].captionOne.content.splice(indexx,1)[0]
     this.questionTypeList[index].captionOne.content.splice(indexx-1,0,arr)
    },
    // 单个题下移
    singleDown(index,indexx){
       var arr= this.questionTypeList[index].captionOne.content.splice(indexx,1)[0]
      this.questionTypeList[index].captionOne.content.splice(indexx+1,0,arr)
    },
    // 获取勾选的试题
    chooseQuesContent(val,typeId){
      // for循环获取每道试题的详细信息
      this.addQuesLength= val.length
      this.questionOneList=[]
      for(var i=0;i<val.length;i++){
        this.chooseQuesContentDetail(val[i].id,typeId)
      }
    },
    chooseQuesContentDetail(quesId,typeId) { // 查看试题做成弹出框形式
      var url='/testques/testques/info/'+quesId
      apiGet(url).then(response => {
         if (response.data.code==200) {
          if(response.data.data.type==0){
             this.questionOneList.push(response.data.data.simple)
          } else{
            this.questionOneList.push(response.data.data.complex)
          }  
          // 判断详细信息获取完毕
          if(this.addQuesLength==this.questionOneList.length){
            this.addQuesContent(typeId)
          }  
         } else {      
           this.$message({ message:'获取试题内容失败',type: 'error' })
         }
      })
    },
    // 把勾选的试题放到对应的试题中
    addQuesContent(typeId){
      for(var i=0;i<this.questionTypeList.length;i++){
        if(this.questionTypeList[i].id==typeId){
           for(var j=0;j<this.questionOneList.length;j++){
            this.questionTypeList[i].captionOne.content.push(this.questionOneList[j])
           }
           console.log(this.questionTypeList)
        }
      }
    },
    // 每大题型改变分数，失去焦点
    blurQueType(index,score,parentId){
      if (score!=''&&score){ // 把该题型的下的小题分数都改变
        for(var i=0;i<this.questionTypeList[index].captionOne.content.length;i++){ 
          if(parentId!=1006&&parentId!=1007){
            this.questionTypeList[index].captionOne.content[i].score=score
          } else { // 综合题
             for(var j=0; j< this.questionTypeList[i].captionOne.content[i].subSimple.length;j++){
                this.questionTypeList[index].captionOne.content[i].subSimple[j].score=score
             }
          }

        }
      }
    },
    // 每小题型改变分数，失去焦点
    blurQueTypeSmall(index,score,scoreSmall){
      if(score!=scoreSmall){
        this.questionTypeList[index].captionOne.testquesScore=''
      }
    },
  },
  // 组件引用
  components: {
    pagination,
    chooseQues,
    UE
  },
  watch: {
    questionTypeList: {
      deep: true,
      handler: function(newValue, oldValue) {
        var totalQue=0
        var totalScore=0
        for(var i=0;i<this.questionTypeList.length;i++){
          var count=0
          var score=0
           for(let item of this.questionTypeList[i].captionOne.content){ //每da道题中的小题        
             if(item.parentTypeId!==1006&&item.parentTypeId!==1007){
               count++
               score+=parseInt(item.score)
             } else{ // 综合题计算
              count++
              for(let itemm of item.subSimple){
                score+=parseInt(itemm.score) 
              }
             }   
           }
           totalQue+=count
           totalScore+=score
           this.questionTypeList[i].score=score // 每类型题的总分
           this.questionTypeList[i].count=count
        }
        this.strategyInfo.totalScore=totalScore // 整张试卷的总分
        this.strategyInfo.quesCount=totalQue
      }
    }
  },
  mounted() {
  },
  created() {
    this.paperId=this.$route.query.paperId
    this.queTypesListData() // 获取试题的基础题型
  }
};
</script>
<style scoped>
.courseTitle span {
  color: #999;
  font-size: 18px;
}
.courseTitle .el-button {
  float: right;
}
.contain dl {
  float: left;
  width: 180px;
  font-size: 16px;
}
.contain dt {
  text-align: center;
}
.contain dd {
  border-radius: 4px;
  background: #f8f8f8;
  box-shadow: 0 1px 3px #ccc;
  padding: 10px;
  margin-top: 13px;
}
.contain dd:hover {
  background: #d8efff;
  cursor: pointer;
}
.contain dd i {
  float: right;
  color: #409eff;
  margin-top: 3px;
  cursor: pointer;
}
.contain dd p {
  margin-top: 10px;
  font-size: 14px;
  color: #666;
}
.contain dd p i {
  margin-left: 15px;
  font-size: 16px;
}
.paper {
  margin-left: 200px;
}
.paper > p {
  font-size: 18px;
  text-align: center;
  margin-bottom: 10px;
}
.strategyData {
  margin-top: 30px;
}
.strategyData p {
  line-height: 30px;
}
.strategyData p span {
  color: #999;
  font-size: 12px;
}
.paper ul {
  padding: 15px;
}
.paper li .el-row {
  height: 60px;
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
.topRow {
  white-space: nowrap;
  height: 60px;
  line-height: 30px;
}
.el-form-item {
  white-space: nowrap;
  float: left;
}
.selectQues {
  margin-bottom: 20px;
  line-height: 35px;
  position: relative;
}
.selectQues>div{overflow:hidden;}
.selectQues > p {
  font-size: 16px;
}
.operation-detete{
    font-size: 20px;
  color: #409eff;
  text-align: right;
}

.selectQues .el-radio, .selectQues .el-checkbox{
  margin-left: 10px;
  line-height: 24px;
  float:left
}
.selectQues .operation {
  position: absolute;
  right: 18px;
  bottom: 20px;
  font-size: 20px;
  color: #409eff;
}
.selectQues .operation i {
  margin-left: 30px;
  cursor: pointer;
}
.selectQues .operation i:last-child {
  margin-left: 12px;
}
.selectQues > div:first-child{padding-right:50px;position:relative}
.selectQues > div:first-child span {
  position:absolute;
  right:0;
  top:0;
  width: 100px;
  display: block;
}
.selectQues > div:after{clear:both;content:"";display:inline-block}
.selectQues span .el-input {
  width: 60px;
}

.el-radio-group, .el-checkbox-group{display:block}

.optionName{font-size:14px;margin-left:54px;line-height:24px}

.no{float:left;margin-right:5px}
.title{float:left;width:85%}
.title>span{float: left}
.title2{margin-left:125px}

@media only screen and (min-width: 1600px) {
  .checkboxCol {
    left: -100px;
    position: relative;
  }
}
@media only screen and (min-width: 1080px) {
  .checkboxCol {
    left: 100px;
    position: relative;
  }
}
.quesView{margin-bottom:15px;color:#666;background:#fff;position:relative;padding: 10px 10px;}
.quesView samp{float:left;margin-right:5px;}
.current{border:2px solid #409EFF;}
.quesTitle{font-size:16px;margin-bottom:10px;color:#000}
.smallQue{margin-bottom:30px}
.smallQue .quesTitle{font-size:14px}
.quesTitle > div{margin-left: 15px;}
.options li{line-height:26px;margin-bottom:10px}
.options li samp{border-radius:14px;width:26px;color:#409EFF;border:1px solid #409EFF;height:26px;text-align:center;display: inline-block;float: left;}
.options li > div{margin-left: 30px}
.options li.active{color:#409EFF}
.options li.active samp{background:#409EFF;color:#fff}
.analysis > div{float:left;width:88%;margin:0}
.quesView > p{margin-top:5px}
.answer i{font-size:28px;color:red;font-weight:bold;position:relative;top:5px}
.answer i.el-icon-check{color:#67c23a}
.answerTk li{line-height:30px;height:30px}
.answerTk .orderInx{margin-right:10px}
.operation{position:absolute;right:3%;bottom:12px}
.operation i{color:#409EFF;font-size:24px;margin-left:20px;cursor:pointer}
</style>
<style>
  .title>span{float: left;margin-right: 5px}
</style>
