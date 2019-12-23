import Vue from 'vue';
import Amplify, * as AmplifyModules from 'aws-amplify';
import { AmplifyPlugin } from 'aws-amplify-vue';

import App from './App.vue';
import router from './router';
import store from './store';
import awsconfig from './aws-exports';
import './registerServiceWorker';

Vue.use(AmplifyPlugin, AmplifyModules);

Amplify.configure(awsconfig);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
