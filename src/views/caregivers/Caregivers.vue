<template>
  <div class="caregivers-manage">
    
    <div class="search-bar">
      <el-input placeholder="护工名称" v-model="caregiverNameText"></el-input>
      <el-input placeholder="手机号" v-model="phoneText"></el-input>
      <el-button type="primary" @click="handleSearch">搜索</el-button>
      <div class="create-bar">
        <el-button type="primary" @click="handleCaregiversAdd">新建</el-button>
      </div>
      
    </div>
      
    <el-table :data="caregiversList" style="width: 100%">
      <el-table-column :label="label">
        <template slot-scope="{ row }">
          <!-- v-for="(file, index) in imageUrls"
          <img :src="row.imageUrl" class="caregivers-img"> -->
          <el-image
            v-for="(url, index) in row.imageUrls"
            :key="index"
            :src="url"
            style="width: 100px; height: 100px; margin-right: 10px;"
            fit="cover"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="caregiverName" label="护工名"></el-table-column>
      <el-table-column prop="caregiverAge" label="年龄"></el-table-column>
      <el-table-column prop="phone" label="手机号码"></el-table-column>
      <el-table-column prop="careAt" label="开始护理时间"></el-table-column>
      <el-table-column prop="serviceCity" label="服务城市"></el-table-column>
      <el-table-column prop="d" label="备注"></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="{ row }">
          <el-button type="text" size="small" @click="handleEdit(row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(row.id)">删除</el-button>
        </template>
      </el-table-column>
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
      caregiversList: [],
      caregiverNameText: '',
      phoneText: '',
      pageSize: 5,
      currentPage: 1,
      label: '商品图片'
    }
  },
  created() {
    // this.methods.handleSearch()
    const params = {  pageSize: this.pageSize, currentPage: this.currentPage }
    if(this.caregiverNameText){
      params.caregiverNameText = this.caregiverNameText 
    }
    if(this.phoneText){
      params.phoneText = this.phoneText 
    }
    this.$axios.get('/api/caregivers',{ params })
      .then(res => {
        this.caregiversList = res.data.list;
        this.total = res.data.total;
      })
      .catch(error => {
        console.log("errorrrr:::: ", error);
      });
  },
  computed: { // 计算
    pageCaregiversList() {
      const start = (this.currentPage - 1) * this.pageSize
      const end = this.currentPage * this.pageSize
      return this.filterCaregiversList.slice(start, end)
    }
  },
  methods: {
    handleSearch() {
      const params = { filterText: this.filterText, pageSize: this.pageSize, currentPage: this.currentPage }
      this.$axios.get('/api/caregivers',{ params })
      .then(res => {
        this.caregiversList = res.data.list;
        this.total = res.data.total;
      })
      .catch(error => {
        console.log(error);
      });
    },
    handleEdit(caregiversItem) {
      console.log('============ caregiversItem to edit', caregiversItem)
      this.$router.push({
        name: 'CaregiversEdit',
        params: {
          caregiversItem
        }
      })
      // 商品编辑逻辑
    },
    handleDelete(caregivers_id) {
      // 商品删除逻辑
      this.$axios.post('/api/caregivers/del',{ caregivers_id })
      .then((res) => {
        // this.$router.push('/caregivers')
        if(res.data.message == 'ok'){
          this.$message.success('删除成功')
          this.handleSearch()
        }
       
      })
      .catch(error => {
        console.log(error);
      });
    },
    handleCaregiversAdd() {
      this.$router.push('/caregivers/add')
    },
    handleCurrentChange(val) {
      // console.log('---val:', val)
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
  .caregivers-manage {
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

  .caregivers-img {
    width: 100%;
    height: 80px;
    object-fit: contain;
  }
</style>

