<template>
  <div class="nav-container">

      <router-link
        :to="{name: 'home'}"
        tag="a"
        class="col-2 center">
          <img src="../assets/logo.svg"/>
      </router-link>

      <router-link :to="{name: 'auth'}" tag="a" class="col-3 center">
        <div>
          <p><img src="../assets/face.svg"/></p>
          <p v-if="signedIn">{{user.username}}</p>
          <p v-else>Log in</p>
        </div>
      </router-link>
      <a
        v-if="signedIn"
        v-on:click="showModal = !showModal"
        class="col-4 center">
          Sign Out
      </a>

    <my-modal
      :show="showModal"
      v-on:canceled="showModal = !showModal"
      v-on:confirmed="showModal = !showModal; signOutAndRouteHome();">
      <template v-slot:header>
        Sign Out?
      </template>

      <template v-slot:body>
        By hitting confirm, you are confirming that you wish to sign out on all devices.
        Do you want to continue with this?
      </template>
    </my-modal>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import MyModal from './hoc/MyModal.vue';

export default {
  name: 'the-navigation',
  components: {
    MyModal,
  },
  data() {
    return {
      showModal: false,
    };
  },
  computed: {
    ...mapState('user', {
      signedIn: 'signedIn',
      user: 'user',
    }),
  },
  methods: {
    ...mapActions('user', {
      signOut: 'signOut',
    }),
    signOutAndRouteHome() {
      this.signOut();
      this.$router.push({ name: 'Home' });
    },
  },
};
</script>

<style lang="less" scoped>
@import '../less/constants.less';

.nav-container {
  display: grid;
  width: 100%;
  grid-template-columns: 33% 33% 17% 17%;
  max-height: 5em;
  grid-template-rows: 5em;
  background-color: @mediaPink;

  .center {
    align-self: center;
  }
  .col-2 {
    grid-column-start: 2;
  }
  .col-3 {
    grid-column-start: 3;
  }
  .col-4 {
    grid-column-start: 4;
  }
  img {
    height: 3em;
    width: 3em;
  }
  p {
    margin: 0em;
  }
  a, a:visited {
    font-weight: bold;
    color: inherit;
  }
}
</style>
