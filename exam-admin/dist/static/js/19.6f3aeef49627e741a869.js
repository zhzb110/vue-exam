webpackJsonp([19],{D7R6:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("woOf"),r=a.n(l),o=a("spLH"),n=(a("w7XY"),{data:function(){return{tableData:[{a1:"19",a2:"林丽",a3:"吉林省 ",a4:"吉林省 ",a5:"19",a6:"林丽",a7:1,a8:1},{a1:"19",a2:"林丽",a3:"吉林省 辽源",a4:"吉林省 辽源",a5:"19",a6:"林丽",a7:0,a8:0}],currentPage:1,pageSize:10,totalCount:40,queryForm:{b1:"",b2:"",b3:"全部"},optionArry:[{id:1,value:"江开1",lable:"1"},{id:2,value:"江开2",lable:"2"},{id:3,value:"江开3",lable:"3"}],dialogVisible:!1,dialogCkeck:!1,newAndEditor:""}},methods:{checkLayoutResult:function(){var e=r()({},this.queryForm);e.page=this.currentPage,e.limit=this.pageSize},onCurrentPageChange:function(e){this.currentPage=e,this.checkLayoutResult()},onPageSizeChange:function(e){this.pageSize=e,this.checkLayoutResult()},dialogCheckSeatingTable:function(e){this.$emit("check-seating-table",e)}},components:{pagination:o.a},props:["Id"],created:function(){this.checkLayoutResult()}}),i={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"top-form"},[a("el-form",{ref:"queryForm",attrs:{model:e.queryForm,"label-width":"100px","label-position":"right"}},[a("el-col",{attrs:{span:10}},[a("el-form-item",{attrs:{label:"场次：",prop:"b1"}},[a("el-select",{model:{value:e.queryForm.c4,callback:function(t){e.$set(e.queryForm,"c4",t)},expression:"queryForm.c4"}},[a("el-option",{attrs:{label:"全部",value:""}}),e._v(" "),e._l(e.optionArry,function(e){return a("el-option",{key:e.id,attrs:{label:e.label,value:e.id}})})],2)],1)],1),e._v(" "),a("el-col",{attrs:{span:10}},[a("el-form-item",{attrs:{label:"考场：",prop:"b2"}},[a("el-input",{model:{value:e.queryForm.b1,callback:function(t){e.$set(e.queryForm,"b1",t)},expression:"queryForm.b1"}})],1)],1)],1),e._v(" "),a("div",{staticClass:"text-right-b10"},[a("el-button",{attrs:{type:"primary",plain:""},on:{click:e.checkLayoutResult}},[e._v("查询")])],1)],1),e._v(" "),a("div",{staticClass:"content-table"},[a("el-form",{ref:"queryForm",attrs:{model:e.queryForm,"label-width":"120px","label-position":"right"}},[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"考试批次：",prop:"b1"}},[a("label",[e._v("2019秋季期末考试")])])],1),e._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"考点：",prop:"b2"}},[a("label",[e._v("2020.01.10~2020.01.14")])])],1)],1),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,border:""}},[a("el-table-column",{attrs:{prop:"a1",label:"序号",width:"48px"}}),e._v(" "),a("el-table-column",{attrs:{prop:"a2",label:"场次"}}),e._v(" "),a("el-table-column",{attrs:{prop:"a3",label:"考场"}}),e._v(" "),a("el-table-column",{attrs:{prop:"a4",label:"机位数"}}),e._v(" "),a("el-table-column",{attrs:{prop:"a5",label:"考生数"}}),e._v(" "),a("el-table-column",{attrs:{prop:"a6",label:"剩余机位数"}}),e._v(" "),a("el-table-column",{attrs:{label:"座次表",width:"110"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{staticClass:"el-table-btn",attrs:{type:"primary",plain:""},on:{click:function(t){return e.dialogCheckSeatingTable(2)}}},[e._v("查看座次表")])]}}])})],1),e._v(" "),a("pagination",{ref:"page",attrs:{currentPage:e.currentPage,pageSize:e.pageSize,totalCount:e.totalCount},on:{"on-current-page-change":e.onCurrentPageChange,"on-page-size-change":e.onPageSizeChange}})],1)])},staticRenderFns:[]},s=a("VU/8")(n,i,!1,null,null,null).exports,c={data:function(){return{tableData:[{a1:"19",a2:"林丽",a3:"吉林省 ",a4:"120 ",a5:"1997",a6:"林丽",a7:1,a8:1},{a1:"19",a2:"林丽",a3:"吉林省 辽源",a4:"120",a5:"1997",a6:"林丽",a7:0,a8:0}],currentPage:1,pageSize:10,totalCount:40,queryForm:{b1:"",b2:"",b3:"全部"}}},methods:{checkSeatingTable:function(){var e=r()({},this.queryForm);e.page=this.currentPage,e.limit=this.pageSize},onCurrentPageChange:function(e){this.currentPage=e,this.checkSeatingTable()},onPageSizeChange:function(e){this.pageSize=e,this.checkSeatingTable()}},components:{pagination:o.a},props:["seatId"],created:function(){this.checkSeatingTable()}},u={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"top-form"},[a("el-form",{ref:"queryForm",attrs:{model:e.queryForm,"label-width":"150px","label-position":"right"}},[a("el-col",{attrs:{span:10}},[a("el-form-item",{attrs:{label:"考生号：",prop:"b2"}},[a("el-input",{model:{value:e.queryForm.b1,callback:function(t){e.$set(e.queryForm,"b1",t)},expression:"queryForm.b1"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:10}},[a("el-form-item",{attrs:{label:"姓名：",prop:"b2"}},[a("el-input",{model:{value:e.queryForm.b1,callback:function(t){e.$set(e.queryForm,"b1",t)},expression:"queryForm.b1"}})],1)],1)],1),e._v(" "),a("div",{staticClass:"text-right-b10"},[a("el-button",{attrs:{type:"primary",plain:""},on:{click:e.checkSeatingTable}},[e._v("查询")])],1)],1),e._v(" "),a("div",{staticClass:"content-table"},[a("el-form",{ref:"queryForm",attrs:{model:e.queryForm,"label-width":"150px","label-position":"right"}},[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"考点：",prop:"b1"}},[a("label",[e._v("2019秋季期末考试")])])],1),e._v(" "),a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"考场：",prop:"b2"}},[a("label",[e._v("2020.01.10")])])],1),e._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"开考时间",prop:"b2"}},[a("label",[e._v("2020.01.10~2020.01.14")])])],1)],1),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,border:""}},[a("el-table-column",{attrs:{prop:"a1",label:"做座位号",width:"70px"}}),e._v(" "),a("el-table-column",{attrs:{prop:"a2",label:"课程代码"}}),e._v(" "),a("el-table-column",{attrs:{prop:"a3",label:"课程名称"}}),e._v(" "),a("el-table-column",{attrs:{prop:"a4",label:"考试时长",width:"70px"}}),e._v(" "),a("el-table-column",{attrs:{prop:"a5",label:"考生号"}}),e._v(" "),a("el-table-column",{attrs:{prop:"a6",label:"姓名"}}),e._v(" "),a("el-table-column",{attrs:{prop:"a2",label:"考生所属教学点",width:"120px"}}),e._v(" "),a("el-table-column",{attrs:{prop:"a3",label:"考生所属考点",width:"120px"}}),e._v(" "),a("el-table-column",{attrs:{prop:"a4",label:"学习批次"}}),e._v(" "),a("el-table-column",{attrs:{prop:"a5",label:"层次"}}),e._v(" "),a("el-table-column",{attrs:{prop:"a6",label:"专业"}})],1),e._v(" "),a("pagination",{ref:"page",attrs:{currentPage:e.currentPage,pageSize:e.pageSize,totalCount:e.totalCount},on:{"on-current-page-change":e.onCurrentPageChange,"on-page-size-change":e.onPageSizeChange}})],1)])},staticRenderFns:[]},p=a("VU/8")(c,u,!1,null,null,null).exports,b={data:function(){return{tableData:[{a1:"19",a2:"林丽",a3:"吉林省 ",a4:"吉林省 ",a5:"19",a6:"林丽",a7:1,a8:1},{a1:"19",a2:"林丽",a3:"吉林省 辽源",a4:"吉林省 辽源",a5:"19",a6:"林丽",a7:0,a8:0}],currentPage:1,pageSize:10,totalCount:40,queryForm:{b1:"",b2:"",b3:"全部"},optionArry:[{id:1,value:"江开1",lable:"1"},{id:2,value:"江开2",lable:"2"},{id:3,value:"江开3",lable:"3"}],dialogResult:!1,dialogSeatingTable:!1,Id:"",seatId:""}},methods:{checkExaminationRoom:function(){var e=r()({},this.queryForm);e.page=this.currentPage,e.limit=this.pageSize},onCurrentPageChange:function(e){this.currentPage=e,this.checkExaminationRoom()},onPageSizeChange:function(e){this.pageSize=e,this.checkExaminationRoom()},checkResult:function(e){this.dialogResult=!0,this.Id=e,this.$refs.kcj&&this.$refs.kcj.checkLayoutResult()},checkSeatingTable:function(e){this.dialogSeatingTable=!0,this.seatId=e,this.$refs.zcb&&this.$ref.zcb.checkSeatingTable()}},created:function(){},mounted:function(){},components:{pagination:o.a,examRoomResult:s,examRoomSeatingTable:p}},m={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"top-form"},[a("el-form",{ref:"queryForm",attrs:{model:e.queryForm,"label-width":"120px","label-position":"right"}},[a("el-col",{attrs:{xs:24,sm:12,md:8,lg:6}},[a("el-form-item",{attrs:{label:"考试批次：",prop:"b1"}},[a("el-select",{model:{value:e.queryForm.c4,callback:function(t){e.$set(e.queryForm,"c4",t)},expression:"queryForm.c4"}},[a("el-option",{attrs:{label:"请选择",value:""}}),e._v(" "),e._l(e.optionArry,function(e){return a("el-option",{key:e.id,attrs:{label:e.label,value:e.id}})})],2)],1)],1),e._v(" "),a("el-col",{attrs:{xs:24,sm:12,md:8,lg:6}},[a("el-form-item",{attrs:{label:"教学点：",prop:"b2"}},[a("el-select",{attrs:{filterable:""},model:{value:e.queryForm.c4,callback:function(t){e.$set(e.queryForm,"c4",t)},expression:"queryForm.c4"}},[a("el-option",{attrs:{label:"请选择",value:""}}),e._v(" "),e._l(e.optionArry,function(e){return a("el-option",{key:e.id,attrs:{label:e.label,value:e.id}})})],2)],1)],1),e._v(" "),a("el-col",{attrs:{xs:24,sm:12,md:8,lg:6}},[a("el-form-item",{attrs:{label:"考点：",prop:"b2"}},[a("el-select",{attrs:{filterable:""},model:{value:e.queryForm.c4,callback:function(t){e.$set(e.queryForm,"c4",t)},expression:"queryForm.c4"}},[a("el-option",{attrs:{label:"请选择",value:""}}),e._v(" "),e._l(e.optionArry,function(e){return a("el-option",{key:e.id,attrs:{label:e.label,value:e.id}})})],2)],1)],1)],1),e._v(" "),a("div",{staticStyle:{"text-align":"right","padding-bottom":"10px"}},[a("el-button",{attrs:{type:"primary",plain:""},on:{click:e.checkExaminationRoom}},[e._v("查询")])],1)],1),e._v(" "),a("div",{staticClass:"content-table"},[a("el-form",{ref:"queryForm",attrs:{model:e.queryForm,"label-width":"120px","label-position":"right"}},[a("el-col",{attrs:{xs:24,sm:12,md:8,lg:6}},[a("el-form-item",{attrs:{label:"考试批次：",prop:"b1"}},[a("label",[e._v("2019秋季期末考试")])])],1),e._v(" "),a("el-col",{attrs:{xs:24,sm:12,md:8,lg:6}},[a("el-form-item",{attrs:{label:"考试时间：",prop:"b2"}},[a("label",[e._v("2020.01.10~2020.01.14")])])],1),e._v(" "),a("el-col",{attrs:{xs:24,sm:12,md:8,lg:6}},[a("el-form-item",{attrs:{label:"考试模式：",prop:"b2"}},[a("label",[e._v("预约考试")])])],1)],1),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,border:""}},[a("el-table-column",{attrs:{prop:"a1",label:"序号",width:"48px"}}),e._v(" "),a("el-table-column",{attrs:{prop:"a2",label:"考点代码"}}),e._v(" "),a("el-table-column",{attrs:{prop:"a3",label:"考点名称"}}),e._v(" "),a("el-table-column",{attrs:{prop:"a4",label:"教学点"}}),e._v(" "),a("el-table-column",{attrs:{prop:"a5",label:"确认考场数"}}),e._v(" "),a("el-table-column",{attrs:{prop:"a6",label:"预约人次"}}),e._v(" "),a("el-table-column",{attrs:{label:"操作",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{staticClass:"el-table-btn",attrs:{type:"primary",plain:""},on:{click:function(t){return e.checkResult(2)}}},[e._v("查看预约结果")])]}}])})],1),e._v(" "),a("pagination",{ref:"page",attrs:{currentPage:e.currentPage,pageSize:e.pageSize,totalCount:e.totalCount},on:{"on-current-page-change":e.onCurrentPageChange,"on-page-size-change":e.onPageSizeChange}})],1),e._v(" "),a("el-dialog",{attrs:{title:"考场结果",visible:e.dialogResult,width:"800px"},on:{"update:visible":function(t){e.dialogResult=t}}},[a("exam-room-result",{ref:"kcj",attrs:{Id:e.Id},on:{"check-seating-table":e.checkSeatingTable}}),e._v(" "),a("el-dialog",{attrs:{width:"1000px",title:"座次表",visible:e.dialogSeatingTable,"append-to-body":""},on:{"update:visible":function(t){e.dialogSeatingTable=t}}},[a("exam-room-seating-table",{ref:"zcb",attrs:{seatId:e.seatId}})],1)],1)],1)},staticRenderFns:[]},g=a("VU/8")(b,m,!1,null,null,null);t.default=g.exports}});
//# sourceMappingURL=19.6f3aeef49627e741a869.js.map