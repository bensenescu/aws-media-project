import Api from '../services/api';

const mutationTypes = {
  setAllMediaFiles: 'setAllMediaFiles',
  setUserMediaFiles: 'setUserMediaFiles',
  setError: 'setError',
};

const actionTypes = {
  getAllMedia: 'getAllMedia',
  getUserMedia: 'getUserMedia',
};

export default {
  namespaced: true,
  state: {
    userMediaFiles: [],
    allMediaFiles: [],
    error: '',
  },
  mutations: {
    [mutationTypes.setAllMediaFiles](state, { mediaFiles }) {
      state.allMediaFiles = mediaFiles;
    },
    [mutationTypes.setUserMediaFiles](state, { mediaFiles }) {
      state.userMediaFiles = mediaFiles;
    },
    [mutationTypes.setError](state, { error }) {
      state.error = error;
    },
  },
  actions: {
    async [actionTypes.getAllMedia]({ commit }) {
      try {
        const mediaFiles = await Api.getAllMedia();
        commit(mutationTypes.setAllMediaFiles, { mediaFiles });
      } catch (error) {
        commit(mutationTypes.setError, { error });
      }
    },
    async [actionTypes.getUserMedia]({ commit, rootState }) {
      try {
        const { username } = rootState.user;
        const mediaFiles = await Api.getUserMedia(username);
        console.log(mediaFiles);
        commit(mutationTypes.setUserMediaFiles, { mediaFiles });
      } catch (error) {
        commit(mutationTypes.setError, { error });
      }
    },
  },
};
