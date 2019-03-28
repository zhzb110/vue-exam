<template>
    <div>
      <div class="editQue">
        <div ref="quesContainer" class="quesContainer" :style="'height:'+areaHeight">
<!--           <p class="question-type-title">单选题</p> -->
          <div v-show ="queType==1 || queType==2" style="width:100%;position:relative;">
              <UE :ueditorConfig="defaultSet" ref="simpleXzTitle" :defaultContent="titleContent"></UE>
              <ul class="optionList">
                  <li v-for="(item, index) in selectOptions" :key="index">
                    <div class="optionIndex" :style="queType==2?'border-radius:0':''">{{String.fromCharCode(index+65)}}</div>
                    <div class="optionContent">
                        <UE :ueditorConfig="defaultSet" :defaultContent="item.optionContent" ref="option"></UE>
                    </div>
                    <i class="el-icon-delete" title="删除" @click="removeOption(index)"></i>
                  </li>
              </ul>
              <div class="addOption"><el-button plain type="primary" @click="addOneQuestion">添加选项</el-button></div>
              <div v-if="queType==1" class="answer">答案：
                  <span v-for="(item, index) in selectOptions" :class="answer==String.fromCharCode(index+65) ? 'active':''" @click="chooseOptionAnswer(index)">{{String.fromCharCode(index+65)}}</span>
              </div>
              <div v-else-if="queType==2" class="answer dx">答案：
                  <span v-for="(item, index) in selectOptions" :class="answer.includes(String.fromCharCode(index+65)) ? 'active':''" @click="chooseOptionAnswer(index)">{{String.fromCharCode(index+65)}}</span>
              </div>
          </div>
          <div v-show="queType==3">
              <UE :ueditorConfig="defaultSet" ref="simplePdTitle" :defaultContent="titleContent"></UE>
              <div class="answer">答案：
                <el-radio v-model="pdAnswer" label="1">正确</el-radio>  <el-radio v-model="pdAnswer" label="0">错误</el-radio> 
              </div>
          </div>
          <div v-show="queType==4">
              <UE :ueditorConfig="defaultSet" :tiankong="'1'" @setTiankong="setTiankongTitle" ref="simpleTkTitle" :defaultContent="titleContent"></UE>
              <div class="answerTk"><p>答案：</p>
                  <ul>
                    <li v-for="(item, index) in tiankongAnswer"><div class="orderInx">{{index+1}}</div><el-input v-model="item.content" /></li>
                  </ul>
              </div>
          </div>
          <div v-show="queType==5">
              <UE :ueditorConfig="defaultSet" ref="simpleJdTitle" :defaultContent="titleContent"></UE>
              <div class="answer"><p>答案：</p>
                  <div><UE :ueditorConfig="defaultSet" ref="jsAnswer" :jianda="'1'" @setJdAnswer="setJdAnswer"></UE></div>
              </div>
          </div>

          <div v-show="queType==6 || queType==7">
              <UE :ueditorConfig="defaultSet" ref="simpleZhTitle" :defaultContent="titleContent"></UE>
              <div v-if="queType==7" class="uploadFile"><span>听力材料：</span>
                 <div>
                      <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-change="handleChange" 
                      :file-list="fileList" :limit="1" accept="audio/mp3" :on-error="upFileError" :before-remove="beforeRemove">
                          <el-button size="small" plain type="primary">点击上传</el-button>
                          <div slot="tip" class="el-upload__tip">只能上传MP3格式文件，且不超过2Mb</div>
                        </el-upload>
                 </div>
              </div>
              <div class="complexQues" v-for="(item, index) in complexQues">
                  <div v-if="item.type==1 || item.type==2">
                      <p class="complex-small-title">{{index+1}}. [{{item.type==1 ? "单选题" : "多选题"}}]
                       <span>
                        <i class="el-icon-delete margin-rigth10" title="删除" @click="removeSmallQue(index)" ></i>
                        <i v-if="index >= complexQues.length-1" class="el-icon-sort-down padding-right0" :style="'color:#ccc'" ></i>
                        <i v-else class="el-icon-sort-down padding-right0"  title="下移" @click="downQues(index)"></i>
                        <i v-if="index <= 0" class="el-icon-sort-up padding-left0" :style="'color:#ccc'"></i>
                        <i v-else class="el-icon-sort-up padding-left0" title="上移"  @click="upQues(index)"></i>
                      </span>
                      </p>
                      <UE :ueditorConfig="defaultSet" :ref="'complexQuesTitle'+index" :defaultContent="item.title"></UE>
                      <ul class="optionList">
                        <li v-for="(option, index2) in item.options">
                            <div class="optionIndex" :style="item.type==2?'border-radius:0':''">{{String.fromCharCode(index2+65)}}</div>
                            <div class="optionContent">
                                <UE :ueditorConfig="defaultSet" :ref="'optionComplex'+[index]" :defaultContent="option.optionContent"></UE>
                            </div>
                            <i class="el-icon-delete" title="删除" @click="removeOptionComplex(index, index2)"></i>
                        </li>
                      </ul>
                      <div class="addOption"><el-button plain type="primary" @click="addOneOptionComplex(item)" >添加选项</el-button></div>
                      <div v-if="item.type==1" class="answer">答案：
                          <span v-for="(item3, index3) in item.options" :class="item.answer==String.fromCharCode(index3+65) ? 'active':''" @click="chooseOptionAnswerComplex(index3, item)">{{String.fromCharCode(index3+65)}}</span>
                      </div>
                      <div v-else-if="item.type==2" class="answer dx">答案：
                          <span v-for="(item3, index3) in item.options" :class="item.answer.includes(String.fromCharCode(index3+65)) ? 'active':''" @click="chooseOptionAnswerComplex(index3, item)">{{String.fromCharCode(index3+65)}}</span>
                      </div>
                  </div>
                  <div v-if="item.type==3">
                      <p class="complex-small-title">{{index+1}}. [判断题]
                         <span>
                        <i class="el-icon-delete margin-rigth10" title="删除" @click="removeSmallQue(index)" ></i>
                        <i v-if="index >= complexQues.length-1" class="el-icon-sort-down padding-right0" :style="'color:#ccc'" ></i>
                        <i v-else class="el-icon-sort-down padding-right0"  title="下移" @click="downQues(index)"></i>
                        <i v-if="index <= 0" class="el-icon-sort-up padding-left0" :style="'color:#ccc'"></i>
                        <i v-else class="el-icon-sort-up padding-left0" title="上移"  @click="upQues(index)"></i>
                      </span>
                      </p>
                      <UE :ueditorConfig="defaultSet" :ref="'complexQuesTitle'+index" :defaultContent="item.title"></UE>
                      <div class="answer">答案：
                        <el-radio v-model="item.answer" label="1">正确</el-radio>  <el-radio v-model="item.answer" label="0">错误</el-radio> 
                      </div>
                  </div>
                  <div v-if="item.type==4">
                      <p class="complex-small-title">{{index+1}}. [填空题]
                         <span>
                        <i class="el-icon-delete margin-rigth10" title="删除" @click="removeSmallQue(index)" ></i>
                        <i v-if="index >= complexQues.length-1" class="el-icon-sort-down padding-right0" :style="'color:#ccc'" ></i>
                        <i v-else class="el-icon-sort-down padding-right0"  title="下移" @click="downQues(index)"></i>
                        <i v-if="index <= 0" class="el-icon-sort-up padding-left0" :style="'color:#ccc'"></i>
                        <i v-else class="el-icon-sort-up padding-left0" title="上移"  @click="upQues(index)"></i>
                      </span>
                      </p>
                      <UE :ueditorConfig="defaultSet" :tiankong="'1'" :itemInx="index" @setTiankong="setTiankongTitle" :defaultContent="item.title"></UE>
                      <div class="answerTk"><p>答案：</p>
                          <ul>
                              <li v-for="(item2, index2) in item.answer"><div class="orderInx">{{index2+1}}</div>  <el-input v-model="item2.content" /></li>
                          </ul>
                      </div>
                       <el-radio v-model="item.diffType" :label="2" class="radio-complex">主观题</el-radio>
                       <el-radio v-model="item.diffType" :label="1"  class="radio-complex">客观题</el-radio>
                  </div>
                  <div v-if="item.type==5">
                      <p class="complex-small-title">{{index+1}}. [简答题]
                         <span>
                        <i class="el-icon-delete margin-rigth10" title="删除" @click="removeSmallQue(index)" ></i>
                        <i v-if="index >= complexQues.length-1" class="el-icon-sort-down padding-right0" :style="'color:#ccc'" ></i>
                        <i v-else class="el-icon-sort-down padding-right0"  title="下移" @click="downQues(index)"></i>
                        <i v-if="index <= 0" class="el-icon-sort-up padding-left0" :style="'color:#ccc'"></i>
                        <i v-else class="el-icon-sort-up padding-left0" title="上移"  @click="upQues(index)"></i>
                      </span>
                      </p>
                      <UE :ueditorConfig="defaultSet" :ref="'complexQuesTitle'+index" :defaultContent="item.title"></UE>
                      <div class="answer"><p>答案：</p>
                          <div><UE :ueditorConfig="defaultSet" :jianda="'1'" ref="jsAnswer" :itemInx="index" @setJdAnswer="setJdAnswer" :defaultContent="item.answer"></UE></div>
                      </div>
                  </div>
                  <div class="analysis"><span>解析：</span>
                      <div><UE :ueditorConfig="defaultSet" ref="analysisComplex" :defaultContent="item.analysis"></UE></div>
                  </div>
                  <div class="score">分值： &nbsp;
                      <el-input type="number" v-model="item.score" @change="scoreChange(item)" style="width:60px" min="1" max="100" /> 分
                  </div>
                <!--   <i class="el-icon-delete" title="删除" @click="removeSmallQue(index)"></i> -->
              </div>
              <div class="save"><el-button plain type="primary" @click="showAddSmallQue = true">添加小题</el-button></div>
          </div>

          <div v-if="queType!=6 && queType!=7">
              <div class="analysis"><span>解析：</span>
                  <div><UE :ueditorConfig="defaultSet" ref="analysis" :defaultContent="answerAnalysis"></UE></div>
              </div>
          </div>       
          <div class="score">分值： 
            <span v-if="queType==6 || queType==7" >{{complexScore}}</span>
            <el-input  v-else type="number" v-model="score" @change="scoreChange" style="width:60px;margin-left:6px" min="1" max="100" /> 分
          </div>
            <div class="level">
              <label>难度：</label>
              <el-select v-model="level">
                  <el-option v-for="item in levels" :key="item.id" :label="item.id" :value="item.name"></el-option>
              </el-select>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;分类： 
              <el-button @click="showClassesBox(index)" size="mini" style="height:32px" >{{categoryShowName}}</el-button>
          </div>
          <div class="save"><el-button plain type="primary" @click="saveOneQuestion">保存试题</el-button></div>
        </div>
      </div>
      <div class="viewQue" :style="'height:'+areaHeight" style="overflow-y:scroll;">
        <p class="question-type-title">试题展示</p>
        <Quesview :viewData="previewQues"></Quesview>
      </div>
      <AddSmallQues :dialogVisible="showAddSmallQue" @closeDiolog="closeDiolog" @addUnitQue="addUnitQue" />
       <!--单元分类弹出框-->
     <category ref="cg" @category-parent="categoryParent"></category>
  </div>
