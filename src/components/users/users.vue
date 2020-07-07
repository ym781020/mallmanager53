<!--  -->
<template>
  <el-card class="box-card">
    <!-- 1.面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 2.搜索 -->
    <el-row class="searchRow">
      <el-col>
        <el-input placeholder="请输入内容" v-model="query" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="success">添加按钮</el-button>
      </el-col>
    </el-row>
    <!-- 3.表格 -->
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      :default-sort="{prop: 'date', order: 'descending'}"
    >
      <el-table-column type="index" prop="date" label="#" width="60"></el-table-column>
      <el-table-column prop="name" label="姓名" width="80"></el-table-column>
      <el-table-column prop="address" label="邮箱" width="140"></el-table-column>
      <el-table-column prop="name" label="电话" width="100"></el-table-column>
      <el-table-column prop="address" label="创建日期" width="120"></el-table-column>
      <el-table-column prop="name" label="用户状态" width="180"></el-table-column>
      <el-table-column prop="address" label="操作" width="180"></el-table-column>
    </el-table>
    <!-- 4.分页 -->
  </el-card>
</template>

<script>
export default {
  name: "users",
  //props: '',
  data() {
    return {
      query: "",
      pagemun: 1,
      pagesize: 20,
      tableData: []
    };
  },
  components: {},
  methods: {
    async getUserList() {
      const token = localStorage.getItem('token')
      this.$http.defaults.headers.common['Authorization'] = token;
      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagemun}&pagesize=${this.pagesize}`
      );
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    this.getUserList();
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped>
/* @import url(); 引入css类 */
.box-card {
  height: 100%;
}
.el-input {
  width: 300px;
}
.input-with-select {
  background-color: #fff;
}
.searchRow {
  margin-top: 20px;
}
.el-table__header {
  /* text-align: center; */
  /* width:50px;margin:0px auto; */
  /* width: 200px;  */
  /* border: 1px solid #ee2415;   */
  text-align: center;
  /* padding: 2px 5px */
}
</style>