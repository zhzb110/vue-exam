<template>
    <div class="wrapper">
       <div class="exam-title">
        <span :class="{color4:color,colorb:!color,borderb:color}" @click="examShow(1)">当前考试</span>
        <span :class="{color4:!color,colorb:color,borderb:!color}" @click="examShow(2)">全部考试</span>
      </div>
      <div v-show="color">
         <div class="tips">预约考试<span class="colorb font-size12">&nbsp;&nbsp;(请提前到达指定考场，准时开考)</span></div>
         <div class="exam-content" v-for="item in list1">
           <div class="exam-content-1">
            <i class="iconfont icon-future colorb" v-if="item.state==='即将开始'"></i>
            <i class="iconfont icon-jinxing color4" v-if="item.state==='进行中'"></i>
            <i class="iconfont icon-wancheng1 colore5" v-if="item.state==='已经结束'"></i>
          </div>
          <div class="exam-content-2">
             <p class="subject" :class="{colorb:item.state==='已经结束'}" >{{item.name}}</p>
             <p class="time" :class="{colorb:item.state==='已经结束'}">考试时间：{{item.time}}</p>
             <p class="address" :class="{colorb:item.state==='已经结束'}">考点：{{item.address}}</p>
             <p class="exam-state" v-if="item.state==='进行中'">
               <i class="iconfont icon-alarmnaoling color-red"></i>
               <span class="color-red">已经开考3分钟</span>
               <el-button type="primary" class="float-r padding5" @click="getIntoExam">进入考试</el-button>
            </p>
             <p class="exam-state" v-if="item.state==='即将开始'">
               <i class="iconfont icon-alarmnaoling colorb"></i>
               <span class="colorb">1天后开考</span>
            </p>
            <p class="exam-state" v-if="item.state==='已经结束'">
               <i class="iconfont icon-boshimao colorb"></i>
               <span class="colorb">97分</span>
            </p>
           </div>
         </div>
         <div class="tips" style="padding-top:20px">随到随考<span class="colorb font-size12">&nbsp;&nbsp;(请在预约的日期到达考点)</span></div>
         <div class="exam-content" v-for="item in list1">
           <div class="exam-content-1">
            <i class="iconfont icon-future colorb" v-if="item.state==='即将开始'"></i>
            <i class="iconfont icon-jinxing color4" v-if="item.state==='进行中'"></i>
            <i class="iconfont icon-wancheng1 colore5" v-if="item.state==='已经结束'"></i>
          </div>
          <div class="exam-content-2">
             <p class="subject" :class="{colorb:item.state==='已经结束'}" >{{item.name}}</p>
             <p class="time" :class="{colorb:item.state==='已经结束'}">考试时间：{{item.time}}</p>
             <p class="address" :class="{colorb:item.state==='已经结束'}">考点：{{item.address}}</p>
             <p class="exam-state" v-if="item.state==='进行中'">
               <el-button type="primary" class="float-r padding5" @click="getIntoExam">进入考试</el-button>
            </p>
             <p class="exam-state" v-if="item.state==='即将开始'">
               <i class="iconfont icon-alarmnaoling colorb"></i>
               <span class="colorb">1天后开考</span>
            </p>
            <p class="exam-state" v-if="item.state==='已经结束'">
               <i class="iconfont icon-boshimao colorb"></i>
               <span class="colorb">97分</span>
            </p>
           </div>
         </div>
      </div>
      <div v-show="!color">
        <div class="exam-content" v-for="item in list">
           <div class="exam-content-1">
             <i class="iconfont icon-future colorb" v-if="item.state==='即将开始'"></i>
             <i class="iconfont icon-jinxing color4" v-if="item.state==='进行中'"></i>
             <i class="iconfont icon-wancheng1 colore5" v-if="item.state==='已经结束'"></i>
           </div>
           <div class="exam-content-2">
             <p class="subject" :class="{colorb:item.state==='已经结束'}" >{{item.name}}</p>
             <p class="time" :class="{colorb:item.state==='已经结束'}">考试时间：{{item.time}}</p>
             <p class="address" :class="{colorb:item.state==='已经结束'}">考点：{{item.address}}</p>
             <p class="exam-state" v-if="item.state==='进行中'">
               <i class="iconfont icon-alarmnaoling color-red"></i>
               <span class="color-red">已经开考3分钟</span>
               <el-button type="primary" class="float-r padding5" @click="getIntoExam">进入考试</el-button>
             </p>
             <p class="exam-state" v-if="item.state==='即将开始'">
               <i class="iconfont icon-alarmnaoling colorb"></i>
               <span class="colorb">1天后开考</span>
             </p>
             <p class="exam-state" v-if="item.state==='已经结束'">
               <i class="iconfont icon-boshimao colorb"></i>
               <span class="colorb">97分</span>
             </p>
           </div>           
         </div>
      </div>
      <el-dialog title="进入考试" :visible.sync="dialogVisible" width="500px">
         <div class="subject password-title margin-b10">输入密码进入 《大学英语A》 考试</div>
         <div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="1px" class="password">
              <el-form-item label="" prop="password" class="float-l" style="width:320px">
                <el-input v-model="ruleForm.password" ></el-input>
              </el-form-item>
               <el-button type="primary" @click="getIntoPage()" class="float-r">进入考试</el-button>
           </el-form> 
         </div>
      </el-dialog>
    </div>
