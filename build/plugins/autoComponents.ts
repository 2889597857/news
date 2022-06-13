import { ComponentResolver } from "unplugin-vue-components/types";
import autoComponents from "unplugin-vue-components/vite";

export default autoComponents({
  resolvers: [NaiveUiResolver()],
});

function NaiveUiResolver(): ComponentResolver {
  return {
    type: "component",
    resolve: (name: string) => {
      if (name.match(/^(N[A-Z]|n-[a-z])/)) return { name, from: "naive-ui" };
    },
  };
}
