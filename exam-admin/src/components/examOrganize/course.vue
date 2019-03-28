<template>
  <div>
    <div class="top-form">
      <el-form :model="queryForm" ref="queryForm" label-width="120px" label-position="right">
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="考试批次：" prop="b1">
             <el-select v-model="queryForm.c4">
                <el-option label="请选择" value=""></el-option>
                <el-option v-for="item in optionArry" :key="item.id" :label="item.label" :value="item.id*1"></el-option>
             </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="考试课程：" prop="b2">
             <el-select v-model="queryForm.c4" filterable>
                <el-option label="请选择" value=""></el-option>
                <el-option v-for="item in optionArry" :key="item.id" :label="item.label" :value="item.id*1"></el-option>
             </el-select>
          </el-form-item>
        </el-col>
       </el-form>
      <div style="text-align:right; padding-bottom:10px;">
        <el-button type="primary" plain @click="checkCourse">查询</el-button>
        <el-button type="primary" plain @click="addCourse">添加课程</el-button>
        <el-button type="success" plain @click="exportData">导出</el-button>
      </div>
    </div>
    <div class="content-table">
      <el-form :model="queryForm" ref="queryForm" label-width="120px" label-position="right">
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="考试批次：" prop="b1">
           <label>2019秋季期末考试</label>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="考试时间：" prop="b2">
             <label>2020.01.10~2020.01.14</label>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="考试模式：" prop="b2">
             <label>预约考试</label>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="场次数：" prop="b2">
             <label>共 20场</label>
          </el-form-item>
        </el-col>
      </el-form>
      <el-table :data="tableData" style="width: 100%" border>
       <el-table-column prop="a1" label="序号"></el-table-column>
       <el-table-column prop="a2" label="课程代码"></el-table-column>
       <el-table-column prop="a3" label="课程名称"></el-table-column>
       <el-table-column prop="a4" label="学分"></el-table-column>
       <el-table-column prop="a5" label="所属学历"></el-table-column>
       <el-table-column prop="a6" label="课程负责人"></el-table-column>
       <el-table-column prop="a6" label="手机号"></el-table-column>
       <el-table-column prop="a6" label="策略"></el-table-column>
       <el-table-column prop="a6" label="正考试卷套数"></el-table-column>
       <el-table-column prop="a6" label="备用卷"></el-table-column>
       <el-table-column label="操作" width="140">
          <template slot-scope="scope" prop="a8">
           <el-button type="primary" plain @click="setParper(2)" class="el-table-btn">设置试卷/策略</el-button>
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
      // 省市区选择框
      provinceName: "",
      cityName: "",
      areaName: "",
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
      newAndEditor: "" // 1代表新增 2编辑提交
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
    // 导出数据
    exportData() {
      this.$confirm("确定要导出文件吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          window.location =
            "https://codeload.github.com/douban/douban-client/legacy.zip/master";
        })
        .catch(() => {});
    },
    addCourse() {
      // 添加课程
      this.$emit("main-page", 1);
    },
    setParper() {
      // 添加课程
      this.$emit("main-page", 2);
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
