import autoComponents from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';

export default autoComponents({
  resolvers: [NaiveUiResolver()],
  dts: 'src/type/components.d.ts'
});
