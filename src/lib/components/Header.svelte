<script lang="ts">
	import { z } from 'zod';

	const navItemSchema = z.object({
		title: z.string(),
		href: z.string()
	});

	const navSchema = z.array(navItemSchema);
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
					stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h8m-8 6h16" />
				</svg>
			</label>
			<ul
				tabindex="0"
				class="dropdown-content menu rounded-box menu-sm mt-3 w-52 bg-base-100 p-2 shadow">
				{#each navItems as navItem}
					<li><a href={navItem.href}>{navItem.title}</a></li>
				{/each}
			</ul>
		</div>
		<a class="btn-ghost btn text-xl normal-case" href={title.href}>
			{title.title}
		</a>
	</div>
	<div class="navbar-center hidden lg:flex">
		<ul class="menu menu-horizontal px-1">
			{#each navItems as navItem}
				<li><a href={navItem.href}>{navItem.title}</a></li>
			{/each}
		</ul>
	</div>
	<div class="navbar-end">
		<slot name="cta" />
	</div>
</div>

<style>
	/*
	 * Create a directionally aware hover underline effect.
	 * via https://www.youtube.com/watch?v=G_h2pGZcOzc
	 */
	@media (min-width: 1024px) {
		.menu > li::after {
			content: '';
			width: 100%;
			background-color: hsl(var(--p));
			height: 3px;
			scale: var(--_width, 0) 1;
			translate: var(--_translate, 0);
			transition: scale 200ms var(--_scale_delay, 0ms),
				translate 400ms var(--_translate_delay, 0ms);
		}
		.menu > li:hover {
			--_width: 1;
		}
		.menu > li:has(+ :hover) {
			--_translate: 100%;
			--_scale_delay: 200ms;
			--_translate_delay: 100ms;
		}
		.menu > li:hover + li {
			--_translate: -100%;
			--_scale_delay: 200ms;
			--_translate_delay: 100ms;
		}
	}
</style>
