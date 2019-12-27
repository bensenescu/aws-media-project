<template>
    <amplify-authenticator></amplify-authenticator>
</template>

<script>
import { Auth } from 'aws-amplify';

export default {
  name: 'auth',
  created() {
    Auth.currentAuthenticatedUser()
      .then(() => {
        this.$router.push({ name: 'profile' });
      });
    // .catch((error) => {
    //   console.log(typeof error);
    // });
  },
};
</script>
