<template>
    <el-dialog title="设置题型" width="600px" :visible.sync="dialogVisible" :before-close="close" @open="openFunc">
    	<el-form :model="queryForm" ref="queryForm" label-width="120px" label-position="right">
	    	<el-row>
		     	<!-- <el-col :span="8">所属基础题型：</el-col>
		     	<el-col :span="16"><el-</el-col> -->
		     	<el-form-item label="所属基础题型：" prop="basicQType">
		            <el-select v-model="queryForm.basicQType">
		              <el-option key="1" label="单选题" value="1"></el-option>
		              <el-option key="2" label="多选题" value="2"></el-option>
		              <el-option key="3" label="判断题" value="3"></el-option>
		              <el-option key="4" label="填空题" value="4"></el-option>
		              <el-option key="5" label="简答题" value="5"></el-option>
		            </el-select>
		        </el-form-item>
		        <el-form-item label="应用题型：" prop="appQType">
		            <el-input v-model="queryForm.appQType" placeholder="论述题"></el-input>
		        </el-form-item>
		        <el-form-item label="题型描述：" prop="descript">
		            <el-input type="textarea" v-model="queryForm.descript"></el-input>
		        </el-form-item>
		        <el-form-item label="状态：" prop="status">
			        <el-switch v-model="queryForm.status" active-text="启用" inactive-text="停用"></el-switch>
				</el-form-item>
		    </el-row>
		</el-form>
		<div slot="footer" class="dialog-footer">
        	<el-button @click="close">取消</el-button>
        	<el-button type="primary" plain @click="save">保存</el-button>
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
        basicQType: "",
        appQType: "",
        descript: "",
        status: 0
      }
    };
  },
  props: ["dialogVisible", "formData"],

  methods: {
    openFunc() {
      if (this.formData) {
        this.queryForm = this.formData;
      }
    },

    save() {},

    close() {
      this.$emit("closeDiolog", false);
    }
  }
};
</script>
