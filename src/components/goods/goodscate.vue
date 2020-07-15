<!--  -->
<template>
  <el-card>
    <!-- 面包屑 -->
    <my-bread leval1="商品管理" leval2="商品分类"></my-bread>
    <el-row>
      <el-col :span="24" class="searchArea">
        <el-button style="margin-top: 8px;" type="success" @click="addGoodsCateDia()">添加按钮</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-dialog title="添加分类" :visible.sync="dialogFormVisibledAdd">
      <el-form :model="form">
        <el-form-item label="分类名称" label-width="100px">
          <el-input v-model="form.cat_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item sortable label="分类" label-width="100px">
          <el-cascader
            props.expandTrigger="hover"
            props.checkStrictly
            clearable
            :options="catelist"
            v-model="selectedOptions"
            :props="defaultProps"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addCate()">确 定</el-button>
        <el-button @click="dialogFormVisibledAdd = false">取 消</el-button>
      </div>
    </el-dialog>
    <el-table height="450" :data="goodsCateList" style="width: 100%">
      <!-- treeKey  -> node-key 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的
      parentKey   父节点id
      childNumKey 子节点id
      levelKey    当前节点层级
      -->
      <el-tree-grid
        label="分类名称"
        prop="cat_name"
        treeKey="cat_id"
        parentKey="cat_pid"
        levelKey="cat_level"
        childKey="children"        
      ></el-tree-grid>
      <el-table-column label="级别">
        <template slot-scope="scope">
          <span v-if="scope.row.cat_level===0">一级</span>
          <span v-else-if="scope.row.cat_level===1">二级</span>
          <span v-else-if="scope.row.cat_level===2">三级</span>
        </template>
      </el-table-column>
      <el-table-column label="是否有效">
        <template slot-scope="scope">
          <span v-if="scope.row.cat_deleted===false">有效</span>
          <span v-else-if="scope.row.cat_deleted===true">无效</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            size="mini"
            plan
            type="primary"
            icon="el-icon-edit"
            circle
            @click="editGoodsCate(scope.row)"
          ></el-button>
          <el-button
            size="mini"
            plan
            type="danger"
            icon="el-icon-delete"
            circle
            @click="deleGoodsCate(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <pages
      class="mygoods_"
      :total="total"
      :currentPage="pageNum"
      :pageSize="pageSize"
      @handleCurrentChangeSub="handleCurrentChange"
    ></pages>
  </el-card>
</template>

<script>
const ElTreeGrid = require("element-tree-grid")
export default {
  name: "goodscate",
  //props: '',
  data() {
    return {
      total: 0,
      pageNum: 1,
      pageSize: 20,
      query: "",
      goodsCateList: [],
      catelist: [],
      selectedOptions: [],
      defaultProps: {
        value: "cat_id",
        label: "cat_name",
        children: "children"
      },
      form: {
        cat_pid: -1, 
        cat_name: "",
        cat_level: -1
      },
      dialogFormVisibledAdd: false
    };
  },
  components: {
    ElTreeGrid
  },
  methods: {
   async addCate() {
     if (this.selectedOptions === 0) {
       this.form.cat_pid = 0 
       this.form.cat_level = 0
     } else if (this.selectedOptions ===1) {
       this.form.cat_pid = this.selectedOptions[0]
       this.form.cat_level = 1
     } else if (this.selectedOptions === 2) {
       this.form.cat_pid = this.selectedOptions[1]
       this.form.cat_level = 2
     }
    const res = await this.$http.post(`categoties`,this.form)
    this.dialogFormVisibledAdd = false;
    this.form = {}
    this.loadGoodsCateList()
    },
    addGoodsCateDia() {
      this.dialogFormVisibledAdd = true;
      this.loadCasList();
    },
    editGoodsCate(goodscate) {},
    deleGoodsCate(goodscate) {},
    getIndex(val) {
      return (this.pageNum - 1) * this.pageSize + val + 1;
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.loadGoodsCateList();
    },
    async loadGoodsCateList() {
      const res = await this.$http.get(
        `categories?type=3&pagenum=${this.pageNum}&pagesize=${this.pageSize}`
      );
        // console.log(res);
      this.goodsCateList = res.data.data.result;
      this.total = res.data.data.total;
    },
    async loadCasList() {
      const res = await this.$http.get(
        `categories?type=2&pagenum=${this.pageNum}&pagesize=${this.pageSize}`
      );
      // console.log(res);
      this.catelist = res.data.data.result;
      //   this.total = res.data.data.total;
    },
    showAddDoodaddGoodsCateDia() {}
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    this.loadGoodsCateList();
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>