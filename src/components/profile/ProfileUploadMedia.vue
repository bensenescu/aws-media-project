<template>
    <div>
        <h2>Upload Media</h2>
        <amplify-photo-picker
            :photoPickerConfig="photoPickerConfig"
            v-on:fileUpload="fileUpload"/>
        <div class="image-container">
            <img :src="photoUrl" />
        </div>
    </div>
</template>

<script>
import { Storage } from 'aws-amplify';

export default {
  name: 'profile-upload-media',
  data() {
    return {
      photoPickerConfig: {
        path: 'media/',
      },
      photoUrl: '',
    };
  },
  created() {
    Storage.get('media/taneli-lahtinen-EGbnaltr0v4-unsplash.jpg')
      .then((url) => {
        this.photoUrl = url;
      })
      .catch((error) => {
        console.error(error);
      });
  },
  methods: {
    fileUpload() {
    //   console.log('fileUploaded');
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
.image-container {
    height: 10em;
    border: solid;
    border-width: .5em;
    border-color: @mediaLightGrey;

    img {
        width: auto;
        height: 100%;
    }
}

</style>
