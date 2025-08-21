import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { createHTTPContext } from '@{workspace}/api/trpc';
import { helloRouter } from './router';

export function toHeaders(rawHeaders: string[]): Headers {
  let headers = new Headers();

  for (let i = 0; i < rawHeaders.length; i += 2) {
    if (rawHeaders[i]!.startsWith(':')) continue;
    headers.append(rawHeaders[i]!, rawHeaders[i + 1]!);
  }

  return headers;
}

const server = createHTTPServer({
  basePath: '/api/',
  router: helloRouter,
  createContext: opts => createHTTPContext(toHeaders(opts.req.rawHeaders)),
});

server.listen(5001);
