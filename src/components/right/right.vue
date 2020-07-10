<!--  -->
<template>
  <el-card>
    <!-- 面包屑 -->
    <my-bread leval1="权限管理" leval2="权限列表"></my-bread>
    <!-- 表格 -->
    <el-table
      class="el_table_"
      height='610'
      :data="rightList"
      :header-cell-style="{'text-align':'center'}"
      border
      style="width: 100%"
    >
      <el-table-column label="#" type="index" width="80"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column label="层级" width="80">
        <template slot-scope="scope" >
          <span v-if="scope.row.level === '0'">一级</span>
          <span v-if="scope.row.level === '1'">二级</span>
          <span v-if="scope.row.level === '2'">三级</span>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  name: "right",
  //props: '',
  data() {
    return {
      rightList: []
    };
  },
  components: {},
  methods: {
    async getRightlist() {
      const res = await this.$http.get(`rights/list`);
      // console.log(res);
      this.rightList = res.data.data;
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    this.getRightlist();
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped>
/* @import url(); 引入css类 */
.el_table_ {
  margin-top: 20px;
  overflow: auto;
}
</style>