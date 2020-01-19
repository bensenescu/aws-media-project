<template functional >
  <div class="home">
    <div class="imageContainer">
      <h2>Photos</h2>
      <router-link :to="{name: 'photos-view'}">
        <img src="../assets/images/desert.jpg" />
      </router-link>
    </div>
    <div class="imageContainer ">
      <h2>Videos</h2>
      <img src="../assets/images/ferris-wheel.jpg" style="cursor: not-allowed"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
};
</script>

<style lang="less" scoped>
@import "../less/app.less";

.home {
  display: flex;
  flex-direction: row;
  width: 100%;
}
.imageContainer {
  padding: 0em 0em;
  width: 50%;
  img {
    max-width: 510px;
    max-height: 646px;
  }
  h2 {
    position: relative;
    top: 20%;
    color: @mediaBrown;
  }
}
</style>
