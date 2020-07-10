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
        <el-input
          @clear="loadUserList()"
          clearable
          placeholder="请输入内容"
          v-model="query"
          class="input-with-select"
        >
          <el-button @click="searchUser()" slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="success" @click="showAddUsersDia()">添加按钮</el-button>
      </el-col>
    </el-row>
    <!-- 3.表格 -->
    <el-table
      class="el_table_"
      :data="userlist"
      border
      style="width: 100%"
      :header-cell-style="{'text-align':'center'}"
      :default-sort="{prop: 'username', order: 'descending'}"
    >
      <el-table-column type="index" label="#" width="60"></el-table-column>
      <el-table-column prop="username" label="姓名" width="80"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="140"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="120"></el-table-column>
      <el-table-column prop="create_time" label="创建日期" width="120">
        <template slot-scope="userlist">{{userlist.row.create_time|fmtdata}}</template>
      </el-table-column>
      <el-table-column prop="mg_state" label="用户状态" width="80">
        <template slot-scope="userlist">
          <el-switch
            v-model="userlist.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作" width="180">
        <template slot-scope="userlist">
          <el-button
            size="mini"
            plan
            type="primary"
            icon="el-icon-edit"
            circle
            @click="editUser(userlist.row)"
          ></el-button>
          <el-button
            size="mini"
            plan
            type="danger"
            icon="el-icon-delete"
            circle
            @click="showDeleteUserMsgBox(userlist.row.id)"
          ></el-button>
          <el-button
            @click="showUserRole(userlist.row)"
            size="mini"
            plan
            type="success"
            icon="el-icon-check"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 4.分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagemun"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- 对话框 -->
    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密 码" label-width="100px">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮 箱" label-width="100px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电 话" label-width="100px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addUser()">确 定</el-button>
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 编辑用户对话框 -->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px">
          <el-input v-model="form.username" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮 箱" label-width="100px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电 话" label-width="100px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editUserMsgBox()">确 定</el-button>
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 编辑角色对话框 -->
    <el-dialog title="分配用户角色" :visible.sync="dialogFormVisibleRol">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px">{{currusername}}</el-form-item>
        <el-form-item label="角色名称" label-width="100px">
          <el-select v-model="currRoleId">
            <el-option label="请选择" :value="-1"></el-option>
            <el-option
              v-for="(item,i) in roles"
              :label="item.roleName"
              :value="item.id"
              :key="i"
            ></el-option>            
          </el-select>
        </el-form-item>
      </el-form>      
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="setRole()">确 定</el-button>
        <el-button @click="dialogFormVisibleRol = false">取 消</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  name: "users",
  //props: '',
  data() {
    return {
      query: "",
      currusername: "",
      curruserid: '',
      userlist: [],
      roles: [],
      total: -1,
      pagemun: 1,
      pagesize: 8,
      currRoleId: -1,
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      dialogFormVisibleRol: false,
      // 添加表单的数据
      form: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      }
    };
  },
  components: {},
  methods: {
    async setRole() {
      // console.log(this.curruserid);      
      const res = await this.$http.put(`users/${this.curruserid}/role`,{ rid: this.currRoleId})      
      const {status,msg} = res.data.meta
      if (status === 200) {
        this.$message.success(msg)
        this.dialogFormVisibleRol = false
      } else {
        this.$message.warning(msg)
      }
    },

    async showUserRole(user) {
      this.dialogFormVisibleRol = true
      this.currusername = user.username
      this.curruserid = user.id
      const role = await this.$http.get(`roles`)
      this.roles = role.data.data
      const res = await this.$http.get(`users/${user.id}`);
      // console.log(res);
      this.currRoleId = res.data.data.rid
    },
    async editUserMsgBox() {
      const res = await this.$http.put(`users/${this.form.id}`, this.form);
      if (res.data.meta.status === 200) {
        this.dialogFormVisibleEdit = false;
        // this.form = {}
        this.getUserList();
        // console.log(res);        
        for (const key in this.form) {
          if (this.form.hasOwnProperty(key)) {
            this.form[key] = "";
          }
        }
        this.$message.success(res.data.meta.msg);
      } else {
        this.$message.warning(res.data.meta.msg);
      }
    },
    editUser(user) {
      this.dialogFormVisibleEdit = true;
      this.form = user;
      // console.log(user);      
    },
    showDeleteUserMsgBox(userId) {
      this.$confirm("删除此用户?", "提示", {
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.delete(`users/${userId}`);
          if (res.data.meta.status === 200) {
            this.pagemun = 1;
            this.getUserList();
            this.$message({
              type: "success",
              message: res.data.meta.msg
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    async addUser() {
      const res = await this.$http.post(`users`, this.form);
      const {
        meta: { status, msg },
        data
      } = res.data;
      if (status === 201) {
        this.$message.success(msg);
        this.getUserList();
        // this.form = {}
        for (const key in this.form) {
          if (this.form.hasOwnProperty(key)) {
            this.form[key] = "";
          }
        }
      } else {
        this.$message.warning(msg);
      }
      this.dialogFormVisibleAdd = false;
    },
    showAddUsersDia() {
      this.dialogFormVisibleAdd = true;
    },
    loadUserList() {
      this.getUserList();
    },
    searchUser() {
      this.getUserList();
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.pagesize = val;
      this.getUserList();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.pagemun = val;
      this.getUserList();
    },
    async getUserList() {    
      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagemun}&pagesize=${this.pagesize}`
      );
      const {
        meta: { status, msg },
        data: { users, total }
      } = res.data;
      if (status === 200) {
        // 1.给表格数据赋值
        // 2.给total赋值
        this.userlist = users;
        this.total = total;
        // this.$message.success(msg);
      } else {
        // this.$message.warning(msg);
      }
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
.el_table_ {
  margin-top: 20px;
  overflow: auto;
}
</style>