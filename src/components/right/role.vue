<!--  -->
<template>
  <el-card>
    <!-- 面包屑 -->
    <my-bread leval1="权限管理" leval2="角色列表"></my-bread>
    <el-row class="el_row_">
      <el-col>
        <el-button type="success">添加按钮</el-button>
      </el-col>
    </el-row>
    <el-table
      class="el_table_"
      :data="rolelist"
      border
      style="width: 100%"
      :header-cell-style="{'text-align':'center'}"
      :default-sort="{prop: 'username', order: 'descending'}"
    >
      <el-table-column type="expand" width="150">
        <template slot-scope="scope">
          <el-row v-for="(item1,i) in scope.row.children" :key="i">
            <el-col :span="4">
              <el-tag @close="eltagbtnclose(scope.row,item1.id)" closable>{{item1.authName}}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span="20">
              <el-row v-for="(item2,i) in item1.children" :key="i">
                <el-col :span="4">
                  <el-tag
                    @close="eltagbtnclose(scope.row,item2.id)"
                    closable
                    type="success"
                  >{{item2.authName}}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span="20">
                  <el-tag
                    @close="eltagbtnclose(scope.row,v.id)"
                    closable
                    type="warning"
                    v-for="(v,i) in item2.children"
                    :key="i"
                  >{{v.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <span v-if="scope.row.children.length===0 ">未分配角色</span>
        </template>
      </el-table-column>
      <el-table-column type="index" label="#" width="150"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="200"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" width="200"></el-table-column>
      <el-table-column prop="address" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            size="mini"
            plan
            type="primary"
            icon="el-icon-edit"
            circle
            @click="editUser(scope.row)"
          ></el-button>
          <el-button
            size="mini"
            plan
            type="danger"
            icon="el-icon-delete"
            circle
            @click="showDeleteUserMsgBox(scope.row.id)"
          ></el-button>
          <el-button
            @click="showSetRightDia(scope.row)"
            size="mini"
            plan
            type="success"
            icon="el-icon-check"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="修改权限" :visible.sync="dialogFormVisibleRight">
      <!-- :default-expanded-keys="[2, 3]"
        :default-checked-keys="[5]"
      :default-expanded-keys="expandAll"-->
      <el-tree
        ref="eltreedia"
        :data="treelist"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="checklist"
        :props="defaultProps"
      ></el-tree>
      <div slot="footer" class="dialog-footer">        
        <el-button type="primary" @click="setRoleRight()">确 定</el-button>
        <el-button @click="dialogFormVisibleRight = false">取 消</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  name: "role",
  //props: '',
  data() {
    return {
      rolelist: [],
      treelist: [],
      expandAll: [],
      checklist: [],
      dialogFormVisibleRight: false,
      defaultProps: {
        label: "authName",
        children: "children"
      },
      currRodeId: -1
    };
  },
  components: {},
  methods: {
    // getCheckedKeys getHalfCheckedKeys

    async setRoleRight() {
      let arr1 = this.$refs.eltreedia.getCheckedKeys()
      let arr2 = this.$refs.eltreedia.getHalfCheckedKeys()
      let arr = [...arr1,...arr2]
      this.dialogFormVisibleRight = false;
      const res = await this.$http.post(`roles/${this.currRodeId}/rights`,{rids: arr.join(',')});
      // console.log(res);
      this.getRolelist()
    },
    async showSetRightDia(role) {
      this.dialogFormVisibleRight = true;
      this.currRodeId = role.id;
      const res = await this.$http.get(`rights/tree`);
      this.treelist = res.data.data;

      // let templist = []
      // this.treelist.forEach(item1 => {
      //   templist.push(item1.id)
      //   item1.children.forEach(item2 => {
      //     templist.push(item2.id)
      //     item2.children.forEach(item3 => {
      //       templist.push(item3.id)
      //     });
      //   });
      // });
      // this.expandAll = templist
      role.children.forEach(item1 => {
        // this.checklist.push(item1.id)
        item1.children.forEach(item2 => {
          // this.checklist.push(item2.id)
          item2.children.forEach(item3 => {
            this.checklist.push(item3.id);
          });
        });
      });
    },
    async eltagbtnclose(role, rightId) {
      const res = await this.$http.delete(`roles/${role.id}/rights/${rightId}`);
      // this.getRolelist()
      role.children = res.data.data;
    },
    async getRolelist() {
      const res = await this.$http.get(`roles`);
      this.rolelist = res.data.data;
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    this.getRolelist();
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped>
/* @import url(); 引入css类 */
.el_row_ {
  margin-top: 20px;
}
.el_table_ {
  margin-top: 20px;
}
</style>