# Warning

This template is a work in progress and is not ready for use in production applications. It still contains bugs and doesn't have the core functionality working yet.

# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

To get started, run the following commands to clone the repo and install dependencies:

```bash
npx degit masstronaut/supakit-starter my-supakit-project
cd my-supakit-project
npm i
```

## Configuring Supakit

### Supabase

You'll need to get set up with your own supabase project. To get started:

1. Go to the [supabase website](https://supabase.com/)
2. Create an account or sign up with GitHub
3. Create a new supabase project. Make sure to note the database password!

Once done, you'll need to create a `.env` file at the root of your project and add 2 values to it (make sure to never commit your `.env` file!)

1. Your supabase public URL `PUBLIC_SUPABASE_URL`
2. Your supabase anonymous key `PUBLIC_SUPABASE_ANON_KEY`

These values can be found on your project's homepage on supabase. the URL will look like `https://app.supabase.com/project/{Your Project ID}`

To get type information into the supabase client, you'll also need to link supabase CLI with your remote instance so it can generate type definitions for your database. There is a script in `package.json` for this already.

1. [Link your supabase client to the server instance](https://supabase.com/docs/reference/cli/supabase-link)
2. Run `npm run .env supabase:typegen`.

#### Setting up prisma

You'll need to add one more `.env` value that `prisma` will use to connect to your database. It's the "connection string" URI.
You can find the URI for your project through the supabase UI by going to `Project Settings` -> `Database` -> `Connection string` and selecting "URI"

Update it to include the database password you made when creating your supabase project, as it will replace `[YOUR-PASSWORD]` in the string from the supabase UI.

Add the string to your .env file as `DATABASE_URL` to be able to work with prisma. Then run `npm run db:init` to push the schema defined in `schema.prisma` to your supabase DB instance.

#### Supabase redirect URL

By default, the Supabase redirect URL for sign-in defaults to `localhost:3000`.
Currently, a sveltekit/vite project runs on `localhost:5173` by default.
You'll need to update one of these to get auth working. To do this in supabase,
open the dashboard and navigate to:

1. `-> Authentication`
2. `-> URL Configuration`
3. `-> Site URL`

Update the value from `http://localhost:3000` to `http://localhost:5173` and press `Save`. Afterwards your sign in should work!

At the end, it should look something like this, with the values in [BRACKETS] replaced with your supabase values:

```
PUBLIC_SUPABASE_URL="https://[YOUR_SUPABASE_URL].supabase.co"
PUBLIC_SUPABASE_ANON_KEY="[YOUR_SUPABASE_ANON_KEY]"

DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR_SUPABASE_URL].supabase.co:5432/postgres"
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
