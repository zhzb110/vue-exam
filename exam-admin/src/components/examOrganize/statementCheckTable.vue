<template>
  <div>
    <div class="text-right-b10">
        <el-button type="primary" plain @click="batchDowload">批量下载</el-button>
      </div>
    <div class="content-table" style="margin-top:10px;">
      <el-table :data="tableData" style="width: 100%" border @selection-change="onSelectionChange">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="a1" label="考点代码"></el-table-column>
        <el-table-column prop="a2" label="考点名称"></el-table-column>
        <el-table-column prop="a3" label="教学点"></el-table-column>
        <el-table-column label="操作" width="140">
          <template slot-scope="scope" prop="a8">
           <el-button type="primary" plain @click="preview()" class="el-table-btn">预览</el-button>
          <el-button type="primary" plain @click="download()" class="el-table-btn">下载</el-button>
         </template>
        </el-table-column>
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
      currentPage: 1, // 当前页
      pageSize: 10, // 每页条数
      totalCount: 40, // 总共多少条数据
      selectedRows: [], // 复选框已经选择的行
      queryForm: {
        // 查询数据的表单
        b1: "",
        b2: "",
        b3: "全部"
      },
      // 弹出窗内的数据
      dialogForm: {
        c1: "",
        c2: "",
        c3: "",
        c4: "男",
        c5: "",
        c6: "",
        c7: true
      }
    };
  },
  methods: {
    checkCourse() {
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
    // 预览考场签到表
    preview() {},
    // 下载考场签到表
    download() {},
    // 批量下载
    batchDowload() {},
    // 批量下载复选框选择
    onSelectionChange(val) {
      this.selectedRows = val;
    }
  },
  created() {
    // 进入页面加载相关内容,html未加载完成前
  },
  mounted() {
    // 进入页面加载相关内容,html已经渲染完成
  },
  // 组件引用
  components: {
    pagination
  }
};
</script>
