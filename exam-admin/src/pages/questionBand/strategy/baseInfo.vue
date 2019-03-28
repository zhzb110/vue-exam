<template>
  	<div>
  		<div class="createform">
	  		<el-form :model="createForm" :rules="rules" ref="createForm" label-width="120px" label-position="right">
		  		<el-form-item label="课程：" prop="courseId">
		            <el-select v-model="createForm.courseId">
		                <el-option key="0" label="请选择" value=""></el-option>
		                <el-option v-for="item in baseInfo.courses" :key="item.courseId" :label="item.courseName" :value="item.courseId"></el-option>
		            </el-select>
		        </el-form-item>
		        <el-form-item label="考试时长：">
		        	<el-input v-model="createForm.examTime" :disabled="true" />
		        </el-form-item>
		        <el-form-item label="策略名称：" prop="strategyName">
		        	<el-input v-model="createForm.strategyName" ></el-input>
		        </el-form-item>
		        <el-form-item><el-button plain type="primary" size="medium" @click="next" >下一步</el-button></el-form-item>
		    </el-form>
		</div>
  	</div>
</template>
<style scoped>
.createform {
  margin: 50px auto;
  width: 500px;
}
.createform .el-form-item {
  margin-bottom: 25px;
}
.el-button {
  width: 200px;
}
</style>
<script>
import pagination from "@/components/pagination";
export default {
  data() {
    return {
      createForm: {
        strategyName: "",
        courseId: "",
        examTime: "90"
      },

      baseInfo: {
        courses: [
          {
            courseId: "001",
            courseName: "大学英语",
            level: "本科",
            waitCheck: 280,
            passed: 360,
            back: 100
          },
          {
            courseId: "002",
            courseName: "中国近代史",
            level: "本科",
            waitCheck: 280,
            passed: 360,
            back: 100
          }
        ],
        examTime: 90
      },
      rules: {
        strategyName: [
          { required: true, message: "请输入策略名称", trigger: "blur" }
        ],
        courseId: [{ required: true, message: "请选择课程", trigger: "change" }]
      }
    };
  },
  methods: {
    next() {
      this.$refs.createForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$router.push({ path: "chooseQueType" });
          // var url='/sys/login'
          // apiPost(url,this.ruleForm).then(response => {
          //   this.$router.push({ path: '/basisManage/sponsor' })
          //   setCookie('token',response.token,1)
          //   resolve(response)
          // }).catch(error => {
          //   this.loading = false
          //   console.log(error)
          // })
        } else {
          return false;
        }
      });
    }
  },
  // 组件引用
  components: {
    pagination
  }
};
</script>
