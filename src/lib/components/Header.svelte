<script lang="ts">
	import { z } from 'zod';

	const navItemSchema = z.object({
		title: z.string(),
		href: z.string()
	});
	const navItemParentSchema = z.object({
		title: z.string(),
		children: z.array(navItemSchema)
	});

	const navSchema = z.array(z.union([navItemSchema, navItemParentSchema]));
	export let title: { title: string; href: string };
	export let navItems: z.infer<typeof navSchema>;
</script>

<div class="navbar bg-base-100 shadow-md">
	<div class="navbar-start">
		<div class="dropdown">
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label tabindex="0" class="btn btn-ghost lg:hidden">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h8m-8 6h16"
					/></svg
				>
			</label>
			<ul class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
				{#each navItems as navItem}
					{#if 'children' in navItem}
						<!-- This is a parent element -->
						<li>
							<span class="justify-between">
								{navItem.title}
								<svg
									class="fill-current"
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg
								>
							</span>
							<ul class="p-2 bg-base-100">
								{#each navItem.children as child}
									<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
									<li tabindex="0"><a href={child.href}>{child.title}</a></li>
								{/each}
							</ul>
						</li>
					{:else}
						<li><a href={navItem.href}>{navItem.title}</a></li>
					{/if}
				{/each}
			</ul>
		</div>
		<a class="btn btn-ghost normal-case text-xl" href={title.href}>{title.title}</a>
	</div>
	<div class="navbar-center hidden lg:flex">
		<ul class="menu menu-horizontal px-1">
			{#each navItems as navItem}
				{#if 'children' in navItem}
					<li>
						<a href="#">
							{navItem.title}
							<svg
								class="fill-current"
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg
							>
						</a>
						<ul class="p-2 bg-base-100">
							{#each navItem.children as child, i}
								<li><a tabindex={i} href={child.href}>{child.title}</a></li>
							{/each}
						</ul>
					</li>
				{:else}
					<li><a href={navItem.href}>{navItem.title}</a></li>
				{/if}
			{/each}
		</ul>
	</div>
	<div class="navbar-end">
		<slot name="cta" />
	</div>
</div>
