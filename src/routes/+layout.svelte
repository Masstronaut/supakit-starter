<script lang="ts">
	import '../app.postcss';
	import { supabase } from '$lib/supabase';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { Header } from '$lib/components';
	import { Toaster } from 'svelte-french-toast';
	import type { LayoutData } from './$types';
	import ProfileIcon from '$lib/components/ProfileIcon.svelte';

	export let data: LayoutData;

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange(async (event, session) => {
			invalidate('supabase:auth');
		});
		return () => {
			subscription.unsubscribe();
		};
	});

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
		{:else}
			<ProfileIcon />
		{/if}
	</div>
</Header>
<div class="p-4">
	<slot />
</div>
