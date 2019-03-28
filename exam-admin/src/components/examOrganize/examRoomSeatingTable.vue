<template>
  <div>
    <div class="top-form">
      <el-form :model="queryForm" ref="queryForm" label-width="150px" label-position="right">
        <el-col :span="10">
          <el-form-item label="考生号：" prop="b2">
            <el-input v-model="queryForm.b1"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="姓名：" prop="b2">
             <el-input v-model="queryForm.b1"></el-input>
          </el-form-item>
        </el-col>
       </el-form>
      <div class="text-right-b10">
        <el-button type="primary" plain @click="checkSeatingTable">查询</el-button>
      </div>
    </div>
    <div class="content-table">
      <el-form :model="queryForm" ref="queryForm" label-width="150px" label-position="right">
        <el-col :span="8">
          <el-form-item label="考点：" prop="b1">
           <label>2019秋季期末考试</label>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="考场：" prop="b2">
             <label>2020.01.10</label>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="开考时间" prop="b2">
             <label>2020.01.10~2020.01.14</label>
          </el-form-item>
        </el-col>
      </el-form>
      <el-table :data="tableData" style="width: 100%" border>
       <el-table-column prop="a1" label="做座位号" width="70px"></el-table-column>
       <el-table-column prop="a2" label="课程代码"></el-table-column>
       <el-table-column prop="a3" label="课程名称"></el-table-column>
       <el-table-column prop="a4" label="考试时长" width="70px"></el-table-column>
       <el-table-column prop="a5" label="考生号"></el-table-column>
       <el-table-column prop="a6" label="姓名"></el-table-column>
       <el-table-column prop="a2" label="考生所属教学点" width="120px"></el-table-column>
       <el-table-column prop="a3" label="考生所属考点" width="120px"></el-table-column>
       <el-table-column prop="a4" label="学习批次"></el-table-column>
       <el-table-column prop="a5" label="层次"></el-table-column>
       <el-table-column prop="a6" label="专业"></el-table-column>       
     </el-table>
     <!--分页组件-->
    <pagination ref="page" :currentPage="currentPage" :pageSize="pageSize" :totalCount="totalCount"
            @on-current-page-change="onCurrentPageChange" @on-page-size-change="onPageSizeChange"/>
    </div>
  </div>
</template>
<script>
import pagination from "@/components/pagination";
import { apiGet, apiPost } from "@/common/api";
export default {
  data() {
    return {
      tableData: [
        {
          a1: "19",
          a2: "林丽",
          a3: "吉林省 ",
          a4: "120 ",
          a5: "1997",
          a6: "林丽",
          a7: 1,
          a8: 1
        },
        {
          a1: "19",
          a2: "林丽",
          a3: "吉林省 辽源",
          a4: "120",
          a5: "1997",
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
      // 查询数据的表单
      queryForm: {
        b1: "",
        b2: "",
        b3: "全部"
      }
    };
  },
  methods: {
    checkSeatingTable() {
      const page = Object.assign({}, this.queryForm);
      page.page = this.currentPage;
      page.limit = this.pageSize;
      // var url='/sys/login'
      // apiPost(url,page).then(response => {
      //   this.$router.push({ path: '/basisManage/sponsor' })
      //   setCookie('token',response.token,1)
      //   resolve(response)
      // }).catch(error => {
      //   this.loading = false
      //   console.log(error)
      // })
    },
    // 分页，改变第几页
    onCurrentPageChange(val) {
      this.currentPage = val;
      this.checkSeatingTable();
    },
    // 改变每页现实的数据条数
    onPageSizeChange(val) {
      this.pageSize = val;
      this.checkSeatingTable();
    }
  },
  // 组件引用
  components: {
    pagination
  },
  props: ["seatId"],
  created() {
    this.checkSeatingTable(); // 获取列表中的数据
  }
};
</script>
