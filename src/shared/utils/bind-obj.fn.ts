import type { KeyOfType } from '../types/key-of-type.js';

export function bindObjFn<
  T,
  FnName extends KeyOfType<T, (...args: any) => void>,
>(obj: T, fnName: FnName): T[FnName] {
  return (obj[fnName] as any).bind(obj);
}
