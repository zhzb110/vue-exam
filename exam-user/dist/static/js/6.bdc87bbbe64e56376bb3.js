webpackJsonp([6],{"8iLR":function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"wrapper"},[a("div",{staticClass:"exam-title"},[a("span",{class:{color4:t.color,colorb:!t.color,borderb:t.color},on:{click:function(s){t.examShow(1)}}},[t._v("当前考试")]),t._v(" "),a("span",{class:{color4:!t.color,colorb:t.color,borderb:!t.color},on:{click:function(s){t.examShow(2)}}},[t._v("全部考试")])]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.color,expression:"color"}]},[t._m(0),t._v(" "),t._l(t.list1,function(s){return a("div",{staticClass:"exam-content"},[a("div",{staticClass:"exam-content-1"},["即将开始"===s.state?a("i",{staticClass:"iconfont icon-future colorb"}):t._e(),t._v(" "),"进行中"===s.state?a("i",{staticClass:"iconfont icon-jinxing color4"}):t._e(),t._v(" "),"已经结束"===s.state?a("i",{staticClass:"iconfont icon-wancheng1 colore5"}):t._e()]),t._v(" "),a("div",{staticClass:"exam-content-2"},[a("p",{staticClass:"subject",class:{colorb:"已经结束"===s.state}},[t._v(t._s(s.name))]),t._v(" "),a("p",{staticClass:"time",class:{colorb:"已经结束"===s.state}},[t._v("考试时间："+t._s(s.time))]),t._v(" "),a("p",{staticClass:"address",class:{colorb:"已经结束"===s.state}},[t._v("考点："+t._s(s.address))]),t._v(" "),"进行中"===s.state?a("p",{staticClass:"exam-state"},[a("i",{staticClass:"iconfont icon-alarmnaoling color-red"}),t._v(" "),a("span",{staticClass:"color-red"},[t._v("已经开考3分钟")]),t._v(" "),a("el-button",{staticClass:"float-r padding5",attrs:{type:"primary"},on:{click:t.getIntoExam}},[t._v("进入考试")])],1):t._e(),t._v(" "),"即将开始"===s.state?a("p",{staticClass:"exam-state"},[a("i",{staticClass:"iconfont icon-alarmnaoling colorb"}),t._v(" "),a("span",{staticClass:"colorb"},[t._v("1天后开考")])]):t._e(),t._v(" "),"已经结束"===s.state?a("p",{staticClass:"exam-state"},[a("i",{staticClass:"iconfont icon-boshimao colorb"}),t._v(" "),a("span",{staticClass:"colorb"},[t._v("97分")])]):t._e()])])}),t._v(" "),t._m(1),t._v(" "),t._l(t.list1,function(s){return a("div",{staticClass:"exam-content"},[a("div",{staticClass:"exam-content-1"},["即将开始"===s.state?a("i",{staticClass:"iconfont icon-future colorb"}):t._e(),t._v(" "),"进行中"===s.state?a("i",{staticClass:"iconfont icon-jinxing color4"}):t._e(),t._v(" "),"已经结束"===s.state?a("i",{staticClass:"iconfont icon-wancheng1 colore5"}):t._e()]),t._v(" "),a("div",{staticClass:"exam-content-2"},[a("p",{staticClass:"subject",class:{colorb:"已经结束"===s.state}},[t._v(t._s(s.name))]),t._v(" "),a("p",{staticClass:"time",class:{colorb:"已经结束"===s.state}},[t._v("考试时间："+t._s(s.time))]),t._v(" "),a("p",{staticClass:"address",class:{colorb:"已经结束"===s.state}},[t._v("考点："+t._s(s.address))]),t._v(" "),"进行中"===s.state?a("p",{staticClass:"exam-state"},[a("el-button",{staticClass:"float-r padding5",attrs:{type:"primary"},on:{click:t.getIntoExam}},[t._v("进入考试")])],1):t._e(),t._v(" "),"即将开始"===s.state?a("p",{staticClass:"exam-state"},[a("i",{staticClass:"iconfont icon-alarmnaoling colorb"}),t._v(" "),a("span",{staticClass:"colorb"},[t._v("1天后开考")])]):t._e(),t._v(" "),"已经结束"===s.state?a("p",{staticClass:"exam-state"},[a("i",{staticClass:"iconfont icon-boshimao colorb"}),t._v(" "),a("span",{staticClass:"colorb"},[t._v("97分")])]):t._e()])])})],2),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:!t.color,expression:"!color"}]},t._l(t.list,function(s){return a("div",{staticClass:"exam-content"},[a("div",{staticClass:"exam-content-1"},["即将开始"===s.state?a("i",{staticClass:"iconfont icon-future colorb"}):t._e(),t._v(" "),"进行中"===s.state?a("i",{staticClass:"iconfont icon-jinxing color4"}):t._e(),t._v(" "),"已经结束"===s.state?a("i",{staticClass:"iconfont icon-wancheng1 colore5"}):t._e()]),t._v(" "),a("div",{staticClass:"exam-content-2"},[a("p",{staticClass:"subject",class:{colorb:"已经结束"===s.state}},[t._v(t._s(s.name))]),t._v(" "),a("p",{staticClass:"time",class:{colorb:"已经结束"===s.state}},[t._v("考试时间："+t._s(s.time))]),t._v(" "),a("p",{staticClass:"address",class:{colorb:"已经结束"===s.state}},[t._v("考点："+t._s(s.address))]),t._v(" "),"进行中"===s.state?a("p",{staticClass:"exam-state"},[a("i",{staticClass:"iconfont icon-alarmnaoling color-red"}),t._v(" "),a("span",{staticClass:"color-red"},[t._v("已经开考3分钟")]),t._v(" "),a("el-button",{staticClass:"float-r padding5",attrs:{type:"primary"},on:{click:t.getIntoExam}},[t._v("进入考试")])],1):t._e(),t._v(" "),"即将开始"===s.state?a("p",{staticClass:"exam-state"},[a("i",{staticClass:"iconfont icon-alarmnaoling colorb"}),t._v(" "),a("span",{staticClass:"colorb"},[t._v("1天后开考")])]):t._e(),t._v(" "),"已经结束"===s.state?a("p",{staticClass:"exam-state"},[a("i",{staticClass:"iconfont icon-boshimao colorb"}),t._v(" "),a("span",{staticClass:"colorb"},[t._v("97分")])]):t._e()])])})),t._v(" "),a("el-dialog",{attrs:{title:"进入考试",visible:t.dialogVisible,width:"500px"},on:{"update:visible":function(s){t.dialogVisible=s}}},[a("div",{staticClass:"subject password-title margin-b10"},[t._v("输入密码进入 《大学英语A》 考试")]),t._v(" "),a("div",[a("el-form",{ref:"ruleForm",staticClass:"password",attrs:{model:t.ruleForm,rules:t.rules,"label-width":"1px"}},[a("el-form-item",{staticClass:"float-l",staticStyle:{width:"320px"},attrs:{label:"",prop:"password"}},[a("el-input",{model:{value:t.ruleForm.password,callback:function(s){t.$set(t.ruleForm,"password",s)},expression:"ruleForm.password"}})],1),t._v(" "),a("el-button",{staticClass:"float-r",attrs:{type:"primary"},on:{click:function(s){t.getIntoPage()}}},[t._v("进入考试")])],1)],1)])],1)},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"tips"},[this._v("预约考试"),s("span",{staticClass:"colorb font-size12"},[this._v("  (请提前到达指定考场，准时开考)")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"tips",staticStyle:{"padding-top":"20px"}},[this._v("随到随考"),s("span",{staticClass:"colorb font-size12"},[this._v("  (请在预约的日期到达考点)")])])}]};var o=a("VU/8")({data:function(){return{rules:{password:[{required:!0,message:"请输入考试进入密码",trigger:"blur"}]},ruleForm:{password:""},color:!0,dialogVisible:!1,list:[{name:"大学英语",time:"2018-9-26 08:00:00",address:"江苏开放大学（苏州市江安路122号 教学楼4楼502）",type:"1",state:"即将开始"},{name:"大学英语",time:"2018-9-26 08:00:00",address:"江苏开放）",type:"1",state:"即将开始"},{name:"大学英语",time:"2018-9-26 08:00:00",address:"江苏开放",type:"1",state:"进行中"},{name:"大学英语",time:"2018-9-26 08:00:00",address:"江苏开放大学（苏州市江安路122号 苏州市江安路122号 教学楼4楼502）",type:"1",state:"进行中"},{name:"大学英语",time:"2018-9-26 08:00:00",address:"江苏开放大学（苏州市江安路122号 教学楼4楼502）",type:"1",state:"已经结束"},{name:"大学英语",time:"2018-9-26 08:00:00",address:"江苏开放大学（苏州市江安路122号 教学楼4楼502）",type:"1",state:"已经结束"}],list1:[{name:"大学英语",time:"2018-9-26 08:00:00",address:"江苏开放大学（苏州市江安路122号 教学楼4楼502）",type:"1",state:"进行中"},{name:"大学英语",time:"2018-9-26 08:00:00",address:"江苏开放）",type:"1",state:"进行中"},{name:"大学英语",time:"2018-9-26 08:00:00",address:"江苏开放",type:"1",state:"即将开始"},{name:"大学英语",time:"2018-9-26 08:00:00",address:"江苏开放大学（苏州市江安路122号 苏州市江安路122号 教学楼4楼502）",type:"1",state:"即将开始"}]}},methods:{examShow:function(t){this.color=1===t},getIntoExam:function(){this.dialogVisible=!0,this.$refs.ruleForm&&this.$refs.ruleForm.resetFields()},getIntoPage:function(){var t=this;this.$refs.ruleForm.validate(function(s){s&&t.$router.push({path:"/exam"})})}},components:{},mounted:function(){}},e,!1,function(t){a("mIZu")},"data-v-6b203fb8",null);s.default=o.exports},mIZu:function(t,s){}});
//# sourceMappingURL=6.bdc87bbbe64e56376bb3.js.map