<template>
  <div>
    <el-form :model="form" ref="form" label-width="100px">
      <el-form-item label="护工" prop="selectData">
        <el-select
          v-model="form.selectData.value"
          filterable
          remote
          reserve-keyword
          placeholder="请输入关键词"
          :remote-method="searchCaregivers"
          :loading="loading">
          <el-option
            v-for="item in form.selectData.options"
            :key="item.id"
            :label="item.caregiverName"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      

      <el-form-item label="下户图片" prop="imageUrls">
        <el-div v-for="(file, index) in form.imageUrls" :key="index" style="position: relative; margin-right:20px; width: 100px; height: 100px; ">
          <el-image
          style="width: 100px; height: 100px; "
          :src="file"
          fit="cover"
          :preview-src-list="[file]"
        >
        </el-image>
        <el-button
            slot="header"
            icon="el-icon-close"
            @click="deleteImage(index)"
            circle
            style=" position: absolute; top: 0;right: 0; margin-top: -90px; opacity: 0.9; text-align: center;"
          ></el-button>
        </el-div>
        <MyUploadImages @upload-image-success="handleUploadImageSuccess"></MyUploadImages>
      </el-form-item>
      <el-form-item label="下户时间" prop="actionAt">
        <el-date-picker type="datetime" v-model="form.actionAt" placeholder="下户时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="备注" prop="d">
        <el-input v-model="form.d"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import MyUploadImages from '../../components/MyUploadImages.vue';
  export default {
    components: {
      MyUploadImages
    },
    decimalFilter: function(value) {
      if (!isNaN(value)) {
        return parseFloat(value).toFixed(2);
      }
      return value;
    },
    data() {
      return {
        formInit: {
          sheetId: "",
          imageUrls:[],
          selectData: {
            options: [],
            value: "",
          },
        },
        form: {
          sheetId: "",
          imageUrls:[],
          selectData: {
            options: [],
            value: "",
          },
        },
        loading: false,
      }
    },
    create(){
      
    },
    mounted(){
      let sheetId = this.$route.params.sheetId;
      this.form.sheetId = sheetId;
    },
    methods: {
      handleUploadImageSuccess(imagesInfo){
        this.form.imageUrls = imagesInfo.imageUrls || ""
      },
      deleteImage(index) {
        this.form.imageUrls.splice(index, 1)
      },
      searchCaregivers(query) {
        if (query !== '') {
          this.loading = true;
          const params = {   }
          if(query){
            params.caregiverNameText = query 
          }
          this.$axios.get('/api/caregivers',{ params })
          .then(res => {
            this.loading = false;
            this.form.selectData.options = res.data.list.map(i => {return {id: i.id,caregiverName: i.caregiverName }});
          })
          .catch(error => {
            console.log("errorrrr:::: ", error);
          });
        } else {
          this.options = [];
        }
      },

      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            const forData = new FormData();
            forData.append('sheetId', this.form.sheetId)
            forData.append('imageUrls', this.form.imageUrls)
            forData.append('actionAt', this.form.actionAt)
            forData.append('caregiver', this.form.selectData.value)
            forData.append('d', this.form.d)
            forData.append('type', 2) // 下户
            let that = this;
            this.$axios
            .post("/api/actions", forData)
            .then(res => {
              console.log("--------333---- axios res:: ", res)
              this.$message.success('创建成功')
              setTimeout(() => {
                this.$router.push('/orders')
                that.form = that.formInit;
              }, 500);
              
            })
            .catch(err => {
              this.$message.success('创建商品失败')
              return Promise.reject(err);
            });
          } else {
            this.$message.error('请填写正确的信息')
          }
        })
      }
    }
  }
</script>

<style>
  /* 修改 el-input 的宽度 */
  .el-input {
    width: 300px;
  }
</style>