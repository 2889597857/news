export const copyNews = (news: NEWS.NewsItem, number: number | string = '') => {
  const { title, url, report } = news;

  return `${number || ''}、标题：${title}\n链接： ${url}\n摘要：${report}\n\n`;
};

export const copyNewsList = (newsList: Array<NEWS.NewsItem>, number = 0) => {
  if (!newsList || newsList.length === 0) return '';

  let copyText = '';

  // eslint-disable-next-line array-callback-return
  newsList.map((news: NEWS.NewsItem, index: number) => {
    copyText += copyNews(news, index + number + 1);
  });

  return copyText.trim();
};
