# Warning

This template is a work in progress and is not ready for use in production applications. It still contains bugs and doesn't have the core functionality working yet.

# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Configuring Supakit

### Supabase

You'll need to get set up with your own supabase project. To get started:

1. Go to the [supabase website](https://supabase.com/)
2. Create an account or sign up with GitHub
3. Create a new supabase project. Make sure to note the database password!

Once done, you'll need to add 2 values to your `.env` file (make sure it is included in your `.gitignore`!)

1. `PUBLIC_SUPABASE_URL`
2. `PUBLIC_SUPABASE_ANON_KEY`

These values can be found on your project's homepage on supabase. the URL will look like `https://app.supabase.com/project/{Your Project ID}`

Finally, you'll need to add one more `.env` value that `prisma` will use to connect to your database. It's the "connection string" URI.
You can find the URI for your project through the supabase UI by going to `Project Settings` -> `Database` -> `Connection string` and selecting "URI"

Update it to include the database password you made when creating your supabase project, as it will replace `[YOUR-PASSWORD]` in the string from the UI.

Add the string to your .env file as `DATABASE_URL` to be able to work with prisma.

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
