declare namespace NEWS {
  interface NewsItem {
    _id: string;
    title: string;
    time: Date;
    reportTime: Date;
    url: string;
    report?: string;
    state?: number;
  }
  interface NewsList {
    /** 当前页 */
    currentPage: number;
    /** 总页数 */
    totalPages: number;
    /** 新闻列表 */
    data: Array<NewsItem>;
  }
  interface updateNewsState {
    _id: string;
    state: number;
  }
}
