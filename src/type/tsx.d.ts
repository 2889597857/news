import Vue, { VNode } from 'vue';

declare module '*.tsx' {
  // eslint-disable-next-line @typescript-eslint/no-shadow, import/no-unresolved
  import Vue from 'compatible-vue';

  export default Vue;
}

declare global {
  namespace JSX {
    interface Element extends VNode {}
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}
