<template functional>
    <div class="flex-col">
        <img src="../../assets/defaultProfile.svg" class="medium-padding-left"/>
        <router-link :to="{name: 'profile-upload-media'}" tag="p">Upload Media</router-link>
        <router-link
            :to="{ name: 'profile-settings' }"
            tag="p"
            class="small-padding-top">
                Settings
        </router-link>
    </div>
</template>

<script>
export default {
  name: 'profile-nav',
};
</script>

<style lang="less" scoped>
    .flex-col {
        text-align: left;
        img {
            height: 10em;
            width: 10em;
        }
        p {
        font-size: 28px;
        margin: 0;
        }
        .small-padding-top {
            padding-top: .2em;
        }
        .medium-padding-left {
            padding-left: 1.5em;
        }
    }
    router-link {
        cursor: pointer;
    }
</style>
