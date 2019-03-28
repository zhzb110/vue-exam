<template>
    <div class="wrapper">
       <div class="tips margin-t15 font-size18">2019秋季期末考试<el-button type="primary" class="float-r" @click="print">打印准考证号</el-button></div>
       <div class="tips color-red margin-t5">预约报考时间：2019.12.11~2019.12.30</div>
       <div class="tips margin-t5">考试时间：2020.01.10~2020.01.14，5天</div>
       <div class="exam-content" v-for="item in list">
         <div v-if="item.state==='预约'">
           <div class="exam-content-1">
             <i class="iconfont icon-jinxing color4"></i>
           </div>
           <div class="exam-content-2">
             <p class="subject">{{item.name}}</p>
             <p class="time">5 个场次可预约</p>
             <p class="address height30"></p>
             <p class="exam-state">
               <el-button type="primary" class="float-r padding5" @click="orederExamRoom()">预约</el-button>
             </p>
           </div>
         </div>
         <div v-if="item.state==='已预约'">
           <div class="exam-content-1">
             <i class="iconfont icon-future colorb"></i>
           </div>
           <div class="exam-content-2">
             <p class="subject">{{item.name}}</p>
             <p class="time">考试时间：{{item.time}}</p>
             <p class="address">考点：{{item.address}}</p>
             <p class="exam-state">
               <i class="iconfont icon-alarmnaoling color-red"></i>
               <span class="color-red">3天后考试</span>
               <el-button type="primary" class="float-r padding5" disabled>已预约</el-button>
            </p>           
           </div>
         </div>
         <div v-if="item.state==='无预约'">
          <div class="exam-content-1">
            <i class="iconfont icon-wancheng1 colore5"></i>
          </div>
          <div class="exam-content-2">
             <p class="subject">{{item.name}}</p>
             <p class="time">没有场次可预约</p>
          </div>
         </div>
       </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list:[
        {
          name:"大学英语",
          time:"2018-9-26 08:00:00",
          address:"江苏开放大学（苏州市江安路122号 教学楼4楼502）",
          type:'1',
          state:'预约'
        },
        {
          name:"大学英语",
          time:"2018-9-26 08:00:00",
          address:"江苏开放）",
          type:'1',
          state:'预约'
        },
        {
          name:"大学英语",
          time:"2018-9-26 08:00:00",
          address:"江苏开放",
          type:'1',
          state:'已预约'
        },
        {
          name:"大学英语",
          time:"2018-9-26 08:00:00",
          address:"江苏开放大学（苏州市江安路122号 苏州市江安路122号 教学楼4楼502）",
          type:'1',
          state:'已预约'
        },{
          name:"大学英语",
          time:"2018-9-26 08:00:00",
          address:"江苏开放大学（苏州市江安路122号 教学楼4楼502）",
          type:'1',
          state:'无预约'
        },
        {
          name:"大学英语",
          time:"2018-9-26 08:00:00",
          address:"江苏开放大学（苏州市江安路122号 教学楼4楼502）",
          type:'1',
          state:'无预约'
        }
      ]
    }
  },
  methods: {
   examShow(way) {
     if (way===1) {
      this.color = true
     } else {
      this.color = false
     }
   },
   // 预约考试
   orederExamRoom() {
    // 预约场次
    this.$router.push({ path: '/orderExamRoom?userId=31' })
    // 预约随到随考
   // this.$router.push({ path: '/orderExamTime?userId=31' })
   },
   print() {
    const { href } = this.$router.resolve({
          path: "/print"
        });
    window.open(href, "_blank")
   }
  },
  components: {
  
  },
  mounted() {
  }
}
</script>
<style scoped>
.colorb{
  color: #B4B6BD !important
}
.color4{
  color: #409eff;
}
.color-red{
  color:#ec400d;
}
.colore5{
  color:#e5e5e5;
}
.borderb{
  border-bottom: 1px solid #409eff
}
.exam-content{
  width: 530px;
  float: left;
  margin:20px 15px 10px 0px;
  background: #fff;
  border:1px solid #e5e5e5;
  height: 175px
}
.exam-content-1{
  width: 175px;
  float: left;
  height: 175px;
  border-right:1px solid #e5e5e5;
  line-height: 175px;
  text-align: center;
}
.exam-content-1>i{
  font-size: 70px
}
.exam-content-2{
  margin-left: 175px;
  padding: 5px 20px
}
.subject{
  font-size: 18px;
  padding:15px 0px;
}
.time{
  color:#666;
}
.address{
  padding:8px 0px;
  color:#666;
}
.exam-state{
  color:#666;
  margin-bottom: 15px;
}
.font-size12{
  font-size: 12px;
}
.font-size18{
  font-size: 18px;
}
.tips{
  margin-top: 15px;
  width: 100%;
  overflow: hidden;
}
.margin-t15{
  margin-top: 15px;
}
.margin-t5{
  margin-top: 5px;
}
.padding5{
  padding:5px 10px;
}
.height30{
  height: 30px
}
</style>
