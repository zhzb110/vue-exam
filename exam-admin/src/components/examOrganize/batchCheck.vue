<template>
  <el-dialog title='设置考场' :visible.sync="dialogCheck" width="800px">
 	<div class="ms-login-title" >
      <span :class="{'border-bg-e5':!typeShow,'border-bg-3a':typeShow}" @click="typeShowClick(1)">考试批次信息</span>
      <span :class="{'border-bg-e5':typeShow,'border-bg-3a':!typeShow}" @click="typeShowClick(2)">考试安排</span>     
    </div>
    <el-form :model="dialogForm" v-show="typeShow" ref="dialogForm" label-width="180px" label-position="right">
        <el-row type="flex">
  		  <el-col :span="21">
  		    <el-form-item label="考试批次：" prop="c1" class="margin-b5"><label>12</label></el-form-item>
  		  </el-col>
        </el-row>
         <el-row type="flex">
  		  <el-col :span="21">
  		    <el-form-item label="主办方：" prop="c3" class="margin-b5"><label>12</label></el-form-item>
  		  </el-col>
        </el-row>
         <el-row type="flex">
  		  <el-col :span="21">
  		    <el-form-item label="考生预约场次数：" prop="c6" class="margin-b5"><label>12</label></el-form-item>
  		  </el-col>
        </el-row>
         <el-row type="flex">
  		  <el-col :span="21">
  		    <el-form-item label="考试时间：" prop="c5" class="margin-b5"><label>12</label></el-form-item>
  		  </el-col>
        </el-row>
        <el-row type="flex">
  		  <el-col :span="21">
  		    <el-form-item label="最晚进入考场：" prop="c1" class="margin-b5"><label>12</label></el-form-item>
  		  </el-col>
        </el-row>
        <el-row type="flex">
	  	  <el-col :span="24">
	  		 <el-form-item label="最早交卷：" prop="c1" class="margin-b5"><label>12</label></el-form-item>
	  	  </el-col>
        </el-row>
         <el-row type="flex">
  		  <el-col :span="21">
  		    <el-form-item label="考试须知：" class="margin-b5"><label>12</label></el-form-item>
  		  </el-col>
        </el-row>
         <el-row type="flex">
  		  <el-col :span="21">
  		    <el-form-item label="备注：" prop="c1" class="margin-b5"><label>12</label></el-form-item>
  		  </el-col>
        </el-row>
         <el-row type="flex">
  		  <el-col :span="21">
  		    <el-form-item label="状态：" prop="c1" class="margin-b5"> <label>12</label></el-form-item>
  		  </el-col>
        </el-row>
      </el-form>
    <div v-show="!typeShow">
      <el-form :model="dialogForm" ref="queryForm" label-width="120px" label-position="right">
    	<el-row type="flex">
	      <el-col :span="10">
	         <el-form-item label="场次：" prop="c1"><el-input v-model="dialogForm.c1"></el-input></el-form-item>
	      </el-col>
	      <el-col :span="10">
	         <el-form-item label="考试课程：" prop="c2"><el-input v-model="dialogForm.c2"></el-input></el-form-item>
	      </el-col> 
        </el-row>       
        <el-col :span="10">
          <el-form-item label="策略/试卷：" prop="c3">
            <el-select v-model="dialogForm.c3">
              <el-option label="全部" value="全部"></el-option>
              <el-option label="启用" value="启用"></el-option>
              <el-option label="停用" value="停用"></el-option>
           </el-select>
          </el-form-item>
        </el-col>
      </el-form>
      <div class="text-right-b10">
        <el-button type="primary" plain @click="checkExam()">查询</el-button>
      </div>
      <div class="content-table">
     <el-table :data="tableData" style="width: 100%" border>
       <el-table-column prop="a1" label="序号"></el-table-column>
       <el-table-column prop="a2" label="场次编号"></el-table-column>
       <el-table-column prop="a3" label="开考时间"></el-table-column>
       <el-table-column prop="a4" label="课程代码"></el-table-column>
       <el-table-column prop="a5" label="课程名称"></el-table-column>
       <el-table-column prop="a6" label="是否为备用场次"></el-table-column>
       <el-table-column prop="a6" label="策略/试卷"></el-table-column>
     </el-table>
     <!--分页组件-->
    <pagination ref="page" :currentPage="currentPage" :pageSize="pageSize" :totalCount="totalCount"
            @on-current-page-change="onCurrentPageChange" @on-page-size-change="onPageSizeChange"/>
    </div>
    </div>
  </el-dialog>
</template>
<script>
import pagination from "@/components/pagination";
export default {
  data() {
    return {
      dialogForm: {
        c1: "",
        c2: "",
        c3: "1",
        c4: "",
        c5: "",
        c6: "1",
        c7: true
      },
      optionArry: [
        { id: 1, value: "江开1", lable: "1" },
        { id: 2, value: "江开2", lable: "2" },
        { id: 3, value: "江开3", lable: "3" }
      ],
      tableData: [
        {
          a1: "1997-11-11",
          a2: "林丽",
          a3: "吉林省 ",
          a4: "吉林省 ",
          a5: "1997-11-11",
          a6: "林丽",
          a7: 1,
          a8: 1
        },
        {
          a1: "1997-11-11",
          a2: "林丽",
          a3: "吉林省 辽源",
          a4: "吉林省 辽源",
          a5: "1997-11-11",
          a6: "林丽",
          a7: 0,
          a8: 0
        }
      ],
      // 当前页
      currentPage: 1,
      // 每页条数
      pageSize: 10,
      // 总共多少条数据
      totalCount: 40,
      typeShow: true,
      dialogCheck: false
    };
  },
  methods: {
    typeShowClick(way) {
      if (way === 1) {
        this.typeShow = true;
      } else {
        this.typeShow = false;
      }
    },
    // 分页，改变第几页
    onCurrentPageChange(val) {
      this.$message("显示第" + val + "页的数据");
    },
    // 改变每页现实的数据条数
    onPageSizeChange(val) {
      this.$message("该页显示" + val + "条数据");
    },
    // 查询场次的信息
    checkExam() {},
    // 获取考试批次信息基本信息
    baseInformation() {
      this.dialogCheck = true;
    }
  },
  // 组件引用
  components: {
    pagination
  }
};
</script>
<style scoped>
.ms-login-title {
  overflow: hidden;
  margin: -15px -20px 10px;
}
.ms-login-title > span {
  width: 50%;
  float: left;
  height: 40px;
  line-height: 40px;
  text-align: center;
  margin-bottom: 10px;
  cursor: pointer;
}
.border-bg-3a {
  background: #ecf5ff;
  color: #409eff;
}
.border-bg-e5 {
  background: #f3f3f5;
  color: #b6b6b7;
}
</style>
