<template>
  <div class="center-item">
    <h2>Photos</h2>
    <div class="flex-row">
        <img
            v-show="currentFirstIndex > 0"
            src="../../assets/arrowLeft.svg"
            class="arrow"
            v-on:click="updateIndex('decrease')" />
        <div class="image-container margins" v-for="url in shownImages" :key="url">
            <img :src="url" />
        </div>
        <img
            v-show="currentFirstIndex < mediaUrls.length - IMAGES_SHOWN"
            src="../../assets/arrowRight.svg"
            class="arrow"
            v-on:click="updateIndex('increase')" />
    </div>
    <h2>Videos</h2>
    <h3>This functionality is coming soon!</h3>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'profile-content',
  data() {
    return {
      currentFirstIndex: 0, // index of the first item shown
      IMAGES_SHOWN: 3,
      error: '',
    };
  },
  created() {
    this.getMedia();
  },
  computed: {
    ...mapState('media', {
      mediaFiles: 'mediaFiles',
    }),
    mediaUrls() {
      const s3BucketUrl = 'https://media-projecte3577ba9ab8c460ebc91cb311da648f6dev-dev.s3.amazonaws.com/public/';
      return this.mediaFiles.map(({ s3Path }) => `${s3BucketUrl}${s3Path}`);
    },
    shownImages() {
      return this.mediaUrls.slice(this.currentFirstIndex,
        this.currentFirstIndex + this.IMAGES_SHOWN);
    },
  },
  methods: {
    ...mapActions('media', {
      getMedia: 'getMedia',
    }),
    updateIndex(action) {
      if (action === 'increase') {
        this.currentFirstIndex += 1;
      } else if (action === 'decrease') {
        this.currentFirstIndex -= 1;
      } else {
        this.error = 'ERROR: Invalid Parmeter for update index';
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import '../../less/app.less';

.center-item {
    justify-self: center;
    grid-column: 2 / span 3;
    grid-row: 1 / span 3;
    width: 100%
}

.flex-row {
  display: flex;
  justify-content: center;
}

.margins {
  margin: 0 .4em;
}

.arrow {
    width: 36px;
    height: 36px;
}
</style>
