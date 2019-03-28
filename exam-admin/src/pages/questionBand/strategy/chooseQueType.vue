<template>
  	<div>
  		<div class="courseTitle">
  			{{courseName}}
  			<el-button plain type="primary" @click="save" >保存策略</el-button>
  		</div>
  		<div class="contain">
  			<dl>
  				<dt>{{strategyInfo.quesCount}} 道题，{{strategyInfo.totalScore}} 分</dt>
  				<dd v-for="(item, index) in questionTypeList" :key="item.id" :class="index == currentQues ? 'active' : ''" @click="currentQues=index" >
  					<div>{{item.name}}  <i class="el-icon-delete" title="删除"></i></div>
  					<p>{{item.count}}道题，{{item.score}}分  
  						<i v-if="index >= questionTypeList.length-1" class="el-icon-sort-down" :style="'color:#ccc'"></i>
  						<i v-else class="el-icon-sort-down"></i>
  						<i v-if="index <= 0" class="el-icon-sort-up" :style="'color:#ccc'"></i>
  						<i v-else class="el-icon-sort-up"></i>
  					</p>
  				</dd>
  			</dl>
  			<div class="paper">
  				<p>{{strategyInfo.paperName}}</p>
  				<ul v-if="queryFormList.length > 0">
  					<li v-for="item in queryFormList" :key="item.name">
  						<el-form :model="item" :rules="rules">
  							<div class="topRow">
                  <el-form-item  prop="name">
                    <el-input v-model="item.name" />
                  </el-form-item>
                  <el-form-item label="每题" prop="score" label-width="50px" label-position="right" style="margin:0 20px">
                    <el-input type="number" min="0" style="width:70px;text-align:center;" v-model="item.score" /> 分
                  </el-form-item>
                  <el-checkbox label="试题乱序" v-model="item.quesRandom" ></el-checkbox>
                  <el-checkbox label="选项乱序" v-model="item.optionRandom" ></el-checkbox>
                </div>
		  					<div>
		  						<p class="unswerIntro">答题说明：</p>
		  						<UE :defaultMsg="defaultMsg" :ueditorConfig="defaultConfig" ref="ue"></UE>
		  					</div>

		  					<div class="strategyData">
		  						<p>各分类、难度下题目数量 共 2 道<span> （抽题数量不能大于当前分类、难度下的总数，填写示例：5/10）</span></p>
		  						<el-table :data="item.tableData">
		  							<el-table-column prop="name" label="分类" align="center"></el-table-column>
								    <el-table-column label="各难度题目数量">
								        <el-table-column prop="name" label="1">
								      		<template slot-scope="scope">
									          	<el-input type="number" v-model="scope.row.newNum" size="mini" min="0" :max="scope.row.new" :disabled="scope.row.new <= 0" /> / {{scope.row.new}}
									        </template>
								        </el-table-column>
								        <el-table-column prop="name" label="2">
								        	<template slot-scope="scope">
									          	<el-input type="number" v-model="scope.row.easyNum" size="mini" min="0" :max="scope.row.easy" :disabled="scope.row.easy <= 0" /> / {{scope.row.easy}}
									        </template>
								        </el-table-column>
								        <el-table-column prop="name" label="3">
								        	<template slot-scope="scope">
									          	<el-input type="number" v-model="scope.row.normalNum" size="mini" min="0" :max="scope.row.normal" :disabled="scope.row.normal <= 0" /> / {{scope.row.normal}}
									        </template>
								        </el-table-column>
								        <el-table-column prop="name" label="4">
								        	<template slot-scope="scope">
									          	<el-input type="number" v-model="scope.row.hardNum" size="mini" min="0" :max="scope.row.hard" :disabled="scope.row.hard <= 0" /> / {{scope.row.hard}}
									        </template>
								        </el-table-column>
								        <el-table-column prop="name" label="5">
								        	<template slot-scope="scope">
									          	<el-input type="number" v-model="scope.row.difficultNum" min="0" size="mini" :max="scope.row.difficult" :disabled="scope.row.difficult <= 0" style="padding-right:0" /> / {{scope.row.difficult}}
									        </template>
								        </el-table-column>
								    </el-table-column>
								</el-table>
		  					</div>
	  					</el-form>
  					</li>
  				</ul>
  				<el-button plain type="primary" size="medium" @click="showQueTypeList=true">选择题型添加大题</el-button>
  			</div>
  		</div>

  		<!--题型列表弹出框-->
	    <el-dialog title="请选择策略类型" width="500px" :visible.sync="showQueTypeList">
	    	<ul class="strategyList">
	    		<li v-for="item in queTypesList" :key="item.id" @click="createStrategy(item.id)" >{{item.name}}</li>
	    	</ul>
	    </el-dialog>
  	</div>
