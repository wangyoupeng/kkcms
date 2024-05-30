<template>
  <div class="actions-manage">
    
    <div class="search-bar">
      <el-input placeholder="护工名称" v-model="nameText"></el-input>
      <el-input placeholder="工单号" v-model="sheetIdText"></el-input>
      <el-button type="primary" @click="handleSearch">搜索</el-button>
    </div>
      
    <el-table :data="actionsList" style="width: 100%">
      <el-table-column prop="sheetId" label="工单号"></el-table-column>
      <el-table-column prop="type" label="上下户"></el-table-column>
      <el-table-column prop="caregiver" label="护工"></el-table-column>
      <el-table-column prop="actionAt" label="上下户时间"></el-table-column>
      <el-table-column prop="oprater" label="操作人员"></el-table-column>
      
      <el-table-column :label="图片">
        <template slot-scope="{ row }">
          <el-image
            v-for="(url, index) in row.imageUrls"
            :key="index"
            :src="url"
            style="width: 100px; height: 100px; margin-right: 10px;"
            fit="cover"
          ></el-image>
        </template>
        
      </el-table-column>
      <el-table-column prop="d" label="备注"></el-table-column>
    </el-table>

    <el-pagination
      style="margin-top: 20px;"
      layout="total,prev,pager,next"
      :total="total"
      :page-size="pageSize"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>




<script>
export default {
  data() {
    return {
      total: 0,
      actionsList: [],
      nameText: '',
      sheetIdText: '',
      pageSize: 10,
      currentPage: 1,
      label: '商品图片'
    }
  },
  created() {
    // this.methods.handleSearch()
    const params = {  pageSize: this.pageSize, currentPage: this.currentPage }
    if(this.nameText){
      params.nameText = this.nameText 
    }
    if(this.sheetIdText){
      params.sheetIdText = this.sheetIdText 
    }
    this.$axios.get('/api/actions',{ params })
      .then(res => {
        this.actionsList = res.data.list;
        this.total = res.data.total;
      })
      .catch(error => {
        console.log("errorrrr:::: ", error);
      });
  },
  computed: { // 计算
    
  },
  methods: {
    handleSearch() {
      const params = { nameText: this.nameText,sheetIdText: this.sheetIdText, pageSize: this.pageSize, currentPage: this.currentPage }
      this.$axios.get('/api/actions',{ params })
      .then(res => {
        this.actionsList = res.data.list;
        this.total = res.data.total;
      })
      .catch(error => {
        console.log(error);
      });
    },
    
    handleCurrentChange(val) {
      this.currentPage = val
      this.handleSearch()
    },
    formatPrice(price) { // 分转元
      return (price / 100).toFixed(2)
    },
  },
  // 在从详情页返回时重新加载列表数据
  activated() {
    this.handleSearch();
  }
}
</script>


<style scoped>
  .actions-manage {
    /* padding: 20px; */
  }

  .search-bar {
    margin-bottom: 20px;
  }
  .search-bar .el-input{
    width: 200px;
    margin-right: 5px;
  }

  .create-bar {
    float: right;
    margin-right: 10px;
  }

  .actions-img {
    width: 100%;
    height: 80px;
    object-fit: contain;
  }
</style>

