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
          imageUrl: [
            {  message: '请上传图片', trigger: 'blur' },
          ],
          name: [
            { required: true, message: '请输入护工名称', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' },
          ],
          description: [
            { required: true, message: '请输入护工描述', trigger: 'blur' },
            { min: 2, max: 100, message: '长度在 5 到 100 个字符', trigger: 'blur' },
          ],
          price: [
            { required: true, message: '请输入护工价格', trigger: 'blur' },
            // { type: 'number', message: '必须为数字值' }
          ],
          stock: [
            { required: true, message: '请输入护工价格', trigger: 'blur' },
            // { type: 'number', message: '必须为数字值' }
          ],
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
            if(this.form.imageUrls != this.editItem.imageUrls) forData.imageUrls = this.form.imageUrls
            if(this.form.caregiverName != this.editItem.caregiverName) forData.caregiverName = this.form.caregiverName
            if(this.form.phone != this.editItem.phone) forData.phone = this.form.phone
            if(this.form.caregiverAge != this.editItem.caregiverAge) forData.caregiverAge = this.form.caregiverAge
            if(this.form.careAt != this.editItem.careAt) forData.careAt = this.form.careAt
            if(this.form.serviceCity != this.editItem.serviceCity) forData.serviceCity = this.form.serviceCity
            if(this.form.d != this.editItem.d) forData.d = this.form.d


            if(Object.keys(forData).length < 2) {
              this.$message.success('无修改..')
              return
            }
            // 发送创建护工请求
            this.$axios
            .put("/api/caregivers/edit",forData)
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