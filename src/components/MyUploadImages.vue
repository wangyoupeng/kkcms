<template >
  <el-upload
    class="upload-demo"
    action="/api/upload/img"
    :data="{ key: 'value' }"
    :show-file-list="false"
    :multiple="isMultiple"
    :limit="6"
    :on-exceed="handleExceed"
    :on-success="handleSuccess"
    :file-list="imageUrls"
    list-type="picture">
    <el-button size="small" type="primary">点击上传</el-button>
    <el-tooltip class="item" effect="dark" content="点击上传" placement="top">
    
  </el-tooltip>
  </el-upload>
  
  
</template>

<script>
export default {
  props: { },
  data() {
    return {
      isMultiple: true,
      imageUrls: [],
    };
  },
  mounted() {
    // 初始化数据
  },
  methods: {
    handleExceed() { // files, fileList
      this.$message.warning('最多只能上传 6 张图片哦！');
    },
    handleRemove(index) {
      // 处理移除图片的逻辑
      this.imageUrls.splice(index, 1);
    },
    handleSuccess(res, file, fileList) {
      let fullImageUrls = fileList.map(f => `http://localhost:3000${f.response.data.url}`) 
      this.imageUrls = fullImageUrls
      this.$emit('upload-image-success', {
        imageUrls: this.imageUrls, 
        time: new Date()
      });
    },
  }
};
</script>

<style>
.upload-demo {
  display: inline-block;
  margin-right: 20px;
}
</style>