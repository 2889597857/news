<script lang="ts" setup>
import { getWebsite } from '@/api';
import { NSwitch } from 'naive-ui';

const info = ref();
// watch(
//   () => info.value.state,
//   newValue => {
//     if (!newValue) {
//       // eslint-disable-next-line array-callback-return
//       info.value.newsLinks.map(news => {
//         // eslint-disable-next-line no-param-reassign
//         news.state = false;
//       });
//     }
//   }
// );
// watch(
//   () => info.newsList,
//   newValue => {
//     const res = newValue.some(news => news.state);
//     if (!res) info.state = false;
//   },
//   { deep: true }
// );
const a = el => {
  el.loading = true;
  setTimeout(() => {
    el.state = !el.state;
    el.loading = false;
  }, 3000);
};
const createColumns = () => {
  return [
    {
      title: '网站名称',
      key: 'name',
      rowSpan: rowData => rowData.col
    },
    {
      title: '链接',
      key: 'url',
      render(row) {
        return h(
          'a',
          {
            class: 'news-url',
            href: row.url,
            target: '_blank'
          },
          [row.url]
        );
      }
    },
    {
      title: '开启爬虫',
      key: 'crawler',
      render(row) {
        return h(NSwitch, {
          value: row.state,
          size: 'small',
          loading: row.loading,
          'onUpdate:value': () => a(row)
        });
      }
    }
  ];
};
const data = ref([]);
onMounted(async () => {
  const website = await getWebsite();
  website.forEach(el => {
    const links = el.newsLinks;
    links.forEach(e => {
      data.value.push({ key: el._id, name: el.name, url: e.url, state: e.state, loading: false, col: links.length });
    });
  });
  if (website) info.value = website;
});
</script>

<template>
  <!-- <n-card>
              <n-space v-for="site in info" :key="info._id" vertical align="start">
                <n-space class="mb-1">
                  <a class="text-22px font-medium news-url" style="letter-spacing: 0.1em" target="_blank" :href="site.url">{{
                    site.name
                  }}</a>
                  <n-switch v-model:value="site.state" />
                </n-space>
                <n-space v-for="item in site.newsLinks" :key="item.url">
                  <a class="news-url" target="_blank" :href="item.url">{{ item.url }}</a>
                  <n-switch v-model:value="item.state" :disabled="!site.state" />
                  <n-button size="small" :disabled="!item.state">测试</n-button>
                </n-space>
              </n-space>
            </n-card> -->

  <n-data-table :columns="createColumns()" :data="data" :single-line="false" />
</template>
