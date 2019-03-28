<template>
  	<div>
  		<div class="courseTitle">
  			{{courseName}} <span>{{strategyInfo.paperName}}</span>
  		</div>
  		<div class="contain">
  			<div class="paper">
  				<ul v-if="queryFormList.length > 0">
  					<li v-for="(item, index) in queryFormList" :key="item.id">
  						<div>
  							{{index+1}}. {{item.name}} （共{{item.count}}题，{{item.score}}分）&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  							<el-checkbox v-model="item.quesRandom" disabled /> 试题乱序
							<el-checkbox v-model="item.optionRandom" disabled /> 选项乱序 
  						</div>

	  					<div class="strategyData">
	  						<p>本部分包含{{item.count}}道题，答错不给分。</p>
	  						<el-table :data="item.tableData">
	  							<el-table-column prop="name" label="分类"></el-table-column>
							    <el-table-column label="各难度题目数量">
							        <el-table-column prop="name" label="1">
							      		<template slot-scope="scope">
								          	{{scope.row.newNum}} / {{scope.row.new}}
								        </template>
							        </el-table-column>
							        <el-table-column prop="name" label="2">
							        	<template slot-scope="scope">
								          	{{scope.row.easyNum}} / {{scope.row.easy}}
								        </template>
							        </el-table-column>
							        <el-table-column prop="name" label="3">
							        	<template slot-scope="scope">
								          	{{scope.row.normalNum}} / {{scope.row.normal}}
								        </template>
							        </el-table-column>
							        <el-table-column prop="name" label="4">
							        	<template slot-scope="scope">
								          	{{scope.row.hardNum}} / {{scope.row.hard}}
								        </template>
							        </el-table-column>
							        <el-table-column prop="name" label="5">
							        	<template slot-scope="scope">
								          	{{scope.row.difficultNum}} / {{scope.row.difficult}}
								        </template>
							        </el-table-column>
							    </el-table-column>
							</el-table>
	  					</div>
  					</li>
  				</ul>
  			</div>
  		</div>

		<dl class="details">
			<dt><el-button plain type="primary" size="medium" style="width:100%" @click="showQueTypeList=true">修改</el-button></dt>
			<dd>
				卷面总分
				<p><b>100</b> 分</p>
			</dd>
			<dd>
				考试时长
				<p><b>90</b> 分钟</p>
			</dd>
			<dd>
				<p><b>3</b> 道大题</p>
				<p><b>21</b> 道小题</p>
			</dd>
		</dl>


  		<!--题型列表弹出框-->
	    <el-dialog title="请选择策略类型" width="500px" :visible="showQueTypeList">
	    	<ul class="strategyList">
	    		<li v-for="item in queTypesList" :key="item.id" @click="createStrategy(item.id)" >{{item.name}}</li>
	    	</ul>
	    </el-dialog>
  	</div>
</template>
<style scoped>
.courseTitle span {
  color: #999;
  font-size: 16px;
}
.paper {
  width: 86%;
  float: left;
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
.details {
  width: 12%;
  float: right;
}
.details dd {
  border-radius: 4px;
  border-radius: 4px;
  background: #f8f8f8;
  line-height: 26px;
  box-shadow: 0 1px 3px #ccc;
  padding: 10px;
  margin-top: 20px;
}
.details dd b {
  font-size: 18px;
  color: #409eff;
}
</style>
<script>
import pagination from "@/components/pagination";
export default {
  data() {
    return {
      // 当前页
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
          name: "单选题",
          score: 20,
          count: 2
        },
        { name: "多选题", score: "20", count: "2" },
        { name: "填空题", score: "20", count: "2" }
      ],

      queryFormList: [
        {
          id: "001",
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
              normalNum: 1,
              hard: 8,
              hardNum: 0,
              difficult: 5,
              difficultNum: 1
            }
          ]
        },
        {
          id: "002",
          name: "多选题",
          type: 1,
          score: "30",
          count: "1",
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
        { id: "5", name: "简答题题" }
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
    pagination
  }
};
</script>
