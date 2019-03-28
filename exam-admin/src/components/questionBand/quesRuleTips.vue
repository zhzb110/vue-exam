<template>
    <el-dialog title="例题示范" width="600px" :visible.sync="quesRuleVisible" :before-close="close" @open="openFunc">
    	<div class="typeTitle">{{tipShow.title}}</div>
		  <dl>
          <dt>输入规范</dt>
          <dd v-for="(item, index) in tipShow.ruleLines">{{index+1}}、{{item}}</dd>
      </dl>
      <dl>
          <dt>输入范例</dt>
          <dd v-for="(item, index) in tipShow.examples">{{item}}</dd>
      </dl>
    </el-dialog>
</template>
<style scoped>
  .typeTitle{text-align:center;font-size:18px;font-weight:bold;margin-top:-10px}
  dl{border:1px dashed #409EFF;padding:10px;margin-top:15px}
  dt{color:#409EFF;font-size:16px;margin-bottom:5px}
</style>
<script>
export default {
  data() {
    return {
      tipShow:{},
      tipDatas:[{
        title:"单选题",
        ruleLines:["题号支持1.和1、和(1)三种格式。","选项支持A.和A、两种格式，最多支持 8 个选项。","请空格输入（），()。","答案中请勿加分隔符或空格"],
        examples:["1. Don't（）unknown files on the Internet.","A、downloads","B、download","C、down","D、load","答案：D","解析：not后跟动词原形(若无解析本行可不填)"]
      },{
        title:"多选题",
        ruleLines:["题号支持1.和1、和(1)三种格式。","选项支持A.和A、两种格式，最多支持 8 个选项。","答案中请勿加分隔符或空格"],
        examples:["1. The followings can beclassfied as off-balance sheet business are","A、Deposits","B、Trust Consulting","C、L/C","D、Agency","答案：BCD","解析：(若无解析本行可不填)"]
      },{
        title:"判断题",
        ruleLines:["题号支持1.和1、(1）三种格式。","答案支持正确、错误，对、错，true、false三种格式","请点击Tab键输入空格"],
        examples:["1. Everyone was in his room when the bell rings？","答案：正确","解析：(若无解析本行可不填)"]
      },{
        title:"填空题",
        ruleLines:["题号支持1.和1、(1）三种格式。","答案若有多空，请使用双竖线 ||（shift+\) 分隔，若一个空格有多个答案，多个答案中间但竖线隔开","请空格输入（），()。"],
        examples:["1.We （） going to sing some songs （） our firends.","答案：are，were|for","解析：(若无解析本行可不填)"]
      },{
        title:"简答题",
        ruleLines:["题号支持1.和1、(1）三种格式。","人工判卷"],
        examples:["1. What is Product literature？","答案：Product literature is a primary subset of business publishing specifically geared toward the selection, purchase and use of a business' products.Typically this includes product promotionally literature, product datasheets, product operating manuals and product purchase terms and conditions.","解析：(若无解析本行可不填)"]
      },{
        title:"综合题",
        ruleLines:["题号支持1.和1、(1）三种格式。","小题支持单选题、多选题、判断题、填空题、简答题"],
        examples:["1. 小红出国到美国，由于出行不方便，在只有中国驾照情况下在美国驾驶机动车。","（1）小红的驾照能否在国外合法驾驶车辆？","A、可以","B、驾车不合法","C、通用","D、不可以","答案：D","解析：请仔细阅读交规(若无解析本行可不填)","（2）外国交规与中国是否一致？","A、一样","B、怎样都可以","C、无所谓吧","D、大致一样，但驾照不能通用","答案：D","解析：请仔细阅读国际交规 (若无解析本行可不填)"]
      }]
    }
  },
  props: ["quesType","quesRuleVisible"],

  methods: {
    openFunc() {
      if (this.quesType) {
         this.tipShow = this.tipDatas[parseInt(this.quesType)-1]
      }
    },
    save() {},
    close() {
      this.$emit("closeDiolog", false);
    }
  }
};
</script>
