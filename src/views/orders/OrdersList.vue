<template>
  <div style="padding-bottom: 50px;">
    <div class="users-manage">
      <div class="search-bar">
        <el-input placeholder="工单编号" v-model="sheetId"></el-input>
        <el-input placeholder="城市" v-model="ServiceCity"></el-input>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </div>

      <el-table :data="orderList" style="width: 100%">
      <el-table-column prop="sheetId" label="订单编号" style="width: 100%"></el-table-column>
      <el-table-column prop="serviceTime" label="服务时间"></el-table-column>
      <el-table-column prop="serviceCity" label="城市"></el-table-column>
      <el-table-column prop="hospitalName" label="医院"></el-table-column>
      <el-table-column prop="deptName" label="科室"></el-table-column>
      <el-table-column prop="memberName" label="会员名称"></el-table-column>
      <el-table-column prop="memberAge" label="会员年龄"></el-table-column>
      <el-table-column prop="memberSex" label="性别" >
        <template slot-scope="{ row }">
          {{ formatSexRender(row.memberSex) }}
        </template>
      </el-table-column>
      <el-table-column prop="memberContactMobile" label="会员联系方式"></el-table-column>
      <el-table-column prop="diseaseSituation" label="症状情况"></el-table-column>
      <el-table-column prop="isexternalCaregiver" label="是否允许院外护⼯">
        <template slot-scope="{ row }">
          {{ formatYN(row.isexternalCaregiver) }}
        </template>
      </el-table-column>
      <el-table-column prop="specialDemand" label="特殊需求"></el-table-column>
      <el-table-column prop="isUrgent" label="是否加急">
        <template slot-scope="{ row }">
          {{ formatYN(row.isUrgent) }}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="工单状态">
        <template slot-scope="{ row }">
          {{ row.status || '' }}
        </template>
      </el-table-column>
      <el-table-column prop="at" label="同步时间"></el-table-column>


      <el-table-column label="操作">
        <template  slot-scope="{ row }">
          <!-- <el-button type="text" size="small" @click="removeItem( row )">修改</el-button> -->
          <el-button class="button-with-spacing"  type="warning" size="small" v-if="row.status == 0" @click="acceptOrder( row )">接单</el-button>
          <el-button class="button-with-spacing"  type="danger" size="small" v-if="row.status == 0" @click="showConfirmDialog( row )">拒单</el-button>
          <el-dialog
          title="拒绝原因"
          :visible.sync="dialogVisible"
          width="30%"
          @close="clearReason"
        >
          <el-form :model="form" label-width="80px">
            <el-form-item label="拒绝原因" prop="reason">
              <el-input v-model="form.reason" placeholder="请输入拒绝原因"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="refuseOrder">确认拒绝</el-button>
              <el-button @click="dialogVisible = false">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>

          <el-button class="button-with-spacing"  type="warning" size="small" v-if="row.status == 1" @click="jump_to_up( row )">上户</el-button>
          <el-button class="button-with-spacing"  type="warning" size="small" v-if="row.status == 2" @click="jump_to_down( row )">下户</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-size="pageSize"
      :total="orderList.length"
      :current-page.sync="currentPage"
      layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="[10, 20, 50]"
    />

    </div>
    
  </div>
</template>

<style>
  .button-with-spacing {
    margin-right: 5px; /* 调整按钮之间的间距 */
    margin-top: 5px; /* 调整按钮之间的间距 */
  }
  /* 订单列表 */
  .el-table__header tr th {
    background-color: #f5f5f5;
  }
  .el-tag {
    margin-right: 5px;
  }

  /* 分页控件 */
  .el-pagination {
    text-align: right;
  }
  .el-pagination__total {
    margin-right: 20px;
  }

  .users-manage {
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

  .users-img {
    width: 100%;
    height: 80px;
    object-fit: contain;
  }

</style>

<script>
export default {
  data() {
    return {
      orderList: [
        //订单列表数据
        {
          id: 11,
          date: "",
          price: 232,
          orderItems:[{
            id: 3233,
            name:'矿泉水',
            amount: 2,
          },{
            id: 3234,
            name:'矿泉水',
            amount: 2,
          },{
            id: 3235,
            name:'矿泉水',
            amount: 2,
          }]
        }
      ],
      pageSize: 10, // 分页大小
      currentPage: 1, // 当前页码

      dialogVisible: false,
      form: {
        sheetId: '',
        reason: ''
      }
    };
  },
  activated() {
    // this.methods.handleSearch()
    this.reloadPage()
  },
  methods: {
    reloadPage(){
      const params = { user_id: 10000 }
        this.$axios.get('/api/orders',params )
          .then(res => {
            this.orderList = res.data.list;
            // alert(res.data.list.length)
          })
          .catch(error => {
            console.error("errorrrr:::: ", error);
          });
    },
    acceptOrder(orderItem){
        this.$axios.get('/api/orders/accept',{sheetId: orderItem.sheetId} )
          .then(res => {
            this.orderList = res.data.list;
            // alert(res.data.list.length)
          })
          .catch(error => {
            console.error("errorrrr:::: ", error);
          });
    },
    showConfirmDialog(orderItem) {
      this.dialogVisible = true;
      this.form.sheetId = orderItem.sheetId;
    },
    clearReason() {
      this.form.reason = '';
      this.form.sheetId = '';
      this.dialogVisible = false;
    },
    refuseOrder() {
      // 在这里可以处理拒绝原因
      console.log('拒绝原因：', this.form.reason);
      let that = this;
      this.$axios.get('/api/orders/refuse', this.form )
        .then(res => {
          if(res.data.status != 200){
            this.$message.error(res.data.message || '失败')
          } else {
            // 处理完逻辑后关闭对话框
            this.dialogVisible = false;
            this.$message.success('创建成功')
            that.form = { reason: '', shheetId: ''};
            setTimeout(() => {
              this.$router.push('/orders')
            }, 500);

          } 
          
        })
        .catch(error => {
          console.error("errorrrr:::: ", error);
        });
      
    },



    formatPrice(price) { // 分转元
      return (price / 100).toFixed(2)
    },
    formatSexRender(memberSex) {
      const sexMap = {
        "N1241": '男',
        "N1242": '女'
      };
      return sexMap[memberSex] || memberSex; 
    },
    formatYN(num) {
      const listss = ["否","是"]
      return listss[num] || num; 
    },
    jump_to_up(it) {
      this.$router.push({
        name: 'OrdersUp',
        params: {
          sheetId:it.sheetId
        }
      })
      // 商品编辑逻辑
    },
    jump_to_down(it) {
      this.$router.push({
        name: 'OrdersDown',
        params: {
          sheetId: it.sheetId
        }
      })
    },
  },
  
};
</script>