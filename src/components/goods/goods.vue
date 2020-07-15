<!--  -->
<template>
  <el-card>
    <!-- 面包屑 -->
    <my-bread leval1="商品管理" leval2="商品列表"></my-bread>
    <!-- 搜索 -->
    <el-row class="searchRow">
      <el-col>
        <el-input
          @clear="loadGoodsList()"
          clearable
          placeholder="请输入内容"
          v-model="query"
          class="input-with-select"
        >
          <el-button @click="searchgoods()" slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="success" @click="showAddDoodsDia()">添加按钮</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table
      class="el_table_"
      height="550"
      :data="goodsList"
      :header-cell-style="{'text-align':'center'}"
      border
      style="width: 100%"
    >
      <el-table-column label="#" type="index" :index="getIndex" width="80"></el-table-column>
      <el-table-column sortable prop="goods_name" label="商品名称" width="200"></el-table-column>
      <el-table-column sortable prop="goods_price" label="价格" width="100"></el-table-column>
      <el-table-column sortable prop="goods_number" label="数量" width="100"></el-table-column>
      <el-table-column sortable prop="goods_weight" label="重量" width="100"></el-table-column>

      <el-table-column sortable prop="goods_state" label="商品状态" width="80">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.goods_state"
            disabled
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column sortable label="添加时间" width="120">
        <template slot-scope="scope">{{scope.row.add_time|fmtdate}}</template>
      </el-table-column>
      <el-table-column sortable label="更新时间" width="120">
        <template slot-scope="scope">{{scope.row.upd_time|fmtdate}}</template>
      </el-table-column>
      <el-table-column sortable prop="hot_mumber" label="热销品数量" width="100"></el-table-column>
      <el-table-column sortable label="是否是热销品" width="110">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.is_promote"
            disabled
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作" width="190">
        <template slot-scope="scope">
          <el-button
            size="mini"
            plan
            type="primary"
            icon="el-icon-edit"
            circle
            @click="editGoods(scope.row)"
          ></el-button>
          <el-button
            size="mini"
            plan
            type="danger"
            icon="el-icon-delete"
            circle
            @click="showDeleteGoodsMsgBox(scope.row.id)"
          ></el-button>          
        </template>
      </el-table-column>
    </el-table>
    <!-- 4.分页 -->
    <!-- <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagemun"
      :page-sizes="[50, 100,150 , 200]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>-->
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
export default {
  name: "goods",
  //props: '',
  data() {
    return {
      currgoodsid: -1,
      pageNum: 1,
      total: 0,
      pageSize: 50,
      goodsList: [],
      query: ""
    };
  },
  components: {},
  methods: {
    searchgoods() {},
    showAddDoodsDia() {
      this.$router.push({ name: 'goodsadd'})
    },
    getIndex(val) {
      return (this.pageNum - 1) * this.pageSize + val + 1;
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.loadGoodsList();
    },
    showGoodsRole(goods) {},
    showDeleteGoodsMsgBox(goodid) {},
    editGoods(goods) {},
    async loadGoodsList() {
      const res = await this.$http.get(
        `goods?query=${this.query}&pagenum=${this.pageNum}&pagesize=${this.pageSize}`
      );
      //   console.log(res);
      const {
        meta: { status, msg },
        data: { goods, total }
      } = res.data;
      if (status === 200) {
        this.goodsList = goods;
        this.total = total;
      } else {
        this.$message.warning(msg);
      }
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    this.loadGoodsList();
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
  margin-top: 10px;
}
.el_table_ {
  margin-top: 10px;
  overflow: auto;
}
.mygoods_ {
  margin-top: 10px;
}
</style>