</template>
<script>
import {defaultConstant} from "@/common/util" 
import UE from "@/components/UEditor"
import AddSmallQues from "@/components/questionBand/addSmallQues"
import "../../../assets/css/question_import.css"
import Quesview from "@/components/questionBand/quesview"
import category from "@/components/questionBand/category"
import { apiGet, apiPost } from "@/common/api"
export default {
  data() {
    return {
      areaHeight:"",
      showClasses:false,
      //普通题的数据
      selectOptions:["", "", "", ""],
      answer:"",
      score:"2",
      defaultSet:defaultConstant.editorConfig,
      tiankongTitle:"",
      courseId:this.$route.query.courseId,
      pdAnswer:"1",
      category:"",
      level:"1",
      //综合题数据
      complexQues:[],
      fileList:[],
      queId:this.$route.query.quesId,
      queType:this.$route.query.type,
      //展示数据
      previewQues:[],
      levels:[
        { id: "1", name: "1" },
        { id: "2", name: "2" },
        { id: "3", name: "3" },
        { id: "4", name: "4" },
        { id: "5", name: "5" }
      ],
      showAddSmallQue:false,
      currentComplexInx:0,
      isComplexCategory:false,
      categoryShowName:'请选择分类', // 单元分类的
      categoryShowId:'', // 单元分类的id
      testId:'', // shi
      backstageData:'' , // 后台数据
      tiankongAnswer:'', // 填空题数组
      titleContent:'',
      answerAnalysis:''
    }
  },
  components: {UE, AddSmallQues, Quesview,category},
  methods: {
    saveOneQuestion(){
      if(this.checkVaild()){
        if(this.queType == 1 || this.queType == 2){
          this.choiceContant()
        } else if(this.queType == 3){
          this.judgeQue()
        } else if(this.queType == 4){
         this.completionQue()
        } else if(this.queType == 5){
           let queObj = {
              typeId:this.queTypeId,
              content:this.$refs.simpleJdTitle.getHtmlContent(),
              courseId:this.courseId,
              answer:this.answer,
              answerAnalysis:this.$refs.analysis.getHtmlContent(),
              difficultyLevel:this.level,
              score:this.score,
              diffType:1,
              parentTypeId:'1005',
            }
          if(this.category!==''){
            queObj.classifyId=this.category
          }
          var dataArry={simple:queObj,type:0,"testId":this.testId}
          this.saveSubmit(dataArry)
        }else if(this.queType == 6||this.queType == 7){
          this.comprehensiveQuestion()
        }
      }
    },
    // 单选题和多选题修改后，对数据重新排版
    choiceContant() {
      let optionPass = true
      var answerNumber
      if (this.queType===1){ 
         answerNumber = this.answer.charCodeAt(0)-65
      } else {
         this.answer = this.answer.split('')
         for(let i in this.answer){
          this.answer[i] = this.answer[i].charCodeAt(0)-65
         }
      }
      this.selectOptions.forEach(function(e, index){
        if (this.queType===1){ // 单选题           
           var answerFlag = 0
           if (answerNumber===index){
             answerFlag=1
           }
           this.selectOptions[index] = {
            'optionContent': this.$refs.option[index].getHtmlContent(),
            'answerFlag':answerFlag,
            'sort':index+1
          }
        } else { // 多选题
          var answerFlag = 0
          for(let item of this.answer){
             if (item===index){
               answerFlag=1
            }
          }  
          this.selectOptions[index] = {
            'optionContent': this.$refs.option[index].getHtmlContent(),
            'answerFlag':answerFlag,
            'sort':index+1
          }
        }          
        if(this.selectOptions[index] == ""){
          this.$message.error("选项内容不能为空")
          optionPass = false
        }
      }.bind(this));
      var simple
      if(optionPass){
        simple = {
          typeId:this.queTypeId,
          content:this.$refs.simpleXzTitle.getHtmlContent(),
          courseId:this.courseId,
          options:this.selectOptions,
          answerAnalysis:this.$refs.analysis.getHtmlContent(),
          difficultyLevel:this.level,
          score:this.score,
          diffType:1,
          id:this.testId,
          parentTypeId:'100'+this.queType,
          classifyName:this.categoryShowName
        }
        if(this.categoryShowId!==''){
          simple.classifyId=this.categoryShowId
        }
      }
      var dataArry={simple:simple,type:0,modifyUpdateContent:'修改内容'}
      this.saveSubmit(dataArry)
    },
    // 判断题修改后，对数据重新排版
    judgeQue() {
      var options=[]
      if(this.pdAnswer==1){
        options.push({'optionContent':'正确','answerFlag':1,'sort':1}) 
        options.push({'optionContent':'错误','answerFlag':0,'sort':2})   
      } else{
         options.push({'optionContent':'正确','answerFlag':0,'sort':1})
         options.push({'optionContent':'错误','answerFlag':1,'sort':2})    
      }
       let queObj = {
          typeId:this.queTypeId,
          content:this.$refs.simplePdTitle.getHtmlContent(),
          courseId:this.courseId,
          options:options,
          answerAnalysis:this.$refs.analysis.getHtmlContent(),
          difficultyLevel:this.level,
          score:this.score,
          diffType:1,
          id:this.testId,
          parentTypeId:'100'+this.queType,
          classifyName:this.categoryShowName
        }
        if(this.categoryShowId!==''){
          queObj.classifyId=this.categoryShowId
        }
        var dataArry={simple:queObj,type:0,modifyUpdateContent:'修改内容'}
        this.saveSubmit(dataArry)
    },
    // 填空题
    completionQue(){
      var anserArry=''
      for(var i in this.tiankongAnswer){
        if(i<this.tiankongAnswer.length-1){
            anserArry+=this.tiankongAnswer[i].content+"&<multi@>"
        } else{
           anserArry+=this.tiankongAnswer[i].content
        }
      }
      let queObj = {
          typeId:this.queTypeId,
          content:this.$refs.simpleTkTitle.getHtmlContent(),
          courseId:this.courseId,
          answer:anserArry,
          answerAnalysis:this.$refs.analysis.getHtmlContent(),
          difficultyLevel:this.level,
          score:this.score,
          diffType:this.diffType,
          id:this.testId,
          classifyName:this.categoryShowName,
          parentTypeId:'100'+this.queType,
      }
      if(this.categoryShowId!==''){
        queObj.classifyId=this.categoryShowId
      }
      var dataArry={simple:queObj,type:0,testId:this.testId,modifyUpdateContent:'修改内容'}
      this.saveSubmit(dataArry)
    },
    // 综合题
    comprehensiveQuestion(){
      if(this.queType == 7){ // 听力题的材料
      }
      var subSimpleArray=[]
      var iIndex=0
      for(let item of this.complexQues) {
        iIndex++
        if(item.type==1){ // 单选题      
           var answerNumber = item.answer.charCodeAt(0)-65
           var optionArry=[]
           for (var index in item.options) {
            var answerFlag = 0
             if (answerNumber==index){
               answerFlag=1
             }
             optionArry.push({
              'optionContent': item.options[index],
              'answerFlag':answerFlag,
              'sort':parseInt(index)+1
            })
          }  
          let simple = {
            typeId:"2001",
            parentTypeId:'1001',
            content:item.title,
            options:optionArry,
            courseId:this.courseId,
            answerAnalysis:item.analysis,
            score:item.score,
            diffType:1,
            sort:iIndex
           }
           subSimpleArray.push(simple)
        } else if(item.type==2){ // 多选题
            var answerFlag = 0
            var answerArry = item.answer.split('')
            for(let i in answerArry){
              answerArry[i] = answerArry[i].charCodeAt(0)-65
            }
            var optionArry=[]
            for(let i in item.options){
              for(let item of answerArry){
               if (item==i){
                 answerFlag=1
                }
              }  
              optionArry.push({   
              'optionContent': item.options[i],
              'answerFlag':answerFlag,
              'sort':parseInt(index)+1,
              })
            }
          let queObj = {
            typeId:"2002",
            parentTypeId:'1002',
            content:item.title,
            options:optionArry,
            courseId:this.courseId,
            answerAnalysis:item.analysis,
            score:item.score,
            diffType:1,
            sort:iIndex
           }
          subSimpleArray.push(queObj)
        } else if(item.type==3){ // 判断题
          var options=[]
          if (item.answer==1){
            options.push({'optionContent':'正确','answerFlag':1,'sort':1}) 
            options.push({'optionContent':'错误','answerFlag':0,'sort':2})   
          } else{
            options.push({'optionContent':'正确','answerFlag':0,'sort':1})
            options.push({'optionContent':'错误','answerFlag':1,'sort':2})    
          }
          let queObj = {
            typeId:"2003",
            parentTypeId:'1003',
            content:item.title,
            courseId:this.courseId,
            options:options,
            answerAnalysis:item.analysis,
            score:item.score,
            diffType:1,
            sort:iIndex
          }
          subSimpleArray.push(queObj)
        } else if(item.type==4){ // 填空题
           var anserArry=''
           for(var i=0;i<item.answer.length;i++){
            if(i< item.answer.length-1){
                anserArry+=item.answer[i].content+"&<multi@>"
            } else{
               anserArry+=item.answer[i].content
            }
          }
          let queObj = {
              typeId:"2004",
              parentTypeId:'1004',
              courseId:this.courseId,
              content:item.title,
              answer:anserArry,
              answerAnalysis:item.analysis,
              score:item.score,
              diffType:item.diffType,
              sort:iIndex
           }
          subSimpleArray.push(queObj)
        } else if(item.type===5){ // 简答题
          let queObj = {
            typeId:"2005",
            parentTypeId:'1005',
            content:item.title,
            courseId:this.courseId,
            answer:item.answer,
            answerAnalysis:item.analysis,
            score:item.score,
            diffType:1,
            sort:iIndex
          }
          subSimpleArray.push(queObj)
        }
      }
      // 对综合题进行主客观判断，含有简答题一定是主 还有填空题
      var zhuguan=1
      for(let item of subSimpleArray) {
        if(item.typeId=="2004" && item.diffType==2){ // 填空题判断
            zhuguan=2
            break
        }
        if(item.typeId=="2005"){ // 简答题
           zhuguan=2
           break
        }
      }
      if (zhuguan==2){ // 把所有题型都改为主观题
        for(var i in subSimpleArray) {
          subSimpleArray[i].diffType = 2
        }
      }
      let queObj = {
        typeId:this.queTypeId,
        courseId:this.courseId,
        parentTypeId:'100'+this.queType,
        content:this.$refs.simpleZhTitle.getHtmlContent(),
        subSimple:subSimpleArray,
        difficultyLevel:this.level,
        score:this.complexScore,
        id:this.testId,
        diffType:zhuguan,
        classifyName:this.categoryShowName
      }
      if(this.categoryShowId!==''){
          queObj.classifyId=this.categoryShowId
        }
        var dataArray={complex:queObj,type:1,modifyUpdateContent:'修改内容'}
       this.saveSubmit(dataArray)
    },
    // 修改试题后提交后台试题提交后台
     saveSubmit(data){
       var dataArry=data
       var url='/testques/testques/updateTestques'
         apiPost(url,data).then(response => {
          if (response.data.code ===200) {
            this.$message.success("成功修改试题")
            if(this.queType==7 || this.queType==6){
              this.updateQue(dataArry.complex)
            } else{
              this.updateQue(dataArry.simple)
            }
          } else{
            this.$message({ message:response.data.message,type: 'error' })
          }
        }).catch(error => {
          console.log(error)
        })
     },
     // 用户修改相关内容的记录
     modifyRecord(){

     },
    addOneQuestion(){
      this.selectOptions.push("");
    },
    addOneOptionComplex(item){
      item.options.push("")
    },
    setTiankongTitle(tiankongHTML, index){
      if(index || index === 0){
        let item = this.complexQues[index]
        item.title = tiankongHTML
        item.answer = this.formatTKAnswer(tiankongHTML)
      }else{
        this.tiankongTitle = tiankongHTML;
      }
    }, 

    setJdAnswer(jiandaHTML, index){
      if(index || index === 0){
        let item = this.complexQues[index]
        item.answer = jiandaHTML
      }else{
        this.answer = jiandaHTML;
      }
    },

    chooseOptionAnswer(index){
      var str = String.fromCharCode(index+65)
      if(this.queType == 1){
          this.answer = str
      }else if(this.queType == 2){
          if(this.answer == ""){
              this.answer = str
          }else if(this.answer.includes(str)){
              let inx = this.answer.indexOf(str);
              if(inx >= 0){
                  this.answer = this.answer.replace(str, "")
              }else if(this.answer.length > 1){
                  this.answer = this.answer.replace(str, "")
              }else{
                  this.answer = this.answer.replace(str, "")
              }
              this.answer = this.sortString(this.answer);
          }else{
              this.answer +=str
              this.answer = this.sortString(this.answer);
          }
      }
    },

    chooseOptionAnswerComplex(index, item){
      var str = String.fromCharCode(index+65)
      if(item.type == 1){
        item.answer = str
      }else if(item.type == 2){
          if(item.answer == ""){
              item.answer = str
          }else if(item.answer.includes(str)){
              let inx = item.answer.indexOf(str);
              if(inx > 0){
                  item.answer = item.answer.replace(str, "")
              }else if(item.answer.length > 1){
                  item.answer = item.answer.replace(str, "")
              }else{
                  item.answer = item.answer.replace(str, "")
              }
              item.answer = this.sortString(item.answer);
          }else{
              item.answer += str
              item.answer = this.sortString(item.answer);
          }
          console.log(item);
      }
    },
    sortString(str){
        let arr = str.split(",")
        return arr.sort().join(",");
    },
    scoreChange(item){
        if(typeof(item) != "string"){
            Number(item.score) < 1 ? item.score = 1 : "";
            Number(item.score) > 100 ? item.score = 100 : "";
        }else{
            Number(this.score) < 1 ? this.score = 1 : "";
            Number(this.score) > 100 ? this.score = 100 : "";
        }
        
    },
    closeDiolog(){
      this.showAddSmallQue = false
    },

    formatTKAnswer(tiankongTitle){
        let answer = new Array();
        let length = (tiankongTitle.split('_____')).length-1;
        for(let i=0; i<length; i++){
          answer.push({index: i+1, content:""})
        }
        return answer;
    },
    checkCategory(category) {
      if(this.isComplexCategory){
        this.complexQues[this.currentComplexInx].category = category
        this.isComplexCategory = false
      }else{
        this.category = category
      }
      
      this.showClasses = false
      
    },
    showClassesBox(index){
      if(typeof(index) === "number"){
        this.currentComplexInx = index
        this.isComplexCategory = true
      }
      this.$refs.cg.classesDialog(this.courseId)
    },
    removeOption(index){
      if(this.selectOptions.length <= 2){
        this.$message("至少保留两个选项")
      }else{
        this.selectOptions.splice(index,1)
        this.answer = ""
      }
    },
    removeOptionComplex(index, index2){
      let queOption = this.complexQues[index].options
      if(queOption.length <=2){
        this.$message("至少保留两个选项")
      }else{
        queOption.splice(index2,1)
        this.complexQues[index].answer = ""
      }
    },
    removeSmallQue(index){
      this.complexQues.splice(index,1)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    handleChange(file, fileList){
      this.fileList = fileList
    },
    setComplexVal22(){
      this.complexQues.forEach(function(e, index){
          if(e.type != 4){
            console.log(this.$refs["complexQuesTitle"+index][0])
              e.title = this.$refs["complexQuesTitle"+index][0].getHtmlContent()
          }
          e.analysis = this.$refs.analysisComplex[index].getHtmlContent()
          if(e.type == 1 || e.type == 2){
              this.$refs["optionComplex"+index].forEach(function(item, i){
                  e.options[i] = item.getHtmlContent()
              });
          }
      }.bind(this))
    },
    upFileError(){
        this.$message.error("上传文件失败")
    },
    checkVaild(){
        let checkPass = true
        switch(this.queType){
          case 1:
            if(this.$refs.simpleXzTitle.getHtmlContent().length < 2){
              this.$message.error("题目不能少于两个字");
              checkPass = false
            }else if(this.answer == ""){
              this.$message.error("请选择答案选项");
              checkPass = false
            }
            break
          case 2:
            if(this.$refs.simpleXzTitle.getHtmlContent().length < 2){
              this.$message.error("题目不能少于两个字");
              checkPass = false
            }else if(this.answer.length <= 1){
              this.$message.error("答案至少两个选项");
              checkPass = false
            }
            break
          case 3:
            if(this.$refs.simplePdTitle.getHtmlContent().length < 2){
              this.$message.error("题目不能少于两个字");
              checkPass = false
            }
            break
          case 4:
            if(this.$refs.simpleTkTitle.getHtmlContent().length < 2){
              this.$message.error("题目不能少于两个字");
              checkPass = false
            }else if(this.tiankongAnswer.length <= 0){
              this.$message.error("至少有一个填空项");
              checkPass = false
            }else{
              let includeNull = this.tiankongAnswer.some((item,index,arr) => {
                 return item.content == ""
              })
              if(includeNull){
                this.$message.error("填空项内容不能为空");
                checkPass = false
              }
            }
            break
          case 5:
            if(this.$refs.simpleJdTitle.getHtmlContent().length < 2){
              this.$message.error("题目不能少于两个字");
              checkPass = false
            }else if(this.answer == ""){
              this.$message.error("请输入答案");
              checkPass = false
            }
            break
          default:
            if(this.$refs.simpleZhTitle.getHtmlContent().length < 2){
              this.$message.error("题目不能少于两个字");
              checkPass = false
            }else if(this.queType == 7 && this.fileList.length <= 0){
              this.$message.error("请上传音频文件");
              checkPass = false 
            }else if(this.complexQues.length < 1){
              this.$message.error("至少有一道小题");
              checkPass = false    
            }else{
              this.setComplexVal22();
              this.complexQues.forEach(function(e){
                 if(e.title.length < 2){
                    this.$message.error("小题题目不能少于两个字");
                    checkPass = false
                    return
                 }else{
                    switch(e.type){
                      case "1":
                        let inNull1 = e.options.some((item) => { return item == "" })
                        if(inNull1){
                          this.$message.error("选择题选项不能为空");
                          checkPass = false
                        }else if(e.answer == ""){
                          this.$message.error("请设置单选题的答案");
                          checkPass = false
                        }
                        break
                      case "2":
                        let inNull2 = e.options.some((item) => { return item == "" })
                        if(inNull2){
                          this.$message.error("选择题选项不能为空");
                          checkPass = false
                        }if(e.answer.length <= 1){
                          this.$message.error("多选题答案至少两个选项");
                          checkPass = false
                        }
                        break
                      case "4":
                        if(e.answer.length <= 0){
                          this.$message.error("填空题至少有一个填空项");
                          checkPass = false
                        }else{
                          let includeNull = e.answer.some((item,index,arr) => {
                             return item.content == ""
                          })
                          if(includeNull){
                            this.$message.error("填空项内容不能为空");
                            checkPass = false
                          }
                        }
                        break
                      case "5":
                        if(e.answer == ""){
                          this.$message.error("请输入简答题答案");
                          checkPass = false
                        }
                        break
                    }
                 }
              }.bind(this))
            }
            break
        }
        return checkPass
    },
     // 综合题删除
     removeSmallQue(index){
      this.complexQues.splice(index,1)
    },
    // 综合题下移
    downQues(index) {
      var arr= this.complexQues.splice(index,1)[0]
      this.complexQues.splice(index+1,0,arr)
    },
    // 综合题上移
    upQues(index){
      var arr= this.complexQues.splice(index,1)[0]
      this.complexQues.splice(index-1,0,arr)
    },
    updateQue(queObj){
      this.previewQues=[]
      this.previewQues.push(queObj)
    },
    pageContent() { // 获取试题的相关内容
      if(!this.testId){
        return
      }
      var url='/testques/testques/info/'+this.testId
      apiGet(url).then(response => {
        if (response.data.code ===200) {
          this.backstageData=response.data.data
          this.recordContant=response.data.data
          var dataArry=response.data.data
           if (response.data.data.type==0) {
             this.score = dataArry.simple.score
             this.level =dataArry.simple.difficultyLevel
             this.categoryShowId = dataArry.simple.classifyId
             this.categoryShowName = dataArry.simple.classifyName
             this.queType = parseInt(dataArry.simple.parentTypeId)-1000
             this.updateQue(response.data.data.simple)
             this.answerAnalysis=dataArry.simple.answerAnalysis
             this.titleContent = dataArry.simple.content
           } else {      
             this.queType =parseInt(dataArry.complex.parentTypeId)-1000
             this.score = dataArry.complex.score
             this.level =dataArry.complex.difficultyLevel
             this.categoryShowName = dataArry.complex.classifyName
             this.categoryShowId = dataArry.complex.classifyId
             this.updateQue(response.data.data.complex)
             this.titleContent = dataArry.complex.content
           }
          this.initQue(response.data.data) 
        } else {
          this.$message({ message:'获取试题内容失败',type: 'error' })
        }
      }).catch(error => {
        console.log(error)
      })
    },
     //根据id得到试题后初始化
    initQue(dataArry){
        
        if(this.queType == 1 || this.queType == 2){
            // 选择题答案转换
          var answerString=''
          var optionArray=dataArry.simple.options
          for(var i in optionArray){
            if(optionArray[i].answerFlag == 1){
              answerString+=String.fromCharCode(parseInt(i)+65)
            }               
          }
          this.selectOptions = dataArry.simple.options        
          this.answer = answerString
        }else if(this.queType == 3){  // 判断题
            var optionArray=dataArry.simple.options
            for(var i=0; i<optionArray.length;i++){
              if(optionArray[i].answerFlag == 1 && optionArray[i].optionContent=='正确'){
                this.pdAnswer='1'
                break
              }
              if(optionArray[i].answerFlag == 1 && optionArray[i].optionContent=='错误'){
                this.pdAnswer='0'
                break
              }               
            }
        }else if(this.queType == 4){ // 填空题
            var answerString =dataArry.simple.answer.split('&<multi@>')
            var answerArray=[]  
            for(var i=0;i<answerString.length;i++){
               answerArray.push({index: i+1, content:answerString[i]})
            }
            this.tiankongAnswer = answerArray
        }else if(this.queType == 5){  // 简答题
        }else if(this.queType > 5){ 
            this.complexQues = []
            if(this.queType == 7){ // 听力题
              this.fileList.push(currentQue.file)
            }
            var subSimple = dataArry.complex.subSimple
            for(var i=0;i<subSimple.length;i++){
               var queTypeShow=parseInt(subSimple[i].parentTypeId)-1000
               if (queTypeShow==1 || queTypeShow==2) { // 单选题
                  var answerString=''
                  var optionArray=subSimple[i].options
                  for(var j in optionArray){
                    if(optionArray[j].answerFlag == 1){
                      answerString+= String.fromCharCode(parseInt(j)+65)
                    }               
                  }
                  var options=[]
                this.complexQues.push({type:queTypeShow.toString(), title:subSimple[i].content, answer:answerString, options:optionArray, analysis:subSimple[i].answerAnalysis, score:subSimple[i].score})
               } else if(queTypeShow==3){ // 判断题
                  var optionArray=subSimple[i].options
                  var pdAnswer
                  for(var j=0;j< optionArray.length;j++){
                     if(optionArray[j].answerFlag == 1 && optionArray[j].optionContent=='正确'){
                    pdAnswer='1'
                      break
                    }
                    if(optionArray[j].answerFlag == 1 && optionArray[j].optionContent=='错误'){
                      pdAnswer='0'
                      break
                    }       
                  }
                 this.complexQues.push({type:"3", title:subSimple[i].content, answer:pdAnswer, analysis:subSimple[i].answerAnalysis, score:subSimple[i].score})
               } else if(queTypeShow==4){ // 填空题
                  var answerString =subSimple[i].answer.split('&<multi@>')
                  var answerArray=[]  
                  for(var j=0;j<answerString.length;j++){
                     answerArray.push({index: j+1, content:answerString[j]})
                  }
                  this.complexQues.push({type:"4", title:subSimple[i].content, answer:answerArray, analysis:subSimple[i].answerAnalysis, score:subSimple[i].score})
               } else if(queTypeShow==5){ // 简答题
                 this.complexQues.push({type:"5",  title:subSimple[i].content, analysis:subSimple[i].answerAnalysis, score:subSimple[i].score,answer:subSimple[i].answer})
               }
            }
           console.log(this.complexQues)
        }
      //  console.log(this.complexQues)
      // this.editIndex = index
    },
    addUnitQue(newQues){
      for(let i=0; i < Number(newQues.radioCount); i++){
        this.complexQues.push({type:"1", title:"", answer:"", options:["","","",""], analysis:"", score:2})
      }
      for(let i=0; i < Number(newQues.checkboxCount); i++){
        this.complexQues.push({type:"2", title:"", answer:"", options:["","","",""], analysis:"", score:2})
      }
      for(let i=0; i < Number(newQues.panduanCount); i++){
        this.complexQues.push({type:"3", title:"", answer:"1", analysis:"", score:2,diffType:2})
      }
      for(let i=0; i < Number(newQues.tiankongCount); i++){
        this.complexQues.push({type:"4", title:"", answer:[], analysis:"", score:2})
      }
      for(let i=0; i < Number(newQues.jiandaCount); i++){
        this.complexQues.push({type:"5",  answer:"", analysis:"", score:2})
      }
      this.showAddSmallQue = false
    },
      // 分类选择
    categoryParent(id,name) {
      this.categoryShowName = name
      this.categoryShowId = id
    },
  },
  computed:{
    tiankongAnswer:function(){
        let answer = new Array();
        let length = (this.tiankongTitle.split('_____')).length-1;
        for(let i=0; i<length; i++){
          answer.push({index: i+1, content:""})
        }
      return answer;
    },
    complexScore: function(){
        let score = 0;
        if(this.complexQues.length > 0){
          this.complexQues.forEach(function(e){
              score += Number(e.score)
          })
        }
        return score
    },
  },
  mounted() {
    this.areaHeight = window.innerHeight - 110 +"px";
    this.pageContent() // 获取试题的相关内容
  },
  created() {
    this.testId = this.$route.query.quesId
  }
}
</script>
