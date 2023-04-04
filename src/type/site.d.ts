declare namespace Site {
  interface INewsLinks {
    _id: string;
    url: string;
    state?: boolean;
    lastTime?: string;
    selector?: string;
    title: string;
    content: string;
    time: string;
  }
  interface Info {
    _id: string;
    name: string;
    url?: string;
    state?: boolean;
    defaultListSelector?: string;
    list: Array<INewsLinks>;
  }
}
