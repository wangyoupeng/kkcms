<template>
  <el-upload
    class="upload-demo"
    action="/api/upload/img"
    :data="{ key: 'value' }"
    :multiple="isMultiple"
    :limit="6"
    :on-exceed="handleExceed"
    :on-success="handleSuccess"
    :file-list="fileList"
    list-type="picture"
    show-file-list>
    <el-button size="small" type="primary">点击上传</el-button>
  </el-upload>
</template>

<script>
export default {
  data() {
    return {
      isMultiple: true,
      fileList: []
    };
  },
  methods: {
    handleExceed() { // files, fileList
      this.$message.warning('最多只能上传 6 张图片哦！');
    },
    handleSuccess(res, file, fileList) {
      console.log("--11--,", res)
      console.log("--22--,", file)
      console.log("--33--,", fileList)
      let fullImageUrls = fileList.map(f => `http://localhost:3000${f.response.data.url}`) 
      this.imageUrls = fullImageUrls
      this.$emit('upload-image-success', {
        imageUrls: fullImageUrls, 
        time: new Date()
      });
    }
  }
};
</script>

<style>
.upload-demo {
  display: inline-block;
  margin-right: 20px;
}
</style>