declare namespace Site {
  interface INewsLinks {
    _id: string;
    url: string;
    state?: boolean;
    lastTime?: string;
    selector?: string;
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
