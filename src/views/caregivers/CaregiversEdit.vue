<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="图片" prop="imageUrls">
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
        <el-button type="primary" @click="submitForm('form')">修改</el-button>
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
    filters: {
    decimalFilter: function(value) {
        if (!isNaN(value)) {
          return parseFloat(value).toFixed(2);
        }
        return value;
      }
    },
    data() {
      return {
        form: {
          imageUrls: [],
        },
        editItem: {},
        rules: {

        }
      }
    },
    create(){
      let editItem = this.$route.params.caregiversItem;
      this.form = {... editItem}
      this.editItem = {... editItem}
      
    },
    activated() {
      let editItem = this.$route.params.caregiversItem;
      this.form = {... editItem}
      this.editItem = {... editItem}
    },
    methods: {
      handleUploadImageSuccess(imagesInfo){
        this.form.imageUrls = [...this.form.imageUrls,...imagesInfo.imageUrls]
      },
      deleteImage(index) {
        this.form.imageUrls.splice(index, 1)
      },
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            const forData = {};
            forData.id = this.form.id
            forData.imageUrls = this.form.imageUrls
            forData.caregiverName = this.form.caregiverName
            forData.phone = this.form.phone
            forData.caregiverAge = this.form.caregiverAge
            forData.careAt = this.form.careAt
            forData.serviceCity = this.form.serviceCity
            forData.d = this.form.d

            console.log("this.form::", this.form)
            console.log("this.editItem::", this.editItem)


            // 发送创建护工请求
            this.$axios
            .post("/api/caregivers/update",forData)
            .then(res => {
              console.log("--------333---- axios res:: ", res)
              this.$message.success('修改成功')
              setTimeout(() => {
                // this.$router.go(-1) //
                this.$router.push('/caregivers')
              }, 500);
              
            })
            .catch(err => {
              this.$message.success('创建护工失败')
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