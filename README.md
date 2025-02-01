# [Turborepo](https://turbo.build/repo) | [TRPC](https://trpc.io/) | [Drizzle/Postgres](https://orm.drizzle.team/) | [NextAuth](https://authjs.dev/getting-started) | [shadcn/ui](https://ui.shadcn.com/) | [T3 App](https://create.t3.gg/) | [Bun](https://bun.sh/).

## First things first

- Change workspace and first app name: `bun scripts/rename -w your-workspace-name -a your-app-name`. Make sure everything is correct and commit the changes.

- Setup postgres (`DATABASE_URL`). [Neon](https://neon.tech/) preferred for easy setup or run [local script](./packages/api/start-database.sh) for docker.

- Setup [NextAuth](https://authjs.dev/getting-started/deployment) (`AUTH_SECRET`), [Discord Provider](https://next-auth.js.org/providers/discord) (`AUTH_DISCORD_ID`, `AUTH_DISCORD_SECRET`) and [GitHub Provider](https://next-auth.js.org/providers/github) (`AUTH_GITHUB_ID`, `AUTH_GITHUB_SECRET`).

- [Install bun](https://bun.sh/docs/installation) and `bun i` to install deps.

- `bun db:push` to push schema to db without migrations.

- `bun dev` to start the local dev setup.

- Head over to the code and follow the lead!

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd m
bun x turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
bun x turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
