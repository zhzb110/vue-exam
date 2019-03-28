<template>
  <div class="exam">
    <div class="exam-header">
      <div class="exam-content">
        <div class="logo"><img src="../assets/img/logo.png" alt=""/></div>
        <div class="title" >大学英语考试</div>
        <div class="user">
          <el-dropdown @command="handleCommand">
            <div class="el-dropdown-link user-name" >
              <img src="../assets/img/defaultHead.png" />
              <span>用户名</span>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="loginout">安全退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>     
    </div>
    <div class="exam-content">
      <div class="exam-ques" :style="{height: height+'px'}"  id="ques-width">
        <div class="exam-ques-title">
          <label style="font-size:18px">{{title}}</label>
          <el-button type="primary" class="float-r" @click="nextTest" v-if="nextId!==''">下一题</el-button>
          <el-button type="primary" class="float-r" disabled v-else>下一题</el-button>
          <el-button type="primary" class="float-r margin-right20" @click="upTest" v-if="upId!==''">上一题</el-button>
          <el-button type="primary" class="float-r margin-right20" disabled v-else>上一题</el-button>
        </div>
        <div class="tips" id="tip">
          <el-tooltip class="item" effect="dark" content="按下中间线可左右可滑动" placement="top">
            <img src="../assets/img/tips3.png" alt="">
         </el-tooltip>
        </div>
        <div  id="box" :style="{width: width + 'px' }">
          <div id="top" class="margin-t15">
            <div class="left-content"  :style="{height: height-90+'px'}">
              <template v-for="item in questionsList">
                 <template  v-for="test in item.questions">
                   <div v-show="showId===test.queId" style="height:100%">
                     <div  class="left-content-text">
                      <span class="exam-subject-number">1.</span>
                       <p class="exam-subject" v-html='test.queTitle'><span class="color-99">（{{test.score}}分）</span></p>
                     </div>
                     <span class="exam-sign"><el-checkbox v-model="test.sign" title="标记本题"><i class="iconfont icon-deng"></i>标记</el-checkbox></span>
                   </div> 
                 </template>
              </template>
            </div>
          </div>
          <div id="bottom" class="margin-t15">
            <div class="right-content" :style="{height: height-120+'px'}">
              <template v-for="item in questionsList">
              <!---单选题-->
                <div class="exam-radio" v-if ="item.type === 1" >
                  <template  v-for="test in item.questions">
                    <el-radio-group v-model="test.answer" v-show="showId===test.queId">
                      <div class="single-question" v-for = "option in test.option">
                        <el-radio :label='option.No'>{{option.No}}.</el-radio>
                        <div class="single-question-content" v-html='option.name'></div>
                      </div>
                    </el-radio-group>
                  </template>               
                </div>
                <!---多选题-->
                <div class="exam-radio" v-if ="item.type === 2" >
                  <template v-for="test in item.questions">
                    <el-checkbox-group v-model="test.answer" v-show="showId===test.queId">
                      <div class="single-question" v-for = "option in test.option">
                        <el-checkbox :label='option.No'>{{option.No}}.</el-checkbox>
                        <div class="single-question-content" v-html='option.name'></div>
                      </div>
                    </el-checkbox-group>
                  </template>                 
                </div>
                <!---判断题-->
                <div class="exam-judge" v-if ="item.type === 3" >
                  <template v-for="test in item.questions">
                    <el-radio-group v-model="test.answer" v-show="showId===test.queId">                    
                      <div class="single-question">
                        <el-radio :label='1'><i class="el-icon-check"></i>对</el-radio>
                      </div>
                      <div class="single-question">
                        <el-radio :label='2'><i class="el-icon-close"></i>错误</el-radio>
                      </div>
                    </el-radio-group>    
                  </template>
                </div>
                <!---填空题-->
                <div class="exam-fill" v-if ="item.type === 4">
                  <template v-for="test in item.questions">
                    <div class="exam-fill-text" v-for = "(option,index) in test.queInput">
                      <div v-show="showId === test.queId">
                        <span>{{index+1}}.</span>
                        <div><el-input v-model="option.optionInput" clearable></el-input></div>
                      </div>
                   </div> 
                  </template>                
                </div>
                <!---简答题-->
               <div v-if ="item.type === 5">
                 <template v-for="test in item.questions">
                  <div v-show="showId=== test.queId">
                    <UEditor @ready="editorReady" :ueditorConfig="editorConfig" :index="item.queId"/>
                  </div>
                 </template>
               </div>
                <!---听力题-->
                <!---综合题-->
                <div v-if ="item.type === 7">
                  <div v-for="test in item.questions" v-show="showId=== test.queId">
                    <template v-for="complex in test.questionsChilden">
                       <!---单选题-->                     
                      <div class="exam-radio " v-if ="complex.type === 1" >
                        <template  v-for="test in complex.questions">
                          <div>
                            <span class="exam-subject-number">1.</span><p class="exam-subject" v-html='test.queTitle'><span class="color-99">（{{test.score}}分）</span></p>
                          </div>
                          <el-radio-group v-model="test.answer" class="margin-left15">
                            <div class="single-question" v-for = "option in test.option">
                              <el-radio :label='option.No'>{{option.No}}.</el-radio>
                              <div class="single-question-content" v-html='option.name'></div>
                            </div>
                          </el-radio-group>
                        </template>               
                      </div>
                      <!---多选题-->
                      <div class="exam-radio" v-if ="complex.type === 2">
                        <template v-for="test in complex.questions">
                          <div>
                            <span class="exam-subject-number">1.</span><p class="exam-subject" v-html='test.queTitle'><span class="color-99">（{{test.score}}分）</span></p>
                          </div>
                          <el-checkbox-group v-model="test.answer" class="margin-left15">
                            <div class="single-question" v-for = "option in test.option">
                              <el-checkbox :label='option.No'>{{option.No}}.</el-checkbox>
                              <div class="single-question-content" v-html='option.name'></div>
                            </div>
                          </el-checkbox-group>
                        </template>                 
                      </div>
                      <!---判断题-->
                      <div class="exam-judge" v-if ="complex.type === 3">
                        <template v-for="test in complex.questions">
                          <div>
                            <span class="exam-subject-number">1.</span><p class="exam-subject" v-html='test.queTitle'><span class="color-99">（{{test.score}}分）</span></p>
                          </div>
                          <el-radio-group v-model="test.answer" class="margin-left15">                  
                            <div class="single-question">
                              <el-radio :label='1'><i class="el-icon-check"></i>对</el-radio>
                            </div>
                            <div class="single-question">
                              <el-radio :label='2'><i class="el-icon-close"></i>错误</el-radio>
                            </div>
                          </el-radio-group> 
                         </template>
                       </div>
                      <!---填空题-->
                      <div class="exam-fill" v-if ="complex.type === 4">
                        <template v-for="test in complex.questions">
                          <div>
                            <span class="exam-subject-number">1.</span><p class="exam-subject" v-html='test.queTitle'><span class="color-99">（{{test.score}}分）</span></p>
                          </div>
                          <div class="exam-fill-text" v-for = "option in test.queInput">
                           <div class="margin-left15">
                             <span>1.</span>
                             <div><el-input v-model="option.optionInput" clearable></el-input></div>
                           </div>
                         </div> 
                        </template>                
                      </div>  
                      <!---简答题-->
                      <div v-if ="complex.type === 5">
                        <div v-for="test in complex.questions">
                          <div>
                            <span class="exam-subject-number">1.</span><p class="exam-subject" v-html='test.queTitle'><span class="color-99">（{{test.score}}分）</span></p>
                          </div>
                           <div class="margin-left15">
                              <UEditor @ready="editorReady" :ueditorConfig="editorConfig"/>
                           </div>
                        </div>
                      </div>
                    </template> 
                  </div>    
                </div>
              </template>        
            </div>
          </div>
          <div id="line" v-drag :style="{height: height-120+'px'}"></div>
        </div>
      </div>
      <div class="exam-aside" :style="{height: height-80+'px'}">
        <div class="exam-aside-number">
          <el-progress type="circle" :percentage="(answerProgress/totleQuestion)*100" :show-text="false" :width="120"></el-progress>
          <span class="circle-text">答题进度</span>
          <span class="circle-number">{{answerProgress}}/{{totleQuestion}}</span>
        </div>
        <div class="exam-aside-card" @click="showCard">
          <i slot="prefix" class="iconfont icon-dati"></i><label>答题卡</label>
        </div>
        <div class="exam-aside-btn">
          <el-button type="primary" class="btn-width150" @click="showHandParperDialog()">交卷</el-button>
        </div>
        <div class="exam-aside-time">
          <p class="exam-aside-time-text" @click="showExamTime" title="点我隐藏或显示倒计时">剩余时间 
            <i class="el-icon-arrow-down" v-show="examTimeShowAndHidden"></i>
            <i class="el-icon-arrow-up" v-show="!examTimeShowAndHidden"></i></p>
          <p class="exam-aside-time-second" v-show="examTimeShowAndHidden">{{time}}</p>
        </div>
      </div>
    </div>
    <!--答题卡弹出框-->
    <el-dialog title='答题卡' :visible.sync="dialogCard" width="600px">
      <template v-for="item in questionsList">
        <div v-if ="item.type === 7">
          <div class="dialog-subject">{{item.name}}（共{{item.count}}题，{{item.score}}分）</div>
          <div class="margin-bottom10">
            <template v-for="test in item.questions">
              <template v-for="complex in test.questionsChilden">
               <div class="cricle-div circle-f8" v-if="test.sign===true">
                 <span class="cricle circle-40" v-if="complex.answer!==''" @click="anserCardClick(test.queId,item)">1</span>
                 <span class="cricle circle-e5" v-else @click="anserCardClick(test.queId,item)">1</span>
               </div>
               <div class="cricle-div" v-else-if="complex.answer!==''"><span class="cricle circle-40" @click="anserCardClick(test.queId,item)">1</span></div>
               <div class="cricle-div" v-else><span class="cricle circle-e5" @click="anserCardClick(test.queId,item)">1</span></div>
              </template>  
            </template>
          </div>
        </div>
        <div v-else>
          <div class="dialog-subject">{{item.name}}（共{{item.count}}题，{{item.score}}分）</div>
          <div class="margin-bottom10">
            <template v-for="test in item.questions">
              <div class="cricle-div circle-f8" v-if="test.sign===true">
                 <span class="cricle circle-40" v-if="test.answer!==''&&test.answer.length!==0" @click="anserCardClick(test.queId,item)">1</span>
                 <span class="cricle circle-e5" v-else @click="anserCardClick(test.queId,item)">1</span>
              </div>
              <div class="cricle-div" v-else-if="test.answer!==''&&test.answer.length!==0"><span class="cricle circle-40" @click="anserCardClick(test.queId,item)">1</span></div>
              <div class="cricle-div" v-else><span class="cricle circle-e5" @click="anserCardClick(test.queId,item)">1</span></div>
            </template>
          </div>
        </div>
      </template>
      <div class=" footer-circle">
        <div><span class="cricle-small circle-tip"></span><label>标记</label></div>
        <div><span class="cricle-small circle-e5"></span><label>未做</label></div>
        <div><span class="cricle-small circle-40"></span><label>已做</label></div>
      </div>
   </el-dialog>
   <!--确认交卷弹出框--> 
   <el-dialog title='交卷' :visible.sync="dialogHandParper" width="500px">
     <div class="align-center exam-hand-parper">还有 <span>4</span> 道题未完成</div>
     <div class="align-center exam-hand-parper">交卷后不能再进入考试，是否现在交卷？</div>
     <div class="align-center exam-hand-parper-btn">
      <el-button type="primary" @click="submitParper()">确 认交卷</el-button>
      <el-button @click="dialogHandParper = false">取 消</el-button>
     </div>
   </el-dialog>
   <!-- <div> 听力题的播放器，到时看听力题如何传
    <div style="width: 400px; border:1px solid #e5e5e5;overflow: hidden;padding:10px 20px">
      <div style="width: 40px;float: left;">
       <el-button @click="play" id="play" :icon="music.isPlay?'el-icon-refresh':'el-icon-caret-right'" circle></el-button>
      </div>
      <div style="width: 250px;float: left;">
        <el-slider :format-tooltip="formatTime" :max="music.maxTime" v-model="music.currentTime" style="width: 100%;" disabled></el-slider>
      </div>
      <div style="padding: 9px 0px 0px 10px;color:#909399;font-size: 13px;width: 90px;float: left;">
        {{formatTime(music.currentTime)}}/{{formatTime(music.maxTime)}}
      </div>
    </div>
    <audio ref="music" loop autoplay> 
      <source src="http://sc1.111ttt.cn:8282/2018/1/03m/13/396131232171.m4a?tflag=1519095601&pin=6cd414115fdb9a950d827487b16b5f97#.mp3" type="audio/mpeg">
    </audio>
  </div> -->
  </div>
