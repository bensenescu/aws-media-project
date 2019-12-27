<template>
    <div>
        <h2>Upload Media</h2>
        <amplify-photo-picker v-on:fileUpload="fileUpload($event)"/>
    </div>
</template>

<script>
export default {
  name: 'profile-upload-media',
  methods: {
    fileUpload() {
      //   console.log(path);
    },
  },
};
</script>

<style lang="less" scoped>
@import '../../less/app.less';

.upload-container {
    font-size: 18px;
}
</style>
