<template>
  <div>
    <div class="top-form">
      <el-form :model="queryForm" ref="queryForm" label-width="120px" label-position="right">
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="考试批次：" prop="b1">
            <el-select v-model="queryForm.b3" filterable>
              <el-option label="请选择" value="请选择"></el-option>
              <el-option v-for="item in optionArry" :key="item.id" :label="item.label" :value="item.value"></el-option>
           </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="教学点：" prop="b2">
            <el-select v-model="queryForm.b3" filterable>
              <el-option label="全部" value="全部"></el-option>
              <el-option v-for="item in optionArry" :key="item.id" :label="item.label" :value="item.value"></el-option>
           </el-select>
          </el-form-item>
        </el-col>        
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="考点：" prop="b3">
            <el-select v-model="queryForm.b3">
              <el-option label="全部" value="全部"></el-option>
              <el-option label="启用" value="启用"></el-option>
              <el-option label="停用" value="停用"></el-option>
           </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="考试状态确认：" prop="b3">
            <el-select v-model="queryForm.b3">
              <el-option label="全部" value="全部"></el-option>
              <el-option label="启用" value="启用"></el-option>
              <el-option label="停用" value="停用"></el-option>
           </el-select>
          </el-form-item>
        </el-col>
      </el-form>
      <div class="text-right-b10">
        <el-button type="primary" plain @click="checkExaminationPoint">查询</el-button>
        <el-button type="success" plain @click="exportData">导出</el-button>
      </div>
    </div>
    <el-form :model="queryForm" ref="queryForm" label-width="100px" label-position="right">
      <el-col :xs="12" :sm="8" :md="8" :lg="6">
         <el-form-item label="考试批次：" prop="b1"><label>2019秋季期末考试</label></el-form-item>
       </el-col>
       <el-col :xs="12" :sm="8" :md="8" :lg="6">
         <el-form-item label="考试时间：" prop="b1"><label>2020.01.10~2020.01.14</label></el-form-item>
       </el-col>
       <el-col :xs="12" :sm="8" :md="8" :lg="4">
         <el-form-item label="场次：" prop="b1"><label>共 20场</label></el-form-item>
       </el-col>
       <el-col :xs="12" :sm="8" :md="8" :lg="4">
         <el-form-item label="课程：" prop="b1"><label>共 5门</label></el-form-item>
       </el-col>
       <el-col :xs="12" :sm="8" :md="8" :lg="4">
         <el-button type="primary" plain @click="checkInformation">查看考试详情</el-button>
       </el-col>
    </el-form>
    <div class="content-table">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column prop="a2" label="序号"></el-table-column>
        <el-table-column prop="a3" label="考试批次"></el-table-column>
        <el-table-column prop="a4" label="教学点代码"></el-table-column>
        <el-table-column prop="a5" label="考点代码"></el-table-column>
        <el-table-column prop="a5" label="考点名称"></el-table-column>
        <el-table-column prop="a5" label="考场"></el-table-column>
        <el-table-column prop="a5" label="机位数"></el-table-column>
        <el-table-column prop="a5" label="确认状态"></el-table-column>
        <el-table-column label="操作" width="80">
         <template slot-scope="scope" prop="a8">
           <el-button type="primary" plain  @click="confirmExaminationRoom(1)" class="el-table-btn" v-if="scope.row.a8===1">取消</el-button>
           <el-button type="primary" plain  @click="confirmExaminationRoom(1)" class="el-table-btn" v-if="scope.row.a8!==1">确认</el-button>
         </template>
        </el-table-column>
      </el-table>
       <!--分页组件-->
      <pagination ref="page" :currentPage="currentPage" :pageSize="pageSize" :totalCount="totalCount"
              @on-current-page-change="onCurrentPageChange" @on-page-size-change="onPageSizeChange"/>
    </div>
    <batch-check ref="bc"></batch-check>
  </div>
</template>
<script>
import pagination from "@/components/pagination";
import batchCheck from "@/components/examOrganize/batchCheck";
export default {
  data() {
    return {
      typeShow: true,
      queryForm: {
        b1: "",
        b2: "",
        b3: "全部"
      },
      currentPage: 1,
      // 每页条数
      pageSize: 10,
      // 总共多少条数据
      totalCount: 40,
      dialogSetParper: false,
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
      optionArry: [
        { id: 1, value: "江开1", lable: "1" },
        { id: 2, value: "江开2", lable: "2" },
        { id: 3, value: "江开3", lable: "3" }
      ]
    };
  },
  methods: {
    check() {
      this.$emit("preview-parper");
    },
    // 分页，改变第几页
    onCurrentPageChange(val) {
      this.$message("显示第" + val + "页的数据");
    },
    // 改变每页现实的数据条数
    onPageSizeChange(val) {
      this.$message("该页显示" + val + "条数据");
    },
    // 试卷与策略替换
    typeShowClick(way) {
      if (way === 1) {
        this.typeShow = true;
      } else {
        this.typeShow = false;
      }
    },
    // 查询考点
    checkExaminationPoint() {},
    // 导出数据
    exportData() {},
    // 确认考场
    confirmExaminationRoom() {},
    // 查询考场批次
    checkInformation() {
      this.$refs.bc.baseInformation();
    }
  },
  // 组件引用
  components: {
    pagination,
    batchCheck
  }
};
</script>
<style  scoped>
.ms-login-title {
  overflow: hidden;
  margin: -5px 0px 10px;
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
.text-title {
  float: left;
  color: #606266;
}
</style>
