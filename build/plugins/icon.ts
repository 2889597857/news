import { FileSystemIconLoader } from 'unplugin-icons/loaders';
import Icons from 'unplugin-icons/vite';

// svg 转 icon 组件
// icon-custom-{文件名}
export default (srcPath: string) => {
  return Icons({
    compiler: 'vue3',
    customCollections: {
      custom: FileSystemIconLoader(`${srcPath}/assets/svg`)
    },
    scale: 1,
    defaultClass: 'inline-block'
  });
};
// compiler 编译方式
// vue3 vue2 jsx

// defaultClass 默认类名
// <svg class="inline-block" />
