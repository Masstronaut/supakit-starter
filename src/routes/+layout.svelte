<script lang="ts">
	import '../app.postcss';
	import { Header } from '$lib/components';
	import { Toaster } from 'svelte-french-toast';
	import type { LayoutData } from './$types';
	import ProfileIcon from '$lib/components/ProfileIcon.svelte';

	export let data: LayoutData;

	const cta = { title: 'Signup / Login', href: '/login' };
	const title = { title: 'SupaKit', href: '/' };
	const navItems = [
		{ title: 'Item 1', href: '' },
		{
			title: 'Parent',
			href: '',
			children: [
				{ title: 'Submenu 1', href: '' },
				{ title: 'Submenu 2', href: '' },
				{ title: 'Submenu 3', href: '' }
			]
		},
		{ title: 'Item 3', href: '' }
	];
</script>

<Toaster />
<Header {title} {navItems}>
	<div slot="cta">
		{#if data.session === null}
			<a class="btn" href={cta.href}>{cta.title}</a>
		{:else if data.user}
			<ProfileIcon user={data.user} />
		{/if}
	</div>
</Header>
<div class="p-4">
	<slot />
</div>
