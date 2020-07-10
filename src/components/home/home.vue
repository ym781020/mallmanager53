<!--  -->
<template>
  <el-container class="container">
    <el-header class="header">
      <el-row class="header-el-row">
        <el-col class="header-el-col" :span="6">
          <div class="header-grid-content bg-purple">
            <img class="logoimg" src="../../assets/logo.jpg" alt="无法显示图片" />
          </div>
        </el-col>
        <el-col :span="14" class="middle">
          <h3>电商后台管理系统</h3>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <a class="loginout" @click="handleSignout()" href="#">退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">
        <!-- 侧边栏导航 -->
        <el-menu 
        :router = "true"
        :unique-opened="true">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="users">
              <i class="el-icon-platform-eleme"></i>
              <span>用户列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-tools"></i>
              <span>权限管理</span>
            </template>            
            <el-menu-item index="roles">
              <i class="el-icon-user-solid"></i>
              <span>角色列表</span>
            </el-menu-item>
            <el-menu-item index="rights">
              <i class="el-icon-star-on"></i>
              <span>权限列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-goods"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="3-1">
              <i class="el-icon-picture-outline"></i>
              <span>商品列表</span>
            </el-menu-item>
            <el-menu-item index="3-2">
              <i class="el-icon-picture-outline-round"></i>
              <span>分类参数</span>
            </el-menu-item>
            <el-menu-item index="3-3">
              <i class="el-icon-s-order"></i>
              <span>商品分类</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-s-unfold"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="4-1">
              <i class="el-icon-s-operation"></i>
              <span>订单列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-s-marketing"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="5-1">
              <i class="el-icon-s-grid"></i>
              <span>数据报表</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "home",
  //props: '',
  data() {
    return {};
  },
  components: {},
  methods: {
    handleSignout() {
      localStorage.clear()
      this.$message.success('成为退出')
      this.$router.push({name: 'login'})
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  beforeCreate () {
    const token = localStorage.getItem('token')
    if (!token) {
      this.$router.push({name: 'login'})
    }
  },
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped>
/* @import url(); 引入css类 */
.container {
  height: 100%;
}
.header {
  background-color: #b3c0d1;
  height: 100%;
  padding: 0;
}
.aside {
  background-color: #d3dce6;
}
.main {
  height: 100%;
  background-color: #e9eef3;
}
.middle {
  /* line-height: 60px; */
  text-align: center;
}
.loginout {
  line-height: 60px;
  text-decoration: none;
}
.logoimg {
  /* background-position: center center; */
  background-repeat: no-repeat;
  /* background-size: cover; */
  /* width: 400px;*/
  /* height: 60px;  */
  display: inline-block;
  max-height: 60px;
  max-width: 100%;
  /* height: 100%; */

  /* border-width: 0;
  border: none; */
  /* vertical-align: left; */
}
</style>
