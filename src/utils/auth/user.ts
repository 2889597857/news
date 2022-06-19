import {  storageLocal } from "../storage";

export function getToken(token: string = "token"): string {
  return storageLocal.getItem(token);
}