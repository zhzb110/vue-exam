<template>
   <!--选择分类弹出框-->
      <el-dialog title="试题分类" width="400px" :visible.sync="showClasses">
        <!--   <ul class="categoryList clear">
            <li v-for="item in quesCategory" @click="checkCategory(item)" >{{item.name}}</li>
          </ul> -->
           <template v-for="(item,index) in quesCategory">
             <div class="category-list-line" @mouseover="mouse(index)" @mouseout="leave(index)">
              <div class="category-list-line1" @click="checkCategory(item.id,item.name)" v-show="newQuesCategory[index].editorShow">{{item.name}}</div>
              <el-input class="category-list-line1 line-height50" v-model="item.name" v-show="!newQuesCategory[index].editorShow"></el-input>
              <div class="category-list-line2">
                <span>{{item.testquesNum}}</span>
                <p v-show ="newQuesCategory[index].moveShow || !newQuesCategory[index].editorShow" style="margin-left: 50px">
                  <template v-if="item.testquesNum===0||item.name==='未分类'" >
                    <i class="el-icon-edit" @click="editCategory(item.id,index)" v-show="newQuesCategory[index].editorShow"></i>
                    <i class="el-icon-check color-3a font-w" @click="editSaveCategory(item.id,item.name,index)" v-show="!newQuesCategory[index].editorShow"></i>
                    <i class="el-icon-delete" @click="deleteCategory(item.id,index)"></i>
                  </template>
                   <template v-else>
                    <i class="el-icon-edit color-e5" disabled></i>
                    <i class="el-icon-delete color-e5" disabled></i>
                  </template>
                </p>
               </div>
            </div>
          </template>
          <div><span class="color-3a add-category"  @click="addCategory">添加分类</span></div>
      </el-dialog>
</template>
<script>
import { apiGet, apiPost } from "@/common/api"
export default {
  data() {
    return {
      quesCategory:[],
      showClasses:false,
      courseId:'',
      newQuesCategory:[], // 编辑显示隐藏时使用
    }
  },
  methods: {
    mouse(index) {
      this.newQuesCategory[index].moveShow= true
    },
    leave(index){
      this.newQuesCategory[index].moveShow = false
    },
  	// 编辑分类
  	editCategory(id,indexx) {
  	  for(let item in this.newQuesCategory){
  	  	 this.newQuesCategory[item].editorShow = true
  	  }
      this.newQuesCategory[indexx].editorShow = false
  	},
    // 
  	// 删除分类
  	deleteCategory(id,index) {
      if(id==='') {
      	this.quesCategory.splice(index, 1)
      	this.newQuesCategory.splice(index, 1)
      	return
      }
      var data={}
  	  data.id= id
      var url='/testques/courseclassify/deleteCourseClassify'
      apiPost(url,data).then(response => {
        if (response.data.code===200) { 
        	this.obtainClasses()
        } else {
          this.$message({ message:response.data.message,type: 'error' })
        }  
      }).catch(error => {
        console.log(error)
      }) 
  	},
  	// 添加分类
  	addCategory() {
  	  for(let item in this.newQuesCategory){	  	
  	  	if(this.newQuesCategory[item].id===''){
  	  		return
  	  	} else {
  	  	  this.newQuesCategory[item].editorShow = true
  	  	}
  	  }
      this.quesCategory.push({id:'',name:' ',testquesNum:0})
      this.newQuesCategory.push({id:'',showName:' ',editorShow:false,moveShow:false})
  	},
  	// 点击分类
  	checkCategory(id,name) {
  	  this.showClasses = false
      this.$emit('category-parent',id,name)
  	},
  	// 保存
  	editSaveCategory(id,name,index) {
	  if (id==='') { // 新增保存
         if (name==='') {
           this.$message({ message:'请输入分类名称',type: 'error' })
           return
         }
         var data={}
	  	 data.courseId= this.courseId
	  	 data.name= name
	     var url='/testques/courseclassify/saveCourseClassify'
	     apiPost(url,data).then(response => {
	      if (response.data.code===200) { 
	        this.obtainClasses()
	      } else {
	        this.$message({ message:response.data.message,type: 'error' })
	      }  
	     }).catch(error => {
	        console.log(error)
	     }) 
	  } else { // 编辑保存
        if (name===this.newQuesCategory[index].showName) { // 用户没有修改内容
	       for(let item in this.newQuesCategory){
	  	  	 this.newQuesCategory[item].editorShow = true
	  	   }
	  	   return
	  	}
	  	var data={}
	  	data.id= id
	  	data.name= name
	    var url='/testques/courseclassify/updateCourseClassify'
	    apiPost(url,data).then(response => {
	      if (response.data.code===200) { 
	        this.obtainClasses()
	      } else {
	        this.$message({ message:response.data.message,type: 'error' })
	      }  
	    }).catch(error => {
	        console.log(error)
	    }) 
	  }
  	},
     obtainClasses() {
      var url='/testques/courseclassify/getCourseClassifyList/'+this.courseId
      apiGet(url).then(response => {
        if (response.data.code===200) { 
        	this.newQuesCategory = []
        	for(let item of response.data.data){
              this.newQuesCategory.push({id:item.id,showName:item.name,editorShow:true,moveShow:false})
        	}
           this.quesCategory = response.data.data
        } else {
          this.$message({ message:response.data.message,type: 'error' })
        }  
      }).catch(error => {
        console.log(error)
      })
     },
    classesDialog(courseId) {
      this.showClasses = true
      this.courseId = courseId
      this.obtainClasses()
    }
  }
}
</script>
<style scoded>
.category-list-line{overflow: hidden;}
.category-list-line1{ width: 200px;float: left;line-height: 50px;text-align: center;background:#f8f8f8;box-shadow: 0 1px 3px #ccc;margin: 10px;margin: 10px 15px;cursor: pointer;font-size: 16px;border-radius: 2px;}
.category-list-line1:hover{border:px solid #409EFF;}
.category-list-line2{width: 130px;float: left; line-height: 50px;margin-top:10px;height: 50px;}
.category-list-line2>p>i{margin-right: 15px;cursor: pointer;}
.category-list-line2>span{min-width:25px;display: inline-block; margin-right:10px; padding:0px 5px;line-height: 30px;margin-top: 10px;text-align:center;background:#f5f5f5;float: left;}
.add-category{padding: 15px 15px 5px;cursor: pointer; display:inline-block;}
.color-e5{color:#e5e5e5;}
.font-w{ font-weight: bold; }
.line-height50, .line-height50>input{line-height: 50px !important;height: 50px !important}
</style>