<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="上户图片" prop="imageUrl">
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
      <el-form-item label="上户时间" prop="careAt">
        <el-date-picker type="datetime" v-model="form.careAt" placeholder="上户时间"></el-date-picker>
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
        form: {
          sheetId: "",
          imageUrls:[],
        },
      }
    },
    create(){
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