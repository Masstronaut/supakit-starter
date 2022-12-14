<script lang="ts">
	import { Auth } from '$lib/components';
	import type { PageData } from './$types';

	// data is provided by the layout, +layout.ts
	export let data: PageData;
</script>

<svelte:head>
	<title>SupaKit: Supabase + SvelteKit</title>
	<meta name="description" content="SupaKit is a starter template for Supabase + SvelteKit" />
</svelte:head>

<div class=""><h1>Home Page</h1></div>

{#if data.session === null}
	<Auth />
{:else}
	Welcome, {data.session.user.email}!
{/if}