</template>
<script>
import UEditor from '@/components/UEditor'
import { delCookie } from "@/common/util"
var time = '' // 获取当前时间
var editorConfig= {
    zIndex: 99999,
    isShow: true,
    focus: true,
    enableAutoSave: false,
    imageScaleEnabled: true,
    retainOnlyLabelPasted: true,
    pasteplain: true,
    elementPathEnabled: false,
    enableContextMenu: false,
    maximumWords: 500,
    allowDivTransToP: true,
    imagePopup: false,
    autoClearinitialContent: false,
    autoClearEmptyNode: true,
    toolbars: [[
      'fullscreen', 'source', 'undo', 'redo', 'cleardoc',
      'bold', 'italic', 'underline', 'fontborder',
      'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', 'preview'
    ]]
  };
export default {
  data() {
    return {
      editorConfig: editorConfig, // 编译器配置
      height:'',
      width:1000,
      dialogCard: false, // 答题卡弹出框
      dialogHandParper:false, // 交卷弹出框
      showId:'', // 显示每道题的id
      nextId:'', // 上一题的Id
      upId:'',  // 下一题的Id
      endId:'', // 最后一道题的Id,用于判断下一题是否可点
      startId:'', // 第一道题的Id,用于判断下一题是否可点
      title:'', // 标题
      totleQuestion:15, // 该试卷一共多少题
      answerProgress:0, // 答题进度
      editor: new Map(), // 编译器实例
      examTimeShowAndHidden:true, // 倒计时显示和隐藏
      time:'',// 倒计时的时间
      flag:false, // 判断考试时间是否到了
      questionsList: [
        {
          id: "1",
          name: "单选题",
          type: 1,
          score: "20",
          count: "2",
          qType:1,
          questions: [
            {
              queId: "11",
              sign:false,
              queTitle: "<p>单选题第一题Don’t单选题第一题Don’t ______ unknown files on the Internet.单选题第一题Don’t ______ unknown files on the Internet.单选题第一题Don’t ______ unknown files on the Internet.单选题第一题Don’t ______ unknown files on the Internet.单选题第一题Don’t ______ unknown files on the Internet.单选题第一题Don’t ______ unknown files on the Internet.单选题第一题Don’t ______ unknown files on the Internet.单选题第一题Don’t ______ unknown files on the Internet.单选题第一题Don’t ______ unknown files on the Internet.单选题第一题Don’t ______ unknown files on the Internet.单选题第一题Don’t ______ unknown files on the Internet.单选题第一题Don’t ______ unknown files on the Internet.单选题第一题Don’t ______ unknown files on the Internet.单选题第一题Don’t ______ unknown files on the Internet.单选题第一题Don’t ______ unknown files on the Internet. ______ unknown files on the Internet.</p>",
              option: [
                { No: "A", name: "单选题第一题" },
                { No: "B", name: "<p>download</p>" },
                { No: "C", name: "down" },
                { No: "D", name: "load" }
              ],
              answer: "",
              score:'10',
              goal:'',
              analysis: "you must fill download"
            },
            {
              queId: "12",
              sign:false,
              queTitle: "单选题第二题Don’t ______ unknown files on the Internet.",
              score:4,
              goal:'',
              option: [
                { No: "A", name: "单选题第二题" },
                { No: "B", name: "download" },
                { No: "C", name: "down" },
                { No: "D", name: "load" }
              ],
              answer: ""
            }
          ]
        },{
          name: "多选题",
          id: "2",
          type: 2,
          score: "20",
          count: "1",
          qType:1,
          questions: [
            {
              queId: "21",
              sign:false,
              queTitle: "多选题第一题Don’t ______ unknown files on the Internet.",
              score:4,
              goal:'',
              option: [
                { No: "A", name: "多选题第一题" },
                { No: "B", name: "download" },
                { No: "C", name: "down" },
                { No: "D", name: "load" }
              ],
              answer: [],
              analysis: "you must fill download"
            },
            {
              queId: "22",
              sign:false,
              queTitle: "多选题第二题Don’t ______ unknown files on the Internet.",
              score:4,
              goal:'',
              option: [
                { No: "A", name: "多选题第二题" },
                { No: "B", name: "download" },
                { No: "C", name: "down" },
                { No: "D", name: "load" }
              ],
              answer: [],
              analysis: "you must fill download"
            }
          ]
        },{
          id: "3",
          name: "填空题",
          type: 4,
          score: 20,
          count: 2,
          qType:1,
          questions: [
            {
              queId:"31",
               sign:false,
              queTitle: "The two farmers were ________.The two farmers _______on that day.",
              queInput:[
               {optionInput:''},
               {optionInput:''},
               {optionInput:''}
              ],
              score:4,
              goal:'',
              answer:'',
              analysis:"you can you up"
            },{
              queId:"32",
               sign:false,
              queTitle: "The two farmers were ________.The two farmerson that day.",
             queInput:[
               {optionInput:''},
               {optionInput:''}
              ],
              score:3,
              goal:'',
              answer:'',
              analysis:"you can you up"
            }
          ]
        },{
          id: "4",
          name: "判断题",
          type: 3,
          score: 20,
          count: 2,
          qType:1,
          questions: [
            {
              queId:"41",
              sign:false,
              queTitle: "The two farmers wereon that day.",
              score:4,
              goal:'',
              answer:'',
              analysis:"you can you up"
            },{
              queId:"42",
              sign:false,
              queTitle: "The two farmers on that day.",
              score:3,
              goal:'',
              answer:'',
              analysis:"you can you up"
            }
          ]
        },
        {
          id: "5",
          name: "简答题",
          type: 5,
          score: 20,
          count: 2,
          qType:1,
          questions: [
            {
              queId:"51",
              sign:false,
              queTitle:"<p>Mr. Brown was going away for a week. Before he left, he said to his son, “if anyone asks for me, you can tell him that your father has been out for doing something, and will be back in a week, then be sure to ask him to sit down for a cup of tea. “OK, Dad,” said his son. But he was afraid his son couldn't remember this, he wrote these words down on a piece of paper and gave it to him. His son put it into his small pocket, took it out and looked at it every now and then.</p>",
              score:4,
              answer:"",
              analysis:"<p>you can you up</p>"
            },{
              queId:"52",
              sign:false,
              queTitle:"Mr. Brown was going away for a week. Before he left, he said to his son, “if anyone asks for me, you can tell him that your father has been out for doing something, and will be back in a week, then be sure to ask him to sit down for a cup of tea. “OK, Dad,” said his son. But he was afraid his son couldn’t remember this, he wrote these words down on a piece of paper and gave it to him. His son put it into his small pocket, took it out and looked at it every now and then.",
              score:4,
              answer:"",
              analysis:"you can you up"
            }
          ]
        },{
          id: "006",
          name: "综合题",
          type: 7,
          score: 20,
          count: 2,
          qType:2,
          questions: [
          {
              queId:"71",
              sign:false,
              queTitle:"Two farmers were on their way home one evening after a hard day’s work. Both were tired. They happened to look up at the sky and saw a black cloud overhead.“Ah!” said one farmer, “tomorrow we shall have rain and the rice will grow well.” The second answered, “Nonsense, the rain will only kill the crops.”So they began to quarrel. Just then, a third farmer came along and asked them why they were quarreling. Both farmers explained about the black cloud.“What cloud?” asked the third farmer. They all looked at the sky. The cloud was no longer there..",
              score:10,
              questionsChilden:[
                {
                  id: "001",
                  name: "单选题",
                  type: 1,
                  score: "20",
                  count: "2",
                  qType:1,
                  questions: [
                    {
                      queId: "0071",
                      queTitle: "<p>Don’t ______ unknown files on the Internet.</p>",
                      option: [
                        { No: "A", name: "<p>downloy888688888ads</p>" },
                        { No: "B", name: "<p>download</p>" },
                        { No: "C", name: "down" },
                        { No: "D", name: "load" }
                      ],
                      answer: "",
                      score:'10',
                      goal:'',
                      analysis: "you must fill download"
                    },
                    {
                      queId: "072",
                      queTitle: "Don’t ______ unknown files on the Internet.",
                      score:4,
                      goal:'',
                      option: [
                        { No: "A", name: "downloads" },
                        { No: "B", name: "download" },
                        { No: "C", name: "down" },
                        { No: "D", name: "load" }
                      ],
                      answer: ""
                    }
                  ]
                },{
                  name: "多选题",
                  type: 2,
                  id: "002",
                  score: "20",
                  count: "1",
                  qType:1,
                  questions: [
                    {
                      queId: "073",
                      queTitle: "Don’t ______ unknown files on the Internet.",
                      score:4,
                      goal:'',
                      option: [
                        { No: "A", name: "downloads" },
                        { No: "B", name: "download" },
                        { No: "C", name: "down" },
                        { No: "D", name: "load" }
                      ],
                      answer: [],
                      analysis: "you must fill download"
                    }
                  ]
                },{
                  id: "003",
                  name: "填空题",
                  type: 4,
                  score: 20,
                  count: 2,
                  qType:1,
                  questions: [
                    {
                      queId:"074",
                      queTitle: "The two farmers were ________.The two farmers _______on that day.",
                      queInput:[
                       {optionInput:''},
                       {optionInput:''},
                       {optionInput:''}
                      ],
                      score:4,
                      goal:'',
                      answer:'',
                      analysis:"you can you up"
                    },{
                      queId:"075",
                      queTitle: "The two farmers were ________.The two farmerson that day.",
                     queInput:[
                       {optionInput:''},
                       {optionInput:''}
                      ],
                      score:3,
                      goal:'',
                      answer:'',
                      analysis:"you can you up"
                    }
                  ]
                },{
                  id: "004",
                  name: "判断题",
                  type: 3,
                  score: 20,
                  count: 2,
                  qType:1,
                  questions: [
                    {
                      queId:"076",
                      queTitle: "The two farmers wereon that day.",
                      score:4,
                      goal:'',
                      answer:'',
                      analysis:"you can you up"
                    },{
                      queId:"078",
                      queTitle: "The two farmers on that day.",
                      score:3,
                      goal:'',
                      answer:'',
                      analysis:"you can you up"
                    }
                  ]
                },
                {
                  id: "005",
                  name: "简答题",
                  type: 5,
                  score: 20,
                  count: 2,
                  qType:1,
                  questions: [
                    {
                      queId:"079",
                      queTitle:"<p>Mr. Brown was going away for a week. Before he left, he said to his son, “if anyone asks for me, you can tell him that your father has been out for doing something, and will be back in a week, then be sure to ask him to sit down for a cup of tea. “OK, Dad,” said his son. But he was afraid his son couldn't remember this, he wrote these words down on a piece of paper and gave it to him. His son put it into his small pocket, took it out and looked at it every now and then.</p>",
                      score:4,
                      answer:"",
                      analysis:"<p>you can you up</p>"
                    },{
                      queId:"080",
                      queTitle:"Mr. Brown was going away for a week. Before he left, he said to his son, “if anyone asks for me, you can tell him that your father has been out for doing something, and will be back in a week, then be sure to ask him to sit down for a cup of tea. “OK, Dad,” said his son. But he was afraid his son couldn’t remember this, he wrote these words down on a piece of paper and gave it to him. His son put it into his small pocket, took it out and looked at it every now and then.",
                      score:4,
                      answer:"",
                      analysis:"you can you up"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      music:{
        isPlay:true,
        currentTime:0,
        maxTime:0,
      }
    }
  },
  // 自定义指令,左右滑动
  directives:{
     drag(el){
       el.onmousedown = function(e){
        var oBottom = document.getElementById("bottom")
        var oTop = document.getElementById("top")
        var oLine = document.getElementById("line")
        var oBox = document.getElementById("box")
        var oTip = document.getElementById("tip")
        var disX = (e || event).clientX
        oLine.left = oLine.offsetLeft
         document.onmousemove = function(e){
            var iT = oLine.left + ((e || event).clientX - disX)
           var e=e||window.event,tarnameb=e.target||e.srcElement
            var maxT = oBox.clientWight - oLine.offsetWidth-8
            oLine.style.margin = 0
            iT < 15 && (iT = 15)
           // iT > maxT && (iT = maxT)
           if((iT+15)>=1000){
             iT = 1000-20
           }
            oLine.style.left = oTop.style.width = iT + "px"
            oTip.style.left = iT + "px"
            oBottom.style.width = oBox.clientWidth - iT-8 + "px"
            return false
         }
         document.onmouseup = function(e){
            document.onmousemove = null
            document.onmouseup = null
           oLine.releaseCapture && oLine.releaseCapture()
         }
         oLine.setCapture && oLine.setCapture()
       }
      }
  },
  methods: {
   // 答题卡显示
   showCard() {
     this.dialogCard = true
   },
   // 交卷弹出框显示
   showHandParperDialog() {
     this.dialogHandParper = true
   },
   // 显示答题时间和隐藏时间
   showExamTime() {
     this.examTimeShowAndHidden = !this.examTimeShowAndHidden
   },
   editorReady(editorInstance) {
      var global = this
      var ueditorId = editorInstance.ueditorId
      this.editor.set(ueditorId, editorInstance)
      // 选项内容
      editorInstance.setHeight(250)
      editorInstance.setContent('1241443')
      editorInstance.addListener('contentChange', () => {
        console.log(editorInstance.getContent())
        // 自动上传公式图片
        editorInstance.getKfContent(function(content) {
          setTimeout(function() { // 延迟获取图片途径
          }, 500)
        })
      })
    },
    // 下一题
    nextTest() {
      var find = 0 // 0没有找到，1找到下一题的nextId
      for (const item of this.questionsList) { 
        for (const ques of item.questions) {
          if (find===1) { // 找下一题的相关内容了
            this.upId = this.showId
            this.showId= ques.queId
            this.title =item.name +"( 共"+item.count+"题  "+item.score+"分 )"
            if (this.showId === this.endId){ // 最后一套题
              this.nextId = ""
            } else { 
              this.nextId ='0' // 随便写一个只要不为空
            }
            return
          }
          if (ques.queId === this.showId) {
            find = 1
          }
        }
      }
    },
    // 上一题
    upTest() {
      var find = 0 // 0没有找到，1在同级下找 2在不同级下找到下一题的nextId
      var upItem // 保存第一层for上一个内容
      var upQues // 保存第二层for上一个内容
      for (const item of this.questionsList) { 
        var count = 0
        for (const ques of item.questions) {
          if (ques.queId === this.showId) {
            find = 1
          }
          count++
          if (find===1 && count===1) { // 找上一题的相关内容了
            this.nextId = this.showId
            this.showId= upQues.queId
            this.title =upItem.name +"( 共"+upItem.count+"题  "+ upItem.score+"分 )"
            if (this.showId === this.startId){ // 第一道题
              this.upId = ""
            } else { 
              this.upId ='0' // 随便写一个只要不为空
            }
            return
          } else if (find===1) {
            this.nextId = this.showId
            this.showId= upQues.queId
            this.title =item.name +"( 共"+item.count+"题  "+ item.score+"分 )"
            if (this.showId === this.startId){ // 第一道题
              this.upId = ""
            } else { 
              this.upId ='0' // 随便写一个只要不为空
            }
            return
          }
          upQues = ques
        }
        upItem = item
      }
    },
    // 点击答题卡显示对应的题型
    anserCardClick(id, item){
      this.showId= id
      this.title =item.name +"( 共"+item.count+"题  "+ item.score+"分 )"
      this.dialogCard = false
      if (this.showId === this.startId){ // 第一道题
        this.upId = ""
      } else { 
        this.upId ='0' // 随便写一个只要不为空
      }
      if (this.showId === this.endId){ // 最后一套题
        this.nextId = ""
      } else { 
        this.nextId ='0' // 随便写一个只要不为空
      }
    },
    // 用户提交试卷
    submitParper() {
       this.$router.push({ path: "/handParperSuccess" })
    },
    // 获取答题进度
    obtainProgress() {
      var count=0
      for (const item of this.questionsList) {
        if (item.type === 7 ) { // 综合题
        } else if (item.type === 6) { // 听力题          
        } else {
          for (const ques of item.questions) {
            if (item.type === 1 && ques.answer!=='' ) { // 单选题
              count++
            } else if(item.type === 2 && ques.answer.length>0) { // 多选题
              count++
            } 
          }
        }   
      }
      this.answerProgress = count
    },
    timeDown () {
       const endTime = new Date('2019/6/20')
       const nowTime = new Date()
       let leftTime = parseInt((endTime.getTime()-nowTime.getTime())/1000)
       let d = parseInt(leftTime/(24*60*60))
       let h = this.formate(parseInt(leftTime/(60*60)%24))
       let m = this.formate(parseInt(leftTime/60%60))
       let s = this.formate(parseInt(leftTime%60))
       if(leftTime <= 0){
           this.flag = true
          // 考试时间到，必须交卷
       }
       this.time = `${d}天${h}小时${m}分${s}秒`
    },
    // 添加0
    formate (time) {
      if(time>=10) {
         return time
      } else {
         return `0${time}`
      }
    },
    // 退出
    handleCommand(command) {
      if (command === "loginout") {
        delCookie("accessTokenExam")
        this.$router.push("/login")
      }
    },
    // t听力题
    // listenMusic(){
    //   if(!this.$refs.music){
    //     return
    //   }
    //   if(this.$refs.music.readyState){
    //     this.music.maxTime = this.$refs.music.duration
    //   }
    //   this.music.isPlay=!this.$refs.music.paused
    //   this.music.currentTime = this.$refs.music.currentTime
    // },
    // play(){
    //   if(this.$refs.music.paused){
    //     this.$refs.music.play()
    //   }else{
    //     this.$refs.music.pause()
    //   }
    //   this.music.isPlay=!this.$refs.music.paused
    //   this.$nextTick(()=>{
    //     document.getElementById('play').blur()
    //   })
    // },
    // formatTime(time){
    //   let it = parseInt(time)
    //   let m = parseInt(it/60)
    //   let s = parseInt(it%60)
    //   return (m<10?"0":"")+parseInt(it/60)+":"+(s<10?"0":"")+parseInt(it%60)
    // }
  },
  components: { UEditor},
  created() {
    var height=document.documentElement.clientHeight
    this.height = height-60
    if (this.questionsList.length>0 ) {
      this.showId = this.questionsList[0].questions[0].queId
      this.startId = this.showId
      this.title = this.questionsList[0].name +"( 共"+this.questionsList[0].count+"题  "+this.questionsList[0].score+"分 )"
      // 获取最后一题的endId
      if (this.questionsList.length>1) {
        var endContent = this.questionsList[this.questionsList.length-1]
        this.endId = endContent.questions[endContent.questions.length-1].queId
        if(this.endId){
          this.nextId='0' // 随便写一个只要不为空 不为空就可点下一题
        }
      } else if(this.questionsList.length>0) {
         this.endId = this.showId
         this.nextId = ''
      }
    }
  },
  mounted() {
    let time = setInterval(()=>{
       if(this.flag == true){
           clearInterval(time)
       }
       this.timeDown()
   },500)
   // 听力题
   // this.$nextTick(()=>{
   //    setInterval(this.listenMusic,1000)
   // })
  },
   watch: {
    // 监听用户的操作
    questionsList: {
      deep: true,
      handler: function(newValue, oldValue) {
        if(time === '') {
          time = new Date().getTime() // 获取时间戳
        }
        var oldTime = Date.parse(new Date()) // 获取数据改变的时间戳
        // 数据改变,获取答题进度，如果用户一直在改变数，每个5秒修改一次并提交后
        this.obtainProgress()
        if (time+5000<oldTime) {
         // 试卷的答案提交到后台
         time = oldTime
        } 
      }
    },
  }
};
</script>
<style scoped>
.exam-header{ background: #409eff;position: relative;height: 60px }
.exam-content{ width: 1200px;margin:0 auto;position: relative;}
.exam{ height: 100% }
.logo{ float: left;width: 250px;margin-top: 5px }
.user{ float: right;width: auto;line-height: 60px;color:#fff;max-width: 250px;padding:0px 10px;cursor:pointer; }
.title{ float: left;line-height: 60px;color: #fff;width: 700px;text-align: center;font-size: 18px }
.exam-ques{ width: 1000px;float: left;margin-top: 0px;padding:0px 15px;background:#eff3f7;min-height:400px;position: relative;}
.exam-ques-title{ padding:10px 15px; overflow: hidden; background: #fafafa; margin: 0px -15px;}
.exam-ques-title>label{ line-height: 32px; }
.margin-right20{ margin-right: 20px }
#box{position:relative;margin:25px auto 10px;overflow: hidden;}
#top,#bottom{width:495px;overflow:hidden;border-radius: 5px;background: #fff}
#top{float:left}
#bottom{float:right}
#line{position:absolute;top:0;left:496px;height:100%;width:8px;overflow:hidden;background: #eff3f7;;cursor:w-resize;}
.left-content,.right-content{border:1px solid #e5e5e5;box-shadow: 0 0 10px inset #e5e5e5;overflow: auto;position: relative;}
.left-content-text{overflow: auto;padding: 0px 5px;position: absolute;top:15px;left: 0px;right: 0px;bottom: 28px}
.right-content{padding: 15px 15px;}
.circle-number{position: absolute;top:80px;left: 0px;right: 0px;text-align: center;}
.circle-text{position: absolute;top:55px;left: 0px;right: 0px;text-align: center;}
.exam-aside{ width: 150px;position: absolute;top:60px;right: 0px;height: 400px; }
.exam-aside-number{ background: #eff3f7;position: relative; border-bottom: 2px solid #fff;padding:15px 15px 10px;}
.exam-aside-card{background: #eff3f7;position: relative; padding: 10px 0px ;text-align:center;position: relative;color: #409eff;}
.exam-aside-btn{ overflow: hidden; margin:20px 0px;text-align: center;padding:10px 0px; }
.btn-width150{ width:150px; }
.tips{ position:absolute;top:58px;left:495px; width: 20px; height: 20px;cursor: pointer; }
.tips img{ width: 40px } 
.exam-aside-card>i{ font-size: 25px;position: absolute;height: 40px;line-height: 40px;top:10px;left:40px;}
.exam-aside-card>label{line-height: 40px;display: inline-block;padding-left: 25px}
.exam-aside-time{ text-align: center; position: absolute;bottom: 0px;right:0px;left: 0px;height: 60px}
.exam-aside-time-text{ line-height: 30px;cursor: pointer;}
.exam-aside-time-text>i{ margin-left:5px;font-size: 16px }
.exam-aside-time-second{ color:#FF0000;line-height: 30px;font-size: 16px }
.exam-subject-number{ width: 22px;float: left;text-align: right; color:#409eff;}
.exam-subject{margin:0px 0px 10px 25px;}
.el-radio-group, .el-checkbox-group{display:block}
.single-question{margin-bottom: 8px;overflow: hidden;}
.single-question .el-radio,.single-question .el-checkbox{ width:45px;float: left;line-height: 20px; }
.single-question-content{ margin-left: 45px;font-size: 14px;line-height: 20px}
.exam-judge>div{padding:5px 0px;}
.exam-judge>div>span>i{font-weight: bold;font-size: 16px;padding: 3px 3px;border: 1px solid #dcdfe6;color: #dcdfe6; border-radius: 3px;margin-right: 5px;}
.exam-fill-text>div{ margin:0px 0px 15px 0px; }
.exam-fill-text>div>span{ width: 20px;text-align: right;float: left;line-height: 32px; }
.exam-fill-text>div>div{ margin-left: 35px }
.color-99{ color:#999; }
.complex-content{ margin-left: 15px; }
.margin-bottom10{overflow: hidden;}
.margin-left15{ margin-left: 20px }
.cricle{width:26px;height:26px;line-height:26px;border-radius: 13px;display:inline-block;text-align: center;color:#fff}
.cricle-div{width:40px;height:40px;float: left;line-height: 40px;margin-right: 6px;text-align: center;}
.dialog-subject{ padding: 5px 10px 10px;border-bottom: 1px dashed #e5e5e5;font-size: 13px;margin-bottom: 5px; }
.cricle-small{width:12px;height:12px;line-height:12px;border-radius: 6px;background: #e5e5e5;display:inline-block;text-align: center;position: absolute;top:4px;left: 0px}
.footer-circle{ overflow: hidden; margin-top: 20px;margin-bottom: -15px;}
.footer-circle>div{ display:inline-block;width: 45px; position: relative;float: right;margin-left: 15px;height: 20px}
.footer-circle label{ margin-left: 18px;font-size: 12px}
.circle-tip{border-radius: 0px;background: #d2e8fe;height: 14px;width: 14px}
.circle-40{ background: #409EFF;border-color: #1A8CFE;border: 1px solid #409EFF; }
.circle-e5{ color: #B4B6BD;background: #fff;border: 1px solid #B4B6BD;}
.circle-f8{ background: #d2e8fe;}
.exam-sign{ position:absolute;bottom: 5px;right: 10px; font-size: 12px;color:#409EFF;}
.exam-sign>label i{ font-size: 20px }
.exam-hand-parper{ padding:15px 0px 0px;font-size: 16px }
.exam-hand-parper-btn{ margin-top: 20px;padding-bottom: 30px}
.exam-hand-parper>span{color: #f8ae03;}
.user-name>span{color: #fff;display: inline-block;margin-left: 50px}
.user-name>img{ width: 40px;height: 40px;border-radius: 20px;position: absolute;top: 10px;left: 0px }
</style>
<style>
.exam-sign>label .el-checkbox__inner{ opacity: 0;width: 0px }
.exam-sign>label>.el-checkbox__label{padding-left: 0;font-size: 12px}
.edui-editor,.edui-editor-iframeholder{z-index: 1 !important; width: 100% !important;}
.el-slider__runway.disabled .el-slider__bar{ background-color:#409EFF !important; }
.el-slider__button{ width: 10px;height: 10px;border:1px solid #409EFF !important; }
.el-slider__bar,.el-slider__runway{ height: 4px }
</style>
