import { storageSession, storageLocal } from "./storage/storage";

export function getToken(token: string = "token"): string {
  return storageLocal.getItem(token);
}
export { storageSession, storageLocal };
