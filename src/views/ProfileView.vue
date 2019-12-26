<template>
    <div class="profile-container">
        <profile-nav class="nav"/>
        <router-view class="content"/>
    </div>
</template>

<script>
import ProfileNav from '../components/profile/ProfileNav.vue';

export default {
  name: 'profile-view',
  components: {
    ProfileNav,
  },
};
</script>

<style lang="less" scoped>
.profile-container {
    margin: 1em 2em;
    display: grid;
    grid-template-columns: 20% 60% 20%;
    grid-template-rows: 47.5% 47.5%;

    .nav {
        grid-column-start: 1;
        grid-row-start: 1;
    }

    .content {
        grid-column-start: 2;
    }
}
</style>
