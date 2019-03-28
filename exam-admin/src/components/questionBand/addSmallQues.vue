<template>
    <el-dialog title="添加小题" width="250px" :visible.sync="dialogVisible" :before-close="close" @open="openFunc">
    	<el-form :model="typeCount" ref="typeCount" label-width="80px" label-position="right">
	    	<el-form-item label="单选题：" prop="radioCount">
            <el-input type="number" v-model="typeCount.radioCount" min="0" max="100" @change="scoreChange"></el-input> 道
        </el-form-item>
        <el-form-item label="多选题：" prop="checkboxCount">
            <el-input type="number" v-model="typeCount.checkboxCount" min="0" max="100" @change="scoreChange"></el-input> 道
        </el-form-item>
        <el-form-item label="判断题：" prop="panduanCount">
            <el-input type="number" v-model="typeCount.panduanCount" min="0" max="100" @change="scoreChange"></el-input> 道
        </el-form-item>
        <el-form-item label="填空题：" prop="tiankongCount">
            <el-input type="number" v-model="typeCount.tiankongCount" min="0" max="100" @change="scoreChange"></el-input> 道
        </el-form-item>
        <el-form-item label="简答题：" prop="jiandaCount">
            <el-input type="number" v-model="typeCount.jiandaCount" min="0" max="100" @change="scoreChange"></el-input> 道
        </el-form-item>
  		</el-form>
  		<div slot="footer" class="dialog-footer">
        	<el-button @click="close">取消</el-button>
        	<el-button type="primary" plain @click="save">确定</el-button>
      </div>
    </el-dialog>
</template>
<style scoped>
  .el-input{width:80px}
</style>
<script>
export default {
  data() {
    return {
      typeCount:{
        radioCount:0,
        checkboxCount:0,
        panduanCount:0,
        tiankongCount:0,
        jiandaCount:0
      }
    }
  },
  props: ["dialogVisible"],

  methods: {
    openFunc() {
      if (this.formData) {
        this.queryForm = this.formData;
      }
    },
    scoreChange(e){
      Number(e) < 0 ? e = 0 : "";
      Number(e) > 100 ? e = 100 : "";
      event.target.value = e
    },
    save() {
      this.$emit("addUnitQue", this.typeCount)
      this.typeCount = {
        radioCount:0,
        checkboxCount:0,
        panduanCount:0,
        tiankongCount:0,
        jiandaCount:0
      }
    },

    close() {
      this.typeCount = {
        radioCount:0,
        checkboxCount:0,
        panduanCount:0,
        tiankongCount:0,
        jiandaCount:0
      }
      this.$emit("closeDiolog", false);
    }
  }
};
</script>
