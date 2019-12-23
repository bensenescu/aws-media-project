<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/auth">Sign up / Login</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { AmplifyEventBus } from 'aws-amplify-vue';
import { Auth } from 'aws-amplify';

export default {
  name: 'app',
  data() {
    return {
      signedIn: false,
    };
  },
  beforeCreate() {
    AmplifyEventBus.$on('authState', (info) => {
      if (info === 'signedIn') {
        this.signedIn = true;
        this.$router.push('/profile');
      }
      if (info === 'signedOut') {
        this.$router.push('/auth');
        this.signedIn = false;
      }
    });
    Auth.currentAuthenticatedUser()
      .then(() => {
        this.signedIn = true;
      })
      .catch(() => {
        this.signedIn = false;
      });
  },
};
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
