<template>
    <div class="paper">
      <div class="question quesView" v-for="(item, index) in questionList" >
       <div class="quesTitle clear"><samp>{{index+1}}.</samp> <div v-html="item.content"></div></div>
          <div v-if="item.parentTypeId == 1001 || item.parentTypeId == 1002">
              <ul class="options" v-if="item.parentTypeId == 1001">
                  <li v-for="(option,indexxx) in item.options" :class="option.answerFlag == 1 ? 'active clear':'clear'">
                    <samp>{{String.fromCharCode(indexxx+65)}}</samp> 
                    <div v-html="option.optionContent"></div>
                  </li>
                </ul>
                <ul class="options" v-if="item.parentTypeId == 1002">
                  <li v-for="(option,indexxx) in item.options" :class="option.answerFlag == 1 ? 'active clear':'clear'">
                    <samp style="border-radius:0">{{String.fromCharCode(indexxx+65)}}</samp> 
                    <div v-html="option.optionContent"></div>
                  </li>
                </ul>
          </div>

          <div v-if="item.parentTypeId == 1003">
              <div class="answer">答案：
                  <i v-if="item.options[0].answerFlag == 1&&item.options[0].optionContent=='正确'" class="el-icon-check"></i>
                  <i v-if="item.options[1].answerFlag == 1&&item.options[1].optionContent=='错误'" class="el-icon-close"></i>
                </div>
          </div>

          <div v-if="item.parentTypeId == 1004">
            <div class="answerTk"><samp>答案：</samp> 
                  <ul><li v-for="(answer,indexxx) in item.answer.split('&<multi@>')"><div class="orderInx">{{indexxx+1}}</div> {{answer}}</li></ul>
             </div>
          </div>

          <div v-if="item.parentTypeId == 1005">
          <div class="answer"><samp>答案：</samp> 
                  <div v-html="item.answer"></div>
            </div>
          </div>
          <div v-if="item.parentTypeId == 1006 || item.parentTypeId == 1007">
            <div v-if="item.parentTypeId == 1007"><video :src="item.file"></video></div>
            <div v-for="(que,index2) in item.subSimple" class="smallQue" >
                  <div v-if="que.parentTypeId == '1001' || que.parentTypeId == '1002'">
                    <div class="quesTitle clear color-66"><samp>{{index2+1}}、[{{que.parentTypeId=='1002'?'多选题':'单选题'}}]</samp> <div v-html="que.content"></div></div>
                      <ul class="options" v-if="que.parentTypeId == '1001'">
                          <li v-for="(option,index) in que.options" :class="option.answerFlag == 1 ? 'active clear':'clear'">
                            <samp>{{String.fromCharCode(index+65)}}</samp> 
                            <div v-html="option.optionContent"></div>
                          </li>
                      </ul>
                      <ul class="options" v-if="que.parentTypeId == 1002">
                          <li v-for="(option,index) in que.options" :class="option.answerFlag == 1 ? 'active clear':'clear'">
                            <samp style="border-radius:0">{{String.fromCharCode(index+65)}}</samp> 
                            <div v-html="option.optionContent"></div>
                          </li>
                      </ul>
                  </div>
                  <div v-if="que.parentTypeId == '1003'">
                      <div class="quesTitle clear color-66"><samp>{{index2+1}}、[判断题]</samp> <div v-html="que.content"></div></div>
                      <div class="answer">答案： 
                       <i v-if="que.options[0].answerFlag == 1&&que.options[0].optionContent=='正确'" class="el-icon-check"></i>
                       <i v-if="que.options[1].answerFlag == 1&&que.options[1].optionContent=='错误'" class="el-icon-close"></i>
                     </div>
                  </div>
                  <div v-if="que.parentTypeId == '1004'">
                     <div class="quesTitle clear color-66"><samp>{{index2+1}}、[填空题]</samp> <div v-html="que.content"></div></div>
                      <div class="answerTk"><samp>答案：</samp> 
                        <ul><li v-for="(answer,index) in que.answer.split('&<multi@>')"><div class="orderInx">{{index+1}}</div> {{answer}}</li></ul>
                      </div>
                  </div>
                  <div v-if="que.parentTypeId == '1005'">
                    <div class="quesTitle clear color-66"><samp>{{index2+1}}、[简答题]</samp> <div v-html="que.content"></div></div>
                      <div class="answer"><samp>答案：</samp> 
                        <div v-html="que.answer"></div>
                      </div>
                  </div>
                  <div class ="analysis clear"><samp>解析：</samp><div v-html="que.answerAnalysis || '无'"></div></div>
                  <p>分值： {{que.score}} 分</p>
                  <p v-if="que.parentTypeId < 6">难度： {{que.difficultyLevel}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 试题分类： {{que.classifyName||""}}</p>
            </div>
          </div>

          <div v-if="item.parentTypeId==1001||item.parentTypeId==1002||item.parentTypeId==1003||item.parentTypeId==1004||item.parentTypeId==1005" class="analysis clear"><samp>解析：</samp><div v-html="item.answerAnalysis || '无'"></div></div>
          <p>{{item.parentTypeId==1006||item.parentTypeId==1007?"本题总分":"分值"}}： {{item.score}} 分</p>
          <p v-if="item.parentTypeId==1001||item.parentTypeId==1002||item.parentTypeId==1003||item.parentTypeId==1004||item.parentTypeId==1005" >难度： {{item.difficultyLevel}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 试题分类： {{item.classifyName||""}}</p>
      </div>
    </div>
</template>
<style scoped>
.quesView{padding:10px;margin-bottom:15px;color:#666;background:#fff;position:relative}
  .quesView samp{float:left;margin-right:5px}
  .current{border:2px solid #409EFF;}
  .quesTitle{font-size:16px;margin-bottom:10px;color:#000}
  .smallQue{margin-bottom:30px;margin-left: 10px}
  .smallQue .quesTitle{font-size:14px}
  .quesTitle > div{margin-left: 15px;}
  .options li{line-height:26px;margin-bottom:10px}
  .options li samp{border-radius:14px;width:26px;display:block;color:#409EFF;border:1px solid #409EFF;height:26px;text-align:center}
  .options li > div{float:left;width:88%}
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
<script>
export default {
  data() {
    return {}
  },
  methods:{
   answerTransition(optionArray,type){
     if (type==1){ // 选择题
       var answerString=''
       for(var i=0;i<optionArray.length;i++){
          if(optionArray[i].answerFlag == 1){
            answerString+=String.fromCharCode(parseInt(i)+65)
          }               
       }
       return answerString
     } else{ // 判断题
       for(var i=0; i<optionArray.length;i++){
        if(optionArray[i].answerFlag == 1 && optionArray[i].optionContent=='正确'){
          return '正确'
          break
        }
        if(optionArray[i].answerFlag == 1 && optionArray[i].optionContent=='错误'){
          return '错误'
          break
        }               
       }
     }
   }
  },
  props: ['questionList'],
  created(){ 
  },
}
</script>
