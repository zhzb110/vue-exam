<template>
  <div>
    <div class="top-form">
      <el-form :model="queryForm" ref="queryForm" label-width="120px" label-position="right">
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="学习批次：" prop="b3">
            <el-select v-model="queryForm.b3">
              <el-option label="全部" value="全部"></el-option>
              <el-option label="启用" value="启用"></el-option>
              <el-option label="停用" value="停用"></el-option>
           </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="层次：" prop="b3">
            <el-select v-model="queryForm.b3">
              <el-option label="全部" value="全部"></el-option>
              <el-option label="启用" value="启用"></el-option>
              <el-option label="停用" value="停用"></el-option>
           </el-select>
          </el-form-item>
        </el-col>       
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="考生类型：" prop="b3">
            <el-select v-model="queryForm.b3">
              <el-option label="校本部" value="校本部"></el-option>
              <el-option label="教学点" value="教学点"></el-option>
              <el-option label="外聘" value="外聘"></el-option>
           </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="考生来源：" prop="b3">
            <el-select v-model="queryForm.b3">
              <el-option label="校本部" value="校本部"></el-option>
              <el-option label="教学点" value="教学点"></el-option>
              <el-option label="外聘" value="外聘"></el-option>
           </el-select>
          </el-form-item>
        </el-col>
         <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="专业：" prop="b3">
            <el-select v-model="queryForm.b3">
              <el-option label="校本部" value="校本部"></el-option>
              <el-option label="教学点" value="教学点"></el-option>
              <el-option label="外聘" value="外聘"></el-option>
           </el-select>
          </el-form-item>
        </el-col>
         <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="教学点：" prop="b3">
            <el-select v-model="queryForm.b3">
              <el-option label="校本部" value="校本部"></el-option>
              <el-option label="教学点" value="教学点"></el-option>
              <el-option label="外聘" value="外聘"></el-option>
           </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="主办方：" prop="b1"><el-input v-model="queryForm.b1"></el-input></el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="考生号：" prop="b1"><el-input v-model="queryForm.b1"></el-input></el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="姓名：" prop="b1"><el-input v-model="queryForm.b1"></el-input></el-form-item>
        </el-col>
       </el-form>
      <div style="text-align:right; padding-bottom:10px;">
      	<el-button type="primary" plain @click="checkSponsor">查询</el-button>
        <el-button type="primary" plain @click="newInformation">新增</el-button>
        <el-button type="primary" plain @click="newInformation">分配课程</el-button>
        <el-button type="success" plain @click="exportData">导入</el-button>
        <el-button type="success" plain @click="exportData">导出</el-button>
      </div>
    </div>
    <div class="content-table">
      <el-table :data="tableData" style="width: 100%" border>
       <el-table-column prop="a1" label="序号"></el-table-column>
       <el-table-column prop="a2" label="主办方"></el-table-column>
       <el-table-column prop="a3" label="考生号"></el-table-column>
       <el-table-column prop="a4" label="姓名"></el-table-column>
       <el-table-column prop="a5" label="学习批次"></el-table-column>
       <el-table-column prop="a6" label="层次"></el-table-column>
        <el-table-column prop="a4" label="考生类型"></el-table-column>
       <el-table-column prop="a5" label="考生来源"></el-table-column>
       <el-table-column prop="a6" label="专业"></el-table-column>
       <el-table-column prop="a6" label="考生状态"></el-table-column>
       <el-table-column prop="a6" label="课程数">
          <template slot-scope="scope"><label @click="checkCourse()" class="color-3a">5门</label></template>
       </el-table-column>       
       <el-table-column label="操作" width="140">
         <template slot-scope="scope" prop="a8">
           <el-button type="primary" plain  @click="checkInformation()" class="el-table-btn" >查看</el-button>
           <el-button type="primary" plain @click="edtiorInformation()" class="el-table-btn">编辑</el-button>
         </template>
       </el-table-column>
     </el-table>
    <!--分页组件-->
    <pagination ref="page" :currentPage="currentPage" :pageSize="pageSize" :totalCount="totalCount"
            @on-current-page-change="onCurrentPageChange" @on-page-size-change="onPageSizeChange"/>
    </div>
    <!--设置学生信息-->
    <el-dialog :title='newAndEditor === "1" ? "新增学生信息" : "编辑学生信息"' :visible.sync="dialogEditor" width="900px">
	   <div class="overfloat-a">
	    	<el-button type="primary"  @click="checkInformation()" class="float-r margin-b10" >省份证信息采集</el-button>
	   </div>
	   <el-form :model="dialogForm" ref="dialogForm" label-width="120px" label-position="right">
	     <div class="note-info-title">基本信息</div>
	     <el-row type="flex">
	          <el-col :span="19">
	          	<el-row type="flex">
	  		      <el-col :span="12">
	  		        <el-form-item label="姓名：" prop="c6"><el-input v-model="dialogForm.c6" :rules="[{ required: true, message: '请输入姓名', trigger: 'blur' }]"></el-input></el-form-item>
	              </el-col>
	              <el-col :span="12">
	  		        <el-form-item label="性别：" prop="c6">
	  		          <el-select v-model="queryForm.c4">
		                <el-option label="请选择" value="请选择"></el-option>
		                <el-option label="男" value="男"></el-option>
		                <el-option label="女" value="女"></el-option>
	                  </el-select>
	  		        </el-form-item>
	              </el-col>  
	            </el-row>
	            <el-row type="flex">
	  		      <el-col :span="12">
	  		         <el-form-item label="政治面貌：" prop="c6">
	  		          <el-select v-model="queryForm.c4">
		                <el-option label="请选择" value="请选择"></el-option>
		                <el-option label="男" value="男"></el-option>
		                <el-option label="女" value="女"></el-option>
	                  </el-select>
	  		        </el-form-item>
	              </el-col>
	              <el-col :span="12">
	  		        <el-form-item label="名族：" prop="c6">
	  		          <el-select v-model="queryForm.c4">
		                <el-option label="请选择" value="请选择"></el-option>
		                <el-option label="男" value="男"></el-option>
		                <el-option label="女" value="女"></el-option>
	                  </el-select>
	  		        </el-form-item>
	              </el-col>  
	            </el-row>
	            <el-row type="flex">
	  		      <el-col :span="12">
	  		         <el-form-item label="证件类型：" prop="c6">
	  		          <el-select v-model="queryForm.c4">
		                <el-option label="请选择" value="请选择"></el-option>
		                <el-option label="男" value="男"></el-option>
		                <el-option label="女" value="女"></el-option>
	                  </el-select>
	  		        </el-form-item>
	              </el-col>
	              <el-col :span="12">
	  		         <el-form-item label="证件号码：" prop="c6"><el-input v-model="dialogForm.c6"></el-input></el-form-item>
	              </el-col>  
	            </el-row>
	            <el-row type="flex">
	  		      <el-col :span="12">
	  		        <el-form-item label="出生日期：" prop="c6">
	  		        	<el-date-picker v-model="queryForm.c5" type="datetime" ></el-date-picker></el-form-item>
	              </el-col>
	              <el-col :span="12">
	  		        <el-form-item label="用户性质：" prop="c6">
	  		          <el-select v-model="queryForm.c4">
		                <el-option label="请选择" value="请选择"></el-option>
		                <el-option label="男" value="男"></el-option>
		                <el-option label="女" value="女"></el-option>
	                  </el-select>
	  		        </el-form-item>
	              </el-col>  
	            </el-row>
	            <el-row type="flex">
	  		      <el-col :span="12">
	  		        <el-form-item label="籍贯：" prop="c6"><el-input v-model="dialogForm.c6"></el-input></el-form-item>
	              </el-col>
	               <el-col :span="12">
	  		        <el-form-item label="户籍所在地：" prop="c6"><el-input v-model="dialogForm.c6"></el-input></el-form-item>
	              </el-col> 
	            </el-row>
	            <el-row type="flex">
	  		      <el-col :span="12">
	  		         <el-form-item label="在职状况：" prop="c6">
	  		          <el-select v-model="queryForm.c4">
		                <el-option label="请选择" value="请选择"></el-option>
		                <el-option label="男" value="男"></el-option>
		                <el-option label="女" value="女"></el-option>
	                  </el-select>
	  		        </el-form-item>
	              </el-col>
	              <el-col :span="12">
	  		         <el-form-item label="参加工作时间：" prop="c6">
	  		         	<el-date-picker v-model="queryForm.c5" type="datetime" ></el-date-picker></el-form-item>
	              </el-col>  
	            </el-row>
	            <el-row type="flex">
	              <el-col :span="24">
	  		         <el-form-item label="工作单位名称：" prop="c6"><el-input v-model="dialogForm.c6"></el-input></el-form-item>
	              </el-col>  
	            </el-row>
	            <el-row type="flex">
	  		      <el-col :span="12">
	  		        <el-form-item label="移动电话：" prop="c6"><el-input v-model="dialogForm.c6" :rules="[{ required: true, message: '请输入电话', trigger: 'blur' }]"></el-input></el-form-item>
	              </el-col>
	               <el-col :span="12">
	  		        <el-form-item label="固定电话：" prop="c6"><el-input v-model="dialogForm.c6"></el-input></el-form-item>
	              </el-col> 
	            </el-row>
	            <el-row type="flex">
	  		      <el-col :span="12">
	  		        <el-form-item label="QQ：" prop="c6"><el-input v-model="dialogForm.c6"></el-input></el-form-item>
	              </el-col>
	               <el-col :span="12">
	  		        <el-form-item label="Email：" prop="c6"><el-input v-model="dialogForm.c6"></el-input></el-form-item>
	              </el-col> 
	            </el-row>
	            <el-row type="flex">
	              <el-col :span="24">
	  		         <el-form-item label="通信地址：" prop="c6"><el-input v-model="dialogForm.c6"></el-input></el-form-item>
	              </el-col>  
	            </el-row>
	            <el-row type="flex">
	              <el-col :span="12">
	  		         <el-form-item label="邮编编码：" prop="c6"><el-input v-model="dialogForm.c6"></el-input></el-form-item>
	              </el-col>  
	            </el-row>
	          </el-col>
	          <el-col :span="5">
	            <el-upload class="avatar-uploader-add" action="" :show-file-list="false" :on-change="handleChange" :auto-upload="false" accept=".jpg,.jpeg,.png,.gif,.JPG,.JPEG">
				 <img v-if="imageUrl" :src="imageUrl" class="avatar">
				 <i v-else class="el-icon-plus avatar-uploader-icon"></i>
				 <el-button slot="trigger" plain size="small" type="primary" >上传头像</el-button>
				</el-upload> 	
	          </el-col>
	     </el-row>    
	     <div class="note-info-title">在读信息</div>
	          <div style="overflow: auto">
	        	<el-col :span="8">
	  		        <el-form-item label="主办方：" prop="c6">
	  		          <el-select v-model="queryForm.c4">
		                <el-option label="请选择" value="请选择"></el-option>
		                <el-option label="男" value="男"></el-option>
		                <el-option label="女" value="女"></el-option>
	                  </el-select>
	  		        </el-form-item>
	             </el-col>
	             <el-col :span="8">
	  		       <el-form-item label="考生号：" prop="c6"><el-input v-model="dialogForm.c6"></el-input></el-form-item>
	             </el-col> 
	             <el-col :span="8">
	  		        <el-form-item label="学习批次：" prop="c6">
	  		          <el-select v-model="queryForm.c4">
		                <el-option label="请选择" value="请选择"></el-option>
		                <el-option label="男" value="男"></el-option>
		                <el-option label="女" value="女"></el-option>
	                  </el-select>
	  		        </el-form-item>
	             </el-col> 
	             <el-col :span="8">
	  		        <el-form-item label="层次：" prop="c6">
	  		          <el-select v-model="queryForm.c4">
		                <el-option label="请选择" value="请选择"></el-option>
		                <el-option label="男" value="男"></el-option>
		                <el-option label="女" value="女"></el-option>
	                  </el-select>
	  		        </el-form-item>
	             </el-col> 
	             <el-col :span="8">
	  		        <el-form-item label="考生类型：" prop="c6">
	  		          <el-select v-model="queryForm.c4">
		                <el-option label="请选择" value="请选择"></el-option>
		                <el-option label="男" value="男"></el-option>
		                <el-option label="女" value="女"></el-option>
	                  </el-select>
	  		        </el-form-item>
	             </el-col> 
	             <el-col :span="8">
	  		        <el-form-item label="考生来源：" prop="c6">
	  		          <el-select v-model="queryForm.c4">
		                <el-option label="请选择" value="请选择"></el-option>
		                <el-option label="男" value="男"></el-option>
		                <el-option label="女" value="女"></el-option>
	                  </el-select>
	  		        </el-form-item>
	             </el-col> 
	             <el-col :span="8">
	  		        <el-form-item label="专业：" prop="c6">
	  		          <el-select v-model="queryForm.c4">
		                <el-option label="请选择" value="请选择"></el-option>
		                <el-option label="男" value="男"></el-option>
		                <el-option label="女" value="女"></el-option>
	                  </el-select>
	  		        </el-form-item>
	             </el-col> 
	             <el-col :span="8">
	  		        <el-form-item label="教学点：" prop="c6">
	  		          <el-select v-model="queryForm.c4">
		                <el-option label="请选择" value="请选择"></el-option>
		                <el-option label="男" value="男"></el-option>
		                <el-option label="女" value="女"></el-option>
	                  </el-select>
	  		        </el-form-item>
	             </el-col>
	             <el-col :span="24">
		            <el-form-item label="状态：" prop="c7"  :rules="[{ required: true, message: '请选择状态', trigger: 'blur' }]">
		               <el-switch  v-model='queryForm.c7'  active-text="启用" inactive-text="停用"> </el-switch>
		            </el-form-item>
		         </el-col>
		         <el-col :span="22">
		            <el-form-item label="数据来源：" prop="c4" class="margin-b0"><label>考试平台</label></el-form-item>
		          </el-col>
	          </div> 	             
	   </el-form>
       <span slot="footer" class="dialog-footer">
         <el-button type="primary" @click="save">保 存</el-button><el-button @click="dialogEditor = false">取 消</el-button>
      </span>
    </el-dialog> 
    <!--查看课程-->
    <el-dialog title= '新增教学点用' :visible.sync="dialogCourse" width="800px">
      <el-row type="flex">
        <el-col :span="3"><span class="float-r">姓名：</span></el-col>
        <el-col :span="6" class="word-break">1231313131231312313131231312313213</el-col>
        <el-col :span="3"><span class="float-r">用户名：</span></el-col>
        <el-col :span="6" class="word-break">12321231313231231</el-col>
      </el-row>  
       <div class="content-table">
          <el-table :data="tableData" style="width: 100%" border>
           <el-table-column prop="a1" label="序号"></el-table-column>
           <el-table-column prop="a2" label="课程名称"></el-table-column>
           <el-table-column prop="a3" label="课程代码"></el-table-column>
           <el-table-column prop="a4" label="学分"></el-table-column>
           <el-table-column prop="a5" label="课程状态"></el-table-column>
           <el-table-column prop="a5" label="角色"></el-table-column>
           <el-table-column prop="a5" label="授课关系"></el-table-column>
         </el-table>  
          <el-row type="flex">
            <el-col :span="24"><pagination ref="page" :currentPage="currentPage" :pageSize="pageSize" 
             :totalCount="totalCount" @on-current-page-change="onCurrentPageChange" @on-page-size-change="onPageSizeChange"/>
            </el-col>
          </el-row>  
     </div>
    </el-dialog>
     <!--查看基本信息-->
    <el-dialog title= '学生信息查看' :visible.sync="dialogCheck" width="800px" class="check-message">
       <el-form :model="dialogForm" ref="dialogForm" label-width="120px" label-position="right">
	     <div class="note-info-title">基本信息</div>
	     <el-row type="flex">
          <el-col :span="19">
          	<el-row type="flex">
  		      <el-col :span="12">
  		        <el-form-item label="姓名：" class="margin-b1"><label>12</label></el-form-item>
              </el-col>
              <el-col :span="12">
  		        <el-form-item label="性别：" class="margin-b1"><label>12</label></el-form-item>
              </el-col>  
            </el-row>
            <el-row type="flex">
  		      <el-col :span="12">
  		         <el-form-item label="政治面貌：" class="margin-b1"><label>12</label></el-form-item>
              </el-col>
              <el-col :span="12">
  		        <el-form-item label="名族：" class="margin-b1"><label>12</label></el-form-item>
              </el-col>  
            </el-row>
            <el-row type="flex">
  		      <el-col :span="12">
  		         <el-form-item label="证件类型：" class="margin-b1"><label>12</label></el-form-item>
              </el-col>
              <el-col :span="12">
  		         <el-form-item label="证件号码：" class="margin-b1"><label>12</label></el-form-item>
              </el-col>  
            </el-row>
            <el-row type="flex">
  		      <el-col :span="12">
  		        <el-form-item label="出生日期：" class="margin-b1"><label>12</label></el-form-item>
              </el-col>
              <el-col :span="12">
  		        <el-form-item label="用户性质：" class="margin-b1"><label>12</label></el-form-item>
              </el-col>  
            </el-row>
            <el-row type="flex">
  		      <el-col :span="12">
  		        <el-form-item label="籍贯：" class="margin-b1"><label>12</label></el-form-item>
              </el-col>
               <el-col :span="12">
  		        <el-form-item label="户籍所在地：" class="margin-b1"><label>12</label></el-form-item>
              </el-col> 
            </el-row>
            <el-row type="flex">
  		      <el-col :span="12">
  		         <el-form-item label="在职状况：" class="margin-b1">
  		          <label>12</label>
  		        </el-form-item>
              </el-col>
              <el-col :span="12">
  		         <el-form-item label="参加工作时间：" class="margin-b1"><label>12</label></el-form-item>
              </el-col>  
            </el-row>
            <el-row type="flex">
              <el-col :span="24">
  		         <el-form-item label="工作单位名称：" class="margin-b1"><label>12</label></el-form-item>
              </el-col>  
            </el-row>
            <el-row type="flex">
  		      <el-col :span="12">
  		        <el-form-item label="移动电话：" class="margin-b1"><label>12</label></el-form-item>
              </el-col>
               <el-col :span="12">
  		        <el-form-item label="固定电话：" class="margin-b1"><label>12</label></el-form-item>
              </el-col> 
            </el-row>
            <el-row type="flex">
  		      <el-col :span="12">
  		        <el-form-item label="QQ：" class="margin-b1"><label>12</label></el-form-item>
              </el-col>
               <el-col :span="12">
  		        <el-form-item label="Email：" class="margin-b1"><label>12</label></el-form-item>
              </el-col> 
            </el-row>
            <el-row type="flex">
              <el-col :span="24">
  		         <el-form-item label="通信地址：" class="margin-b1"><label>12</label></el-form-item>
              </el-col>  
            </el-row>
            <el-row type="flex">
              <el-col :span="12">
  		         <el-form-item label="邮编编码：" ><label>12</label></el-form-item>
              </el-col>  
            </el-row>
          </el-col>
          <el-col :span="5">
           <div class="avatar-uploader-icon">
           	 <img src="http://210.28.216.100:9080/resource/reg/file/2018/7/24/466b69de5efd4d669d06f1bd6d618882.jpg" class="img100">
           </div>
          </el-col>
	     </el-row>    
	     <div class="note-info-title">在读信息</div>
          <div style="overflow: auto">
        	<el-col :span="8">
  		        <el-form-item label="主办方：" class="margin-b1"><label>12</label></el-form-item>
             </el-col>
             <el-col :span="8">
  		       <el-form-item label="考生号：" class="margin-b1"><label>12</label></el-form-item>
             </el-col> 
             <el-col :span="8">
  		        <el-form-item label="学习批次：" class="margin-b1"><label>12</label></el-form-item>
             </el-col> 
             <el-col :span="8">
  		        <el-form-item label="层次：" class="margin-b1"><label>12</label></el-form-item>
             </el-col> 
             <el-col :span="8">
  		        <el-form-item label="考生类型：" class="margin-b1"><label>12</label></el-form-item>
             </el-col> 
             <el-col :span="8">
  		        <el-form-item label="考生来源：" class="margin-b1"><label>12</label></el-form-item>
             </el-col> 
             <el-col :span="8">
  		        <el-form-item label="专业：" class="margin-b1"><label>12</label></el-form-item>
             </el-col> 
             <el-col :span="8">
  		        <el-form-item label="教学点：" class="margin-b1"><label>12</label></el-form-item>
             </el-col>
             <el-col :span="24">
	            <el-form-item label="状态：" class="margin-b1"><label>12</label></el-form-item>
	         </el-col>
	         <el-col :span="22">
	            <el-form-item label="数据来源：" class="margin-b1"><label>考试平台</label></el-form-item>
	          </el-col>
          </div> 	             
	   </el-form>
       <span slot="footer" class="dialog-footer">
         <el-button type="primary" @click="save">保 存</el-button><el-button @click="dialogCheck = false">取 消</el-button>
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
      newAndEditor: "", // 1代表新增 2编辑提交
      typeShow: true, // true 新增教师 false 管理人员库中选择
      fileList: [],
      valuse: true,
      imageUrl: "", //图片头像
      dialogEditor: false, // 新增编辑
      dialogCourse: false, // 课程查看弹出框
      dialogCheck: false // 基本信息查看
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
    edtiorInformation() {
      // 每次打开数据清空
      this.dialogEditor = true;
      if (this.newAndEditor !== "") {
        this.$refs["dialogForm"].resetFields();
        this.provinceName = "";
        this.cityName = "";
        this.areaName = "";
      }
      this.newAndEditor = "2";
    },
    // 新增
    newInformation() {
      // 每次打开数据清空
      this.dialogEditor = true;
      if (this.newAndEditor !== "") {
        this.$refs["dialogForm"].resetFields();
        this.provinceName = "";
        this.cityName = "";
        this.areaName = "";
      }
      this.newAndEditor = "1";
    },
    // 查看信息
    checkInformation() {
      this.dialogCheck = true;
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
          this.dialogEditor = false;
        }
      });
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
    // 查看课程
    checkCourse() {
      this.dialogCourse = true;
    },
    // 查询表格的内容
    checkSponsor() {},
    // 图片上传
    // 获取图片的先关参数
    handleChange(file, fileList) {
      debugger;
      this.imageUrl = file.url;
    },
    // 添加教师信息
    addTeacher(way) {
      if (way === 1) {
        this.typeShow = true;
      } else {
        this.typeShow = false;
      }
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
.float-r {
  float: right;
}
.text-left {
  text-align: left;
}
.word-break {
  word-break: break-all;
}
.note-info-title {
  height: 35px;
  line-height: 35px;
  padding: 0px 20px;
  background: #ecf5ff;
  margin: 0px 0px 15px 0px;
  color: #409eff;
}
.overfloat-a {
  overflow: auto;
  margin-top: -20px;
}
.overfloat-a > button {
  padding: 7px 10px;
}
.margin-b1 {
  margin-bottom: 1px;
}
.img100 {
  width: 100px;
  height: 135px;
}
</style>
<style type="text/css">
.avatar-uploader-add {
  text-align: center;
  position: relative;
  height: 180px;
  margin: auto;
  width: 110px;
}
.avatar-uploader-add > .el-upload {
  position: absolute;
  bottom: 0px;
  left: 0px;
}
.avatar-uploader-add > .el-upload > button {
  width: 110px;
  padding: 5px 0px;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 110px;
  height: 140px;
  line-height: 140px;
  text-align: center;
  border: 1px solid #ddd;
}
.avatar {
  width: 110px;
  height: 140px;
  display: block;
}
</style>
