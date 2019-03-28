<template>
  <div>
    <div class="top-form">
      <el-form :model="queryForm" ref="queryForm" label-width="120px" label-position="right">
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="课程代码：" prop="b1">
             <el-input v-model="queryForm.b1"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="课程名称：" prop="b2">
             <el-input v-model="queryForm.b1"></el-input>
          </el-form-item>
        </el-col>
       </el-form>
      <div class="text-right-b10">
        <el-button type="primary" plain @click="checkCourse">查询</el-button>
      </div>
    </div>
    <div class="content-table">
      <div class="text-right-b10">
        <el-button type="primary" plain @click="save">保存</el-button>
        <el-button type="primary" plain @click="cancelCourseAdd">取消</el-button>
      </div> 
      <el-table :data="tableData" style="width: 100%" border  @selection-change="onSelectionChange">
       <el-table-column type="selection" width="55" align="center"></el-table-column>
       <el-table-column prop="a2" label="课程代码"></el-table-column>
       <el-table-column prop="a3" label="课程名称"></el-table-column>
       <el-table-column prop="a4" label="学分"></el-table-column>
       <el-table-column prop="a5" label="所属学历"></el-table-column>
       <el-table-column prop="a6" label="所属学院"></el-table-column>
       <el-table-column prop="a6" label="课程负责人"></el-table-column>
       <el-table-column prop="a6" label="手机号码"></el-table-column>
       <el-table-column prop="a6" label="策略库"></el-table-column>
       <el-table-column prop="a6" label="卷库"></el-table-column>
     </el-table>
     <!--分页组件-->
     <pagination ref="page" :currentPage="currentPage" :pageSize="pageSize" :totalCount="totalCount"
            @on-current-page-change="onCurrentPageChange" @on-page-size-change="onPageSizeChange"/>
    </div>
      <div class="line-height25">(选择已发布，且尚未添加到当前考试批次的课程)</div>
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
    // 预约考试,复选框选择
    onSelectionChange(val) {
      this.selectedRows = val;
    },
    save() {},
    cancelCourseAdd() {
      this.$emit("showCourse");
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
