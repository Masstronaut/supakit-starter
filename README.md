# Warning

This template is a work in progress and is not ready for use in production applications. It still contains bugs and doesn't have the core functionality working yet.

# create-svelte

Everything you need to build a Svelte project!

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

#### Setting up prisma

You'll need to add a `.env` value that `prisma` will use to connect to your database. It's the "connection string" URI.
You can find the URI for your project through the supabase UI by going to `Project Settings` -> `Database` -> `Connection string` and selecting "URI"

Update it to include the database password you noted when creating your supabase project, as it will replace `[YOUR-PASSWORD]` in the string from the supabase UI.

Add the string to your .env file as `DATABASE_URL` to be able to work with prisma. Then run `npx prisma db push` to push the schema defined in `schema.prisma` to your supabase DB instance.

At the end, it should look something like this, with the values in [BRACKETS] replaced with your supabase values:

```
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
