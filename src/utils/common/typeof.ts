export const objectToString = Object.prototype.toString;
export const toTypeString = (value: unknown) => objectToString.call(value);
