import { deepCopy } from 'deep-copy-ts';

export function deepClone<T>(x: T): T {
  return deepCopy(x);
}
