export type news = {
  _id: string;
  title: string;
  url: string;
  content: string;
  segmentation: [{ keyword: String }]
  report: string;
};
export type newsLists = [news];
