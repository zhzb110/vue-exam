<template>
  <div>
    <div class="top-form">
      <el-form :model="queryForm" ref="queryForm" label-width="100px" label-position="right">
        <el-col :span="10">
          <el-form-item label="场次：" prop="b1">
             <el-select v-model="queryForm.c4">
                <el-option label="全部" value=""></el-option>
                <el-option v-for="item in optionArry" :key="item.id" :label="item.label" :value="item.id"></el-option>
             </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="考场：" prop="b2">
             <el-input v-model="queryForm.b1"></el-input>
          </el-form-item>
        </el-col>
       </el-form>
      <div class="text-right-b10">
        <el-button type="primary" plain @click="checkLayoutResult">查询</el-button>
      </div>
    </div>
    <div class="content-table">
      <el-form :model="queryForm" ref="queryForm" label-width="120px" label-position="right">
        <el-col :span="8">
          <el-form-item label="考试批次：" prop="b1">
           <label>2019秋季期末考试</label>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="考点：" prop="b2">
             <label>2020.01.10~2020.01.14</label>
          </el-form-item>
        </el-col>
      </el-form>
      <el-table :data="tableData" style="width: 100%" border>
       <el-table-column prop="a1" label="序号" width="48px"></el-table-column>
       <el-table-column prop="a2" label="场次"></el-table-column>
       <el-table-column prop="a3" label="考场"></el-table-column>
       <el-table-column prop="a4" label="机位数"></el-table-column>
       <el-table-column prop="a5" label="考生数"></el-table-column>
       <el-table-column prop="a6" label="剩余机位数"></el-table-column>
       <el-table-column label="座次表" width="110">
          <template slot-scope="scope" prop="a8">
           <el-button type="primary" plain @click="dialogCheckSeatingTable(2)" class="el-table-btn">查看座次表</el-button>
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
          a1: "19",
          a2: "林丽",
          a3: "吉林省 ",
          a4: "吉林省 ",
          a5: "19",
          a6: "林丽",
          a7: 1,
          a8: 1
        },
        {
          a1: "19",
          a2: "林丽",
          a3: "吉林省 辽源",
          a4: "吉林省 辽源",
          a5: "19",
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
      optionArry: [
        { id: 1, value: "江开1", lable: "1" },
        { id: 2, value: "江开2", lable: "2" },
        { id: 3, value: "江开3", lable: "3" }
      ],
      dialogVisible: false, // 弹出框显示和隐藏
      dialogCkeck: false, // 查看用户信息弹出框
      newAndEditor: "" // 1代表新增 2编辑提交
    };
  },
  methods: {
    checkLayoutResult() {
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
    onCurrentPageChange(val) {
      this.currentPage = val;
      this.checkLayoutResult();
    },
    // 改变每页现实的数据条数
    onPageSizeChange(val) {
      this.pageSize = val;
      this.checkLayoutResult();
    },
    dialogCheckSeatingTable(Id) {
      // 查看座次表
      this.$emit("check-seating-table", Id);
    }
  },
  // 组件引用
  components: {
    pagination
  },
  props: ["Id"],
  created() {
    this.checkLayoutResult(); // 获取列表中的数据
  }
};
</script>
