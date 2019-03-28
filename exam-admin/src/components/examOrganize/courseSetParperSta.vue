<template>
  <div>
    <el-table :data="tableData" style="width: 100%" border>
       <el-table-column prop="a2" label="策略名称"></el-table-column>
       <el-table-column prop="a3" label="大题总数"></el-table-column>
       <el-table-column prop="a3" label="试题总数"></el-table-column>
       <el-table-column prop="a4" label="客观题"></el-table-column>
       <el-table-column prop="a5" label="主观题"></el-table-column>
       <el-table-column label="操作" width="120">
         <template slot-scope="scope" prop="a8">
           <el-button type="danger" plain  @click="cancelStrategy(1)" class="el-table-btn" v-if="scope.row.a8===1" >取消</el-button>
           <el-button type="primary" plain  @click="choiceStrategy(1)" class="el-table-btn" v-if="scope.row.a8!==1" >选择</el-button>
         </template>
       </el-table-column>
     </el-table>
     <!--分页组件-->
     <pagination ref="page" :currentPage="currentPage" :pageSize="pageSize" :totalCount="totalCount"
            @on-current-page-change="onCurrentPageChange" @on-page-size-change="onPageSizeChange"/>
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
      },
      optionArry: [
        { id: 1, value: "江开1", lable: "1" },
        { id: 2, value: "江开2", lable: "2" },
        { id: 3, value: "江开3", lable: "3" }
      ],
      dialogVisible: false, // 弹出框显示和隐藏
      dialogCkeck: false, // 查看用户信息弹出框
      newAndEditor: "", // 1代表新增 2编辑提交
      selectedRows: []
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
    choiceStrategy() {},
    cancalStrategy() {}
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
<style scoped>
.line-height25 {
  margin-top: 5px;
  color: #999;
  font-size: 13px;
}
.course-footer {
  overflow: hidden;
  text-align: center;
  margin-top: 85px;
}
</style>
