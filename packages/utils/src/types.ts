/* eslint-disable @typescript-eslint/no-explicit-any */
export type ReturnOf<F extends (...args: any) => any> =
  ReturnType<F> extends Promise<any> ? Awaited<ReturnType<F>> : ReturnType<F>;
