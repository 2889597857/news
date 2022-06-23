import IconsResolver from 'unplugin-icons/resolver';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import autoComponents from 'unplugin-vue-components/vite';

export default autoComponents({
  resolvers: [NaiveUiResolver()],

  dts: 'src/type/components.d.ts',
  types: [{ from: 'vue-router', names: ['RouterLink', 'RouterView'] }],
  resolvers: [NaiveUiResolver(), IconsResolver({ customCollections: ['custom'], componentPrefix: 'icon' })]
});