</template>
<script>
export default {
  data() {
    return {
      rules: {
        password: [
          { required: true, message: '请输入考试进入密码', trigger: 'blur' },
           // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
      },
      ruleForm:{ password:'' }, // 进入考试密码输入
      color:true,
      dialogVisible:false, // 进入考试输入密码
      list:[
        {
          name:"大学英语",
          time:"2018-9-26 08:00:00",
          address:"江苏开放大学（苏州市江安路122号 教学楼4楼502）",
          type:'1',
          state:'即将开始'
        },
        {
          name:"大学英语",
          time:"2018-9-26 08:00:00",
          address:"江苏开放）",
          type:'1',
          state:'即将开始'
        },
        {
          name:"大学英语",
          time:"2018-9-26 08:00:00",
          address:"江苏开放",
          type:'1',
          state:'进行中'
        },
        {
          name:"大学英语",
          time:"2018-9-26 08:00:00",
          address:"江苏开放大学（苏州市江安路122号 苏州市江安路122号 教学楼4楼502）",
          type:'1',
          state:'进行中'
        },{
          name:"大学英语",
          time:"2018-9-26 08:00:00",
          address:"江苏开放大学（苏州市江安路122号 教学楼4楼502）",
          type:'1',
          state:'已经结束'
        },
        {
          name:"大学英语",
          time:"2018-9-26 08:00:00",
          address:"江苏开放大学（苏州市江安路122号 教学楼4楼502）",
          type:'1',
          state:'已经结束'
        }
      ],
      list1:[
        {
          name:"大学英语",
          time:"2018-9-26 08:00:00",
          address:"江苏开放大学（苏州市江安路122号 教学楼4楼502）",
          type:'1',
          state:'进行中'
        },
        {
          name:"大学英语",
          time:"2018-9-26 08:00:00",
          address:"江苏开放）",
          type:'1',
          state:'进行中'
        },
        {
          name:"大学英语",
          time:"2018-9-26 08:00:00",
          address:"江苏开放",
          type:'1',
          state:'即将开始'
        },
        {
          name:"大学英语",
          time:"2018-9-26 08:00:00",
          address:"江苏开放大学（苏州市江安路122号 苏州市江安路122号 教学楼4楼502）",
          type:'1',
          state:'即将开始'
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
   // 进入考试,弹出框输入面
   getIntoExam () {
     this.dialogVisible = true
     if (this.$refs['ruleForm']) {
        this.$refs['ruleForm'].resetFields()
     }
   },
   getIntoPage() {
     this.$refs['ruleForm'].validate((valid) => {
       if (valid) {
         this.$router.push({ path: "/exam" })
       }
     })
   }
  },
  components: {
  
  },
  mounted() {
  }
}
</script>
<style scoped>
.exam-title{ line-height: 55px;height: 55px;position: relative;border-bottom: 1px solid #dedede;}
.exam-title>span{ display: inline-block; font-size: 18px; padding:0px 15px;cursor: pointer;}
.colorb{ color: #B4B6BD !important }
.color4{ color: #409eff;}
.color-red{ color:#ec400d;}
.colore5{ color:#e5e5e5;}
.borderb{ border-bottom: 1px solid #409eff }
.exam-content{ width: 530px;float: left;margin:20px 15px 10px 0px;background: #fff;border:1px solid #e5e5e5;height: 175px}
.exam-content-1{ width: 175px;float: left;height: 175px;border-right:1px solid #e5e5e5;line-height: 175px;text-align: center;}
.exam-content-1>i{ font-size: 70px}
.exam-content-2{ margin-left: 175px;padding: 5px 20px }
.subject{ font-size: 18px;padding:15px 0px; }
.time{ color:#666; }
.address{ padding:8px 0px; color:#666; }
.exam-state{ color:#666;margin-bottom: 15px; }
.font-size12{ font-size: 12px; }
.tips{ line-height: 30px;margin-top: 15px;width: 100%;overflow: hidden;}
.padding5{ padding:5px 10px; }
.password{ width:416px;overflow:hidden;margin:15px auto; }
.margin-b10{ margin-bottom:10px;}
.password-title{ margin-left: 25px;padding:0px 0px;}
</style>
