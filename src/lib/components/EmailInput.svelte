<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Envelope } from '@steeze-ui/heroicons';

	export let id: string;
	export let value: string;
</script>

<div class="my-4">
	<label for="email" class="block text-sm font-medium text-base-content">Email</label>
	<div class="relative mt-1 rounded-md shadow-sm">
		<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
			<!-- Heroicon name: mini/envelope -->
			<Icon src={Envelope} class="w-5 h-5 text-base-content" theme="solid" />
		</div>
		<input
			bind:value
			type="email"
			name={id}
			{id}
			class="bg-base-200 text-base-content block w-full max-w-md rounded-md border-bg-secondary pl-10 focus:border-primary focus:ring-primary sm:text-sm"
			placeholder="you@example.com"
		/>
	</div>
</div>
