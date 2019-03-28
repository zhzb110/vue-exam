<template>
  <div class="pagination-container">
    <el-pagination
    background
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="[10, 20, 30]"
    :page-size="pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="totalCount">
  </el-pagination>
</div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: ["currentPage", "pageSize", "totalCount"],
  methods: {
    handleCurrentChange(val) {
      // 改变当前页码
      // 条用父组件的事件
      this.$emit("on-current-page-change", val);
    },
    handleSizeChange(val) {
      // 改变每页现实的个数
      // 条用父组件的事件
      this.$emit("on-page-size-change", val);
    }
  }
};
</script>
<style type="text/css">
.el-pagination {
  float: right;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
