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
        <el-menu :router="true" :unique-opened="true">
          <el-submenu :index="item.order + ''" v-for="(item,i) in menuslist" :key="i">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item :index="v.path" v-for="(v,i) in item.children" :key="i">
              <i class="el-icon-platform-eleme"></i>
              <span>{{v.authName}}</span>
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
    return {
      menuslist: []
    };
  },
  components: {},
  methods: {
    async getMenutsData() {
      const res = await this.$http.get(`menus`);
      this.menuslist = res.data.data;
    },
    handleSignout() {
      localStorage.clear();
      this.$message.success("成为退出");
      this.$router.push({ name: "login" });
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  beforeCreate() {
    // const token = localStorage.getItem("token");
    // if (!token) {
    //   this.$router.push({ name: "login" });
    // }
  },
  created() {
    this.getMenutsData();
  },
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
