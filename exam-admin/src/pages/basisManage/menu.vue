<template>
  <div>
    <div class="margin-b15">
      <el-button type="primary" plain @click="menuClose">一键折叠</el-button>
      <el-button type="primary" plain @click="menuOpen">一键展开</el-button>
    </div>
    <el-col :xs="23" :sm="8" :md="8" :lg="8">
      <div class="line margin20">     
        <div class="menu1">
           <el-tree class="filter-tree" ref="tree" :data="data2" highlight-current :default-expanded-keys ='openNumber'
                 @node-click="handleNodeClick" node-key="id" ></el-tree>
         </div>
      </div>
    </el-col>
    <el-col :xs="24" :sm="15" :md="15" :lg="15">
      <div class="menu2 line">
         <table cellspacing="0">
           <tr class="el-table__row"><td>机构层级</td><td>学校,院系</td></tr>
           <tr class="el-table__row"><td>菜单名称</td><td>学校,院系</td></tr>
           <tr class="el-table__row"><td>菜单类型</td><td>学校,院系</td></tr>
           <tr class="el-table__row"><td>URL地址</td><td>学校,院系</td></tr>
           <tr class="el-table__row"><td>父级菜单</td><td>学校,院系</td></tr>
           <tr class="el-table__row"><td>顺序</td><td>学校,院系</td></tr>
           <tr class="el-table__row"><td>说明</td><td>学校,院系</td></tr>
           <tr class="el-table__row"><td>状态</td><td>学校,院系</td></tr>
         </table>
         <div class="margin-t15 align-r">
            <el-button type="primary" plain @click="menuAdd">添加</el-button>
            <el-button type="primary" plain @click="menuEditor">修改</el-button>
            <el-button type="primary" plain @click="menuDelete">删除</el-button> 
         </div>
      </div>
    </el-col>
    <!--编辑和新增-->
    <el-dialog :title='newAndEditor == 1 ? "新增" : "编辑"' :visible.sync="dialogEditor" width="600px">
      <el-form ref="dialogForm" label-width="150px" label-position="right">
        <el-row type="flex">
          <el-col :span="21">
            <el-form-item label="机构层级：" prop="c1"  :rules="[{ required: true, message: '请选择机构层级', trigger: 'blur' }]">
              <el-checkbox-group v-model="dialogForm.c1">
                  <el-checkbox label="学校"></el-checkbox>
                  <el-checkbox label="院系"></el-checkbox>
                  <el-checkbox label="教学点"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="21">
            <el-form-item label="菜单名称：" prop="c2"  :rules="[{ required: true, message: '请输入菜单名称', trigger: 'blur' }]">
              <el-input v-model="dialogForm.c2"></el-input>
            </el-form-item>
          </el-col> 
        </el-row>    
        <el-row type="flex">
          <el-col :span="21">
            <el-form-item label="URL：" prop="c5" :rules="[{ required: true, message: '请输入跳转地址', trigger: 'blur' }]">
              <el-input v-model="dialogForm.c5"></el-input>
            </el-form-item>
         </el-col> 
        </el-row> 
        <el-row type="flex">
           <el-col :span="21">
            <el-form-item label="菜单类型：" prop="c6">
                <el-select v-model="dialogForm.b6" disabled>
                  <el-option label="菜单" value="菜单"></el-option>
               </el-select>
            </el-form-item>
           </el-col> 
        </el-row>
        <el-row type="flex">
          <el-col :span="21">
            <el-form-item label="父级菜单：" prop="c5"><el-input v-model="dialogForm.c5"></el-input></el-form-item>
         </el-col> 
        </el-row> 
        <el-row type="flex">
          <el-col :span="21">
            <el-form-item label="顺序：" prop="c5" :rules="[{ required: true, message: '请输入主办方名称', trigger: 'blur' }]">
              <el-input v-model="dialogForm.c5"></el-input>
            </el-form-item>
         </el-col> 
        </el-row> 
        <el-row type="flex">
          <el-col :span="21">
            <el-form-item label="说明：" prop="c5"><el-input v-model="dialogForm.c5"></el-input></el-form-item>
         </el-col> 
        </el-row> 
        <el-row type="flex">     
          <el-col :span="24">
            <el-form-item label="状态：" prop="c7"  :rules="[{ required: true, message: '请选择状态', trigger: 'blur' }]" class="margin-b0">
               <el-switch  v-model='dialogForm.c7'  active-text="显示" inactive-text="隐藏"> </el-switch>
            </el-form-item>
          </el-col>
       </el-row>
       </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save">保 存</el-button><el-button @click="dialogEditor = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { apiGet, apiPost } from "@/common/api";
export default {
  data() {
    return {
      data2: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1"
                },
                {
                  id: 10,
                  label: "三级 1-1-2"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1"
            },
            {
              id: 6,
              label: "二级 2-2"
            }
          ]
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1"
            },
            {
              id: 8,
              label: "二级 3-2"
            }
          ]
        }
      ],
      openNumber: [], // 树展开 id
      openAndClose: true,
      newAndEditor: "",
      dialogEditor: false,
      // 弹出窗内的数据
      dialogForm: {
        c1: "",
        c2: "",
        c3: "",
        c4: "",
        c5: "",
        c6: "",
        c7: "1"
      }
    };
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 节点点击的回调事件
    handleNodeClick(data) {
      // var url='/sys/login'
      // apiPost(url,page).then(response => {
      //   this.$router.push({ path: '/basisManage/sponsor' })
      //   this.
      // }).catch(error => {
      //   console.log(error)
      // })
    },
    // 一键折叠
    menuClose() {
      for (var i = 0; i < this.$refs.tree.store._getAllNodes().length; i++) {
        this.$refs.tree.store._getAllNodes()[i].expanded = false;
      }
    },
    // 一键展开
    menuOpen() {
      for (var i = 0; i < this.$refs.tree.store._getAllNodes().length; i++) {
        this.$refs.tree.store._getAllNodes()[i].expanded = true;
      }
    },
    // 添加
    menuAdd() {
      this.dialogEditor = true;
      this.newAndEditor = "1";
    },
    // 修改
    menuEditor() {
      this.dialogEditor = true;
      this.newAndEditor = "2";
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
    // 删除子菜单
    menuDelete() {},
    // 获取菜单数据
    menuData() {
      // var url='/sys/login'
      // apiPost(url,page).then(response => {
      //   this.$router.push({ path: '/basisManage/sponsor' })
      //   this.
      // }).catch(error => {
      //   console.log(error)
      // })
      // 设置第一选中
      this.$refs.tree.setCurrentKey(1);
    }
  },
  mounted() {
    this.menuData();
  }
};
</script>
<style scoped="">
.line {
  border: 1px dashed #409eff;
  padding: 20px 30px;
  min-height: 450px;
}
.menu2 {
  padding: 20px 40px;
}
.menu1 {
  margin: auto;
}
.menu2 table {
  width: 100%;
}
.menu2 table td {
  border: 1px solid #e7ecf1;
  padding: 8px;
  line-height: 1.42857;
  vertical-align: top;
  font-size: 12px;
  border-right: 0px;
  border-bottom: 0px;
  color: #606266;
}
.menu2 table {
  border-bottom: 1px solid #ebeef5;
  border-right: 1px solid #ebeef5;
}
.menu2 tr:hover,
.menu2 tr:hover > td {
  background: #f5f7fa;
}
.margin20 {
  margin-right: 20px;
}
.align-r {
  text-align: right;
}
.margin-b0 {
  margin-bottom: -15px;
}
</style>
