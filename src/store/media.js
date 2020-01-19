import Api from '../services/api';

const mutationTypes = {
  setMediaFiles: 'setMediaFiles',
  setError: 'setError',
};

const actionTypes = {
  getMedia: 'getMedia',
};

export default {
  namespaced: true,
  state: {
    mediaFiles: [],
    error: '',
  },
  mutations: {
    [mutationTypes.setMediaFiles](state, { mediaFiles }) {
      state.mediaFiles = mediaFiles;
    },
    [mutationTypes.setError](state, { error }) {
      state.error = error;
    },
  },
  actions: {
    async [actionTypes.getMedia]({ commit }) {
      try {
        const mediaFiles = await Api.getMedia();
        commit(mutationTypes.setMediaFiles, { mediaFiles });
      } catch (error) {
        commit(mutationTypes.setError, { error });
      }
    },
  },
};