</template>
<style scoped>
.courseTitle span {
  color: #999;
  font-size: 18px;
}
.courseTitle .el-button {
  float: right;
}
.contain dl {
  float: left;
  width: 180px;
  font-size: 16px;
}
.contain dt {
  text-align: center;
}
.contain dd {
  border-radius: 4px;
  background: #f8f8f8;
  box-shadow: 0 1px 3px #ccc;
  padding: 10px;
  margin-top: 13px;
}
.contain dd.active {
  background: #d8efff;
}
.contain dd i {
  float: right;
  color: #409eff;
  margin-top: 3px;
  cursor: pointer;
}
.contain dd p {
  margin-top: 10px;
  font-size: 14px;
  color: #666;
}
.contain dd p i {
  margin-left: 15px;
  font-size: 16px;
}
.paper {
  margin-left: 200px;
}
.paper > p {
  font-size: 18px;
  text-align: center;
  margin-bottom: 10px;
}
.strategyData {
  margin-top: 30px;
}
.strategyData p {
  line-height: 30px;
}
.strategyData p span {
  color: #999;
  font-size: 12px;
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
  padding-bottom: 30px;
}
.paper li .el-row {
  height: 60px;
}
.el-table .el-input {
  width: 60px;
}
.strategyList li {
  line-height: 50px;
  background: #fcfcfc;
  box-shadow: 0 1px 2px #ccc;
  text-indent: 20px;
  margin-bottom: 15px;
  border-radius: 2px;
  cursor: pointer;
}
.strategyList li:hover {
  box-shadow: 0 1px 2px inset #ccc;
  background: #f3f3f3;
}
.topRow {
  white-space: nowrap;
  height: 60px;
  line-height: 30px;
}
.el-form-item {
  white-space: nowrap;
  float: left;
}
.unswerIntro{
  font-size:16px;margin-bottom:5px
}
</style>
<script>
import pagination from "@/components/pagination";
import UE from "@/components/UEditor";
import {defaultConstant} from "@/common/util" 
export default {
  data() {
    return {
      // 当前页
      defaultMsg: "这里是UE测试",
      defaultConfig:defaultConstant.editorConfig,
      courseName: "大学英语",
      currentQues: 0,
      showQueTypeList: false,
      strategyInfo: {
        paperName: "2019秋季期末考试试卷",
        totalScore: 0,
        quesCount: 0
      },

      questionTypeList: [
        {
          id:"011",
          name: "单选题",
          score: 20,
          count: 2
        },
        { id:"012", name: "多选题", score: "20", count: "2" },
        { id:"013", name: "填空题", score: "20", count: "2" }
      ],

      queryFormList: [
        {
          name: "单选题",
          type: 1,
          score: "20",
          count: "2",
          quesRandom: true,
          optionRandom: false,
          introduction: "",
          tableData: [
            {
              name: "无分类",
              new: 0,
              newNum: 5,
              easy: 0,
              easyNum: 0,
              normal: 10,
              normalNum: 0,
              hard: 8,
              hardNum: 0,
              difficult: 5,
              difficultNum: 1
            },
            {
              name: "第一单元",
              new: 10,
              newNum: 5,
              easy: 10,
              easyNum: 0,
              normal: 10,
              normalNum: 0,
              hard: 8,
              hardNum: 0,
              difficult: 5,
              difficultNum: 1
            }
          ]
        },
        {
          name: "多选题",
          type: 1,
          score: "20",
          count: "2",
          quesRandom: false,
          optionRandom: false,
          introduction: "",
          tableData: [
            {
              name: "第一单元",
              new: 10,
              newNum: 5,
              easy: 10,
              easyNum: 0,
              normal: 10,
              normalNum: 0,
              hard: 8,
              hardNum: 0,
              difficult: 5,
              difficultNum: 1
            }
          ]
        }
      ],

      queTypesList: [
        { id: "1", name: "单选题" },
        { id: "2", name: "多选题" },
        { id: "3", name: "判断题" },
        { id: "4", name: "填空题" },
        { id: "5", name: "简答题" },
        { id: "6", name: "综合题" }
      ],

      rules: {
        name: [{ required: true, message: "请输入题型名称", trigger: "blur" }],
        score: [{ required: true, message: "请输入分数", trigger: "blur" }]
      },
      config: {
        initialFrameWidth: null,
        initialFrameHeight: 350
      }
    };
  },
  methods: {
    save() {},

    createQuestion(courseId) {
      this.$router.push({
        path: "../maintainQues/createQues",
        query: { courseId: courseId }
      });
    },

    gotoQuesList(courseId) {
      this.$router.push({ path: "quesList", query: { courseId: courseId } });
    },

    createStrategy(id) {
      this.showQueTypeList = false;
      console.log(id);
    }
  },
  // 组件引用
  components: {
    pagination, UE
  }
};
</script>
