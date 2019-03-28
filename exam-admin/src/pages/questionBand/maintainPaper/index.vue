<template>
    <div>
      <div class="top-form">
        <el-form :model="queryForm" label-width="120px" label-position="right">
          <el-col :xs="24" :sm="12" :md="8" :lg="6">
              <el-form-item label="课程状态：" prop="status">
                  <el-select v-model="queryForm.status">
                      <el-option key="" label="全部" value=""></el-option>
                      <el-option key="1" label="启用" value="1"></el-option>
                      <el-option key="0" label="停用" value="0"></el-option>
                  </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="6">
              <el-form-item label="课程" prop="id">
                  <el-select v-model="queryForm.id">
                      <el-option key="0" label="请输入" value=""></el-option>
                      <el-option v-for="item in courseDropDownList" :key="item.id" :label="item.name+'('+item.code+')'" :value="item.id"></el-option>
                  </el-select>
              </el-form-item>
            </el-col>
        </el-form>
         <div class="text-right-b10">
          <el-button style="margin-left:80px" type="primary" plain @click="pageContent">查询</el-button>
       </div>
    </div>
      <ul class="queList">
        <li v-for="course in testQuesCourseList" @click="toQuestionListPage(course.id,course.courseCode,course.courseName)">
          <div class="courseImg">{{course.image}}</div>
          <div class="courseInfo">
            {{course.courseName}}<sub>{{course.eduName}}</sub><sub :style="'color:'+(course.status?'#21c8ac':'#f00')">{{course.status?"启用":"停用"}}</sub>
            <p><span>待审核 {{course.stayNum}}</span> <span>审核通过 {{course.adoptNum}}</span>  <span>审核驳回 {{course.rebutNum}}</span></p>
          </div>
          <el-button v-if="course.status" type="primary" plain @click.stop="createQuestion(course.id)" >+ 创建试卷</el-button>
          <el-button v-else="course.status" type="primary" plain disabled>+ 创建试卷</el-button>
        </li>
      </ul>
      <!--分页组件-->
      <pagination ref="page" :currentPage="currentPage" :pageSize="pageSize" :totalCount="totalCount" @on-current-page-change="onCurrentPageChange" @on-page-size-change="onPageSizeChange"/>
    </div>
</template>
<style scoped>
.queList ul {
  padding: 0 40px;
  max-width: 1000px;
}
.queList li {
  height: 100px;
  margin-bottom: 20px;
  border: 1px solid #e5e5e5;
}
.courseImg {
  width: 100px;
  background: #e5e5e5;
  height: 100px;
  float: left;
  margin-right: 20px;
}
.courseInfo {
  float: left;
  padding-top: 15px;
  font-size: 20px;
}
.courseInfo sub {
  font-size: 16px;
  color: #999;
  position: relative;
  left: 15px;
  top: -4px;
  margin-right:20px
}
.courseInfo p {
  color: #666;
  margin-top: 25px;
  font-size: 15px;
}
.courseInfo p span {
  margin-right: 60px;
}
.queList li .el-button {
  float: right;
  margin: 60px 10px 0 0;
}
</style>
<script>
import pagination from "@/components/pagination"
import { apiGet, apiPost } from "@/common/api"
export default {
  data() {
    return {
      queryForm: {
        status: "",
        id: ""
      },
      courses: [],
      // 当前页
      currentPage: 1,
      // 每页条数
      pageSize: 20,
      // 总共多少条数据
      totalCount: 0,
      testQuesCourseList:[],
      courseDropDownList:[]
    };
  },
  methods: {
    pageContent() {
      const page = Object.assign({}, this.queryForm);
      page.pageNum = this.currentPage
      page.pageSize = this.pageSize
      apiPost('/testques/testques/getTestquesCourseByPage',page).then(response => {
        if (response.data.code ===200) {
          this.totalCount = parseInt(response.data.data.total)
          this.testQuesCourseList =response.data.data.list;
        } else{
          this.$message({ message:response.message,type: 'error' })
        }
      }).catch(error => {
        console.log(error)
      })
    },
     // 分页，改变第几页
    onCurrentPageChange(val) {
      this.currentPage = val
      this.pageContent()
    },
    // 改变每页现实的数据条数
    onPageSizeChange(val) {
      this.pageSize = val
      this.pageContent()
    },
    // 获取下拉框数据
    intDropDown() {
      var types = {types: ["COURSE"]}
      apiPost('/common/queryDropDownByTypes',types).then(response => {
        if (response.data.code === 200) {
          this.courseDropDownList = response.data.data.COURSE;
        } else{
          this.$message({ message:'获取下拉框数据错误',type: 'error' })
        }
      }).catch(error => {
        console.log(error)
      })
    },
    toQuestionListPage(courseId,courseCode,courseName) {
      this.$router.push({ path: "./paperList", query: { courseId: courseId,courseCode: courseCode,courseName: courseName } });
    },
    createQuestion(courseId) {
      this.$router.push({ path: "./preList", query: { courseId: courseId } });
    }
  },
  mounted() {
    // 进入页面加载相关内容,html未加载完成前
    this.intDropDown()
    this.pageContent()
  },
  // 组件引用
  components: {
    pagination
  }
};
</script>
