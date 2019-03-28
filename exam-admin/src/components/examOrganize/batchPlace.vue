<template>
  <el-dialog title='设置场次' :visible.sync="dialogPlace" width="800px">
  	<!--预约考试--->
   	<div v-if='placeType'>
   	  <el-form :model="queryForm" ref="queryForm" label-width="120px" label-position="right">
        <el-col :span="8">
          <el-form-item label="考试批次：" class="margin-b10"><span>2019秋季期末考试</span></el-form-item>
        </el-col>   
        <el-col :span="8">
          <el-form-item label="最晚进入考场：" class="margin-b10"><span>2018-07-09 09:00:00</span></el-form-item>
        </el-col>
         <el-col :span="8">
          <el-form-item label="最早交卷：" class="margin-b10"><span>2018-07-09 09:00:00</span></el-form-item>
        </el-col> 
      </el-form>
      <div class="text-right-b10">
         <el-button type="primary" plain @click="addPlace">添加场次</el-button>
         <el-button type="danger" plain @click="deletePlace">删除</el-button>
         <el-button type="primary" plain @click="dialogPlace = false">取消</el-button> 
      </div>
      <div class="content-table">
        <el-table :data="tableData" style="width: 100%" border  @selection-change="onSelectionChange">
         <el-table-column type="selection" width="55" align="center"></el-table-column>
  		   <el-table-column prop="a1" label="场次编号"></el-table-column>
  		   <el-table-column prop="a2" label="开考时间"></el-table-column>
  		   <el-table-column prop="a3" label="是否为备用场次"></el-table-column>
  		   <el-table-column prop="a4" label="进入考试密码"></el-table-column>
  		   <el-table-column prop="a5" label="交卷密码"></el-table-column>
  		   <el-table-column label="操作" width="160">
  		     <template slot-scope="scope" prop="a8">
  		       <el-button type="primary" plain @click="edtiorPlace()" class="el-table-btn">编辑</el-button>
  		       <el-button type="danger" plain v-if="scope.row.a8===1" @click="setUp()" class="el-table-btn" >设为备用</el-button>
  		       <el-button type="danger" plain v-else class="el-table-btn" @click="cancelSetUp()" disabled>取消备用</el-button>
  		     </template>
		     </el-table-column>
		   </el-table>
       <!--分页组件--->
       <pagination ref="page" :currentPage="currentPage" :pageSize="pageSize" :totalCount="totalCount"
            @on-current-page-change="onCurrentPageChange" @on-page-size-change="onPageSizeChange"/>
     </div>
   </div>
   	<!--随到随考---->
   <div v-else style="margin-top: -30px;">
   	  <el-form :model="queryForm" ref="queryForm" label-width="120px" label-position="right">
        <el-col :span="8">
          <el-form-item label="考试批次："><span>2019秋季期末考试</span></el-form-item>
        </el-col>   
      </el-form>
     <div class="content-table">
	    <el-table :data="tableData" style="width: 100%" border>
	       <el-table-column prop="a1" label="场次编号"></el-table-column>
	       <el-table-column prop="a2" label="开考时间"></el-table-column>
	       <el-table-column prop="a4" label="进入考试密码"></el-table-column>
	       <el-table-column prop="a5" label="交卷密码"></el-table-column>
	       <el-table-column label="操作" width="160">
	         <template slot-scope="scope" prop="a8">
	           <el-button type="primary" plain @click="edtiorPlaceAntTime()" class="el-table-btn">编辑</el-button>
	         </template>
	       </el-table-column>
	    </el-table>
	     <!--分页组件--->
	    <pagination ref="page" :currentPage="currentPage" :pageSize="pageSize" :totalCount="totalCount"
	            @on-current-page-change="onCurrentPageChange" @on-page-size-change="onPageSizeChange"/>
	  </div>
   </div>
   	<!---预约考试添加场次---->
   	<el-dialog title='添加场次' :visible.sync="dialogAddPlace" width="600px" append-to-body>
   	   <el-form :model="queryForm" ref="queryForm" label-width="120px" label-position="right">
   		 <el-row type="flex">
  		  <el-col :span="21">
  		    <el-form-item label="开考时间：" prop="b2" class="margin-b10">
  		     <div class="margin-b10"><el-time-picker v-model="queryForm.b1" value-format="HH:mm" format="HH:mm"></el-time-picker><span class="color-3a time-delete">删除</span></div>
  		     <div><el-time-picker v-model="queryForm.b1" value-format="HH:mm" format="HH:mm"></el-time-picker><span class="color-3a time-delete">删除</span></div>
  		     <div class="time-add"><span class="color-3a">添加开考时间</span></div>
  		    </el-form-item>
  		  </el-col>
        </el-row>
        <el-row type="flex">
  		  <el-col :span="21">
  		    <el-form-item label="考试日期：" class="margin-b10">
  		      <div>将会为以下日期批量生成上述场次</div>
  		      <el-checkbox-group v-model="queryForm.b1">
				<el-checkbox label="2020.1.10" class="width100"></el-checkbox>
				<el-checkbox label="2020.1.10" class="width100"></el-checkbox>
				<el-checkbox label="2020.1.10" class="width100"></el-checkbox>
				<el-checkbox label="2020.1.10" class="width100"></el-checkbox>
			  </el-checkbox-group>
  		    </el-form-item>
  		  </el-col>
        </el-row>
         <el-row type="flex">
  		  <el-col :span="21">
  		    <el-form-item label="自动生成密码：" class="margin-b10">
  		      <el-checkbox-group v-model="queryForm.b1">
				<el-checkbox label="交卷密码"></el-checkbox>
				<el-checkbox label="进入考试密码"></el-checkbox>
			  </el-checkbox-group>
  		      <div class="font-size12 color-999 line-height15">勾选后，自动生成四位数字密码，考生输入正确的密码才能进入考试或交卷。</div>
  		    </el-form-item>
  		  </el-col>
        </el-row>
   	  </el-form>
   	  <div class="text-right-b10">
        <el-button type="primary" plain @click="saveEditorPlace">保存</el-button>
        <el-button type="primary" plain @click="dialogAddPlace = false">取消</el-button>
      </div>
   	</el-dialog>
   	<!---预约考试编辑场次---->
   	<el-dialog title='编辑场次' :visible.sync="dialogEditorPlace" width="600px" append-to-body>
   	  <el-form :model="queryForm" ref="queryForm" label-width="120px" label-position="right">
   		 <el-row type="flex">
  		  <el-col :span="21">
  		    <el-form-item label="开考时间：" prop="b2">
  		      <el-date-picker v-model="queryForm.b2" type="datetime"></el-date-picker>
  		    </el-form-item>
  		  </el-col>
        </el-row>
        <el-row type="flex">
  		  <el-col :span="21">
  		    <el-form-item label="进入考试密码：">
  		      <el-input v-model="queryForm.b1"></el-input>
  		      <div class="font-size12 color-999 line-height15">设置后，学生录入正确的密码才能进入考试</div>
  		    </el-form-item>
  		  </el-col>
        </el-row>
         <el-row type="flex">
  		  <el-col :span="21">
  		    <el-form-item label="交卷密码：">
  		      <el-input v-model="queryForm.b1"></el-input>
  		      <div class="font-size12 color-999 line-height15">设置后，学生录入正确的密码才能交卷</div>
  		    </el-form-item>
  		  </el-col>
        </el-row>
   	  </el-form>
   	  <div class="text-right-b10">
        <el-button type="primary" plain @click="saveEditorPlace(1)">保存</el-button>
        <el-button type="primary" plain @click="dialogEditorPlace = false">取消</el-button>
      </div>
   	</el-dialog>
   	<!---随到随考编辑场次---->
   	<el-dialog title='编辑场次' :visible.sync="dialogEditorAnyTime" width="600px" append-to-body>
   	  <el-form :model="queryForm" ref="queryForm" label-width="120px" label-position="right">
        <el-row type="flex">
  		  <el-col :span="21">
  		    <el-form-item label="进入考试密码：">
  		      <el-input v-model="queryForm.b1"></el-input>
  		      <div class="font-size12 color-999 line-height15">设置后，学生录入正确的密码才能进入考试</div>
  		    </el-form-item>
  		  </el-col>
        </el-row>
         <el-row type="flex">
  		  <el-col :span="21">
  		    <el-form-item label="交卷密码：">
  		      <el-input v-model="queryForm.b1"></el-input>
  		      <div class="font-size12 color-999 line-height15">设置后，学生录入正确的密码才能交卷</div>
  		    </el-form-item>
  		  </el-col>
        </el-row>
   	  </el-form>
   	  <div class="text-right-b10">
        <el-button type="primary" plain @click="saveEditorPlace(2)">保存</el-button>
        <el-button type="primary" plain @click="dialogEditorAnyTime = false">取消</el-button>
      </div>
   	</el-dialog>
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
      // 复选框已经选择的行
      selectedRows: [],
      // 当前页
      currentPage: 1,
      // 每页条数
      pageSize: 10,
      // 总共多少条数据
      totalCount: 40,
      dialogPlace: false,
      dialogAddPlace: false,
      dialogEditorPlace: false, //预约考试
      dialogEditorAnyTime: false, //随到随考
      editorId: "", // 预约考试编辑Id
      placeType: true // 预约考试true 随到随考false
    };
  },
  methods: {
    basePlace(showType) {
      this.dialogPlace = true;
      if (showType === 1) {
        this.placeType = true;
      } else {
        this.placeType = false;
      }
    },
    // 分页，改变第几页
    onCurrentPageChange(val) {
      this.$message("显示第" + val + "页的数据");
    },
    // 改变每页现实的数据条数
    onPageSizeChange(val) {
      this.$message("该页显示" + val + "条数据");
    },
    // 预约考试添加场次
    addPlace() {
      this.dialogAddPlace = true;
    },
    // 预约考试删除场次
    deletePlace() {},
    // 编辑场次
    edtiorPlace() {
      this.dialogEditorPlace = true;
    },
    // 编辑随到随考
    edtiorPlaceAntTime() {
      this.dialogEditorAnyTime = true;
    },
    // 设为备用场次
    setUp() {},
    // 取消备用场次
    cancelSetUp() {},
    // 获取预约考试列表数据
    obtainExamData() {},
    // 保存预约/随到随考考试
    saveEditorPlace(type) {
      if (type === 1) {
        // 保存预约考试
      } else {
        // 保存随到随考
      }
    },
    // 预约考试,复选框选择
    onSelectionChange(val) {
      this.selectedRows = val;
    }
  },
  // 组件引用
  components: {
    pagination
  }
};
</script>
<style scoped>
.line-height15 {
  line-height: 18px;
}
.width100 {
  width: 100%;
  margin-left: 0px !important;
}
.time-delete {
  margin-left: 30px;
  cursor: pointer;
  font-size: 12px;
}
.time-add > span {
  cursor: pointer;
  font-size: 12px;
}
.time-add {
  line-height: 20px;
  margin-top: 5px;
}
</style>
