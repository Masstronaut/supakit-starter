<script lang="ts">
	import type { User } from '@prisma/client';

	export let user: User;
</script>

<div class="dropdown dropdown-end">
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<label tabindex="0" class="btn btn-ghost btn-circle avatar">
		<div class="w-10 rounded-full">
			<img src={user.photo} alt="none" />
		</div>
	</label>
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<ul
		tabindex="0"
		class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
	>
		<li><a href="/settings/account">Settings</a></li>
		<li>
			<form action="/logout" method="post">
				<button class="w-full text-start" type="submit">Log out</button>
			</form>
		</li>
	</ul>
</div>
