<script lang="ts">
	import '../app.postcss';
	import { Header } from '$lib/components';
	import { Toaster } from 'svelte-french-toast';
	import type { PageData } from './$types';
	export let data: PageData;

	const title = { title: 'SupaKit', href: '/' };
	const navItems = [{ title: 'Home', href: '/' }];
	if (data.session) {
		navItems.push({ title: 'App', href: '/app' });
	}
</script>

<Toaster />
<Header {title} {navItems}>
	<div slot="cta">
		{#if !data.session}
			<a href="/signin" class="btn">Sign in</a>
			<a href="/signup" class="btn-primary btn">Sign up</a>
		{:else}
			<form action="/signout" method="post">
				<button class="btn-ghost btn" type="submit">Sign out</button>
			</form>
		{/if}
	</div>
</Header>
<div class="p-4">
	<slot />
</div>
