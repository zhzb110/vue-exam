<template>
    <div>
       <div class="filter">
          试题分类：<el-button @click="showClassesBox" size="mini" >{{categoryShowName}}</el-button>
          <label>题型：</label>
          <el-select v-model="queTypeId" size="mini"  @change="queTypeIdChange" style="width:120px">
              <el-option v-for="item in testQuesTypeDropDownList" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
          </el-select>
          <label>难度：</label>
          <el-select v-model="level" size="mini" style="width:120px">
              <el-option v-for="item in levels" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <label v-show="queType==4" >主/客观：</label>
          <el-select v-model="diffType" size="mini" style="width:120px" v-show="queType==4">
              <el-option :value="1" label="客观题"></el-option>
              <el-option :value="2" label="主观题"></el-option>
          </el-select>
        </div>
        <div class="editQue" :style="'height:'+areaHeight" style="overflow-y: scroll;">
            <div ref="quesContainer" class="quesContainer ques-title-small" >
                <div v-show="queType==1 || queType==2" style="width:100%;position:relative;">
                    <UE :ueditorConfig="defaultSet" ref="simpleXzTitle"></UE>
                    <ul class="optionList">
                        <li v-for="(item, index) in selectOptions" :key="index">
                            <div class="optionIndex" :style="queType==2?'border-radius:0':''">{{String.fromCharCode(index+65)}}</div>
                            <div class="optionContent">
                                <UE :ueditorConfig="defaultSet" :defaultContent="item" ref="option"></UE>
                            </div>
                            <i class="el-icon-delete" title="删除" @click="removeOption(index)"></i>
                        </li>
                    </ul>
                    <div class="addOption"><el-button plain type="primary" @click="addOneQuestion" >添加选项</el-button></div>
                    <div v-if="queType==1" class="answer">答案：
                        <span v-for="(item, index) in selectOptions" :class="answer==String.fromCharCode(index+65) ? 'active':''" @click="chooseOptionAnswer(index)">{{String.fromCharCode(index+65)}}</span>
                    </div>
                    <div v-else-if="queType==2" class="answer dx">答案：
                        <span v-for="(item, index) in selectOptions" :class="answer.includes(String.fromCharCode(index+65)) ? 'active':''" @click="chooseOptionAnswer(index)">{{String.fromCharCode(index+65)}}</span>
                    </div>
                </div>
                <div v-show="queType==3">
                    <UE :ueditorConfig="defaultSet" ref="simplePdTitle"></UE>
                    <div class="answer">答案：
                      <el-radio v-model="pdAnswer" label="1">正确</el-radio>  <el-radio v-model="pdAnswer" label="0">错误</el-radio> 
                    </div>
                </div>
                <div v-show="queType==4">
                    <UE :ueditorConfig="defaultSet" :tiankong="'1'" @setTiankong="setTiankongTitle" ref="simpleTkTitle"></UE>
                    <div class="answerTk"><p>答案：</p>
                        <ul>
                          <li v-for="(item, index) in tiankongAnswer"><div class="orderInx">{{index+1}}</div><el-input v-model="item.content" /></li>
                        </ul>
                    </div>
                </div>
                <div v-show="queType==5">
                    <UE :ueditorConfig="defaultSet" ref="simpleJdTitle"></UE>
                    <div class="answer"><p>答案：</p>
                        <div><UE :ueditorConfig="defaultSet" ref="jsAnswer" :jianda="'1'" @setJdAnswer="setJdAnswer"></UE></div>
                    </div>
                </div>
                <div v-show="queType==6 || queType==7">
                    <UE :ueditorConfig="defaultSet" ref="simpleZhTitle"></UE>
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
                                        <UE :ueditorConfig="defaultSet" :ref="'optionComplex'+[index]" :defaultContent="option"></UE>
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
                              <el-radio v-model="item.answer" label="1">正确</el-radio> <el-radio v-model="item.answer" label="0">错误</el-radio> 
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
                            <el-radio v-model="item.diffType" :label="1" class="radio-complex">客观题</el-radio>
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
                                <div><UE :ueditorConfig="defaultSet" :jianda="'1'" :itemInx="index" @setJdAnswer="setJdAnswer" :defaultContent="item.answer"></UE></div>
                            </div>
                        </div>
                        <div class="analysis"><span>解析：</span>
                            <div><UE :ueditorConfig="defaultSet" ref="analysisComplex" :defaultContent="item.analysis"></UE></div>
                        </div>
                        <div class="score">分值： &nbsp;
                            <el-input type="number" v-model="item.score" @change="scoreChange(item)" style="width:60px" min="1" max="100" /> 分
                        </div>
          <!--               <i class="el-icon-delete" title="删除" @click="removeSmallQue(index)"></i> -->
                    </div>
                    <div class="save"><el-button plain type="primary" @click="showAddSmallQue = true">添加小题</el-button></div>
                </div>

                <div v-show="queType!=6 && queType!=7">
                    <div class="analysis"><span>解析：</span>
                        <div><UE :ueditorConfig="defaultSet" ref="analysis"></UE></div>
                    </div>
                </div>
                
                <div class="score">分值： 
                  <span v-if="queType==6 || queType==7" >{{complexScore}}</span>
                  <el-input  v-else type="number" v-model="score" @change="scoreChange" style="width:60px;margin-left:6px" min="1" max="100" /> 分
                </div>
                <div class="save"><el-button plain type="primary" @click="saveOneQuestion">保存试题</el-button></div>
            </div>
        </div>
        <div class="viewQue" :style="'height:'+areaHeight" style="overflow-y: scroll;">
            <p class="ques-title-small">试题展示</p>
            <Quesview :viewData="previewQues"  ></Quesview>
        </div>
        <AddSmallQues :dialogVisible="showAddSmallQue" @closeDiolog="closeDiolog" @addUnitQue="addUnitQue" />
        <!--单元分类弹出框-->
      <category ref="cg" @category-parent="categoryParent"></category>
    </div>
