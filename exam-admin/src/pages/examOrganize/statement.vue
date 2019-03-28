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
      </el-form>
      <div class="text-right-b10">
        <el-button type="primary" plain @click="checkExaminationPoint">查询</el-button>
      </div>
    </div>
     <div class="ms-login-title margin-t5">
      <span @click="typeShowClick(1)" class="color1">考场情况汇总表</span>
      <span @click="typeShowClick(2)" class="color2">考场情况一览表</span>
      <span @click="typeShowClick(3)" class="color3">考场签到表</span>
      <span @click="typeShowClick(4)" class="color4">打印准考证</span>
      <span @click="typeShowClick(5)" class="color5">巡考安排表</span>    
    </div>
    <div v-show="cardTable"><!---打印准考证组件--->
      <statement-admission-ticket></statement-admission-ticket>
    </div>
    <div v-show="checkTable"> <!---考场签到表组件--->
      <statement-check-table></statement-check-table>
    </div>
  </div>
</template>
<script>
import statementAdmissionTicket from "@/components/examOrganize/statementAdmissionTicket";
import statementCheckTable from "@/components/examOrganize/statementCheckTable";
export default {
  data() {
    return {
      typeShow: true,
      queryForm: {
        b1: "",
        b2: "",
        b3: "全部"
      },
      currentPage: 1, // 每页条数
      pageSize: 10, // 总共多少条数据
      totalCount: 40,
      cardTable: false, // 打印准考证显示
      checkTable: true, // 考场签到表显示
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
    checkExaminationPoint() {},
    typeShowClick(way) {
      $(".color" + way).css({ background: "#ecf5ff", color: "#409EFF" });
      $(".color" + way)
        .siblings()
        .css({ background: "#f3f3f5", color: "#b6b6b7" });
      if (way === 3) {
        // 考场签到表显示
        this.cardTable = false;
        this.checkTable = true;
      } else if (way === 4) {
        // 打印准考证显示
        this.checkTable = false;
        this.cardTable = true;
      } else {
        this.cardTable = false;
        this.checkTable = false;
        const { href } = this.$router.resolve({
          path: "/printing?way=" + way
        });
        window.open(href, "_blank");
      }
    }
  },
  // 引用组件
  components: {
    statementAdmissionTicket,
    statementCheckTable
  },
  mounted() {
    this.typeShowClick(3);
  }
};
</script>
<style scoped>
.ms-login-title {
  overflow: hidden;
  margin: -5px 0px 10px;
}
.ms-login-title > span {
  width: 20%;
  float: left;
  height: 40px;
  line-height: 40px;
  text-align: center;
  margin-bottom: 10px;
  cursor: pointer;
  background: #f3f3f5;
  color: #b6b6b7;
}
.border-bg-3a {
  background: #ecf5ff;
  color: #409eff;
}
</style>
