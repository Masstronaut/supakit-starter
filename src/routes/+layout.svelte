<script lang="ts">
	import '../app.postcss';
	import { Header } from '$lib/components';
	import { Toaster } from 'svelte-french-toast';
	import type { LayoutData } from './$types';
	import ProfileIcon from '$lib/components/ProfileIcon.svelte';
	import { onMount } from 'svelte';
	import { invalidate } from '$app/navigation';

	export let data: LayoutData;
	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => subscription.unsubscribe();
	});

	const cta = { title: 'Signup / Login', href: '/login' };
	const title = { title: 'SupaKit', href: '/' };
	const navItems = [
		{ title: 'Home', href: '/' },
		{ title: 'Blog', href: '/blog' },
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

	const user = null;
</script>

<Toaster />
<Header {title} {navItems}>
	<div slot="cta">
		{#if session === null || user === null}
			<a class="btn" href={cta.href}>{cta.title}</a>
		{:else if session && user}
			<ProfileIcon {user} />
		{/if}
	</div>
</Header>
<div class="p-4">
	<slot />
</div>
