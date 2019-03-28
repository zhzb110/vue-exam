<template>
  <div>
    <div class="top-form">
      <el-form :model="queryForm" ref="queryForm" label-width="120px" label-position="right">
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="主办方代码：" prop="b1"><el-input v-model="queryForm.b1"></el-input></el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="主办方名称：" prop="b2"><el-input v-model="queryForm.b2"></el-input></el-form-item>
        </el-col>        
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="状态：" prop="b3">
            <el-select v-model="queryForm.b3">
              <el-option label="全部" value="全部"></el-option>
              <el-option label="启用" value="启用"></el-option>
              <el-option label="停用" value="停用"></el-option>
           </el-select>
          </el-form-item>
        </el-col>
       </el-form>
      <div style="text-align:right; padding-bottom:10px;">
        <el-button type="primary" plain @click="checkSponsor">查询</el-button>
        <el-button type="primary" plain @click="newSponsor">新增</el-button>
      </div>
    </div>
    <div class="content-table">
      <el-table :data="tableData" style="width: 100%" border>
       <el-table-column prop="a1" label="序号"></el-table-column>
       <el-table-column prop="a2" label="主办方代码"></el-table-column>
       <el-table-column prop="a3" label="主办方名称"></el-table-column>
       <el-table-column prop="a4" label="地址"></el-table-column>
       <el-table-column prop="a5" label="联系人"></el-table-column>
       <el-table-column prop="a6" label="联系电话"></el-table-column>
       <el-table-column prop="a7" label="状态">
          <template slot-scope="scope"><div v-if="scope.row.a7 === 1">启用</div><div v-if="scope.row.a7 === 0">停止</div></template>
       </el-table-column>
       <el-table-column label="操作" width="140">
         <template slot-scope="scope" prop="a8">
           <el-button type="primary" plain @click="edtiorSponsor" class="el-table-btn">编辑</el-button>
           <el-button type="danger" plain v-if="scope.row.a8===1" @click="deletebottom" class="el-table-btn" >删除</el-button>
           <el-button type="danger" plain v-else @click="deletebottom" class="el-table-btn" disabled>删除</el-button>
         </template>
       </el-table-column>
     </el-table>
    <!--分页组件-->
    <pagination ref="page" :currentPage="currentPage" :pageSize="pageSize" :totalCount="totalCount"
            @on-current-page-change="onCurrentPageChange" @on-page-size-change="onPageSizeChange"/>
    </div>
    <!--编辑弹出框和新增-->
    <el-dialog :title='newAndEditor == 1 ? "新增主办方信息" : "编辑主办方信息"' :visible.sync="dialogVisible" width="600px">
      <el-form :model="dialogForm" ref="dialogForm" label-width="150px" label-position="right">
      	<el-row type="flex">
  		    <el-col :span="21">
  		      <el-form-item label="主办方代码：" prop="c1"  :rules="[{ required: true, message: '请输入主办方代码', trigger: 'blur' }]">
  		        <el-input v-model="dialogForm.c1"></el-input>
  		      </el-form-item>
  		    </el-col>
        </el-row>
        <el-row type="flex">
  		    <el-col :span="21">
  		      <el-form-item label="主办方名称：" prop="c2"  :rules="[{ required: true, message: '请输入主办方名称', trigger: 'blur' }]">
  		        <el-input v-model="dialogForm.c2"></el-input>
  		      </el-form-item>
          </el-col> 
        </el-row>    
        <el-row type="flex">
  		     <el-col :span="24">
  		      <el-form-item label="地址："><!---->
  		        <v-distpicker  @province="selectProvince" :province="provinceName" :city="cityName" :area="areaName" @city="selectCity" @area="selectArea"></v-distpicker>
  		      </el-form-item>
           </el-col> 
        </el-row>  
         <el-row type="flex">
		       <el-col :span="21">
            <el-form-item label="" prop="c3">
              <el-input v-model="dialogForm.c3"  placeholder="请输入详细街道或门牌号"></el-input>
            </el-form-item>
          </el-col> 
        </el-row>    
        <el-row type="flex">
		      <el-col :span="21">
		        <el-form-item label="联系人：" prop="c5"><el-input v-model="dialogForm.c5"></el-input></el-form-item>
         </el-col> 
        </el-row> 
        <el-row type="flex">
  		     <el-col :span="21">
  		      <el-form-item label="联系电话：" prop="c6"><el-input v-model="dialogForm.c6"></el-input></el-form-item>
           </el-col> 
        </el-row>
        <el-row type="flex">     
          <el-col :span="24">
            <el-form-item label="状态：" prop="c7"  :rules="[{ required: true, message: '请选择状态', trigger: 'blur' }]" class="margin-b0">
            <el-switch v-model='dialogForm.c7'  active-text="启用" inactive-text="停用"> </el-switch>
            </el-form-item>
          </el-col>
       </el-row>
       </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save">保 存</el-button><el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import pagination from "@/components/pagination";
import vDistpicker from "v-distpicker";
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
        c4: "",
        c5: "",
        c6: "",
        c7: true
      },
      dialogVisible: false, // 弹出框显示和隐藏
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
      // }).catch(error => {
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
    // 表格中删除
    deletebottom() {
      this.$message("删除该条信息");
    },
    // 表格中编辑
    edtiorSponsor() {
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
    newSponsor() {
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
    checkSponsor() {},
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
</style>
