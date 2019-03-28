<template>
    <div>
      <div class="createform">
        <el-form :model="createForm" ref="createForm" label-width="120px" label-position="right">
          <el-form-item label="课程：" prop="courseId">
              <el-select v-model="createForm.courseId" disabled>
                <el-option v-for="item in courseDropDownList" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="考试时长：">
              {{createForm.examTime}} 分钟
            </el-form-item>
            <el-form-item label="试卷名称：" prop="name" :rules="[{ required: true, message: '请输入试卷名称', trigger: 'blur' }]">
              <el-input v-model="createForm.name" ></el-input>
            </el-form-item>
            <el-form-item label="组卷方式：" prop="mode" :rules="[{ required: true, message: '请选择组卷方式', trigger: 'change' }]">
              <el-radio-group v-model="createForm.mode">
                <div><el-radio :label="1">选题组卷（选择试题组成一套试卷</el-radio></div>
                <div><el-radio :label="2" disabled>抽题组卷（选择一个出题策略抽取试题，组成一套或多套试卷</el-radio></div>
              </el-radio-group>
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
.el-radio-group > div {
  line-height: 40px;
}
</style>
<script>
import pagination from "@/components/pagination"
import { apiGet, apiPost } from "@/common/api"
export default {
  data() {
    return {
      createForm: {
        name: "",
        courseId: "",
        examTime: "0",
        mode: 1
      },
      courseName:'',
      courseDropDownList:[],
      baseInfo: {
        courses: [],
        examTime: 90
      },
      courseId: this.$route.query.courseId,
    };
  },
  methods: {
    next() {
      this.$refs.createForm.validate(valid => {
        if (valid) {
          this.$router.push({ path: "chooseQueType?courseId="+this.courseId+"&name="+this.createForm.name+"&mode="+this.createForm.mode+"&courseName="+this.courseName});
        } else {
          return false;
        }
      });
    },
     // 获取下拉框数据
    intDropDown() {
      var types = {types: ["COURSE"]}
      apiPost('/common/queryDropDownByTypes',types).then(response => {
        if (response.data.code === 200) {
          this.courseDropDownList = response.data.data.COURSE;
          this.createForm.courseId = this.$route.query.courseId
          for(var item of this.courseDropDownList) {
            if (this.createForm.courseId==item.id){
               this.createForm.examTime= item.examTime
               this.courseName=item.name
               break
            }
          }
        } else{
          this.$message({ message:'获取下拉框数据错误',type: 'error' })
        }
      }).catch(error => {
        console.log(error)
      })
    },
  },
  // 组件引用
  components: {
    pagination
  },
  created(){
    this.intDropDown()
  }
};
</script>
