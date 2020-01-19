<template>
    <div class="upload-container">
        <h2>Upload Media</h2>
        <img v-if="isFileImage" :src="photoUrl" class="image-container"/>
        <input
          type="file"
          ref="fileInput"
          accept="image/*, video/*"
          class="center-with-padding"
          v-on:change="pick">
        <input type="text" placeholder="Name" class="text-input" v-model="localMediaMeta.name">
        <input
          type="text"
          placeholder="Description"
          class="text-input"
          v-model="localMediaMeta.description">
        <button
          :disabled="saveFileLoading"
          class="center-with-margin"
          v-on:click="saveFile">Submit</button>
    </div>
</template>

<script>
import { Storage } from 'aws-amplify';
import { mapState } from 'vuex';
import Api from '../../services/api';

export default {
  name: 'profile-upload-media',
  data() {
    return {
      photoUrl: '',
      file: null,
      localMediaMeta: {
        s3Path: '',
        name: '',
        description: '',
      },
      saveFileLoading: false,
      error: '',
    };
  },
  computed: {
    ...mapState('user', {
      user: 'user',
    }),
    isFileImage() {
      const mediaType = this.getMediaType(this.localMediaMeta.s3Path);
      return mediaType === '.jpg' || mediaType === '.png';
    },
  },
  methods: {
    initData() {
      this.file = null;
      this.$refs.fileInput.value = null;
      this.localMediaMeta = {
        s3Path: '',
        name: '',
        description: '',
      };
      this.photoUrl = '';
    },
    // this method was adapted from the photopicker component in aws-amplify-vue
    pick(evt) {
      [this.file] = evt.target.files;
      if (!this.file) { return; }
      const fileName = this.file.name;
      this.localMediaMeta.s3Path = `media/${fileName}`;
      const that = this;
      const reader = new FileReader();
      reader.onload = (e) => {
        const { target } = e;
        const url = target.result;
        // set image url to show what the user has upload if its an image
        that.photoUrl = url;
      };
      reader.readAsDataURL(this.file);
    },
    async uploadToS3() {
      try {
        await Storage.put(
          this.localMediaMeta.s3Path,
          this.file,
          {
            header: this.$Amplify.I18n.get('File Upload'),
            title: this.$Amplify.I18n.get('Upload'),
            accept: '*/*',
            storageOptions: {},
          },
        );
      } catch (error) {
        this.error = error;
      }
    },
    async saveFileMetaData() {
      try {
        const mediaType = this.getMediaType(this.localMediaMeta.s3Path);
        const mediaBody = {
          username: this.user.username,
          s3Path: this.localMediaMeta.s3Path,
          name: this.localMediaMeta.name,
          description: this.localMediaMeta.description,
          mediaType,
        };

        const media = await Api.createMedia(mediaBody);
        this.mediaFiles.unshift(media);
      } catch (error) {
        this.error = error;
      }
    },
    async saveFile() {
      try {
        this.saveFileLoading = true;
        await this.uploadToS3();
        await this.saveFileMetaData();
        this.saveFileLoading = false;
        this.initData();
      } catch (error) {
        this.error = error;
      }
    },
    getMediaType(filePath) {
      // TODO do this with regex for all file types
      return filePath.slice(filePath.length - 4, filePath.length);
    },
  },
};
</script>

<style lang="less" scoped>
@import '../../less/app.less';

.upload-container {
    grid-column-start: 2;
    grid-row: 1 / span 3;
    justify-self: center;
    font-size: 18px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 50%;
    height: 13.5em;
}

.text-input {
  background-color: white;
  border: solid;
  border-width: .2em;
  border-color: @mediaLightGrey;
}
button {
  background-color: @mediaPink;
  width: 5em;
}
.center-with-margin {
  margin: 0 38%;
}
.center-with-padding {
  padding: 0 38%;
}
</style>
