<template>
    <div>
        <h2>Photos</h2>
        <div class="flex-row">
            <div v-for="media in mediaUrlsAndNames" :key="media.url">
                <div class="large-image-container">
                    <img :src="media.url"/>
                </div>
                <p>{{media.name}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'photos-view',
  data() {
    return {
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
    mediaUrlsAndNames() {
      const s3BucketUrl = 'https://media-projecte3577ba9ab8c460ebc91cb311da648f6dev-dev.s3.amazonaws.com/public/';
      return this.mediaFiles.map(file => ({ url: `${s3BucketUrl}${file.s3Path}`, name: file.name }));
    },
  },
  methods: {
    ...mapActions('media', {
      getMedia: 'getMedia',
    }),
  },
};
</script>

<style lang="less" scoped>
@import '../less/app.less';

h2 {
    margin-bottom: 0em;
    padding-bottom: 0em;
}
.flex-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-left: 3%;
  padding-right: 3%;
  padding-top: 3em;
}

.large-image-container {
    height: 12em;
    max-width: 25%;
    border: none;
    border-width: .3em;
    border-color: @mediaLightGrey;
    padding: 0em 1em;

    img {
        width: auto;
        height: 100%;
    }
}

</style>
