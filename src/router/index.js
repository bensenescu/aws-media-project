import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ProfileView from '../views/ProfileView.vue';
import ProfileContent from '../components/profile/ProfileContent.vue';
import ProfileSettings from '../components/profile/ProfileSettings.vue';
import ProfileUploadMedia from '../components/profile/ProfileUploadMedia.vue';
import Auth from '../views/Auth.vue';

Vue.use(VueRouter);

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
