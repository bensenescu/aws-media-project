import Vue from 'vue';
import Vuex from 'vuex';
import user from './user';
import media from './media';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    media,
  },
});
