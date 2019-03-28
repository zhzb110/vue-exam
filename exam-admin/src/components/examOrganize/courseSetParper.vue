<template>
  <div>
    <div class="overflow-a">
      <el-form :model="queryForm" ref="queryForm" label-width="120px" label-position="right">
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="课程代码：" prop="b1">
            <label>kk001</label>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="课程名称：" prop="b2">
              <label>kk001</label>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="考试时长：" prop="b2">
              <label>kk001</label>
          </el-form-item>
        </el-col>
      </el-form>
    </div>
    <div class="ms-login-title">
      <span :class="{'border-bg-e5':!typeShow,'border-bg-3a':typeShow}" @click="typeShowClick(1)">添加试题</span>
      <span :class="{'border-bg-e5':typeShow,'border-bg-3a':!typeShow}" @click="typeShowClick(2)">添加策略</span>     
    </div>
    <div v-if="typeShow">
       <div class="content-table">
          <div class="text-right-b10">
            <label class="text-title">卷库剩余试卷： 审核通过 6 套，待审核 5套</label>
             <el-button type="primary" plain @click="batchSetParper()">批量设置试卷</el-button>
            <el-button type="primary" plain @click="save">保存</el-button>
            <el-button type="primary" plain @click="cancelSetParper">取消</el-button>
          </div> 
          <el-table :data="tableData" style="width: 100%" border  @selection-change="onSelectionChange">
           <el-table-column type="selection" width="55" align="center"></el-table-column>
           <el-table-column prop="a2" label="场次编号"></el-table-column>
           <el-table-column prop="a3" label="开考时间"></el-table-column>
           <el-table-column prop="a4" label="是否为备用场次"></el-table-column>
           <el-table-column prop="a5" label="是否有试卷"></el-table-column>
            <el-table-column label="操作" width="120">
             <template slot-scope="scope" prop="a8">
               <el-button type="primary" plain  @click="removeParper(1)" class="el-table-btn" >移除试卷</el-button>
             </template>
           </el-table-column>
         </el-table>
         <!--分页组件-->
         <pagination ref="page" :currentPage="currentPage" :pageSize="pageSize" :totalCount="totalCount"
                @on-current-page-change="onCurrentPageChange" @on-page-size-change="onPageSizeChange"/>
      </div>
    </div>
    <div  v-if="!typeShow">
       <div class="content-table">
          <div class="text-right-b10">
            <label class="text-title">策略库： 2 个，审核通过试题：13,423 道</label>
            <el-button type="primary" plain @click="save">保存</el-button>
            <el-button type="primary" plain @click="cancelSetParper">取消</el-button>
          </div> 
          <course-set-parper-sta></course-set-parper-sta>
      </div>
    </div>
    <!--选择试卷-->
    <el-dialog title='选择试卷' :visible.sync="dialogSetParper" width="800px">
      <el-table :data="tableData1" style="width: 100%" border  @selection-change="onSelectionChange">
           <el-table-column type="selection" width="55" align="center"></el-table-column>
           <el-table-column prop="a2" label="场次编号"></el-table-column>
           <el-table-column prop="a3" label="开考时间"></el-table-column>
           <el-table-column prop="a4" label="是否为备用场次"></el-table-column>
           <el-table-column prop="a5" label="是否有试卷"></el-table-column>
            <el-table-column label="操作" width="100">
             <template slot-scope="scope" prop="a8">
               <el-button type="primary" plain  @click="browseParper(1)" class="el-table-btn" >浏览</el-button>
             </template>
           </el-table-column>
         </el-table>
         <!--分页组件-->
         <pagination ref="page" :currentPage="currentPage" :pageSize="pageSize" :totalCount="totalCount"
                @on-current-page-change="onCurrentPageChange" @on-page-size-change="onPageSizeChange"/>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save">保 存</el-button><el-button @click="dialogSetParper = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import pagination from "@/components/pagination";
import courseSetParperSta from "@/components/examOrganize/courseSetParperSta";
export default {
  data() {
    return {
      typeShow: true,
      queryForm: {
        b1: "",
        b2: "",
        b3: "全部"
      },
      currentPage: 1,
      // 每页条数
      pageSize: 10,
      // 总共多少条数据
      totalCount: 40,
      dialogSetParper: false,
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
      tableData1: [
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
      ]
    };
  },
  methods: {
    check() {
      this.$emit("preview-parper");
    },
    // 分页，改变第几页
    onCurrentPageChange(val) {
      this.$message("显示第" + val + "页的数据");
    },
    // 改变每页现实的数据条数
    onPageSizeChange(val) {
      this.$message("该页显示" + val + "条数据");
    },
    // 试卷与策略替换
    typeShowClick(way) {
      if (way === 1) {
        this.typeShow = true;
      } else {
        this.typeShow = false;
      }
    },
    cancelSetParper() {
      this.$emit("showCourse");
    },
    // 复选框选择
    onSelectionChange(val) {
      this.selectedRows = val;
    },
    save() {},
    // 批量设置试卷
    batchSetParper() {
      this.dialogSetParper = true;
    },
    // 浏览试卷
    browseParper() {
      //this.dialogSetParper = false
      $(".v-modal").css("position", "relative");
      this.$emit("preview-parper");
    },
    // 移除试卷
    removeParper() {}
  },
  // 组件引用
  components: {
    pagination,
    courseSetParperSta
  }
};
</script>
<style  scoped>
.ms-login-title {
  overflow: hidden;
  margin: -5px 0px 10px;
}
.ms-login-title > span {
  width: 50%;
  float: left;
  height: 40px;
  line-height: 40px;
  text-align: center;
  margin-bottom: 10px;
  cursor: pointer;
}
.border-bg-3a {
  background: #ecf5ff;
  color: #409eff;
}
.border-bg-e5 {
  background: #f3f3f5;
  color: #b6b6b7;
}
.overflow-a {
  overflow: auto;
}
.text-title {
  float: left;
  color: #606266;
}
</style>
