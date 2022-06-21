export type news = {
  _id: string;
  title: string;
  url: string;
  content: [string];
  segmentation: [{ keyword: string }];
  report: string;
  time: string;
};
export type newsLists = Array<news>;
