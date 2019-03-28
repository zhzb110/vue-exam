<template>
  	<div>
  		<div class="top-form">
	  		<el-form :model="queryForm" label-width="120px" label-position="right">
		  		<el-col :xs="24" :sm="12" :md="8">
			        <el-form-item label="所属学院：" prop="eduSchool">
			            <el-select v-model="queryForm.eduSchool">
			                <el-option key="0" label="全部" value="0"></el-option>
			                <el-option v-for="item in eduSchools" :key="item.schoolId" :label="item.name" :value="item.schoolId"></el-option>
			            </el-select>
			        </el-form-item>
		        </el-col>
		        <el-col :xs="24" :sm="12" :md="8">
			        <el-form-item label="课程：" prop="courseId">
			            <el-select v-model="queryForm.courseId">
			              	<el-option key="0" label="全部" value="0"></el-option>
			              	<el-option v-for="item in courses" :key="item.courseId" :label="item.courseName" :value="item.courseId"></el-option>
			            </el-select>
			        </el-form-item>
		        </el-col>
		        <el-col :xs="24" :sm="12" :md="8">
			        <el-form-item label="使用批次：" prop="times">
			            <el-select v-model="queryForm.times">
			              	<el-option key="0" label="全部" value="0"></el-option>
			              	<el-option v-for="item in timesList" :key="item.id" :label="item.name" :value="item.id"></el-option>
			            </el-select>
			        </el-form-item>
		        </el-col>
		        <el-col :xs="24" :sm="12" :md="8">
			        <el-form-item label="课程：" prop="courseId">
			            <el-select v-model="queryForm.courseId">
			              	<el-option key="0" label="请输入课程名称/代码查询" value="0"></el-option>
			              	<el-option v-for="item in courses" :key="item.courseId" :label="item.courseName" :value="item.courseId"></el-option>
			            </el-select>
			        </el-form-item>
		        </el-col>
		        <div class="formBtns">
		        	<el-button type="primary" plain @click="createStrategy" >新增</el-button>
		        	<el-button type="primary" plain>查询</el-button>
		        	<el-button type="success" plain>导出</el-button>
		        </div>
		    </el-form>
		</div>
	    <el-table :data="tableData" style="width: 100%;margin-top:10px" border >
	        <el-table-column prop="No" width="50" label="序号" ></el-table-column>
	        <el-table-column prop="courseCode" label="课程代码"  ></el-table-column>
	        <el-table-column prop="courseName" label="课程名称"></el-table-column>
	        <el-table-column prop="examTime" label="考试时长"></el-table-column>
	        <el-table-column prop="strategyName" label="策略名称"></el-table-column>
	        <el-table-column prop="totalScore" label="总分"></el-table-column>
	        <el-table-column prop="quesCount" label="试题数"></el-table-column>
	        <el-table-column prop="useTimes" label="使用次数"></el-table-column>
	        <el-table-column prop="creater" label="创建人"></el-table-column>
	        <el-table-column prop="createTime" label="创建时间"></el-table-column>
	        <el-table-column label="操作" width="195">
		        <template slot-scope="scope">
		            <el-button type="primary" plain @click="browse(scope.row.courseCode)" class="el-table-btn">浏览</el-button>
		            <el-button type="primary" plain @click="editStrategy(scope.row.courseCode)" class="el-table-btn">编辑</el-button>
		            <el-button type="danger" plain @click="gotoQuesList(scope.row.courseCode)" class="el-table-btn">删除</el-button>
		        </template>
		    </el-table-column>
	    </el-table>
	    <pagination ref="page" :currentPage="currentPage" :pageSize="pageSize" :totalCount="totalCount" />
  	</div>
</template>
<style scoped>
.queList {
  padding: 0 40px;
  max-width: 1000px;
}
.queList li {
  height: 100px;
  margin-bottom: 20px;
  border: 1px solid #e5e5e5;
}
.courseImg {
  width: 100px;
  background: #e5e5e5;
  height: 100px;
  float: left;
  margin-right: 20px;
}
.courseInfo {
  float: left;
  padding-top: 15px;
  font-size: 20px;
}
.courseInfo sub {
  font-size: 16px;
  color: #999;
  position: relative;
  left: 15px;
  top: -4px;
}
.courseInfo p {
  color: #666;
  margin-top: 25px;
  font-size: 15px;
}
.courseInfo p span {
  margin-right: 60px;
}
.queList li .el-button {
  float: right;
  margin: 60px 10px 0 0;
}
</style>
<script>
import pagination from "@/components/pagination"
export default {
  data() {
    return {
      // 当前页
      currentPage: 1,
      // 每页条数
      pageSize: 10,
      // 总共多少条数据
      totalCount: 40,
      queryForm: {
        eduSchool: "",
        courseId: "",
        times: ""
      },
      tableData: [
        {
          No: "001",
          courseCode: "0123456",
          courseName: "--",
          examTime: "--",
          strategyName: "策略1",
          totalScore: 100,
          quesCount: 18,
          useTimes: 10,
          creater: "xxx",
          createTime: "2018-08-01"
        },
        {
          No: "002",
          courseCode: "0123456",
          courseName: "--",
          examTime: "--",
          strategyName: "策略1",
          totalScore: 100,
          quesCount: 18,
          useTimes: 10,
          creater: "xxx",
          createTime: "2018-08-02"
        }
      ],

      eduSchools: [
        { schoolId: "001", name: "建工学院" },
        { schoolId: "002", name: "信息学院" }
      ],

      courses: [
        {
          courseId: "001",
          courseName: "大学英语",
          level: "本科",
          waitCheck: 280,
          passed: 360,
          back: 100
        },
        {
          courseId: "002",
          courseName: "中国近代史",
          level: "本科",
          waitCheck: 280,
          passed: 360,
          back: 100
        }
      ],

      timesList: [
        { id: "001", name: "2019秋季期末考试" },
        { id: "002", name: "2019春季期末考试" }
      ]
    };
  },
  methods: {
    browse(courseId) {
      this.$router.push({ path: "preview", query: { courseId: courseId } });
    },

    createStrategy() {
      this.$router.push({ path: "baseInfo" });
    },

    editStrategy(courseId) {
      this.$router.push({
        path: "chooseQueType",
        query: { courseId: courseId }
      });
    }
  },
  // 组件引用
  components: {
    pagination
  }
};
</script>
