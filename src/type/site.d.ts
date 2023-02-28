declare namespace Site {
  interface INewsLinks {
    _id: string;
    url: string;
    state?: boolean;
    lastTime?: string;
  }
  interface Info {
    _id: string;
    name: string;
    url?: string;
    state?: boolean;
    newsLinks: Array<INewsLinks>;
  }
}
