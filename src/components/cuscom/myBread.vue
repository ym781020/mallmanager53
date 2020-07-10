<!--  -->
<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
    <el-breadcrumb-item>首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{leval1}}</el-breadcrumb-item>
    <el-breadcrumb-item>{{leval2}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: "myBread",
  props: ['leval1','leval2'],
  data() {
    return {};
  },
  components: {},
  methods: {},
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>