export const objectToString = Object.prototype.toString;
export const toTypeString = (value: unknown) => objectToString.call(value);
export const isArray = (value: unknown) => Array.isArray(value);
export const isFile = (value: unknown) => toTypeString(value) === '[object File]';
