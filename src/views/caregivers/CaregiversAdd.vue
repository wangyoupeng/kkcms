<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="图片" prop="imageUrl">
        <MyUploadImages @upload-image-success="handleUploadImageSuccess"></MyUploadImages>
      </el-form-item>
      <el-form-item label="护工名称" prop="caregiverName">
        <el-input v-model="form.caregiverName"></el-input>
      </el-form-item>
      <el-form-item label="护工年龄" prop="caregiverAge">
        <el-input type="number" v-model="form.caregiverAge"></el-input>
      </el-form-item>
      <el-form-item label="护工手机号码" prop="phone">
        <el-input  v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="选择开始护理日期" prop="careAt">
        <el-date-picker type="date" v-model="form.careAt" placeholder="请选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="服务城市" prop="serviceCity">
        <el-input v-model="form.serviceCity"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="d">
        <el-input v-model="form.d"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">创建</el-button>
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
        form: {
        },
        rules: {
          
        }
      }
    },
    methods: {
      handleUploadImageSuccess(imagesInfo){
        console.log("-----444---imagesInfo:", imagesInfo)
        this.form.imageUrls = imagesInfo.imageUrls || ""
      },
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            const forData = new FormData();
            forData.append('imageUrls', this.form.imageUrls)
            forData.append('caregiverName', this.form.caregiverName)
            forData.append('phone', this.form.phone)
            forData.append('caregiverAge', this.form.caregiverAge)
            forData.append('careAt', this.form.careAt)
            forData.append('serviceCity', this.form.serviceCity)
            forData.append('d', this.form.d)
            // 发送创建商品请求
            this.$axios
            .post("/api/caregivers",forData)
            .then(res => {
              console.log("--------333---- axios res:: ", res)
              this.$message.success('创建成功')
              setTimeout(() => {
                this.$router.push('/caregivers')
                this.forData = {};
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