</template>
<script>
import UE from "@/components/UEditor"
import AddSmallQues from "./addSmallQues"
import category from "@/components/questionBand/category"
import Quesview from "./quesview"
import { apiGet, apiPost } from "@/common/api"
export default {
  data() {
    return {
      queType:1, // 判断显示题型的Id
      queTypeId:'',// 提交时后台需要的Id
      showClasses:false,
      //普通题的数据
      selectOptions:["", "", "", ""],
      answer:"",
      score:"2",
      tiankongTitle:"",
      pdAnswer:"1",
      category:"",
      level:"1", // 题型难度难度
      diffType:'2', // 主客观
      courseId:this.$route.query.courseId,
      //综合题数据
      complexQues:[],
      fileList:[],
      areaHeight:"",
      //展示数据
      previewQues:[],
      levels:[
        { id: "1", name: "1" },
        { id: "2", name: "2" },
        { id: "3", name: "3" },
        { id: "4", name: "4" },
        { id: "5", name: "5" }
      ],
      testQuesTypeDropDownList:[], // 题型下拉框
      showAddSmallQue:false,
      currentComplexInx:0,
      isComplexCategory:false,
      categoryShowName:'请选择分类', // 单元分类的
      categoryShowId:'', // 单元分类的id
      editIndex:""
    }
  },
  props: ["defaultSet", "quesCategory"],
  components: {UE, AddSmallQues, Quesview,category},
  methods: {
    // 这个方法200多行，看的时候最好收起
    saveOneQuestion(){
      if(this.checkVaild()){
        var categoryShowNamePreview=''
        if(this.categoryShowId!=''){
           categoryShowNamePreview = this.categoryShowName
        }
        if(this.queType == 1 || this.queType == 2){ // 单选题 多选题
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
          if(optionPass){
            let simple = {
              typeId:this.queTypeId,
              content:this.$refs.simpleXzTitle.getHtmlContent(),
              courseId:this.courseId,
              options:this.selectOptions,
              answerAnalysis:this.$refs.analysis.getHtmlContent(),
              difficultyLevel:this.level,
              score:this.score,
              diffType:1,
              classifyName:this.categoryShowName
            }
            if(this.categoryShowId!==''){
              simple.classifyId=this.category
            }
            var dataArry={simple:simple,type:0}
            this.saveSubmit(dataArry)
          }
        } else if(this.queType == 3){ // 判断题
          var options=[]
          if(this.pdAnswer===1){
            options.push({'optionContent':'正确','answerFlag':1,'sort':1}) 
            options.push({'optionContent ':'错误','answerFlag':0,'sort':2})   
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
              classifyName:this.categoryShowName
            }
            if(this.categoryShowId!==''){
              queObj.classifyId=this.categoryShowId
            }
             var dataArry={simple:queObj,type:0}
             this.saveSubmit(dataArry)
        } else if(this.queType == 4){ // 填空题 要写主客观
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
              classifyName:this.categoryShowName
           }
            if(this.categoryShowId!==''){
              queObj.classifyId=this.categoryShowId
            }
          var dataArry={simple:queObj,type:0}
          this.saveSubmit(dataArry)
        } else if(this.queType == 5){ // 简答题
          let queObj = {
              typeId:this.queTypeId,
              content:this.$refs.simpleJdTitle.getHtmlContent(),
              courseId:this.courseId,
              answer:this.answer,
              answerAnalysis:this.$refs.analysis.getHtmlContent(),
              difficultyLevel:this.level,
              score:this.score,
              diffType:1,
              classifyName:this.categoryShowName
            }
          if(this.categoryShowId!==''){
            queObj.classifyId=this.categoryShowId
          }
          var dataArry={simple:queObj,type:0}
          this.saveSubmit(dataArry)
        } else if(this.queType == 6||this.queType == 7){ // 综合题
          // 每个小题进行处理this.complexQues
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
                score:this.score,
                sort:iIndex,
                diffType:1
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
                  'sort':parseInt(index)+1
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
                sort:iIndex,
                diffType:1,
               }
              subSimpleArray.push(queObj)
            } else if(item.type==3){ // 判断题
              var options=[]
              if (item.answer===1){
                options.push({'optionContent':'正确','answerFlag':1,'sort':1}) 
                options.push({'optionContent ':'错误','answerFlag':0,'sort':2})   
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
                sort:iIndex,
                diffType:1,
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
                  sort:iIndex,
                  diffType:1
               }
              subSimpleArray.push(queObj)
            } else if(item.type==5){ // 简答题
              let queObj = {
                typeId:"2005",
                parentTypeId:'1005',
                content:item.title,
                 courseId:this.courseId,
                answer:item.answer,
                answerAnalysis:item.analysis,
                score:item.score,
                sort:iIndex,
                diffType:2
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
            parentTypeId:'100'+this.queType,
            courseId:this.courseId,
            content:this.$refs.simpleZhTitle.getHtmlContent(),
            subSimple:subSimpleArray,
            difficultyLevel:this.level,
            score:this.complexScore,
            diffType:zhuguan,
            classifyName:this.categoryShowName 
          }
          if(this.categoryShowId!==''){
              queObj.classifyId=this.categoryShowId
            }
            var dataArray={"complex":queObj,"type":1}          
           this.saveSubmit(dataArray)
        }
      }
    },
   // 试题保存提交后台
   saveSubmit(data){
     var dataArry=data
     var url='/testques/testques/saveTestques'
       apiPost(url,data).then(response => {
        if (response.data.code ===200) {
          this.$message.success("成功添加试题")
          this.resetQue(this.queType)
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
              if(inx > 0){
                  this.answer = this.answer.replace(str, "")
              }else if(this.answer.length > 1){
                  this.answer = this.answer.replace(str, "")
              }else{
                  this.answer = this.answer.replace(str, "")
              }
              this.answer = this.sortString(this.answer);
          }else{
              this.answer += str
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
              item.answer +=str
              item.answer = this.sortString(item.answer);
          }
          console.log(item);
      }
    },

    addUnitQue(newQues){
      for(let i=0; i < Number(newQues.radioCount); i++){
        this.complexQues.push({type:"1", title:"", answer:"", options:["","","",""], analysis:"", score:2})
      }
      for(let i=0; i < Number(newQues.checkboxCount); i++){
        this.complexQues.push({type:"2", title:"", answer:"", options:["","","",""], analysis:"", score:2})
      }
      for(let i=0; i < Number(newQues.panduanCount); i++){
        this.complexQues.push({type:"3", title:"", answer:"1", analysis:"", score:2})
      }
      for(let i=0; i < Number(newQues.tiankongCount); i++){
        this.complexQues.push({type:"4", title:"", answer:[], analysis:"", score:2,diffType:2})
      }
      for(let i=0; i < Number(newQues.jiandaCount); i++){
        this.complexQues.push({type:"5",  answer:"", analysis:"", score:2})
      }
      console.log(this.complexQues);
      this.showAddSmallQue = false
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

    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },

    handleChange(file, fileList){
      this.fileList = fileList
    },

    setComplexVal(){
        this.complexQues.forEach(function(e, index){
            if(e.type != 4){
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
              this.setComplexVal();
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

    //重置试题
    resetQue(oldValue){
      this.$refs.quesContainer.scrollTop = 0
      if(oldValue == 1 || oldValue == 2){
        this.selectOptions = ["", "", "", ""]
        this.$refs.simpleXzTitle.clearContent()
        this.$refs.option.forEach(function(e){
          e.clearContent()
        });
      }else if(oldValue == 3){
        this.pdAnswer = "1"
        this.$refs.simplePdTitle.clearContent()
      }else if(oldValue == 4){
        this.tiankongTitle = ""
        this.$refs.simpleTkTitle.clearContent()
      }else if(oldValue == 5){
        this.$refs.simpleJdTitle.clearContent()
        this.$refs.jsAnswer.clearContent()
      }else{
        this.$refs.simpleZhTitle.clearContent()
        this.complexQues = []
        this.fileList = []
      }
      this.answer = ""
      this.score = "2"
      this.category = ""
      this.level = 1
      this.$refs.analysis.clearContent()
    },

    editOneQue(index){
      let currentQue = this.previewQues[index]
      if(this.queType == 1 || this.queType == 2){
          this.$refs.simpleXzTitle.setHtmlContent(currentQue.title)
          this.selectOptions = currentQue.options
          this.selectOptions.forEach(function(e, index2){
            this.$refs.option[index2].setHtmlContent(e);
          }.bind(this))          
          this.answer = currentQue.answer
      }else if(this.queType == 3){ 
          this.$refs.simplePdTitle.setHtmlContent(currentQue.title)
          this.pdAnswer = this.previewQues[index].answer
      }else if(this.queType == 4){ 
          this.$refs.simpleTkTitle.setHtmlContent(currentQue.title)
          this.tiankongTitle = currentQue.title
          this.tiankongAnswer.forEach(function(e, index2){
            e.content = currentQue.answer[index2].content
          }.bind(this))
      }else if(this.queType == 5){ 
          this.$refs.simpleJdTitle.setHtmlContent(currentQue.title)
          this.$refs.jsAnswer.setHtmlContent(currentQue.answer)
          this.answer = currentQue.answer
      }else if(this.queType > 5){ 
          this.$refs.simpleZhTitle.setHtmlContent(currentQue.title)
          this.complexQues = []
          if(this.queType == 7){
            this.fileList.push(currentQue.file)
          }
          setTimeout(function(){
            currentQue.complexQues.forEach(function(e){
              this.complexQues.push(e)
            }.bind(this))
          }.bind(this),500)
      }

      if(this.queType < 6){
        this.score = currentQue.score
        this.level = currentQue.level
        this.category = currentQue.category
        this.$refs.analysis.setHtmlContent(currentQue.analysis)
      }
      this.editIndex = index
    },

    updateQue(queObj){
      this.previewQues=[]
      this.previewQues.push(queObj)
    },
    // 分类选择
    categoryParent(id,name) {
      this.categoryShowName = name
      this.categoryShowId = id
    },
    // 获取应用题型下拉列表
    getTestQuesType() {
      apiPost('/testques/testquestype/getTestquesTypeApply').then(response => {
        if (response.data.code === 200) {
          this.testQuesTypeDropDownList = response.data.data
          this.queTypeId= this.testQuesTypeDropDownList[0].id
          this.queType = parseInt(this.testQuesTypeDropDownList[0].parentId)-1000
        } else{
          this.$message({ message:response.message,type: 'error' })
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 题型Id改变
    queTypeIdChange(val) {
      for(let item of this.testQuesTypeDropDownList) {
        if(item.id==this.queTypeId){
          this.queType = parseInt(item.parentId)-1000
          this.testId=item.id
          break
        }
      }
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
    }
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
    categoryShow: function(){
        if(this.category.name)
          return this.category.name
        else
          return "选择分类"
    },
    complexScore: function(){
        let score = 0;
        if(this.complexQues.length > 0){
          this.complexQues.forEach(function(e){
              score += Number(e.score)
          })
        }
        return score
    }
  },
  watch: {
    queType: function(newValue, oldValue) {
      this.resetQue(oldValue)
      this.previewQues = []
    },
    previewQues: function(newValue, oldValue) {
      console.log(newValue)
      console.log(oldValue)
    }
  },
  mounted(){
    this.areaHeight = window.innerHeight - 100 + "px"
  },
  created() {
    this.getTestQuesType() // 获取题型下拉框
  }
}
</script>
