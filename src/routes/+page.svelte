<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	$: user = data.user;
	$: session = data.session;
</script>

<svelte:head>
	<title>SupaKit: Supabase + SvelteKit</title>
	<meta
		name="description"
		content="SupaKit is a starter template for Supabase + SvelteKit" />
</svelte:head>

<div class=""><h1>Home Page</h1></div>
<p>User email: {user.email}</p>
<p>User id: {user.id}</p>
<p>User: {JSON.stringify(user)}</p>
