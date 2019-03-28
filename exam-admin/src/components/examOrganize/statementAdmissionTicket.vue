<template>
  <div>
    <div class="top-form" style="border-bottom:none;margin-bottom: 0px;">
      <el-form :model="queryForm" ref="queryForm" label-width="120px" label-position="right">
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="考试批次：" prop="b1">
             <label>江苏开放大学20186月考试</label>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="考点名称：" prop="b2">
             <el-select v-model="queryForm.c4">
                <el-option label="请选择" value=""></el-option>
                <el-option v-for="item in optionArry" :key="item.id" :label="item.label" :value="item.id"></el-option>
             </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="学习批次：" prop="b2">
             <el-select v-model="queryForm.c4">
                <el-option label="请选择" value=""></el-option>
                <el-option v-for="item in optionArry" :key="item.id" :label="item.label" :value="item.id"></el-option>
             </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="层次：" prop="b2">
             <el-select v-model="queryForm.c4">
                <el-option label="请选择" value=""></el-option>
                <el-option v-for="item in optionArry" :key="item.id" :label="item.label" :value="item.id"></el-option>
             </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="学校类型：" prop="b2">
             <el-select v-model="queryForm.c4">
                <el-option label="请选择" value=""></el-option>
                <el-option v-for="item in optionArry" :key="item.id" :label="item.label" :value="item.id"></el-option>
             </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="学生来源：" prop="b2">
             <el-select v-model="queryForm.c4">
                <el-option label="请选择" value=""></el-option>
                <el-option v-for="item in optionArry" :key="item.id" :label="item.label" :value="item.id"></el-option>
             </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="学号：" prop="b2">
             <el-input v-model="queryForm.c4"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="姓名：" prop="b2">
             <el-input v-model="queryForm.c4"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="专业：" prop="b2">
             <el-select v-model="queryForm.c4" filterable>
                <el-option label="请选择" value=""></el-option>
                <el-option v-for="item in optionArry" :key="item.id" :label="item.label" :value="item.id"></el-option>
             </el-select>
          </el-form-item>
        </el-col>
       </el-form>
      <div class="text-right-b10">
        <el-button type="primary" plain @click="batchPrint">批量打印</el-button>
        <el-button type="primary" plain @click="check">查询</el-button>
      </div>
    </div>
    <div class="content-table" style="margin-top:10px;">
      <el-table :data="tableData" style="width: 100%" border @selection-change="onSelectionChange">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="a1" label="学号"></el-table-column>
        <el-table-column prop="a2" label="姓名"></el-table-column>
        <el-table-column prop="a3" label="性别"></el-table-column>
        <el-table-column prop="a4" label="身份证号"></el-table-column>
        <el-table-column prop="a5" label="教学点"></el-table-column>
        <el-table-column prop="a6" label="所属考点"></el-table-column>
        <el-table-column prop="a6" label="学习批次"></el-table-column>
        <el-table-column prop="a6" label="层次"></el-table-column>
        <el-table-column prop="a6" label="学生类型"></el-table-column>
        <el-table-column prop="a6" label="学生来源"></el-table-column>
        <el-table-column prop="a6" label="专业"></el-table-column>
        <el-table-column label="操作" width="80">
          <template slot-scope="scope" prop="a8">
           <el-button type="primary" plain @click="print(2)" class="el-table-btn">打印</el-button>
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
      optionArry: [
        { id: 1, value: "江开1", lable: "1" },
        { id: 2, value: "江开2", lable: "2" },
        { id: 3, value: "江开3", lable: "3" }
      ]
    };
  },
  methods: {
    check() {
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
    batchPrint() {
      // 批量打印
    },
    print() {
      // 单个打印
    },
    // 批量打印复选框选择
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
