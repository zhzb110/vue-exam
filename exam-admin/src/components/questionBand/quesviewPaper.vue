<template>
  <div ref="viewContainer">
    <div class="quesView">
      <div style="font-size: 18px;margin-bottom: 10px;color:#409eff">{{viewData.courseName}} ——— <span class="font-size16 color-99">{{viewData.name}}</span></div>
        <template v-for="(item,index) in viewData.captions">

          <div style="font-size: 16px;color: #333;margin-top: 15px">{{item.testquesTitleName}}(共{{item.subTestquesNum}}题，{{item.score}}分  )</div>
          <template v-for="(itemm,indexx) in item.captionTestquesInfo">
            <!--简单题-->
            <div v-if="itemm.testquesInfo.type==0">
              <div class="quesTitle clear"><samp>{{indexx+1}}.</samp> <div v-html="itemm.testquesInfo.simple.content"></div></div>
              <div v-if="itemm.testquesInfo.simple.parentTypeId == 1001 || itemm.testquesInfo.simple.parentTypeId == 1002">
                <ul class="options" v-if="itemm.testquesInfo.simple.parentTypeId == 1001">
                  <li v-for="(option,indexxx) in itemm.testquesInfo.simple.options" :class="option.answerFlag == 1 ? 'active clear':'clear'">
                    <samp>{{String.fromCharCode(indexxx+65)}}</samp> 
                    <div v-html="option.optionContent"></div>
                  </li>
                </ul>
                <ul class="options" v-if="itemm.testquesInfo.simple.parentTypeId == 1002">
                  <li v-for="(option,indexxx) in itemm.testquesInfo.simple.options" :class="option.answerFlag == 1 ? 'active clear':'clear'">
                    <samp style="border-radius:0">{{String.fromCharCode(indexxx+65)}}</samp> 
                    <div v-html="option.optionContent"></div>
                  </li>
                </ul>
              </div>
              <div v-if="itemm.testquesInfo.simple.parentTypeId == 1003">
                <div class="answer">答案：
                   <template v-for="itemmmm in itemm.testquesInfo.simple.options">
                      <i v-if="itemmmm.answerFlag == 1&&itemmmm.optionContent=='正确'" class="el-icon-check"></i>
                      <i v-if="itemmmm.answerFlag == 1&&itemmmm.optionContent=='错误'" class="el-icon-close"></i>
                    </template>
                </div>
              </div>
              <div v-if="itemm.testquesInfo.simple.parentTypeId == 1004">
                <div class="answerTk"><samp>答案：</samp> 
                  <ul><li v-for="(answer,indexxx) in itemm.testquesInfo.simple.answer.split('&<multi@>')"><div class="orderInx">{{indexxx+1}}</div> {{answer}}</li></ul>
                </div>
              </div>
              <div v-if="itemm.testquesInfo.simple.parentTypeId == 1005">
                <div class="answer"><samp>答案：</samp> 
                  <div v-html="itemm.testquesInfo.simple.answer"></div>
                </div>
             </div>
             <div  class="analysis clear"><samp>解析：</samp><div v-html="itemm.testquesInfo.simple.answerAnalysis || '无'"></div></div>
              <p>分值： {{itemm.testquesInfo.simple.score}} 分</p>
              <p>难度： {{itemm.testquesInfo.simple.difficultyLevel}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 试题分类： {{itemm.testquesInfo.simple.classifyName||""}}</p>
            </div>
             <!--综合题-->
            <div v-else>
              <div v-if="itemm.testquesInfo.complex.parentTypeId == 1007">
                <video :src="itemm.file"></video>
              </div>
              <div v-for="(que,index2) in itemm.testquesInfo.complex.subSimple" class="smallQue">
                  <div v-if="que.parentTypeId == '1001' || que.parentTypeId == '1002'">
                    <div class="quesTitle clear"><samp>{{index2+1}}、[{{que.parentTypeId=='1002'?'多选题':'单选题'}}]</samp> <div v-html="que.content"></div></div>
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
                      <div class="quesTitle clear"><samp>{{index2+1}}、[判断题]</samp> <div v-html="que.content"></div></div>
                      <div class="answer">答案： 
                       <template v-for="itemmmm in que.options">
                        <i v-if="itemmmm.answerFlag == 1&&itemmmm.optionContent=='正确'" class="el-icon-check"></i>
                        <i v-if="itemmmm.answerFlag == 1&&itemmmm.optionContent=='错误'" class="el-icon-close"></i>
                      </template>
                     </div>
                  </div>
                  <div v-if="que.parentTypeId == '1004'">
                     <div class="quesTitle clear"><samp>{{index2+1}}、[填空题]</samp> <div v-html="que.content"></div></div>
                      <div class="answerTk"><samp>答案：</samp> 
                        <ul><li v-for="(answer,index) in que.answer.split('&<multi@>')"><div class="orderInx">{{index+1}}</div> {{answer}}</li></ul>
                      </div>
                  </div>
                  <div v-if="que.parentTypeId == '1005'">
                    <div class="quesTitle clear"><samp>{{index2+1}}、[简答题]</samp> <div v-html="que.content"></div></div>
                      <div class="answer"><samp>答案：</samp> 
                        <div v-html="que.answer"></div>
                      </div>
                  </div>
                  <div class ="analysis clear"><samp>解析：</samp><div v-html="que.answerAnalysis || '无'"></div></div>
                  <p>分值： {{que.score}} 分</p>
                  <p v-if="que.parentTypeId < 6">难度： {{que.difficultyLevel}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 试题分类： {{que.classifyName||""}}</p>
            </div>

            <div v-if="item.parentTypeId==1001||item.parentTypeId==1002 || item.parentTypeId==1003 || item.parentTypeId==1004 || item.parentTypeId==1005" class="analysis clear"><samp>解析：</samp><div v-html="item.answerAnalysis || '无'"></div></div>
                <p>本题总分： {{item.score}} 分</p>
                <p v-if="item.parentTypeId==1001||item.parentTypeId==1002 || item.parentTypeId==1003 || item.parentTypeId==1004 || item.parentTypeId==1005">难度： {{item.difficultyLevel}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 试题分类： {{item.classifyName||""}}</p>
            </div>
          </template>
        </template>
      </div>
    </div>
</template>
<style scoped>
  .quesView{margin-bottom:15px;color:#666;background:#fff;position:relative;padding: 10px 10px;}
  .quesView samp{float:left;margin-right:5px;}
  .current{border:2px solid #409EFF;}
  .quesTitle{margin-bottom:10px;color:#000}
  .smallQue{margin-bottom:30px}
  .smallQue .quesTitle{font-size:14px}
  .quesTitle > div{margin-left: 15px;margin-top:15px;}
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
  props:{
    viewData: {
      type: Array,
      default: []
    },
    areaHeight: {
      type: String,
      default:"500"
    }
  },
  watch:{
    areaHeight: function(newValue, oldValue) {
      this.$refs.viewContainer.style.height = newValue
    },
  },
  methods: {
    editQue(index){
      this.$emit("editOneQue", index)
    },

    deleteQue(index){
      this.viewData.splice(index,1)
    },
    dd(){
      console.log(this.viewData)
      return '1'
    }
  }
}
</script>
