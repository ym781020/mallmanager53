<!--  -->
<template>
  <el-card>
    <my-bread leval1="商品管理" leval2="分类参数"></my-bread>
    <el-alert center type="warning" title="只允许为第三级分类设置参数" style="margin-top: 8px;"></el-alert>
    <el-form label-position="left" label-width="80px">
      <el-form-item label="商品分类" style="margin-top:8px">
        <el-cascader
          props.expandTrigger="hover"
          :options="options"
          v-model="selectedOptions"
          :props="defaultProps"
          clearable
          :show-all-levels="false"
          @change="handleChange"
        ></el-cascader>
      </el-form-item>
    </el-form>
    <el-tabs v-model="active" type="card" @tab-click="handleClick">
      <el-tab-pane label="动态参数" name="1">
        <el-button type="primary">设置动态参数</el-button>
        <el-table
          :data="arrDyparams"
          border
          :header-cell-style="{'text-align':'center'}"
          style="width: 100%"
        >
          <el-table-column type="expand" label="#">
            <template slot-scope="scope">
              <el-tag
                :key="tag"
                v-for="tag in scope.row.attr_vals"
                closable
                :disable-transitions="false"
                @close="handleClose(scope.row,tag)"
              >{{tag}}</el-tag>
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm(scope.row)"
                @blur="handleInputConfirm(scope.row)"
              ></el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            </template>
          </el-table-column>
          <el-table-column label="属性名称" prop="attr_name"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                plan
                type="primary"
                icon="el-icon-edit"
                circle
                @click="editCate(scope.row)"
              ></el-button>
              <el-button
                size="mini"
                plan
                type="danger"
                icon="el-icon-delete"
                circle
                @click="showDeleteCateMsgBox(scope.row.id)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="静态参数" name="2">
        <el-button type="primary">设置静态参数</el-button>        
        <el-table
          :data="arrStaticparams"
          border
          :header-cell-style="{'text-align':'center'}"
          style="width: 100%"
        >
          <el-table-column type="index" label="#">           
          </el-table-column>
          <el-table-column label="属性名称" prop="attr_name"></el-table-column>
          <el-table-column label="属性值" prop="attr_vals"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                plan
                type="primary"
                icon="el-icon-edit"
                circle
                @click="editCate(scope.row)"
              ></el-button>
              <el-button
                size="mini"
                plan
                type="danger"
                icon="el-icon-delete"
                circle
                @click="showDeleteCateMsgBox(scope.row.id)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  name: "cateparams",
  //props: '',
  data() {
    return {
      selectedOptions: [],
      options: [],
      arrDyparams: [],
      arrStaticparams: [],
      defaultProps: {
        value: "cat_id",
        label: "cat_name",
        children: "children"
      },
      active: "1",
      inputVisible: false,
      inputValue: ""
    };
  },
  components: {},
  methods: {
    async handleClose(arr, tag) {
      arr.attr_vals.splice(arr.attr_vals.indexOf(tag), 1);
      // categories/:id/attributes/:attrId
      let putData = {
        attr_name: arr.attr_name,
        attr_sel: "many",
        attr_vals: arr.attr_vals
      };
      const res = await this.$http.put(
        `categories/${this.selectedOptions[2]}}/attributes/${this.arr.attr_id},putData`
      );
      this.arrDyparams = res.data.data;
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm(arr) {
      let inputValue = this.inputValue;
      if (inputValue) {
        arr.attr_vals.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    editCate(cate) {},
    showDeleteCateMsgBox(cateId) {},
    async handleClick() {
      if (this.active ==='2' && this.selectedOptions.length ===3 ) {
        const res = await this.$http.get(`categories/${this.selectedOptions[2]}/attributes?sel=only`)
        // console.log(res);
        this.arrStaticparams = res.data.data
      }
    },
    async handleChange() {
      if (this.selectedOptions.length === 3) {
        const res = await this.$http.get(
          `categories/${this.selectedOptions[2]}/attributes?sel=many`
        );
        this.arrDyparams = res.data.data;
        // console.log(res);
        this.arrDyparams.forEach(item => {
          item.attr_vals =
            item.attr_vals.length === 0 ? [] : item.attr_vals.trim().split(",");
        });
      }
    },
    async getGoodsCate() {
      const res = await this.$http.get(`categories?type=3`);
      //  console.log(res);
      this.options = res.data.data;
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    this.getGoodsCate();
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped>
/* @import url(); 引入css类 */
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>