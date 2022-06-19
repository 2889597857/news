import { storageLocal } from '../storage';

export function getToken(token = 'token'): string {
  return storageLocal.getItem(token);
}
