declare namespace NEWS {
  interface NewsItem {
    _id: string;
    title: string;
    time: Date;
    url: string;
    content?: string;
    report?: string;
    segmentation: Array<string>;
  }
  interface NewsList {
    /** 当前页 */
    currentPage: number;
    /** 总页数 */
    totalPages: number;
    /** 新闻列表 */
    data: Array<NewsItem>;
  }
}
