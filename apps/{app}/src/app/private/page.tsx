import { api } from '@/app/api/trpc/server';

const PrivatePage = async () => {
  const msg = await api.hello.sayHelloPrivate('privately');

  return <div>{msg}</div>;
};

export default PrivatePage;
