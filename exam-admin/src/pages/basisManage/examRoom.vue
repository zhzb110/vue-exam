<template>
  <div>
    <div class="top-form">
      <el-form :model="queryForm" ref="queryForm" label-width="120px" label-position="right">
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="教学点：" prop="b1">
            <el-select v-model="queryForm.b3" filterable>
              <el-option label="全部" value="全部"></el-option>
              <el-option v-for="item in optionArry" :key="item.id" :label="item.label" :value="item.value"></el-option>
           </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="考点：" prop="b2">
            <el-select v-model="queryForm.b3" filterable>
              <el-option label="全部" value="全部"></el-option>
              <el-option v-for="item in optionArry" :key="item.id" :label="item.label" :value="item.value"></el-option>
           </el-select>
          </el-form-item>
        </el-col> 
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="考场：" prop="b2">
            <el-select v-model="queryForm.b3" filterable>
              <el-option label="全部" value="全部"></el-option>
              <el-option v-for="item in optionArry" :key="item.id" :label="item.label" :value="item.value"></el-option>
           </el-select>
          </el-form-item>
        </el-col>        
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="考场状态：" prop="b4">
            <el-select v-model="queryForm.b3">
              <el-option label="全部" value="全部"></el-option>
              <el-option label="启用" value="启用"></el-option>
              <el-option label="停用" value="停用"></el-option>
           </el-select>
          </el-form-item>
        </el-col>
       </el-form>
      <div style="text-align:right; padding-bottom:10px;">
        <el-button type="primary" plain @click="checkExam">查询</el-button>
        <el-button type="primary" plain @click="newExam">新增</el-button>
        <el-button type="success" plain @click="exportData">导出</el-button>
      </div>
    </div>
    <div class="content-table">
     <el-table :data="tableData" style="width: 100%" border>
       <el-table-column prop="a1" label="序号"></el-table-column>
       <el-table-column prop="a2" label="考场编码"></el-table-column>
       <el-table-column prop="a3" label="考场名称"></el-table-column>
       <el-table-column prop="a4" label="机器数量"></el-table-column>
       <el-table-column prop="a5" label="所属考点"></el-table-column>
       <el-table-column prop="a6" label="地址"></el-table-column>
       <el-table-column prop="a7" label="考场详细地址"></el-table-column>
       <el-table-column prop="a7" label="状态">
          <template slot-scope="scope">
            <div v-if="scope.row.a7 === 1">启用</div><div v-if="scope.row.a7 === 0">停止</div>
          </template>
       </el-table-column>
       <el-table-column label="操作" width="190">
         <template slot-scope="scope" prop="a8">
          <el-button type="primary" plain @click="checkInformation()" class="el-table-btn">查看</el-button>
           <el-button type="primary" plain @click="edtiorExam()" class="el-table-btn">编辑</el-button>
           <el-button type="danger" plain @click="deletebottom" class="el-table-btn" v-if="scope.row.a8===1">删除</el-button>
           <el-button type="danger" plain @click="deletebottom" class="el-table-btn" v-else disabled>删除</el-button>
          </template>
       </el-table-column>
     </el-table>
     <!--分页组件-->
    <pagination ref="page" :currentPage="currentPage" :pageSize="pageSize" :totalCount="totalCount"
            @on-current-page-change="onCurrentPageChange" @on-page-size-change="onPageSizeChange"/>
    </div>
    <!--编辑弹出框和新增-->
    <el-dialog :title='newAndEditor == 1 ? "新增考场" : "编辑考场"' :visible.sync="dialogVisible" width="600px">
      <el-form :model="dialogForm" ref="dialogForm" label-width="150px" label-position="right">
        <el-row type="flex">
          <el-col :span="21">
            <el-form-item label="所属考点：" prop="c1"  :rules="[{ required: true, message: '请输入院系代码', trigger: 'blur' }]">
              <el-input v-model="dialogForm.c1"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
	        <el-col :span="24">
		        <el-form-item label="考点地址："><!---->
		         <v-distpicker  @province="selectProvince" :province="provinceName" :city="cityName" :area="areaName" @city="selectCity" @area="selectArea"></v-distpicker>
		        </el-form-item>
	       </el-col> 
        </el-row>          
        <el-row type="flex">
	        <el-col :span="21">
            <el-form-item label="" >
              <el-input v-model="dialogForm.c3" placeholder="请输入详细街道或门牌号"></el-input>
            </el-form-item>
	        </el-col> 
        </el-row>    
        <el-row type="flex">
	        <el-col :span="21">
	        <el-form-item label="考场编码：" prop="c2"  :rules="[{ required: true, message: '请输入考场编码', trigger: 'blur' }]">
	          <el-input v-model="dialogForm.c2"></el-input>
	        </el-form-item>
	       </el-col> 
        </el-row>  
        <el-row type="flex">
	        <el-col :span="21">
            <el-form-item label="考场名称：" prop="c4"  :rules="[{ required: true, message: '请输入考场名称', trigger: 'blur' }]">
              <el-input v-model="dialogForm.c4"></el-input>
            </el-form-item>
	        </el-col> 
        </el-row>    
        <el-row type="flex">
		      <el-col :span="10">
	        <el-form-item label="机器数量：" prop="c5" :rules="[{ required: true, message: '请输入机器数量', trigger: 'blur' }]">
	          <el-input v-model="dialogForm.c5" type='number'></el-input>
	        </el-form-item>
		     </el-col> 
  		   <el-col :span="5">
  		  	<label class="heigth32">台</label>
  		   </el-col> 
        </el-row> 
        <el-row type="flex">
          <el-col :span="21">
           <el-form-item label="数据来源："><label>江开教务平台</label></el-form-item>
          </el-col> 
        </el-row>
        <el-row type="flex">     
          <el-col :span="24">
            <el-form-item label="状态：" prop="c7" :rules="[{ required: true, message: '请选择状态', trigger: 'blur' }]" class="margin-b0">
               <el-switch v-model='dialogForm.c7'  active-text="启用" inactive-text="停用"> </el-switch>
            </el-form-item>
          </el-col>
       </el-row>
       </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save">保 存</el-button><el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
      <!--查看考场信息-->
     <el-dialog title="看看考场" :visible.sync="dialogCkeck" width="600px">
      <el-form :model="dialogForm" ref="dialogForm" label-width="150px" label-position="right">
        <el-row type="flex">
          <el-col :span="21">
            <el-form-item label="所属教学点：" prop="c1" class="margin-b5"><label>12</label></el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="24">
            <el-form-item label="考点代码：" class="margin-b5"><label>12</label></el-form-item>
          </el-col> 
        </el-row>            
        <el-row type="flex">
          <el-col :span="24">
            <el-form-item label="考点名称：" prop="c2" class="margin-b5"><label>12</label></el-form-item>
          </el-col> 
        </el-row>  
        <el-row type="flex">
          <el-col :span="24">
            <el-form-item label="地址：" prop="c4" class="margin-b5"><label>12</label></el-form-item>
          </el-col> 
        </el-row>    
        <el-row type="flex">
          <el-col :span="10">
            <el-form-item label="联系人：" prop="c5" class="margin-b5"><label>12</label>台</el-form-item>
          </el-col> 
        </el-row> 
        <el-row type="flex">
          <el-col :span="24">
           <el-form-item label="联系电话：" class="margin-b5"><label>江开教务平台</label></el-form-item>
          </el-col> 
        </el-row>
        <el-row type="flex">
          <el-col :span="24">
           <el-form-item label="数据来源：" class="margin-b5"><label>江开教务平台</label></el-form-item>
          </el-col> 
        </el-row>
         <el-row type="flex">    
          <el-col :span="24">
            <el-form-item label="状态：" prop="c7" >启用</el-form-item>
          </el-col>
        </el-row>
       </el-form>
    </el-dialog>
  </div>
