<!--  -->
<template>
  <el-card>
    <my-bread leval1="商品管理" leval2="商品列表"></my-bread>
    <el-alert class="el-alert-goodsadd" title="添加商品信息" type="success" center show-icon></el-alert>
    <el-steps align-center class="steps" :active="1 * active" finish-status="success">
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品特性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>
    <!-- 标签页 -->
    <el-form
      label-position="top"
      label-width="80px"
      :model="form"
      style="height:400px; overflow:auto"
    >
      <el-tabs @tab-click="tabchange()" v-model="active" :tab-position="tabPosition">
        <el-tab-pane name="1" label="基本信息">
          <el-form-item label="商品名称">
            <el-input v-model="form.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="form.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="form.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="form.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-cascader
              props.expandTrigger="hover"
              :options="options"
              v-model="selectedOptions"
              :props="defaultProps"
              clearable
              show-all-levels
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="2" label="商品参数">
          <el-form-item v-for="(item,i) in arrDyparams" :key="i" :label="item.attr_name">
            <el-checkbox-group v-model="item.attr_vals">
              <el-checkbox border v-for="(v,i) in item.attr_vals" :key="i" :label="v"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="3" label="商品特性">
          <el-form-item :label="item.attr_name" v-for="(item,i) in arrStaticparams" :key="i">
            <el-input v-model="item.attr_vals"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="4" label="商品图片">
          <el-form-item>
            <el-upload
              action="http://localhost:8888/api/private/v1/upload"
              :headers="headers"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="5" label="商品内容">
          <el-form-item>
            <el-button @click="addGoods()" style="margin-top: 5px;" type="primary">添加商品</el-button>
            <quill-editor v-model="form.goods_introduce"></quill-editor>
          </el-form-item> 
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </el-card>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  name: "goodsadd",
  //props: '',
  data() {
    return {
      active: "1",
      tabPosition: "left",
      form: {
        goods_name: "",
        goods_cat: "",
        goods_price: "",
        goods_number: "",
        goods_weight: "",
        goods_introduce: "",
        pics: [],        
        attrs: []
      },
      options: [],
      selectedOptions: [],
      arrDyparams: [],
      arrStaticparams: [],
      defaultProps: {
        value: "cat_id",
        label: "cat_name",
        children: "children"
      },
      headers: {
        Authorization: localStorage.getItem("token")
      }
    };
  },
  components: { 
    quillEditor
  },
  methods: {
   async addGoods() {
     this.form.goods_cat = this.selectedOptions.join(',')
     let arr1 = this.arrDyparams.map(item => {
       return {attr_id: item.attr_id,attr_vals: item.attr_vals}
     })
     let arr2 = this.arrStaticparams.map(item => {
       return {attr_id: item.attr_id,attr_vals: item.attr_vals}
     })
     this.form.attrs = [...arr1,...arr2]

     const res = await this.$http.post(`goods`,this.form)
     this.$router.push({name: 'goods'})
    },
    handleSuccess(file) {
      // console.log('成功');
      // console.log(file);
      //file.data.tmp_path
      this.form.pics.push('file.data.tmp_path')
    },
    handleRemove(file) {
      //file.response.data.tmp_path
      // console.log('失败');
      // console.log(file);
      let index = this.form.pics.findIndex(item => {
        return file.response.data.tmp_path === this.form.pics.pic
      })
      this.form.pics.split(index,1)
    },
    handlePreview(file) {},
    handleChange() {},
    async tabchange() {
      if (this.active === "2") {
        if (this.selectedOptions.length !== 3) {
          this.$message.warning("请选择商品分类！");
          return;
        }
        const res = await this.$http.get(
          `categories/${this.selectedOptions[2]}/attributes?sel=many`
        );
        this.arrDyparams = res.data.data;
        // console.log(res);
        this.arrDyparams.forEach(item => {
          item.attr_vals =
            item.attr_vals.length === 0 ? [] : item.attr_vals.trim().split(",");
        });
      } else {
        if (this.active === "3") {
          if (this.selectedOptions.length !== 3) {
            this.$message.warning("请选择商品分类！");
            return;
          }
          const res = await this.$http.get(
            `categories/${this.selectedOptions[2]}/attributes?sel=only`
          );
          this.arrStaticparams = res.data.data;
        }
      }
    },
    async getGoodsCate() {
      const res = await this.$http.get(`categories?type=3`);
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
.el-alert-goodsadd {
  margin-top: 10px;
}
.steps {
  margin-top: 10px;
}
.quill-editor {
  margin-top: 10px;
}


</style>