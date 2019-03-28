<template>
  <div>
    <div class="top-form">
      <el-form :model="queryForm" ref="queryForm" label-width="120px" label-position="right">
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="考试批次：" prop="b1">
             <el-select v-model="queryForm.c4">
                <el-option label="请选择" value=""></el-option>
                <el-option v-for="item in optionArry" :key="item.id" :label="item.label" :value="item.id"></el-option>
             </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="教学点：" prop="b2">
             <el-select v-model="queryForm.c4" filterable>
                <el-option label="请选择" value=""></el-option>
                <el-option v-for="item in optionArry" :key="item.id" :label="item.label" :value="item.id"></el-option>
             </el-select>
          </el-form-item>
        </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="考点：" prop="b2">
             <el-select v-model="queryForm.c4" filterable>
                <el-option label="请选择" value=""></el-option>
                <el-option v-for="item in optionArry" :key="item.id" :label="item.label" :value="item.id"></el-option>
             </el-select>
          </el-form-item>
        </el-col>
       </el-form>
      <div style="text-align:right; padding-bottom:10px;">
        <el-button type="primary" plain @click="checkExaminationRoom">查询</el-button>
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
      </el-form>
      <el-table :data="tableData" style="width: 100%" border>
       <el-table-column prop="a1" label="序号" width="48px"></el-table-column>
       <el-table-column prop="a2" label="考点代码"></el-table-column>
       <el-table-column prop="a3" label="考点名称"></el-table-column>
       <el-table-column prop="a4" label="教学点"></el-table-column>
       <el-table-column prop="a5" label="确认考场数"></el-table-column>
       <el-table-column prop="a6" label="预约人次"></el-table-column>
       <el-table-column label="操作" width="120">
          <template slot-scope="scope" prop="a8">
           <el-button type="primary" plain @click="checkResult(2)" class="el-table-btn">查看预约结果</el-button>
         </template>
       </el-table-column>
     </el-table>
     <!--分页组件-->
    <pagination ref="page" :currentPage="currentPage" :pageSize="pageSize" :totalCount="totalCount"
            @on-current-page-change="onCurrentPageChange" @on-page-size-change="onPageSizeChange"/>
    </div>
    <el-dialog title="考场结果" :visible.sync="dialogResult" width="800px">
    	<exam-room-result ref="kcj" @check-seating-table="checkSeatingTable" :Id="Id"></exam-room-result>
  	  <el-dialog width="1000px" title="座次表" :visible.sync="dialogSeatingTable" append-to-body>
          <exam-room-seating-table ref='zcb' :seatId="seatId"></exam-room-seating-table>
  	  </el-dialog>
  </el-dialog>
  </div>
</template>
<script>
import pagination from "@/components/pagination";
import examRoomResult from "@/components/examOrganize/examRoomResult";
import examRoomSeatingTable from "@/components/examOrganize/examRoomSeatingTable";
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
      dialogResult: false, // 考场结果
      dialogSeatingTable: false, // 座次表
      Id: "", // 编排考场Id
      seatId: "" // 座次表Id
    };
  },
  methods: {
    // 查询预约考场
    checkExaminationRoom() {
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
      this.checkExaminationRoom();
    },
    // 改变每页现实的数据条数
    onPageSizeChange(val) {
      this.pageSize = val;
      this.checkExaminationRoom();
    },
    // 查看考场编排结果结果
    checkResult(id) {
      this.dialogResult = true;
      this.Id = id;
      if (this.$refs.kcj) {
        this.$refs.kcj.checkLayoutResult();
      }
    },
    // 查看座次表
    checkSeatingTable(id) {
      this.dialogSeatingTable = true;
      this.seatId = id;
      if (this.$refs.zcb) {
        this.$ref.zcb.checkSeatingTable();
      }
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
    pagination,
    examRoomResult,
    examRoomSeatingTable
  }
};
</script>
