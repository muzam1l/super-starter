export const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const __SERVER__ = typeof window === 'undefined';
