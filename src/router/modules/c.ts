import BasicLayout from '@/layout/BasicLayout/index.vue';

const routes = {
  path: '/c',
  name: 'PageC',
  component: BasicLayout,
  meta: {
    icon: 'Link',
    title: 'message.externalLink',
    isNotMenu: true,
    i18n: true,
    rank: 190
  }
};

export default routes;