</template>
<script>
import pagination from "@/components/pagination";
import vDistpicker from "v-distpicker";
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
      optionArry: [
        { id: 1, value: "江开1", lable: "1" },
        { id: 2, value: "江开2", lable: "2" },
        { id: 3, value: "江开3", lable: "3" }
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
        b3: ""
      },
      // 弹出窗内的数据
      dialogForm: {
        c1: "",
        c2: "",
        c3: "",
        c4: "",
        c5: "",
        c6: "",
        c7: true
      },
      dialogVisible: false, // 弹出框显示和隐藏
      dialogCkeck: false, // 查看考场信息
      newAndEditor: "" // 1代表新增 2编辑提交
    };
  },
  methods: {
    pageContent() {
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
    // 每次选择复选宽的回调数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 分页，改变第几页
    onCurrentPageChange(val) {
      this.$message("显示第" + val + "页的数据");
    },
    // 改变每页现实的数据条数
    onPageSizeChange(val) {
      this.$message("该页显示" + val + "条数据");
    },
    // 表格中删除
    deletebottom() {
      this.$message("删除该条信息");
    },
    // 表格中编辑
    edtiorExam() {
      // 每次打开数据清空
      this.dialogVisible = true;
      if (this.newAndEditor !== "") {
        this.$refs["dialogForm"].resetFields();
        this.provinceName = "";
        this.cityName = "";
        this.areaName = "";
      }
      this.newAndEditor = "2";
    },
    // 新增
    newExam() {
      // 每次打开数据清空
      this.dialogVisible = true;
      if (this.newAndEditor !== "") {
        this.$refs["dialogForm"].resetFields();
        this.provinceName = "";
        this.cityName = "";
        this.areaName = "";
      }
      this.newAndEditor = "1";
    },
    // 新增和编辑时保存
    save() {
      this.$refs["dialogForm"].validate(valid => {
        if (valid) {
          if (this.newAndEditor === "1") {
            // 新增提交
            this.$message("新增提交");
            // var url='/sys/login'
            // apiPost(url,page).then(response => {
            //   this.$router.push({ path: '/basisManage/sponsor' })
            //   setCookie('token',response.token,1)
            //   resolve(response)
            // }).catch(error => {
            //   this.loading = false
            //   console.log(error)
            // })
          } else {
            // 编辑提交
            this.$message("编辑提交");
            // var url='/sys/login'
            // apiPost(url,page).then(response => {
            //   this.$router.push({ path: '/basisManage/sponsor' })
            //   setCookie('token',response.token,1)
            //   resolve(response)
            // }).catch(error => {
            //   this.loading = false
            //   console.log(error)
            // })
          }
          this.dialogVisible = false;
        }
      });
    },
    // 查询表格的内容
    checkExam() {},
    // 查看考场信息
    checkInformation() {
      this.dialogCkeck = true;
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
    // 所选省
    selectProvince(value) {
      this.provinceName = value.value;
    },
    // 所选市
    selectCity(value) {
      this.cityName = value.value;
    },
    // 所选区
    selectArea(value) {
      this.areaName = value.value;
    }
  },
  created() {
    // 进入页面加载相关内容,html未加载完成前
  },
  mounted() {
    // 进入页面加载相关内容,html已经渲染完成
    this.pageContent();
  },
  // 组件引用
  components: {
    pagination,
    vDistpicker
  }
};
</script>
<style  scoped>
.heigth32 {
  height: 32px;
  line-height: 32px;
  width: 30px;
  text-align: center;
  display: inline-block;
}
</style>
