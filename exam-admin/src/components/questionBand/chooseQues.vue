<template>
    <el-dialog title="选择试题" :visible.sync="dialogVisible" :before-close="close" @open="openFunc">
    	<el-form :model="queryForm" ref="queryForm" label-width="120px" label-position="right">
	    	<el-row>
		     	<!-- <el-col :span="8">所属基础题型：</el-col>
		     	<el-col :span="16"><el-</el-col> -->
          <el-col :xs="24" :sm="12" :md="8">
		     	  <el-form-item label="分类：" prop="category">
		            <el-select v-model="queryForm.category">
		              <el-option key="0" label="全部" value=""></el-option>
		              <el-option v-for="item in sourceData.categoryList" :key="item.id" :label="item.name" :value="item.id"></el-option>
		            </el-select>
		        </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8">
		        <el-form-item label="试题难度：" prop="level">
		            <el-select v-model="queryForm.level">
                  <el-option key="0" label="全部" value=""></el-option>
                  <el-option v-for="item in sourceData.levelList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
		        </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8">
		        <el-form-item label="试题状态：" prop="status">
                <el-select v-model="queryForm.status">
                  <el-option key="0" label="全部" value=""></el-option>
                  <el-option key="1" label="待审核" value="1"></el-option>
                  <el-option key="2" label="审核通过" value="2"></el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label="试题编码：" prop="code">
                <el-input v-model="queryForm.code" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label="关键词：" prop="keyWords">
                <el-input v-model="queryForm.keyWords" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" style="text-align:right">
            <el-button type="primary" plain>查询</el-button>
          </el-col>
		    </el-row>
		  </el-form>
      <el-table :data="sourceData.tableData" style="width: 100%" border >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="category" label="分类" ></el-table-column>
          <el-table-column prop="code" label="试题编码" ></el-table-column>
          <el-table-column prop="queTitle" label="题干" width="200"></el-table-column>
          <el-table-column prop="level" label="难度"></el-table-column>
          <el-table-column prop="status" label="试题状态"></el-table-column>
          <el-table-column prop="checkStatus" label="审核状态"></el-table-column>
          <el-table-column prop="creater" label="创建人"></el-table-column>
          <el-table-column prop="createTime" label="创建时间"></el-table-column>
      </el-table>
		  <div slot="footer" class="dialog-footer">
        	<el-button @click="close">取消</el-button>
        	<el-button type="primary" plain @click="insert">插入</el-button>
      </div>
    </el-dialog>
</template>
<style scoped>
.el-switch {
  position: relative;
  top: -1px;
}
</style>
<script>
export default {
  data() {
    return {
      queryForm: {
        category: "",
        level: "",
        code: "",
        status: "",
        keyWords: ""
      },

      sourceData:{
        categoryList:[
          {id:"001",name:"第一单元"},
          {id:"002",name:"第二单元"},
          {id:"003",name:"第三单元"}
        ],
        levelList:[
          {id:"1",name:"简单"},
          {id:"2",name:"一般"},
          {id:"3",name:"困难"}
        ],

        tableData:[{
          category:"第一单元",
          code:"00121",
          queTitle:"--Have a cup of tea, ________ ? -- Thanks a lot.  ",
          level:"一般",
          status:"",
          checkStatus:"-",
          creater:"--",
          createTime:"--"
        },{
          category:"第一单元",
          code:"00121",
          queTitle:"--Have a cup of tea, ________ ? -- Thanks a lot.  ",
          level:"一般",
          status:"",
          checkStatus:"-",
          creater:"--",
          createTime:"--"
        }]
      }
    }
  },
  props: ["dialogVisible", "formData"],

  methods: {
    openFunc() {
      if (this.formData) {
        this.queryForm = this.formData;
      }
    },

    insert() {},

    close() {
      this.$emit("closeDiolog", false);
    }
  }
};
</script>
