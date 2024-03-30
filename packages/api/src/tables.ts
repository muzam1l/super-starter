// Add more per app/service
type Prefixes = 'auth' | 'app';
const SEP = '__';

export const tablePrefix = (pre: Prefixes) => (name: string) => {
  return pre + SEP + name;
};
