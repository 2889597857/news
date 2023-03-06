<!-- eslint-disable no-param-reassign -->
<script lang="ts" setup>
import { getContentSelector } from '@/api';
import { useBoolean } from '@/hooks/common';
import { NSwitch } from 'naive-ui';

interface ITableData {
  /**
   * 链接 _id
   */
  key: string;
  /**
   * 网站名称
   */
  name: string;
  /**
   * 网站链接
   */
  url: string;
  /**
   * 是否开启爬虫
   */
  state: boolean;
  /**
   * 加载状态
   */
  loading: boolean;
  /**
   * 跨行
   */
  row: number;
}
const { bool: tableLoading, setFalse: offTableLoading } = useBoolean(true);
const a = (rowData: ITableData) => {
  rowData.loading = true;
  setTimeout(() => {
    rowData.state = !rowData.state;
    rowData.loading = false;
  }, 3000);
};
const createColumns = [
  {
    title: '网站名称',
    key: 'name',
    width: 130,
    rowSpan: (rowData: ITableData) => rowData.row
  },
  {
    title: '标题选择器',
    key: 'title'
  },
  {
    title: '时间选择器',
    key: 'time'
  },

  {
    title: '内容选择器',
    key: 'content'
  },
  {
    title: '编辑',
    key: 'crawler',
    width: 100,
    render(rowData: ITableData) {
      return h(NSwitch, {
        value: rowData.state,
        size: 'small',
        loading: rowData.loading,
        'onUpdate:value': () => a(rowData)
      });
    }
  }
];
const data = ref([]);
onMounted(async () => {
  const website = await getContentSelector();
  if (website) {
    website.forEach(site => {
      const links = site.list;
      if (links && links.length > 0) {
        links.forEach(link => {
          data.value.push({
            key: link._id,
            name: site.name,
            title: link.title,
            time: link.time,
            content: link.content,
            loading: false,
            row: links.length
          });
        });
      }
    });

    offTableLoading();
    console.log(tableLoading.value);
  }
});
</script>

<template>
  <data-table :loading="tableLoading" :columns="createColumns" :data="data" />
</template>
