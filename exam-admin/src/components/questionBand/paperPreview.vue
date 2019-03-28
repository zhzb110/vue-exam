<template>
    <div class="paper">
        <ul v-if="questionsList.length > 0">
          <li v-for="(item, index) in questionsList" :key="item.id">
            <template v-if="item.qType == 1">
              <div class="queTitle">
                {{item.name}} （共{{item.count}}题，{{item.score}}分）
              </div>
              <template v-if="item.type == 1 || item.type == 2">
                <dl v-for="(que, index2) in item.questions" :key="que.queId">
                  <dt><div class="no">{{index2+1}}.</div> <div class="title" v-html="que.queTitle"></div><span>({{que.score}}分)</span></dt>
                  <dd>
                    <div v-for="optionItem in que.option" :key="optionItem.No">
                      <div class="no">{{optionItem.No}}.</div>
                      <div class="title" v-html="optionItem.name"></div>
                    </div>
                  </dd>
                  <dd class="labelWord">参考答案：{{item.type == 1 ? que.answer:que.answer.join(",")}}</dd>

                  <dd class="labelWord">答案解析：</dd>
                  <dd>{{que.analysis||"无"}}</dd>
                </dl>   
              </template>

              <template v-if="item.type == 3">
                <dl v-for="(que, index2) in item.questions" :key="que.queId">
                  <dt><div class="no">{{index2+1}}.</div> <div class="title" v-html="que.queTitle"></div><span>({{que.score}}分)</span></dt>
                  <dd class="labelWord">参考答案：</dd>
                  <dd v-for="(answer, index3) in que.answer">
                      <span>{{index3+1}}</span> {{answer}}
                  </dd>
                  <dd class="labelWord">答案解析：</dd>
                  <dd>{{que.analysis}}</dd>
                </dl>  
              </template>
              <template v-if="item.type == 4">
                <dl v-for="(que, index2) in item.questions" :key="que.queId">
                  <dt><div class="no">{{index2+1}}.</div> <div class="title" v-html="que.queTitle"></div><span>({{que.score}}分)</span></dt>
                  <dd class="labelWord">参考答案：</dd>
                  <dd v-html="que.answer"></dd>
                  <dd class="labelWord">答案解析：</dd>
                  <dd v-html="que.analysis"></dd>
                </dl>  
              </template>
            </template>
            <template v-else>
              <div class="queTitle">
                {{item.name}} （共{{item.count}}题，{{item.score}}分）
              </div>
              <div v-for="(queItem, index2) in item.questions" :key="queItem.queId">
                <div class="complexTitle">
                  <div class="no">{{index2+1}}.</div> 
                  <div class="title">{{queItem.queTitle}} </div>
                  <span>({{item.score}}分)</span>
                </div>
                <div v-for="(que, index3) in queItem.questionsChilden" :key="que.cId">
                    <dl v-if="que.type == 1 || que.type == 2">
                      <dt><div class="no">（{{index3+1}}）. 【{{que.type == 1 ? "单选题" : "多选题"}}】</div><div v-html="que.queTitle"></div><span>({{que.score}}分)</span></dt>
                      <dd><div v-for="optionItem in que.option" :key="optionItem.No">{{optionItem.No+'. '+optionItem.name}}</div></dd>
                      <dd class="labelWord" v-html="">参考答案：{{que.type == 1 ? que.answer:que.answer.join(",")}}</dd>
                      <dd class="labelWord">答案解析：</dd>
                      <dd>{{que.analysis||"无"}}</dd>
                    </dl>
                    <dl v-else-if="que.type == 3">
                      <dt><div class="no">（{{index3+1}}）. 【填空题】 </div><div v-html="que.queTitle"></div><span>({{que.score}}分)</span></dt>
                      <dd class="labelWord">参考答案：</dd>
                      <dd v-for="(answer, index3) in que.answer">
                          <span>{{index3+1}}</span> {{answer}}
                      </dd>
                      <dd class="labelWord">答案解析：</dd>
                      <dd v-html="que.analysis"></dd>
                    </dl>
                    <dl v-else-if="que.type == 4">
                       <dt><div class="no">（{{index3+1}}）. 【填空题】 </div><div v-html="que.queTitle"></div><span>({{que.score}}分)</span></dt>
                       <dd class="labelWord">参考答案：</dd>
                       <dd v-html="que.answer"></dd>
                       <dd class="labelWord">答案解析：</dd>
                       <dd v-html="que.analysis"></dd>
                    </dl>
                </div>
              </div>
            </template>
          </li>
        </ul>
    </div>
</template>
<style scoped>
.paper {
  width: 86%;
  float: left;
}
.paper > p {
  font-size: 18px;
  text-align: center;
  margin-bottom: 10px;
}

.paper ul {
  box-shadow: 0 1px 5px #e3e3e3;
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 20px;
}
.paper li {
  margin-bottom: 40px;
  border-bottom: 1px dashed #ccc;
}
.paper li dl{margin-top:20px}
.paper li .queTitle{font-size:18px}
.paper dl{padding-left:20px;margin-bottom:30px}
.paper dt{font-size:16px;margin-bottom:10px;position:relative;padding-right:50px}
.no{float:left;margin-right:5px}
.title{float:left;width:95%}
.title2{margin-left:125px}
.paper dd{min-height:30px;line-height:24px;margin-bottom:5px;padding-right:50px}
.paper .labelWord{line-height:normal;min-height:auto;margin-top:20px}
.paper dd span{float:left;display:block;width:24px;height:24px;border-radius:12px;background:#409eff;color:#fff;text-align:center;margin-right:10px;margin-top:1px}
.paper dt:after, .paper dd > div:after, .complexTitle:after{clear:both;content:"";display:block}
.complexTitle{position:relative;font-size:16px;padding-right:70px}
.paper dt span, .complexTitle span{position:absolute;right:10px;top:0;}


</style>
<script>
export default {
  data() {
    return {
      queryForm: {
        basicQType: "",
        appQType: "",
        descript: "",
        status: 0
      }
    };
  },
  props: ["questionsList"],

  methods: {
    
  }
};
</script>
