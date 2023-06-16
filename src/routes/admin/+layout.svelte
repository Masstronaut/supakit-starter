<script lang="ts">
	import { page } from '$app/stores';
	import { Home, Newspaper, Users } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	const routes = [
		{
			name: 'Home',
			path: '/admin',
			icon: Home
		},
		{
			name: 'Users',
			path: '/admin/users',
			icon: Users
		},
		{
			name: 'Posts',
			path: '/admin/posts',
			icon: Newspaper
		}
	];
</script>

<div class="flex w-full items-center justify-center">
	<ul class="menu rounded-box menu-horizontal mt-6 bg-base-200">
		{#each routes as route}
			<li>
				<a
					href={route.path}
					class="tooltip flex flex-row items-center align-middle text-lg font-medium"
					data-tip={route.name}>
					<Icon
						class="h-5 w-5 stroke-2"
						src={route.icon}
						theme={$page.route.id?.endsWith(route.path) ? 'solid' : 'outline'} />
					{route.name}
				</a>
			</li>
		{/each}
	</ul>
</div>
<slot />
