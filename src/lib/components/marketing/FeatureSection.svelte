<script lang="ts">
	import type { IconSource } from '@steeze-ui/heroicons/types';
	import { Hero } from '$lib/components/marketing';
	import { Icon } from '@steeze-ui/svelte-icon';

	export let features: {
		title: string;
		description: string;
		icon: IconSource;
	}[];
</script>

<div class="w-full mt-24">
	<Hero
		heading="What would you build today if the boilerplate was done?"
		subtext="Get over 20 thoughtfully implemented features out of the box. You don't even have to think about them. Build on a solid foundation that will support your product as it grows." />
	<div class="grid grid-flow-col auto-cols-auto gap-4 mx-auto w-full -mt-12 mb-24z">
		{#each features as feature}
			<div class=" flex flex-row border border-base-content/30 rounded-md p-4">
				<Icon src={feature.icon} theme="outline" class="mr-4 my-auto w-5 h-5 text-base-content" />
				<div>
					<h3 class=" font-bold">{feature.title}</h3>
					<p class="text-sm text-base-content">{feature.description}</p>
				</div>
			</div>
		{/each}
	</div>
</div>
