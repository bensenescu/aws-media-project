import { Auth } from 'aws-amplify';

const mutationTypes = {
  setSignedIn: 'setSignedIn',
  setUser: 'setUser',
};

const actionTypes = {
  signOut: 'signOut',
};

export default {
  namespaced: true,
  state: {
    signedIn: false,
    user: {},
  },
  mutations: {
    [mutationTypes.setSignedIn](state, { signedIn }) {
      state.signedIn = signedIn;
    },
    [mutationTypes.setUser](state, { user }) {
      state.user = user;
    },
  },
  actions: {
    [actionTypes.signOut]({ commit }) {
      Auth.signOut({ global: true })
        .then(() => {
          commit(mutationTypes.setSignedIn, { signedIn: false });
          commit(mutationTypes.setUser, { user: {} });
        })
        .catch(() => {
          // console.error(error);
        });
    },
  },
};
