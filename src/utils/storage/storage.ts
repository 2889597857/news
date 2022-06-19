interface ProxyStorage {
  getItem(key: string): any;
  setItem(Key: string, value: string): void;
  removeItem(key: string): void;
  clear(): void;
}

class sessionStorageProxy implements ProxyStorage {
  protected storage: ProxyStorage;

  constructor(storageModel: ProxyStorage) {
    this.storage = storageModel;
  }

  // 存
  public setItem(key: string, value: any): void {
    this.storage.setItem(key, JSON.stringify(value));
  }

  // 取
  public getItem(key: string): any {
    return JSON.parse(this.storage.getItem(key)) || null;
  }

  // 删
  public removeItem(key: string): void {
    this.storage.removeItem(key);
  }

  // 清空
  public clear(): void {
    this.storage.clear();
  }
}

// localStorage operate
class localStorageProxy extends sessionStorageProxy implements ProxyStorage {
  // eslint-disable-next-line no-useless-constructor
  constructor(localStorage: ProxyStorage) {
    super(localStorage);
  }
}

// eslint-disable-next-line new-cap
export const storageSession = new sessionStorageProxy(sessionStorage);

// eslint-disable-next-line new-cap
export const storageLocal = new localStorageProxy(localStorage);
