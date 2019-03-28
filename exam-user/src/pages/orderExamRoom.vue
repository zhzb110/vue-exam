<template>
  <div class="room" :style="{minHeight: height+'px'}">
    <div class="room-title">
      <div class="room-title-img"><i class="iconfont icon-jinxing color4"></i></div>
      <div class="room-title-text font-size18">大学英语</div>
      <div class="room-title-text2"><label style="margin-right:20px">考试费：￥ 50</label>考试时长：90 分钟</div>
    </div>
    <div>
      <div class="city-all" @click="cityShowClick">全部区域<i class="el-icon-arrow-up" v-show="!cityShow"></i><i class="el-icon-arrow-down" v-show="cityShow"></i></div>
      <div v-show="cityShow" class="city-zone-position">
        <ul class="room-city">
          <li v-for ="item in cityZone" @click="cityClick(item.id)" :class="{active:item.id===cityId}">{{item.address}}
            <i class="el-icon-caret-bottom" v-show="item.id!==cityId"></i><i class="el-icon-caret-top" v-show="item.id===cityId"></i></li>
        </ul>
        <div v-if = "cityId!==''" style="overflow: hidden;width:100%;">
          <ul class="room-zone">
            <li v-for = "item in zone" :class="{active:item.id===zoneId}" @click="zoneClick(item.id)">{{item.address}}{{cityId}}</li>
          </ul>
        </div>
      </div>
    </div>
     <!--考点显示-->
    <div v-for ="(item,index) in examPoint" class="room-exam">
      <div class="room-exam-title">{{item.title}}</div>
      <div class="room-exam-address">{{item.address}}</div>
      <div class="room-exam-time">
        <span class="room-exam-arrow room-exam-arrow-left" @click="scrollContentLeft(item.id)" v-if="widthIndex<item.examRoom.length">
          <i class="el-icon-arrow-left"></i>
        </span>
        <ul :id="'scroll'+item.id">
          <li v-for="option in item.examRoom" :id="'payText'+option.id">
            <div v-if="option.type===0" class="grad room-exam-time-text">
              <p class="padding5">{{option.deta}}</p>
              <p class="padding5 font-size16">{{option.time}}</p>
              <p> <el-button type="info" plain disabled class="padding5">已约满</el-button></p>
            </div>
            <div v-else @click="payClick(item.id,option.id)" class="room-exam-time-text" >
              <p class="padding5">{{option.deta}}</p>
              <p class="padding5 font-size16">{{option.time}}</p>
              <p style="visibility: hidden;">{{option.time}}</p>
            </div>
          </li>        
        </ul>
        <span class="room-exam-arrow room-exam-arrow-right" @click="scrollContentRight(item.id)" v-if="widthIndex<item.examRoom.length">
          <i class="el-icon-arrow-right"></i>
        </span>
      </div>
      <div class="room-exam-pay" :id="'payMoney'+item.id" style="display: none">
        <div class="room-exam-pay-time">
          <p class="room-exam-pay-time2">已选择</p>
          <p><span class="room-exam-pay-time1">2018-08-09 14:000</span></p>
        </div>
        <div class="room-exam-pay-btn"><el-button type="primary" @click="goPayDialog()">50元&nbsp;&nbsp;去结算</el-button></div>
        <span class="room-exam-pay-close" @click="payClose(item.id)"><i class="el-icon-close"></i></span>
      </div>  
    </div>
     <el-dialog title="支付" :visible.sync="dialogPay" width="700px">
       <div class="room-title">
        <div class="room-title-img"><i class="iconfont icon-jinxing color4"></i></div>
        <div class="room-title-text font-size18">大学英语</div>
        <div class="room-title-text2"><label style="margin-right:20px">考试费：￥ 50</label>考试时长：90 分钟</div>
      </div>
      <div style="overflow: hidden;">
        <div class="dialog-text">
          <p class="room-exam-title">苏州开放大学考点</p>
          <p class="dialog-text1">地址：苏州市干将西路1122号</p>
          <p class="dialog-text1">已选择两个场次，预约成功后优先编排您选择的场次。</p>
          <p class="room-exam-pay-time1" style="margin-left: 15px">2019.1.10  14:00</p>
       </div>
       <div class="dialog-img">
         <p>扫描二维码付款</p>
         <img src="#" alt="">
       </div>
      </div>
     </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      height:'',
      widthIndex:'',//每次华东的距离
      cityShow:false, // 全部地区显示与隐藏
      cityZone:[
       {address:"江苏",id:1},
       {address:"安徽",id:2},
       {address:"北京",id:3},
       {address:"河南",id:4},
       {address:"上海",id:5}
      ],
      cityId:'',
      zoneId:'',
      dialogPay:false,
      pay:[0,0,0],
      zone:[
       {address:"区域一",id:1},
       {address:"区域二",id:2},
       {address:"区域三",id:3},
       {address:"区域四",id:4},
       {address:"区域五",id:5}
      ],
      examPoint: [
        {
          title:"开放大学",
          address:"****详细地址",
          id:1,
          examRoom:[
            {deta:"2018-8-6",time:"08:00",type:0},
            {deta:"2018-8-6",time:"09:00",type:0},
            {deta:"2018-8-6",time:"10:00",type:0},
            {deta:"2018-8-6",time:"08:00",type:0},
            {deta:"2018-8-6",time:"09:00",type:0},
            {deta:"2018-8-6",time:"10:00",type:1,id:1},
            {deta:"2018-8-6",time:"08:00",type:0},
            {deta:"2018-8-6",time:"09:00",type:0},
            {deta:"2018-8-6",time:"10:00",type:0},
            {deta:"2018-8-6",time:"08:00",type:0},
            {deta:"2018-8-6",time:"09:00",type:0},
            {deta:"2018-8-6",time:"10:00",type:1,id:2},
            {deta:"2018-8-6",time:"08:00",type:0},
            {deta:"2018-8-6",time:"09:00",type:0},
            {deta:"2018-8-6",time:"10:00",type:0},
            {deta:"2018-8-6",time:"14:00",type:0},
            {deta:"2018-8-6",time:"08:00",type:0},
            {deta:"2018-8-6",time:"09:00",type:0},
            {deta:"2018-8-6",time:"10:00",type:0},
            {deta:"2018-8-6",time:"08:00",type:0},
            {deta:"2018-8-6",time:"09:00",type:0},
            {deta:"2018-8-6",time:"10:00",type:1,id:3},
            {deta:"2018-8-6",time:"08:00",type:0}
          ]
        },
        {
          title:"开放大学",
          address:"****详细地址",
          id:2,
          examRoom:[
            {deta:"2018-8-6",time:"08:00",type:0},
            {deta:"2018-8-6",time:"09:00",type:0},
            {deta:"2018-8-6",time:"10:00",type:0},
            {deta:"2018-8-6",time:"14:00",type:0},
            {deta:"2018-8-6",time:"10:00",type:1,id:6},
          ]
        },
        {
          title:"开放大学",
          address:"****详细地址",
          id:3,
          examRoom:[
            {deta:"2018-8-6",time:"08:00",type:0},
            {deta:"2018-8-6",time:"09:00",type:0},
            {deta:"2018-8-6",time:"10:00",type:0},
            {deta:"2018-8-6",time:"08:00",type:0},
            {deta:"2018-8-6",time:"09:00",type:0},
            {deta:"2018-8-6",time:"10:00",type:1,id:4},
            {deta:"2018-8-6",time:"08:00",type:0},
            {deta:"2018-8-6",time:"09:00",type:0},
            {deta:"2018-8-6",time:"10:00",type:0},
            {deta:"2018-8-6",time:"08:00",type:0},
            {deta:"2018-8-6",time:"09:00",type:0},
            {deta:"2018-8-6",time:"10:00",type:1,id:5},
            {deta:"2018-8-6",time:"08:00",type:0},
            {deta:"2018-8-6",time:"09:00",type:0},
            {deta:"2018-8-6",time:"10:00",type:0},
            {deta:"2018-8-6",time:"14:00",type:0},
            {deta:"2018-8-6",time:"08:00",type:0},
            {deta:"2018-8-6",time:"09:00",type:0},
            {deta:"2018-8-6",time:"10:00",type:0},
            {deta:"2018-8-6",time:"08:00",type:0},
            {deta:"2018-8-6",time:"09:00",type:0},
            {deta:"2018-8-6",time:"10:00",type:1,id:6},
            {deta:"2018-8-6",time:"08:00",type:0}
          ]
        },
      ]
    }
  },
  methods: {
    // 全部地区显示
    cityShowClick() {
      this.cityShow = !this.cityShow
    },
    // 显示对应的区
    cityClick(id) {
      this.cityId = id
      this.zoneId = ''
    },
    zoneClick(id) {
      this.zoneId = id
    },
    // 滑动内容
    scrollContentLeft(id) {
     var btn=document.getElementById("scroll"+id)
     btn.scrollLeft=btn.scrollLeft-this.widthIndex*140
    },
    scrollContentRight(id) {
     var btn=document.getElementById("scroll"+id)
     btn.scrollLeft=btn.scrollLeft+this.widthIndex*140
    },
    // 预约点击,显示对应的，支付弹出框
    payClick(id,index) {
      $("#payText"+index).siblings().removeClass('bg')
      $("#payText"+index).addClass('bg')
      $("#payMoney"+id).css("display","block")
      $("#payMoney"+id).attr('name',index)
    },
    // 关闭支付金额
    payClose(id) {
       $("#payMoney"+id).css("display","none")
       var index = $("#payMoney"+id).attr('name')
       $("#payText"+index).removeClass('bg')
    },
    // 去支付弹出框显示
    goPayDialog() {
      this.dialogPay = true
    }
  },
  components: { 
  },
  mounted() {
    var height=document.documentElement.clientHeight
    var width= (document.documentElement.clientWidth - 340)/140
    this.widthIndex=parseInt(width)
    this.height = height-80
  }
};
</script>
<style scoped>
.room{margin:0 auto;background: #fff;margin-top: 20px;padding-bottom: 30px}
.room-title{height: 100px;border-bottom: 1px dashed #409eff}
.room-title-img{float: left;width: 100px;line-height: 100px;height: 100px;text-align: center;color:#ddd;}
.room-title-img>i{font-size: 60px}
.room-title-text{margin-left: 100px;padding: 25px 10px 10px}
.room-title-text1{margin-left: 100px;line-height: 30px}
.font-size18{font-size: 18px;}
.font-size16{font-size: 16px;}
.padding5{padding:5px 10px;}
.padding20{padding:30px 10px;}
.city-all{line-height: 40px;border-bottom: 1px solid #e5e5e5;padding:0px 15px;}
.city-all>i{line-height: 40px;float: right;}
.room-city>li{margin:10px 0px;padding:0px 15px;border-right: 1px solid #e5e5e5;float: left;cursor:pointer;}
.room-city>.active{color:#409eff;}
.room-zone{margin-left: 10px}
.room-zone>li{margin:10px 15px 5px 5px;padding:5px 15px;border: 1px solid #e5e5e5;float: left;cursor:pointer;border-radius: 4px;font-size: 12px}
.room-zone>.active{border: 1px solid #409eff;color:#409eff}
.city-zone-position{border-bottom: 1px solid #e5e5e5;padding: 5px 0px;background: #f5f5f5;overflow: hidden;}
.room-exam{width: 100%;overflow: hidden;border-bottom: 1px solid #e5e5e5}
.room-exam-time{position: relative;margin-bottom: 20px;}
.room-exam-time ul{margin:0 40px;height: 140px;overflow-x: auto;overflow-y: hidden;white-space: nowrap;}
.room-exam-time ul>li{margin:10px 15px 5px 5px; display: inline-block;cursor:pointer;border-radius: 4px;}
.room-exam-time ul>li>.room-exam-time-text{ padding:10px 15px;height: 85px;width: 90px;border: 1px solid #e5e5e5;text-align: center;}
.room-exam-time ul>li>.grad{color:#999;background: #efefef}
.room-exam-title{font-size: 18px;padding: 15px 15px 5px;}
.room-exam-address{padding: 5px 15px}
.room-exam-arrow{position: absolute;top:50px;height: 40px;line-height: 40px;width: 40px;text-align: center;cursor:pointer;}
.room-exam-arrow>i{color:#409eff;font-size: 30px}
.room-exam-arrow-left{left: 0px;}
.room-exam-arrow-right{right: 0px;}
.room-exam-pay{overflow: hidden;background: #efefef;padding:15px 15px;position: relative;}
.room-exam-pay-time{width: 150px;float: left;}
.room-exam-pay-time2{line-height: 20px}
.room-exam-pay-time1{color: #409eff;margin-top: 5px; display: block;}
.room-exam-pay-btn{width: 150px;float: right;text-align: right;padding-top: 8px;margin-right: 28px;}
.bg{background: #409eff;color:#fff;}
.room-exam-pay-close{position: absolute;top:0px;width:30px;height: 30px;line-height: 30px;text-align: center;right: 0px;cursor:pointer;}
.room-exam-pay-close>i{font-size: 16px;}
.room-exam-pay-close:hover{color:#409eff;}
.dialog-text{width: 450px;float: left;padding-bottom: 40px;padding-top: 20px}
.dialog-img{ width: 150px;float: right; padding-top: 20px; text-align: center;}
.dialog-text1{ padding: 2px 15px 5px;color:#999; }
.dialog-img>p{ color:red;padding:5px 0p; }
.dialog-img>img{ width: 100px; height: 100px;background: #e5e5e5;margin-top: 5px }
</style>