webpackJsonp([6],{Iapy:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("woOf"),r=a.n(s),n=a("spLH"),o=a("w7XY"),l=a("Kj7M"),i={data:function(){return{currentPage:1,pageSize:20,totalCount:0,dialogCheck:!1,queryForm:{orgId:"",id:"",approveStatus:"",batchId:"",relevanceStatus:"",name:""},questionList:[],departmentDropDownList:[],courseDropDownList:[],eaxmBatchDropDownList:[],tableData:[]}},methods:{pageContent:function(){var e=this,t=r()({},this.queryForm);t.pageNum=this.currentPage,t.pageSize=this.pageSize;Object(o.b)("/testques/testpapermodify/getTestpaperModifylistByPage",t).then(function(t){200===t.data.code?(e.totalCount=parseInt(t.data.data.total),e.tableData=t.data.data.list):e.$message({message:t.message,type:"error"})}).catch(function(e){console.log(e)})},onCurrentPageChange:function(e){this.currentPage=e,this.pageContent()},onPageSizeChange:function(e){this.pageSize=e,this.pageContent()},checkPaper:function(e){this.$router.push({path:"./maintainPaper/preview",query:{paperId:e,isCheck:1}})},departmentDropList:function(){var e=this;Object(o.b)("/common/queryDropDownByTypes",{types:["FACULTY","EXAM_BATCH"]}).then(function(t){200===t.data.code?(e.departmentDropDownList=t.data.data.FACULTY,e.eaxmBatchDropDownList=t.data.data.EXAM_BATCH):e.$message({message:"获取下拉列表错误",type:"error"})}).catch(function(e){console.log(e)})},browse:function(e){var t=this;this.dialogCheck=!0;var a="/testques/testpaper/info/"+e;Object(o.a)(a).then(function(e){200==e.data.code?t.questionList=e.data.data:t.$message({message:"获取试题内容失败",type:"error"})})},courseDropList:function(){var e=this;if(!this.queryForm.orgId||""===this.queryForm.orgId)return this.courseDropDownList=[],void(this.queryForm.id="");var t={orgId:this.queryForm.orgId};Object(o.b)("/sys/course/queryCourseDropDown",t).then(function(t){200===t.data.code?e.courseDropDownList=t.data.data:e.$message({message:"获取课程下拉列表错误",type:"error"})}).catch(function(e){console.log(e)})},checkPaperOne:function(e){this.$router.push({path:"./checkQues/checkOne?paperId="+e})},checkParper:function(e){this.$router.push({path:"./maintainPaper/preview",query:{paperId:e}})},editPaper:function(e,t){this.$router.push({path:"./maintainPaper/chooseQueType",query:{paperId:e,courseId:t}})}},components:{pagination:n.a,Quesview:l.a},created:function(){this.departmentDropList(),this.pageContent()}},p={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"top-form"},[a("el-form",{attrs:{model:e.queryForm,"label-width":"120px","label-position":"right"}},[a("el-col",{attrs:{xs:24,sm:12,md:8,lg:6}},[a("el-form-item",{attrs:{label:"所属学院：",prop:"orgId"}},[a("el-select",{attrs:{filterable:""},on:{change:function(t){return e.courseDropList()}},model:{value:e.queryForm.orgId,callback:function(t){e.$set(e.queryForm,"orgId",t)},expression:"queryForm.orgId"}},[a("el-option",{attrs:{label:"请选择",value:""}}),e._v(" "),e._l(e.departmentDropDownList,function(e){return a("el-option",{key:e.id,attrs:{label:e.name+"("+e.code+")",value:e.id}})})],2)],1)],1),e._v(" "),a("el-col",{attrs:{xs:24,sm:12,md:8,lg:6}},[a("el-form-item",{attrs:{label:"课程：",prop:"id"}},[a("el-select",{model:{value:e.queryForm.id,callback:function(t){e.$set(e.queryForm,"id",t)},expression:"queryForm.id"}},[a("el-option",{attrs:{label:"请选择",value:""}}),e._v(" "),e._l(e.courseDropDownList,function(e){return a("el-option",{key:e.id,attrs:{label:e.name+"("+e.code+")",value:e.id}})})],2)],1)],1),e._v(" "),a("el-col",{attrs:{xs:24,sm:12,md:8,lg:6}},[a("el-form-item",{attrs:{label:"审核状态：",prop:"checkStatus"}},[a("el-select",{model:{value:e.queryForm.checkStatus,callback:function(t){e.$set(e.queryForm,"checkStatus",t)},expression:"queryForm.checkStatus"}},[a("el-option",{key:"0",attrs:{label:"全部",value:""}}),e._v(" "),a("el-option",{key:"1",attrs:{label:"已保存",value:"0"}}),e._v(" "),a("el-option",{key:"2",attrs:{label:"待审核",value:"1"}}),e._v(" "),a("el-option",{key:"3",attrs:{label:"审核通过",value:"2"}}),e._v(" "),a("el-option",{key:"4",attrs:{label:"审核驳回",value:"3"}})],1)],1)],1),e._v(" "),a("el-col",{attrs:{xs:24,sm:12,md:8,lg:6}},[a("el-form-item",{attrs:{label:"关联状态：",prop:"relevanceStatus"}},[a("el-select",{model:{value:e.queryForm.relevanceStatus,callback:function(t){e.$set(e.queryForm,"relevanceStatus",t)},expression:"queryForm.relevanceStatus"}},[a("el-option",{attrs:{label:"全部",value:""}}),e._v(" "),a("el-option",{attrs:{label:"已关联",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"未关联",value:"0"}})],1)],1)],1),e._v(" "),a("el-col",{attrs:{xs:24,sm:12,md:8,lg:6}},[a("el-form-item",{attrs:{label:"使用批次：",prop:"batchId "}},[a("el-select",{model:{value:e.queryForm.batchId,callback:function(t){e.$set(e.queryForm,"batchId",t)},expression:"queryForm.batchId "}},[a("el-option",{key:"0",attrs:{label:"全部",value:"0"}}),e._v(" "),e._l(e.eaxmBatchDropDownList,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})],2)],1)],1),e._v(" "),a("el-col",{attrs:{xs:24,sm:12,md:8,lg:6}},[a("el-form-item",{attrs:{label:"试卷名称：",prop:"name"}},[a("el-input",{model:{value:e.queryForm.name,callback:function(t){e.$set(e.queryForm,"name",t)},expression:"queryForm.name"}})],1)],1)],1),e._v(" "),a("div",{staticClass:"formBtns"},[a("el-button",{attrs:{type:"primary",plain:""},on:{click:e.addPaper}},[e._v("新增")]),e._v(" "),a("el-button",{attrs:{type:"primary",plain:""},on:{click:e.pageContent}},[e._v("查询")]),e._v(" "),a("el-button",{attrs:{type:"success",plain:""},on:{click:e.exportPaper}},[e._v("导出")])],1),e._v(" "),a("el-table",{staticStyle:{width:"100%","margin-top":"10px"},attrs:{data:e.tableData,border:""}},[a("el-table-column",{attrs:{type:"index",label:"序号"}}),e._v(" "),a("el-table-column",{attrs:{prop:"courseCode",label:"课程代码"}}),e._v(" "),a("el-table-column",{attrs:{prop:"courseName",label:"课程名称"}}),e._v(" "),a("el-table-column",{attrs:{prop:"examTime",label:"考试时长"}}),e._v(" "),a("el-table-column",{attrs:{prop:"name",label:"试卷名称"}}),e._v(" "),a("el-table-column",{attrs:{prop:"score",label:"总分"}}),e._v(" "),a("el-table-column",{attrs:{prop:"createBy",label:"创建人"}}),e._v(" "),a("el-table-column",{attrs:{prop:"createTime",label:"创建时间"}}),e._v(" "),a("el-table-column",{attrs:{prop:"stayNum",label:"待审核数"}}),e._v(" "),a("el-table-column",{attrs:{prop:"adoptNum",label:"审核通过试题数"}}),e._v(" "),a("el-table-column",{attrs:{prop:"rebutNum",label:"审核驳回试题数"}}),e._v(" "),a("el-table-column",{attrs:{label:"审核状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[0===t.row.approveStatus?a("span",[e._v("已保存")]):1===t.row.approveStatus?a("span",[e._v("待审核")]):2===t.row.approveStatus?a("span",[e._v("审核通过")]):3===t.row.approveStatus?a("span",[e._v("审核驳回")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"关联状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.relevanceStatus?a("span",[e._v("已关联")]):a("span",[e._v("未关联")])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"操作",width:"215"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{staticClass:"el-table-btn",attrs:{type:"primary",plain:""},on:{click:function(a){return e.browse(t.row.id)}}},[e._v("浏览")]),e._v(" "),0!=t.row.stayNum&&0==t.row.rebutNum?a("el-button",{staticClass:"el-table-btn",attrs:{type:"primary",plain:""},on:{click:function(a){return e.checkPaperOne(t.row.id)}}},[e._v("逐题审核")]):0!=t.row.rebutNum?a("el-button",{staticClass:"el-table-btn",attrs:{type:"primary",plain:"",disable:""}},[e._v("审核")]):a("el-button",{staticClass:"el-table-btn",attrs:{type:"primary",plain:""},on:{click:function(a){return e.checkParper(t.row.id)}}},[e._v("审核")]),e._v(" "),a("el-button",{staticClass:"el-table-btn",attrs:{type:"primary",plain:""},on:{click:function(a){return e.editPaper(t.row.id,t.row.courseId)}}},[e._v("编辑")])]}}])})],1),e._v(" "),a("pagination",{ref:"page",attrs:{currentPage:e.currentPage,pageSize:e.pageSize,totalCount:e.totalCount},on:{"on-current-page-change":e.onCurrentPageChange,"on-page-size-change":e.onPageSizeChange}}),e._v(" "),a("el-dialog",{attrs:{title:"试题预览",visible:e.dialogCheck,width:"1000px"},on:{"update:visible":function(t){e.dialogCheck=t}}},[a("Quesview",{ref:"qv",attrs:{viewData:e.questionList}})],1)],1)},staticRenderFns:[]},c=a("VU/8")(i,p,!1,null,null,null);t.default=c.exports},Kj7M:function(e,t,a){"use strict";var s={data:function(){return{}},props:{viewData:{type:Array,default:[]},areaHeight:{type:String,default:"500"}},watch:{areaHeight:function(e,t){this.$refs.viewContainer.style.height=e}},methods:{editQue:function(e){this.$emit("editOneQue",e)},deleteQue:function(e){this.viewData.splice(e,1)},dd:function(){return console.log(this.viewData),"1"}}},r={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{ref:"viewContainer"},[a("div",{staticClass:"quesView"},[a("div",{staticStyle:{"font-size":"18px","margin-bottom":"10px",color:"#409eff"}},[e._v(e._s(e.viewData.courseName)+" ——— "),a("span",{staticClass:"font-size16 color-99"},[e._v(e._s(e.viewData.name))])]),e._v(" "),e._l(e.viewData.captions,function(t,s){return[a("div",{staticStyle:{"font-size":"16px",color:"#333","margin-top":"15px"}},[e._v(e._s(t.testquesTitleName)+"(共"+e._s(t.subTestquesNum)+"题，"+e._s(t.score)+"分  )")]),e._v(" "),e._l(t.captionTestquesInfo,function(s,r){return[0==s.testquesInfo.type?a("div",[a("div",{staticClass:"quesTitle clear"},[a("samp",[e._v(e._s(r+1)+".")]),e._v(" "),a("div",{domProps:{innerHTML:e._s(s.testquesInfo.simple.content)}})]),e._v(" "),1001==s.testquesInfo.simple.parentTypeId||1002==s.testquesInfo.simple.parentTypeId?a("div",[1001==s.testquesInfo.simple.parentTypeId?a("ul",{staticClass:"options"},e._l(s.testquesInfo.simple.options,function(t,s){return a("li",{class:1==t.answerFlag?"active clear":"clear"},[a("samp",[e._v(e._s(String.fromCharCode(s+65)))]),e._v(" "),a("div",{domProps:{innerHTML:e._s(t.optionContent)}})])}),0):e._e(),e._v(" "),1002==s.testquesInfo.simple.parentTypeId?a("ul",{staticClass:"options"},e._l(s.testquesInfo.simple.options,function(t,s){return a("li",{class:1==t.answerFlag?"active clear":"clear"},[a("samp",{staticStyle:{"border-radius":"0"}},[e._v(e._s(String.fromCharCode(s+65)))]),e._v(" "),a("div",{domProps:{innerHTML:e._s(t.optionContent)}})])}),0):e._e()]):e._e(),e._v(" "),1003==s.testquesInfo.simple.parentTypeId?a("div",[a("div",{staticClass:"answer"},[e._v("答案：\n                 "),e._l(s.testquesInfo.simple.options,function(t){return[1==t.answerFlag&&"正确"==t.optionContent?a("i",{staticClass:"el-icon-check"}):e._e(),e._v(" "),1==t.answerFlag&&"错误"==t.optionContent?a("i",{staticClass:"el-icon-close"}):e._e()]})],2)]):e._e(),e._v(" "),1004==s.testquesInfo.simple.parentTypeId?a("div",[a("div",{staticClass:"answerTk"},[a("samp",[e._v("答案：")]),e._v(" "),a("ul",e._l(s.testquesInfo.simple.answer.split("&<multi@>"),function(t,s){return a("li",[a("div",{staticClass:"orderInx"},[e._v(e._s(s+1))]),e._v(" "+e._s(t))])}),0)])]):e._e(),e._v(" "),1005==s.testquesInfo.simple.parentTypeId?a("div",[a("div",{staticClass:"answer"},[a("samp",[e._v("答案：")]),e._v(" "),a("div",{domProps:{innerHTML:e._s(s.testquesInfo.simple.answer)}})])]):e._e(),e._v(" "),a("div",{staticClass:"analysis clear"},[a("samp",[e._v("解析：")]),a("div",{domProps:{innerHTML:e._s(s.testquesInfo.simple.answerAnalysis||"无")}})]),e._v(" "),a("p",[e._v("分值： "+e._s(s.testquesInfo.simple.score)+" 分")]),e._v(" "),a("p",[e._v("难度： "+e._s(s.testquesInfo.simple.difficultyLevel)+"        试题分类： "+e._s(s.testquesInfo.simple.classifyName||""))])]):a("div",[1007==s.testquesInfo.complex.parentTypeId?a("div",[a("video",{attrs:{src:s.file}})]):e._e(),e._v(" "),e._l(s.testquesInfo.complex.subSimple,function(t,s){return a("div",{staticClass:"smallQue"},["1001"==t.parentTypeId||"1002"==t.parentTypeId?a("div",[a("div",{staticClass:"quesTitle clear"},[a("samp",[e._v(e._s(s+1)+"、["+e._s("1002"==t.parentTypeId?"多选题":"单选题")+"]")]),e._v(" "),a("div",{domProps:{innerHTML:e._s(t.content)}})]),e._v(" "),"1001"==t.parentTypeId?a("ul",{staticClass:"options"},e._l(t.options,function(t,s){return a("li",{class:1==t.answerFlag?"active clear":"clear"},[a("samp",[e._v(e._s(String.fromCharCode(s+65)))]),e._v(" "),a("div",{domProps:{innerHTML:e._s(t.optionContent)}})])}),0):e._e(),e._v(" "),1002==t.parentTypeId?a("ul",{staticClass:"options"},e._l(t.options,function(t,s){return a("li",{class:1==t.answerFlag?"active clear":"clear"},[a("samp",{staticStyle:{"border-radius":"0"}},[e._v(e._s(String.fromCharCode(s+65)))]),e._v(" "),a("div",{domProps:{innerHTML:e._s(t.optionContent)}})])}),0):e._e()]):e._e(),e._v(" "),"1003"==t.parentTypeId?a("div",[a("div",{staticClass:"quesTitle clear"},[a("samp",[e._v(e._s(s+1)+"、[判断题]")]),e._v(" "),a("div",{domProps:{innerHTML:e._s(t.content)}})]),e._v(" "),a("div",{staticClass:"answer"},[e._v("答案： \n                     "),e._l(t.options,function(t){return[1==t.answerFlag&&"正确"==t.optionContent?a("i",{staticClass:"el-icon-check"}):e._e(),e._v(" "),1==t.answerFlag&&"错误"==t.optionContent?a("i",{staticClass:"el-icon-close"}):e._e()]})],2)]):e._e(),e._v(" "),"1004"==t.parentTypeId?a("div",[a("div",{staticClass:"quesTitle clear"},[a("samp",[e._v(e._s(s+1)+"、[填空题]")]),e._v(" "),a("div",{domProps:{innerHTML:e._s(t.content)}})]),e._v(" "),a("div",{staticClass:"answerTk"},[a("samp",[e._v("答案：")]),e._v(" "),a("ul",e._l(t.answer.split("&<multi@>"),function(t,s){return a("li",[a("div",{staticClass:"orderInx"},[e._v(e._s(s+1))]),e._v(" "+e._s(t))])}),0)])]):e._e(),e._v(" "),"1005"==t.parentTypeId?a("div",[a("div",{staticClass:"quesTitle clear"},[a("samp",[e._v(e._s(s+1)+"、[简答题]")]),e._v(" "),a("div",{domProps:{innerHTML:e._s(t.content)}})]),e._v(" "),a("div",{staticClass:"answer"},[a("samp",[e._v("答案：")]),e._v(" "),a("div",{domProps:{innerHTML:e._s(t.answer)}})])]):e._e(),e._v(" "),a("div",{staticClass:"analysis clear"},[a("samp",[e._v("解析：")]),a("div",{domProps:{innerHTML:e._s(t.answerAnalysis||"无")}})]),e._v(" "),a("p",[e._v("分值： "+e._s(t.score)+" 分")]),e._v(" "),t.parentTypeId<6?a("p",[e._v("难度： "+e._s(t.difficultyLevel)+"        试题分类： "+e._s(t.classifyName||""))]):e._e()])}),e._v(" "),1001==t.parentTypeId||1002==t.parentTypeId||1003==t.parentTypeId||1004==t.parentTypeId||1005==t.parentTypeId?a("div",{staticClass:"analysis clear"},[a("samp",[e._v("解析：")]),a("div",{domProps:{innerHTML:e._s(t.answerAnalysis||"无")}})]):e._e(),e._v(" "),a("p",[e._v("本题总分： "+e._s(t.score)+" 分")]),e._v(" "),1001==t.parentTypeId||1002==t.parentTypeId||1003==t.parentTypeId||1004==t.parentTypeId||1005==t.parentTypeId?a("p",[e._v("难度： "+e._s(t.difficultyLevel)+"        试题分类： "+e._s(t.classifyName||""))]):e._e()],2)]})]})],2)])},staticRenderFns:[]};var n=a("VU/8")(s,r,!1,function(e){a("Sucb")},"data-v-7450f942",null);t.a=n.exports},Sucb:function(e,t){}});
//# sourceMappingURL=6.f6cb4cde9855d8ccaacd.js.map