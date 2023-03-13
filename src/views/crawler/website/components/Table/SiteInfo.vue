<!-- eslint-disable no-param-reassign -->
<script lang="ts" setup>
import { changeLinkState as linkCrawler, getWebsite } from '@/api';
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
   * 默认链接选择器
   */
  defaultSelector: string;
  /**
   * 链接选择器
   */
  selector: string;
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
const changeLinkState = async (rowData: ITableData) => {
  const state = rowData.state ? 0 : 1;
  const res = await linkCrawler(rowData.key, state);
  rowData.loading = true;
  if (res) {
    rowData.state = !rowData.state;
  }
  rowData.loading = false;
};
const createColumns = [
  {
    title: '网站名称',
    key: 'name',
    width: 130,
    rowSpan: (rowData: ITableData) => rowData.row
  },
  {
    title: '默认链接选择器',
    key: 'defaultSelector',
    width: 160,
    ellipsis: {
      tooltip: true
    },
    rowSpan: (rowData: ITableData) => rowData.row
  },
  {
    title: '链接',
    key: 'url',
    render(rowData: ITableData) {
      return h(
        'a',
        {
          class: 'news-url',
          href: rowData.url,
          target: '_blank'
        },
        [rowData.url]
      );
    }
  },
  {
    title: '链接选择器',
    key: 'selector',
    width: 200
  },
  {
    title: '开启爬虫',
    key: 'crawler',
    width: 100,
    render(rowData: ITableData) {
      return h(NSwitch, {
        value: rowData.state,
        size: 'small',
        loading: rowData.loading,
        'onUpdate:value': () => changeLinkState(rowData)
      });
    }
  }
];
const data = ref<Array<ITableData>>([]);
onMounted(async () => {
  const website = await getWebsite();
  if (website) {
    website.forEach(site => {
      const links = site.list;
      links.forEach(link => {
        data.value.push({
          key: link._id,
          name: site.name,
          defaultSelector: site.defaultListSelector,
          url: link.url,
          selector: link.selector ?? '默认选择器',
          state: link.state,
          loading: false,
          row: links.length
        });
      });
    });
    offTableLoading();
  }
});
</script>

<template>
  <data-table :loading="tableLoading" :columns="createColumns" :data="data" />
</template>
