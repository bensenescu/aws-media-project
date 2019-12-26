<template>
  <div id="app">
    <the-navigation/>
    <router-view/>
  </div>
</template>

<script>
import { AmplifyEventBus } from 'aws-amplify-vue';
import { Auth } from 'aws-amplify';
import TheNavigation from './components/TheNavigation.vue';

export default {
  name: 'app',
  components: {
    TheNavigation,
  },
  created() {
    AmplifyEventBus.$on('authState', (info) => {
      this.setCurrentUser();
      if (info === 'signedIn') {
        this.$router.push('/profile');
      }
      if (info === 'signedOut') {
        this.$router.push('/auth');
      }
    });
    this.setCurrentUser();
  },
  methods: {
    setCurrentUser() {
      Auth.currentAuthenticatedUser()
        .then((user) => {
          this.$store.commit('user/setSignedIn', { signedIn: true });
          this.$store.commit('user/setUser', { user });
        })
        .catch(() => {
          this.$store.commit('user/setSignedIn', { signedIn: false });
        });
    },
  },
};
</script>

<style lang="less">
#app {
  font-family: 'Montserrat';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
