<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';
	import { User, Cog6Tooth } from '@steeze-ui/heroicons';
	import { page } from '$app/stores';
</script>

<div class="drawer drawer-mobile">
	<input id="drawer-toggle-checkbox" type="checkbox" checked="true" class="drawer-toggle" />
	<div class="drawer-content">
		<slot />
	</div>
	<div class="drawer-side">
		<label for="drawer-toggle-checkbox" class="drawer-overlay" />
		<ul class="menu p-4 w-40 bg-base-100 text-base-content">
			Settings
			<li>
				<a href="/settings/profile"
					><Icon
						src={User}
						theme={$page.route.id?.endsWith('profile') ? 'solid' : 'outline'}
						class="w-5"
					/>Profile</a
				>
			</li>
			<li>
				<a href="/settings/account"
					><Icon
						src={Cog6Tooth}
						theme={$page.route.id?.endsWith('account') ? 'solid' : 'outline'}
						class="w-5"
					/>Account</a
				>
			</li>
		</ul>
	</div>
</div>
