<template>
  <el-dialog title='确认考场' :visible.sync="dialogPlace" width="700px">
    <div class="content-table">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column prop="a1" label="序号" width="48px"></el-table-column>
        <el-table-column prop="a2" label="考场"></el-table-column>
        <el-table-column prop="a3" label="机位数"></el-table-column>
        <el-table-column prop="a4" label="确认状态"></el-table-column>
        <el-table-column label="操作" width="80">
          <template slot-scope="scope" prop="a8">
            <el-button type="primary" plain v-if="scope.row.a8===1" @click="cancalExam()" class="el-table-btn">取消</el-button>
            <el-button type="primary" plain v-else class="el-table-btn" @click="confirmExam()">确认</el-button>
          </template>
        </el-table-column>
      </el-table>
       <!--分页组件--->
      <pagination ref="page" :currentPage="currentPage" :pageSize="pageSize" :totalCount="totalCount"
            @on-current-page-change="onCurrentPageChange" @on-page-size-change="onPageSizeChange"/>
    </div>
  </el-dialog>
</template>
<script>
import pagination from "@/components/pagination";
export default {
  data() {
    return {
      queryForm: {
        b1: "",
        b2: "",
        b3: "全部"
      },
      tableData: [
        {
          a1: "19",
          a2: "林丽",
          a3: "吉林省 ",
          a4: "吉林省 ",
          a5: "1997-11-11",
          a6: "林丽",
          a7: 1,
          a8: 1
        },
        {
          a1: "19",
          a2: "林丽",
          a3: "吉林省 辽源",
          a4: "吉林省 辽源",
          a5: "1997-11-11",
          a6: "林丽",
          a7: 0,
          a8: 0
        }
      ],
      // 复选框已经选择的行
      selectedRows: [],
      // 当前页
      currentPage: 1,
      // 每页条数
      pageSize: 10,
      // 总共多少条数据
      totalCount: 40,
      dialogPlace: false
    };
  },
  methods: {
    // 查询预约考场
    confirmExaminationRoom() {
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
      this.$message("显示第" + val + "页的数据");
    },
    // 改变每页现实的数据条数
    onPageSizeChange(val) {
      this.$message("该页显示" + val + "条数据");
    },
    // 取消考场
    cancalExam() {},
    // 确认考场
    confirmExam() {},
    examinationRoomDialog() {
      this.dialogPlace = true;
    }
  },
  // 组件引用
  components: {
    pagination
  }
};
</script>
<style scoped>
</style>
