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
  console.log(el);
};
const createColumns = a => {
  return [
    {
      title: '网站名称',
      key: 'name',
      rowSpan: (rowData, rowIndex) => rowData.url.length
    },
    {
      title: '链接',
      key: 'url'
    },
    {
      title: '开启爬虫',
      key: 'crawler',
      render(row) {
        // console.log(row);

        return h(
          NSwitch,
          {
            size: 'small',
            onUpdate: () => a(row)
          },
          { default: () => 'Send Email' }
        );
      }
    }
  ];
};
// [
//   { key: '63fc1c71fb50bd5db286b0f8', name: '凤凰网安徽', url: ['https://ah.ifeng.com/shanklist/200-214-216353-'] },
//   { key: '63fc655ef6c4504866fd16cd', name: '中安在线', url: ['http://ah.anhuinews.com/szxw/'] },
//   {
//     key: '63fc65baf6c4504866fd16d3',
//     name: '安徽财经网',
//     url: 'http://www.ahcaijing.com/html/24h/'
//   },
//   {
//     key: '63fc65baf6c4504866fd16d3',
//     name: '安徽财经网',
//     url: 'http://www.ahcaijing.com/html/anhui/'
//   }
// ]
const data = ref([]);
onMounted(async () => {
  const website = await getWebsite();
  website.forEach(el => {
    const links = el.newsLinks;

    links.forEach(e => {
      console.log({ key: el._id, name: el.name, url: e.url });
      data.value.push({ key: el._id, name: el.name, url: e.url });
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

  <n-data-table :columns="createColumns(a)" :data="data" :single-line="false" />
</template>
