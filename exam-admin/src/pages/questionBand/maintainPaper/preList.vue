<template>
    <div>
      <div class="top">
        <span>策略名称：<b>{{paperInfo.strategyName}}</b> </span>  
        <span>卷面总分： <b>{{paperInfo.score}}</b>分 </span>   
        <span>大题数： <b>{{paperInfo.bigQues}}</b> 道 </span>    
        <span>试题数： <b>{{paperInfo.ques}}</b> 道 </span>  
      </div>
      <el-table :data="tableData" style="width:600px;margin-top:10px" border @selection-change="handleSelectionChange" >
          <el-table-column type="selection" width="50"></el-table-column>

          <el-table-column prop="paperName" label="试卷名称" width="320"></el-table-column>
          <el-table-column prop="checkState" label="审核状态">
            <template slot-scope="scope">{{scope.row.checkState ? "已审核":"未审核"}}</template>
          </el-table-column>
          <el-table-column label="操作" width="145">
              <template slot-scope="scope">
                  <el-button type="primary" plain @click="editPaper(scope.row.paperId)" class="el-table-btn">编辑</el-button>
                  <el-button type="danger" plain @click="deletePaper(scope.row.paperId)" class="el-table-btn">删除</el-button>
              </template>
          </el-table-column>
      </el-table>
      <div style="margin-top:20px">
          <el-button type="primary" plain @click="save()" class="el-table-btn">保存</el-button>
          <el-button type="warning" plain @click="check()" class="el-table-btn">提交审核</el-button>
          <el-button type="primary" plain @click="back()" class="el-table-btn">返回</el-button>
      </div>
    </div>
</template>
<style scoped>
  .top{margin-bottom:20px} 
  .top span{font-size:16px;margin-right:30px}
</style>
<script>

export default {
  data() {
    return {
      // 当前页
      paperInfo:{
          strategyName:"大英19秋",
          score:100,
          bigQues:3,
          ques:21
      },
      tableData:[{
        paperId:"012",
        paperName:"大学英语01",
        checkState:1
      },{
        paperId:"013",
        paperName:"大学英语01",
        checkState:1
      }]
    } 
  },
  methods: {
    editPaper(paperId) {
      this.$router.push({
        path: "chooseQueType",
        query: { paperId: this.paperId }
      });
    },

    deletePaper(paperId){

    },

    handleSelectionChange(val) {
      console.log(val);
    },

    save(){

    },

    check(){

    },

    back(){
      history.go(-1);
    }
  }
};
</script>
