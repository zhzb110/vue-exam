webpackJsonp([17],{LjSz:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("woOf"),o=s.n(a),n=s("spLH"),r=s("w7XY"),i={data:function(){return{queryForm:{status:"",id:""},courses:[],currentPage:1,pageSize:20,totalCount:0,testQuesCourseList:[],courseDropDownList:[]}},methods:{pageContent:function(){var t=this,e=o()({},this.queryForm);e.pageNum=this.currentPage,e.pageSize=this.pageSize,Object(r.b)("/testques/testques/getTestquesCourseByPage",e).then(function(e){200===e.data.code?(t.totalCount=parseInt(e.data.data.total),t.testQuesCourseList=e.data.data.list):t.$message({message:e.message,type:"error"})}).catch(function(t){console.log(t)})},onCurrentPageChange:function(t){this.currentPage=t,this.pageContent()},onPageSizeChange:function(t){this.pageSize=t,this.pageContent()},intDropDown:function(){var t=this;Object(r.b)("/common/queryDropDownByTypes",{types:["COURSE"]}).then(function(e){200===e.data.code?t.courseDropDownList=e.data.data.COURSE:t.$message({message:"获取下拉框数据错误",type:"error"})}).catch(function(t){console.log(t)})},toQuestionListPage:function(t,e,s){this.$router.push({path:"./paperList",query:{courseId:t,courseCode:e,courseName:s}})},createQuestion:function(t){this.$router.push({path:"./preList",query:{courseId:t}})}},mounted:function(){this.intDropDown(),this.pageContent()},components:{pagination:n.a}},u={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{staticClass:"top-form"},[s("el-form",{attrs:{model:t.queryForm,"label-width":"120px","label-position":"right"}},[s("el-col",{attrs:{xs:24,sm:12,md:8,lg:6}},[s("el-form-item",{attrs:{label:"课程状态：",prop:"status"}},[s("el-select",{model:{value:t.queryForm.status,callback:function(e){t.$set(t.queryForm,"status",e)},expression:"queryForm.status"}},[s("el-option",{key:"",attrs:{label:"全部",value:""}}),t._v(" "),s("el-option",{key:"1",attrs:{label:"启用",value:"1"}}),t._v(" "),s("el-option",{key:"0",attrs:{label:"停用",value:"0"}})],1)],1)],1),t._v(" "),s("el-col",{attrs:{xs:24,sm:12,md:8,lg:6}},[s("el-form-item",{attrs:{label:"课程",prop:"id"}},[s("el-select",{model:{value:t.queryForm.id,callback:function(e){t.$set(t.queryForm,"id",e)},expression:"queryForm.id"}},[s("el-option",{key:"0",attrs:{label:"请输入",value:""}}),t._v(" "),t._l(t.courseDropDownList,function(t){return s("el-option",{key:t.id,attrs:{label:t.name+"("+t.code+")",value:t.id}})})],2)],1)],1)],1),t._v(" "),s("div",{staticClass:"text-right-b10"},[s("el-button",{staticStyle:{"margin-left":"80px"},attrs:{type:"primary",plain:""},on:{click:t.pageContent}},[t._v("查询")])],1)],1),t._v(" "),s("ul",{staticClass:"queList"},t._l(t.testQuesCourseList,function(e){return s("li",{on:{click:function(s){return t.toQuestionListPage(e.id,e.courseCode,e.courseName)}}},[s("div",{staticClass:"courseImg"},[t._v(t._s(e.image))]),t._v(" "),s("div",{staticClass:"courseInfo"},[t._v("\n        "+t._s(e.courseName)),s("sub",[t._v(t._s(e.eduName))]),s("sub",{style:"color:"+(e.status?"#21c8ac":"#f00")},[t._v(t._s(e.status?"启用":"停用"))]),t._v(" "),s("p",[s("span",[t._v("待审核 "+t._s(e.stayNum))]),t._v(" "),s("span",[t._v("审核通过 "+t._s(e.adoptNum))]),t._v(" "),s("span",[t._v("审核驳回 "+t._s(e.rebutNum))])])]),t._v(" "),e.status?s("el-button",{attrs:{type:"primary",plain:""},on:{click:function(s){return s.stopPropagation(),t.createQuestion(e.id)}}},[t._v("+ 创建试卷")]):s("el-button",{attrs:{type:"primary",plain:"",disabled:""}},[t._v("+ 创建试卷")])],1)}),0),t._v(" "),s("pagination",{ref:"page",attrs:{currentPage:t.currentPage,pageSize:t.pageSize,totalCount:t.totalCount},on:{"on-current-page-change":t.onCurrentPageChange,"on-page-size-change":t.onPageSizeChange}})],1)},staticRenderFns:[]};var l=s("VU/8")(i,u,!1,function(t){s("TdF2")},"data-v-084b155f",null);e.default=l.exports},TdF2:function(t,e){}});
//# sourceMappingURL=17.09ff1d09d6af7447a12e.js.map