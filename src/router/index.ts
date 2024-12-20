import { createRouter, createWebHashHistory } from 'vue-router';

import routes from '~pages'

export const Router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  history: createWebHashHistory(),
  routes,
});
