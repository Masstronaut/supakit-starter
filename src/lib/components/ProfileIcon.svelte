<script lang="ts">
	import type { User } from '@prisma/client';

	export let user: User;
</script>

<div class="dropdown-end dropdown">
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<label tabindex="0" class="btn-ghost btn-circle avatar btn">
		<div class="w-10 rounded-full">
			<img src={user.photo} alt="none" />
		</div>
	</label>
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<ul
		tabindex="0"
		class="menu-compact dropdown-content menu rounded-box mt-3 w-52 bg-base-100 p-2 shadow">
		{#if user.role === 'admin'}
			<li><a href="/admin">Admin</a></li>
		{/if}
		<li><a href="/settings/account">Settings</a></li>
		<li>
			<form action="/logout" method="post">
				<button class="w-full text-start" type="submit">Log out</button>
			</form>
		</li>
	</ul>
</div>
