import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const HomeView = () => Promise.resolve(import('../views/HomeView.vue'));
const Auth = () => Promise.resolve(import('../views/Auth.vue'));
const ProfileView = () => Promise.resolve(import('../views/ProfileView.vue'));
const ProfileContent = () => Promise.resolve(import('../components/profile/ProfileContent.vue'));
const ProfileSettings = () => Promise.resolve(import('../components/profile/ProfileSettings.vue'));
const ProfileUploadMedia = () => Promise.resolve(import('../components/profile/ProfileUploadMedia.vue'));


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/auth',
    name: 'auth',
    component: Auth,
  },
  {
    path: '/profile',
    component: ProfileView,
    children: [
      {
        path: '',
        name: 'profile',
        component: ProfileContent,
      },
      {
        path: '/upload',
        name: 'profile-upload-media',
        component: ProfileUploadMedia,
      },
      {
        path: '/settings',
        name: 'profile-settings',
        component: ProfileSettings,
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
