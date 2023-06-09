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

<div class="navbar bg-base-100">
	<div class="navbar-start">
		<div class="dropdown">
			<label tabindex="0" class="btn-ghost btn lg:hidden">
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
						d="M4 6h16M4 12h8m-8 6h16" /></svg>
			</label>
			<ul
				tabindex="0"
				class="dropdown-content menu rounded-box menu-sm mt-3 w-52 bg-base-100 p-2 shadow">
				{#each navItems as navItem}
					{#if 'children' in navItem}
						<li>
							<a>{navItem.title}</a>
							<ul class="p-2">
								{#each navItem.children as child}
									<li><a href={child.href}>{child.title}</a></li>
								{/each}
							</ul>
						</li>
					{:else}
						<li><a href={navItem.href}>{navItem.title}</a></li>
					{/if}
				{/each}
			</ul>
		</div>
		<a class="btn-ghost btn text-xl normal-case" href={title.href}>{title.title}</a>
	</div>
	<div class="navbar-center hidden lg:flex">
		<ul class="menu menu-horizontal px-1">
			{#each navItems as navItem}
				{#if 'children' in navItem}
					<li tabindex="0">
						<details>
							<summary>{navItem.title}</summary>
							<ul class="p-2">
								{#each navItem.children as child}
									<li><a href={child.href}>{child.title}</a></li>
								{/each}
							</ul>
						</details>
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
