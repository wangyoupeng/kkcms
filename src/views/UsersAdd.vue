<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    components: {},
    decimalFilter: function(value) {
      if (!isNaN(value)) {
        return parseFloat(value).toFixed(2);
      }
      return value;
    },
    data() {
      return {
        form: {
          id: 0,
          name: '',
          phone: '',
          password: '',
        },
        rules: {
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' },
          ],
          phone: [
            { required: false, message: '请输入', trigger: 'blur' },
            { min: 2, max: 100, message: '长度在 0 到 100 个字符', trigger: 'blur' },
          ],
          password: [
            { required: false, message: '请输入描述', trigger: 'blur' },
            { min: 2, max: 100, message: '长度在 0 到 100 个字符', trigger: 'blur' },
          ],
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            const forData = new FormData();
            forData.append('name', this.form.name)
            forData.append('phone', this.form.phone)
            forData.append('password', this.form.password)
            // 发送创建请求
            this.$axios
            .post("/api/users",forData)
            .then(res => {
              console.log("--------333---- axios res:: ", res)
              this.$message.success('创建成功')
              setTimeout(() => {
                this.$router.push('/users')
              }, 500);
              
            })
            .catch(err => {
              this.$message.success('创建失败')
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