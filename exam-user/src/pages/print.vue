<template>
  <div class="print">
    <div class="print-content" :style="{minHeight: height+'px'}">
    <div class="text-right-b10">
      <el-button type="primary" plain @click="print" class="float-r">打印</el-button>
    </div>
    <div id="subOutputRank-print">
      <h3 class="text-center margin-b30">大学名称 2016年秋季期末考试 准考证</h3>
      <div class="admission">
        <div class="admission1 exam-content">
          <div><span>姓名：</span><label>02030</label></div>
          <div><span>性别：</span><label>大学名称</label></div>
          <div><span>考生号：</span><label>图书馆楼301</label></div>
          <div><span>准考证号：</span><label>2016.12.30 08:00</label></div>
          <div style="width:100%"><span>考点：</span><label>图书馆楼301</label></div>
          <div style="width:100%"><span>地址：</span><label>2016.12.30 08:00</label></div>
        </div>
        <div class="admission2">
          <div><img src="#" alt=""></div>
        </div>
      </div>
      <table class="gridtable margin-b30" style="width:100%;" id="examCaseSheetInfoTable" border="1">
      <thead>
      <tr>
      <th>课程代码</th>
      <th>课程名称</th>
      <th>考试日期</th>
      <th>考试时间</th>
      <th>考场</th>
      <th>座位号</th>
      <th>备注</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="itemth in optionArry">
      <tr>
        <td>{{itemth.a1}}</td>
        <td>{{itemth.a2}}</td>
        <td>{{itemth.a3}}</td>
        <td>{{itemth.a4}}</td>
        <td>{{itemth.a5}}</td>
        <td>{{itemth.a1}}</td>
        <td>{{itemth.a4}}</td>
      </tr>
      </template>
    </tbody>
      </table>
      <div class="margin-b10 color-font">
         <label class="float-l">考试须知：</label>
         <div class="margin-l80">1、考生凭准考证、身份证、学生证按时进入规定考场对号入座参加考试。</div>
         <div class="margin-l80">2、考生应遵守考场纪律，考场内不可交头接耳、左顾右盼、严禁偷看他人试卷，严禁其他扰乱考试秩序的行为。</div>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
       height : '',
      optionArry: [
        {
          a1: "1997-11-11",
          a2: "林丽",
          a3: "吉林省 ",
          a4: "吉林省 ",
          a5: "1997-11-11",
          a6: "林丽",
          a7: 1,
          a8: 1
        },
        {
          a1: "1997-11-11",
          a2: "林丽",
          a3: "吉林省 ",
          a4: "吉林省 ",
          a5: "1997-11-11",
          a6: "林丽",
          a7: 1,
          a8: 1
        },
        {
          a1: "1997-11-11",
          a2: "林丽",
          a3: "吉林省 ",
          a4: "吉林省 ",
          a5: "1997-11-11",
          a6: "林丽",
          a7: 1,
          a8: 1
        },
        {
          a1: "1997-11-11",
          a2: "林丽",
          a3: "吉林省 辽源",
          a4: "吉林省 辽源",
          a5: "1997-11-11",
          a6: "林丽",
          a7: 0,
          a8: 0
        }
    ]
   }
 },
  methods: {
    print () { // 打印
     let subOutputRankPrint = document.getElementById('subOutputRank-print')
     let newContent =subOutputRankPrint.innerHTML
     let oldContent = document.body.innerHTML
     document.body.innerHTML = newContent
     window.print()
     window.location.reload()
     document.body.innerHTML = oldContent
     return false
    },
    exportData () { // 导出excel

    }
  },
  mounted() {
    var height=document.documentElement.clientHeight
    this.height = height
    this.showContent=this.$route.query.way
  }
};
</script>
<style scoped>
 .el-table th.gutter{
    display: table-cell!important;
 }
 .margin-b60{
  margin-bottom:60px;
 }
 table.gridtable th {
    background-color: #f3f3f3;
    padding: 8px;
    font-weight: 400;
}
table {
   border-collapse: collapse;
   font-size: 12px;
}
table.gridtable td {
    padding: 8px;
}
td, th {
   border: 1px solid #DDD;
   text-align: center;
}
.exam-content{
  overflow: hidden;
}
.exam-content>div{
  width: 50%;
  float: left;
  line-height: 20px;
  margin-bottom: 15px;
}
.exam-content>div>span{
  display: inline-block;
  width: 100px;
  text-align: right;
}
.margin-b30{
  margin-bottom: 30px
}
.admission{
  overflow: hidden;
}
.admission1{
  width: 70%;
  float: left;
}
.admission2{
  width: 30%;
  text-align: right;
  float: left;
  margin-bottom: 15px;
}
.admission2 >div{
  width: 100px;
  height: 120px;
  border:1px solid #e5e5e5;
  float: right;
}
.admission2 >div>img{
  max-width: 100px;
 max-height: 120px;
}
.margin-l80{
  margin-left:70px;
}
.float-l{
  float: left;
}
.color-font{
  font-size: 12px;
  color: #999999;
  line-height: 20px
}
.print {
  background: #e5e5e5;
  min-height: 100%;
}
.print-content {
  width: 900px;
  margin: 0 auto;
  background: #fff;
  min-height: 500px;
  padding:20px 40px;
}
.text-center{
  text-align: center
}
.text-right-b10{
  text-align: right;
  overflow: hidden;
}
</style>
